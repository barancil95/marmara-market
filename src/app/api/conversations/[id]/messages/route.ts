import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pool } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { emitNewMessage } from "@/lib/socket";

async function assertParticipant(conversationId: string, userId: string) {
  const { rows } = await pool.query(
    "select buyer_id, seller_id from conversations where id = $1",
    [conversationId],
  );
  const conversation = rows[0];
  if (!conversation) return null;
  if (conversation.buyer_id !== userId && conversation.seller_id !== userId) {
    return null;
  }
  return conversation;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }
  const { id } = await params;

  const conversation = await assertParticipant(id, session.userId);
  if (!conversation) {
    return NextResponse.json({ error: "Konuşma bulunamadı." }, { status: 404 });
  }

  const { rows } = await pool.query(
    "select id, sender_id, body, created_at from messages where conversation_id = $1 order by created_at asc",
    [id],
  );
  return NextResponse.json({ messages: rows });
}

const schema = z.object({ body: z.string().trim().min(1).max(2000) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }
  const { id } = await params;

  const conversation = await assertParticipant(id, session.userId);
  if (!conversation) {
    return NextResponse.json({ error: "Konuşma bulunamadı." }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Mesaj boş olamaz." }, { status: 400 });
  }

  const { rows } = await pool.query(
    "insert into messages (conversation_id, sender_id, body) values ($1,$2,$3) returning id, sender_id, body, created_at",
    [id, session.userId, parsed.data.body],
  );
  const message = rows[0];
  await emitNewMessage(id, message);

  return NextResponse.json({ message }, { status: 201 });
}
