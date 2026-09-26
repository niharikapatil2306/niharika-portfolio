import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHmac("sha256", password).update("blog-admin").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function passwordMatches(attempt: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password) && safeEqual(attempt, password!);
}

export async function isAdmin(): Promise<boolean> {
  const expected = sessionToken();
  if (!expected) return false;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return Boolean(value) && safeEqual(value!, expected);
}

export async function startAdminSession() {
  const token = sessionToken();
  if (!token) return;
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function endAdminSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
