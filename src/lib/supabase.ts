import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Server-only client using the service role key. Returns null until the env
// vars are set, so the site still builds and the blog shows "coming soon".
export function getSupabase(): SupabaseClient | null {
  // Tolerate the REST endpoint being pasted instead of the project URL.
  const url = process.env.SUPABASE_URL?.replace(/\/(rest\/v1\/?)?$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  client ??= createClient(url, key, { auth: { persistSession: false } });
  return client;
}
