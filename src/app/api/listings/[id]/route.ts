import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";
import { getPublicUrl } from "@/lib/storage";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { rows } = await pool.query(
    `select l.id, l.title, l.description, l.price, l.category, l.condition, l.status, l.created_at,
            l.seller_id, u.full_name as seller_name, u.email as seller_email,
            coalesce(
              (select array_agg(li.s3_key order by li.position) from listing_images li where li.listing_id = l.id),
              '{}'
            ) as image_keys
     from listings l
     join users u on u.id = l.seller_id
     where l.id = $1`,
    [id],
  );

  const row = rows[0];
  if (!row) {
    return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });
  }

  const session = await getSession();

  return NextResponse.json({
    listing: {
      ...row,
      images: (row.image_keys as string[]).map(getPublicUrl),
      image_keys: undefined,
      is_owner: session?.userId === row.seller_id,
    },
  });
}

const patchSchema = z.object({
  status: z.enum(["available", "reserved", "sold"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }
  const { id } = await params;

  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const { rows } = await pool.query("select seller_id from listings where id = $1", [id]);
  if (!rows[0]) {
    return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });
  }
  if (rows[0].seller_id !== session.userId) {
    return NextResponse.json({ error: "Bu ilan sana ait değil." }, { status: 403 });
  }

  await pool.query("update listings set status = $1 where id = $2", [
    parsed.data.status,
    id,
  ]);

  if (parsed.data.status === "sold") {
    await pool.query(
      `insert into orders (listing_id, buyer_id, seller_id, payment_status)
       select $1, c.buyer_id, $2, 'off_platform'
       from conversations c
       where c.listing_id = $1 and c.seller_id = $2
       order by c.created_at desc
       limit 1
       on conflict do nothing`,
      [id, session.userId],
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }
  const { id } = await params;

  const { rows } = await pool.query("select seller_id from listings where id = $1", [id]);
  if (!rows[0]) {
    return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });
  }
  if (rows[0].seller_id !== session.userId) {
    return NextResponse.json({ error: "Bu ilan sana ait değil." }, { status: 403 });
  }

  await pool.query("delete from listings where id = $1", [id]);
  return NextResponse.json({ ok: true });
}
