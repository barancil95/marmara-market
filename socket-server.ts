import { config as loadDotenv } from "dotenv";
import path from "node:path";

// Next.js loads .env.local/.env automatically for its own process; this
// standalone server doesn't go through the Next CLI, so we load them here —
// before anything else is imported, since imports get hoisted above
// same-file code and lib/db.ts reads DATABASE_URL at import time.
// (dotenv never overwrites variables already set in process.env, so in
// Docker/production — where env vars are injected directly — this is a no-op.)
loadDotenv({ path: path.resolve(process.cwd(), ".env.local") });
loadDotenv({ path: path.resolve(process.cwd(), ".env") });

async function main(): Promise<void> {
  await import("./src/socket-server-app");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
