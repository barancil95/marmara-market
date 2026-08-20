function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get databaseUrl() {
    return required("DATABASE_URL");
  },
  get jwtSecret() {
    return required("JWT_SECRET");
  },
  get allowedEmailDomain() {
    return process.env.ALLOWED_EMAIL_DOMAIN || "marun.edu.tr";
  },
  get awsRegion() {
    return required("AWS_REGION");
  },
  get s3BucketName() {
    return required("S3_BUCKET_NAME");
  },
  get sesFromEmail() {
    return required("SES_FROM_EMAIL");
  },
};
