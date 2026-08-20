import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pool } from "@/lib/db";
import { requireSession } from "@/lib/session";

export async function GET() {
  const session = await requireSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  const { rows } = await pool.query(
    `select c.id, c.listing_id, c.buyer_id, c.seller_id, c.created_at,
            l.title as listing_title, l.status as listing_status,
            other.full_name as other_full_name, other.email as other_email,
            (select body from messages m where m.conversation_id = c.id order by m.created_at desc limit 1) as last_message,
            (select created_at from messages m where m.conversation_id = c.id order by m.created_at desc limit 1) as last_message_at
     from conversations c
     join listings l on l.id = c.listing_id
     join users other on other.id = (case when c.buyer_id = $1 then c.seller_id else c.buyer_id end)
     where c.buyer_id = $1 or c.seller_id = $1
     order by coalesce(
       (select created_at from messages m where m.conversation_id = c.id order by m.created_at desc limit 1),
       c.created_at
     ) desc`,
    [session.userId],
  );

  return NextResponse.json({ conversations: rows });
}

const createSchema = z.object({ listingId: z.string().uuid() });

export async function POST(req: NextRequest) {
  const session = await requireSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const { rows: listingRows } = await pool.query(
    "select seller_id from listings where id = $1",
    [parsed.data.listingId],
  );
  const listing = listingRows[0];
  if (!listing) {
    return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });
  }
  if (listing.seller_id === session.userId) {
    return NextResponse.json(
      { error: "Kendi ilanına mesaj gönderemezsin." },
      { status: 400 },
    );
  }

  const { rows } = await pool.query(
    `insert into conversations (listing_id, buyer_id, seller_id)
     values ($1,$2,$3)
     on conflict (listing_id, buyer_id) do update set listing_id = excluded.listing_id
     returning id`,
    [parsed.data.listingId, session.userId, listing.seller_id],
  );

  return NextResponse.json({ id: rows[0].id }, { status: 201 });
}
