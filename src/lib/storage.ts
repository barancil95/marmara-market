import { randomUUID } from "node:crypto";
import {
  createPresignedUploadUrl as createS3PresignedUploadUrl,
  getPublicObjectUrl as getS3PublicObjectUrl,
} from "@/lib/s3";

const isProd = process.env.NODE_ENV === "production";

export const ALLOWED_UPLOAD_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function createUploadTarget(
  contentType: string,
): Promise<{ uploadUrl: string; key: string } | null> {
  const extension = ALLOWED_UPLOAD_TYPES[contentType];
  if (!extension) return null;

  if (isProd) {
    return createS3PresignedUploadUrl({ contentType, extension });
  }

  // Yerel geliştirmede gerçek AWS S3 kurulumu olmadan test edebilmek için
  // dosyalar diske (public/uploads) yazılır. Üretimde S3 kullanılır.
  const key = `listings/${randomUUID()}.${extension}`;
  return { uploadUrl: `/api/uploads/local/${key}`, key };
}

export function getPublicUrl(key: string): string {
  if (isProd) return getS3PublicObjectUrl(key);
  return `/uploads/${key}`;
}
