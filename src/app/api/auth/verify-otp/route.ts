import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pool } from "@/lib/db";
import { isAllowedEmail, signAuthToken, verifyOtpCode } from "@/lib/auth";
import { SESSION_COOKIE_NAME } from "@/lib/session";

const schema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const email = parsed.data.email.trim().toLowerCase();
  if (!isAllowedEmail(email)) {
    return NextResponse.json({ error: "Geçersiz e-posta." }, { status: 400 });
  }

  const { rows } = await pool.query(
    `select id, code_hash from otp_codes
     where email = $1 and consumed_at is null and expires_at > now()
     order by created_at desc
     limit 1`,
    [email],
  );

  const record = rows[0];
  if (!record) {
    return NextResponse.json(
      { error: "Kodun süresi dolmuş, yeni kod iste." },
      { status: 400 },
    );
  }

  const valid = await verifyOtpCode(parsed.data.code, record.code_hash);
  if (!valid) {
    return NextResponse.json({ error: "Kod hatalı." }, { status: 400 });
  }

  await pool.query("update otp_codes set consumed_at = now() where id = $1", [
    record.id,
  ]);

  let userResult = await pool.query(
    "select id, email, full_name, avatar_url from users where email = $1",
    [email],
  );
  if (userResult.rows.length === 0) {
    userResult = await pool.query(
      "insert into users (email) values ($1) returning id, email, full_name, avatar_url",
      [email],
    );
  }
  const user = userResult.rows[0];

  const token = signAuthToken({ userId: user.id, email: user.email });

  const response = NextResponse.json({ user });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
