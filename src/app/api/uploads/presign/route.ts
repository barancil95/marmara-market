import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/session";
import { createUploadTarget } from "@/lib/storage";

const schema = z.object({ contentType: z.string() });

export async function POST(req: NextRequest) {
  const session = await requireSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const target = await createUploadTarget(parsed.data.contentType);
  if (!target) {
    return NextResponse.json({ error: "Desteklenmeyen dosya tipi." }, { status: 400 });
  }

  return NextResponse.json(target);
}
