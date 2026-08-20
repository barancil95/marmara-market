import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pool } from "@/lib/db";
import {
  isAllowedEmail,
  generateOtpCode,
  hashOtpCode,
} from "@/lib/auth";
import { env } from "@/lib/env";
import { sendOtpEmail } from "@/lib/ses";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz e-posta." }, { status: 400 });
  }

  const email = parsed.data.email.trim().toLowerCase();
  if (!isAllowedEmail(email)) {
    return NextResponse.json(
      { error: `Sadece @${env.allowedEmailDomain} uzantılı e-postalar kabul ediliyor.` },
      { status: 400 },
    );
  }

  const { rows: recent } = await pool.query(
    "select 1 from otp_codes where email = $1 and created_at > now() - interval '60 seconds' limit 1",
    [email],
  );
  if (recent.length > 0) {
    return NextResponse.json(
      { error: "Az önce bir kod gönderdik, lütfen biraz bekle." },
      { status: 429 },
    );
  }

  const code = generateOtpCode();
  const codeHash = await hashOtpCode(code);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await pool.query(
    "insert into otp_codes (email, code_hash, expires_at) values ($1, $2, $3)",
    [email, codeHash, expiresAt],
  );

  if (process.env.NODE_ENV === "production") {
    await sendOtpEmail(email, code);
  } else {
    // Yerel geliştirmede gerçek SES kurulumu olmadan test edebilmek için
    // kodu e-posta yerine sunucu konsoluna yazıyoruz.
    console.log(`[dev] ${email} için giriş kodu: ${code}`);
  }

  return NextResponse.json({ ok: true });
}
