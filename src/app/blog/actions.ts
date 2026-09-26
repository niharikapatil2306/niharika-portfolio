"use server";

import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { getSupabase } from "@/lib/supabase";
import { getLikeCount } from "@/lib/posts";
import { sendWelcomeEmail } from "@/lib/email";

const VISITOR_COOKIE = "visitor_id";

export async function toggleLike(postId: string) {
  const supabase = getSupabase();
  if (!supabase) return { liked: false, count: 0 };

  const jar = await cookies();
  let visitorId = jar.get(VISITOR_COOKIE)?.value;
  if (!visitorId) {
    visitorId = randomUUID();
    jar.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 2,
    });
  }

  const { data: existing } = await supabase
    .from("post_likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("visitor_id", visitorId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("post_likes")
      .delete()
      .eq("post_id", postId)
      .eq("visitor_id", visitorId);
  } else {
    await supabase
      .from("post_likes")
      .insert({ post_id: postId, visitor_id: visitorId });
  }

  return { liked: !existing, count: await getLikeCount(postId) };
}

export type SubscribeState = { ok: boolean; message: string } | null;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { ok: false, message: "That doesn't look like an email address." };
  }

  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: "Subscriptions open soon." };

  const { data, error } = await supabase
    .from("subscribers")
    .insert({ email })
    .select("email, unsubscribe_token")
    .single();

  if (error) {
    // 23505 = unique violation: already subscribed. Same answer either way.
    if (error.code === "23505") {
      return { ok: true, message: "You're already on the list. XOXO." };
    }
    return { ok: false, message: "Something went wrong — try again?" };
  }

  try {
    await sendWelcomeEmail(data);
  } catch (err) {
    console.error("Welcome email failed", err);
  }
  return { ok: true, message: "You're on the list. XOXO." };
}

export async function unsubscribe(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const supabase = getSupabase();
  if (!supabase || !/^[0-9a-f-]{36}$/i.test(token)) return;
  await supabase.from("subscribers").delete().eq("unsubscribe_token", token);
}
