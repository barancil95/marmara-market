import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { pool } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });

  const { rows } = await pool.query(
    "select id, email, full_name, avatar_url from users where id = $1",
    [session.userId],
  );
  return NextResponse.json({ user: rows[0] ?? null });
}
