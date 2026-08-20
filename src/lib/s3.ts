import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { env } from "@/lib/env";

let cachedClient: S3Client | undefined;

function getClient(): S3Client {
  if (!cachedClient) {
    cachedClient = new S3Client({ region: env.awsRegion });
  }
  return cachedClient;
}

export async function createPresignedUploadUrl(params: {
  contentType: string;
  extension: string;
}): Promise<{ uploadUrl: string; key: string }> {
  const key = `listings/${randomUUID()}.${params.extension}`;
  const command = new PutObjectCommand({
    Bucket: env.s3BucketName,
    Key: key,
    ContentType: params.contentType,
  });
  const uploadUrl = await getSignedUrl(getClient(), command, {
    expiresIn: 60 * 5,
  });
  return { uploadUrl, key };
}

export function getPublicObjectUrl(key: string): string {
  return `https://${env.s3BucketName}.s3.${env.awsRegion}.amazonaws.com/${key}`;
}

export async function deleteObject(key: string): Promise<void> {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: env.s3BucketName, Key: key }),
  );
}
