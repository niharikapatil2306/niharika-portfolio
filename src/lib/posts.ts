import "server-only";
import { getSupabase } from "./supabase";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published_at: string;
};

export async function listPosts(): Promise<Post[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getLikeCount(postId: string): Promise<number> {
  const supabase = getSupabase();
  if (!supabase) return 0;
  const { count, error } = await supabase
    .from("post_likes")
    .select("post_id", { count: "exact", head: true })
    .eq("post_id", postId);
  if (error) throw error;
  return count ?? 0;
}

export async function hasLiked(postId: string, visitorId?: string) {
  const supabase = getSupabase();
  if (!supabase || !visitorId) return false;
  const { data } = await supabase
    .from("post_likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("visitor_id", visitorId)
    .maybeSingle();
  return Boolean(data);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
