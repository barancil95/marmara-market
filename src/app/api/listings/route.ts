import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pool } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { getPublicUrl } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category")?.trim();

  const conditions: string[] = ["l.status = 'available'"];
  const values: unknown[] = [];

  if (category) {
    values.push(category);
    conditions.push(`l.category = $${values.length}`);
  }
  if (q) {
    values.push(`%${q}%`);
    conditions.push(`(l.title ilike $${values.length} or l.description ilike $${values.length})`);
  }

  const { rows } = await pool.query(
    `select l.id, l.title, l.description, l.price, l.category, l.condition, l.status, l.created_at,
            u.full_name as seller_name,
            coalesce(
              (select array_agg(li.s3_key order by li.position)
               from listing_images li where li.listing_id = l.id),
              '{}'
            ) as image_keys
     from listings l
     join users u on u.id = l.seller_id
     where ${conditions.join(" and ")}
     order by l.created_at desc
     limit 60`,
    values,
  );

  const listings = rows.map((row) => ({
    ...row,
    images: (row.image_keys as string[]).map(getPublicUrl),
    image_keys: undefined,
  }));

  return NextResponse.json({ listings });
}

const createSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().max(2000).default(""),
  price: z.number().int().min(0).max(1_000_000),
  category: z.string().min(1),
  condition: z.string().min(1),
  imageKeys: z.array(z.string()).min(1).max(6),
});

export async function POST(req: NextRequest) {
  const session = await requireSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz ilan bilgisi." }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    await client.query("begin");
    const { rows } = await client.query(
      `insert into listings (seller_id, title, description, price, category, condition)
       values ($1,$2,$3,$4,$5,$6) returning id`,
      [
        session.userId,
        parsed.data.title,
        parsed.data.description,
        parsed.data.price,
        parsed.data.category,
        parsed.data.condition,
      ],
    );
    const listingId = rows[0].id;
    for (const [index, key] of parsed.data.imageKeys.entries()) {
      await client.query(
        "insert into listing_images (listing_id, s3_key, position) values ($1,$2,$3)",
        [listingId, key, index],
      );
    }
    await client.query("commit");
    return NextResponse.json({ id: listingId }, { status: 201 });
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    client.release();
  }
}
