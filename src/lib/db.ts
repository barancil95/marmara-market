import { Pool } from "pg";
import { env } from "@/lib/env";

declare global {
  var __pgPool: Pool | undefined;
}

export const pool =
  globalThis.__pgPool ??
  new Pool({
    connectionString: env.databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__pgPool = pool;
}
