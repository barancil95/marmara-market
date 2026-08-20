import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { requireSession } from "@/lib/session";

// Sadece geliştirme ortamında kullanılır: gerçek S3 kurulumu olmadan
// dosya yükleme akışını test etmeyi sağlar. Üretimde devre dışıdır
// (üretimde gerçek S3 presigned URL'leri kullanılır, bkz. lib/storage.ts).
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string[] }> },
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
  }

  const session = await requireSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  const { key } = await params;
  const uploadsRoot = path.join(process.cwd(), "public", "uploads");
  const destPath = path.join(uploadsRoot, ...key);

  if (!destPath.startsWith(uploadsRoot + path.sep)) {
    return NextResponse.json({ error: "Geçersiz yol." }, { status: 400 });
  }

  await mkdir(path.dirname(destPath), { recursive: true });
  const buffer = Buffer.from(await req.arrayBuffer());
  await writeFile(destPath, buffer);

  return NextResponse.json({ ok: true });
}
