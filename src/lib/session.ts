import { cookies } from "next/headers";
import { verifyAuthToken, type AuthTokenPayload } from "@/lib/auth";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

export { SESSION_COOKIE_NAME };

export async function getSession(): Promise<AuthTokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return verifyAuthToken(token);
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<AuthTokenPayload> {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}
