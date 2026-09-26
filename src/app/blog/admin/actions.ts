"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  endAdminSession,
  isAdmin,
  passwordMatches,
  startAdminSession,
} from "@/lib/auth";
import { getSupabase } from "@/lib/supabase";
import { slugify, type Post } from "@/lib/posts";
import { emailConfigured, sendNewPostEmails } from "@/lib/email";

export type FormState = { ok: boolean; message: string } | null;

export async function login(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return { ok: false, message: "Wrong password." };
  }
  await startAdminSession();
  redirect("/blog/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/blog");
}

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function createPost(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(await isAdmin())) return { ok: false, message: "Not signed in." };
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: "Database isn't set up yet." };

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const notify = formData.get("notify") === "on";
  if (!title || !content) {
    return { ok: false, message: "A post needs a title and some words." };
  }

  let coverImage: string | null = null;
  const file = formData.get("cover");
  if (file instanceof File && file.size > 0) {
    const ext = IMAGE_TYPES[file.type];
    if (!ext) return { ok: false, message: "Cover must be JPG, PNG, WebP or GIF." };
    if (file.size > 4 * 1024 * 1024) {
      return { ok: false, message: "Cover image must be under 4 MB." };
    }
    const path = `${randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from("blog-images")
      .upload(path, file, { contentType: file.type });
    if (error) return { ok: false, message: `Image upload failed: ${error.message}` };
    coverImage = supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
  }

  // Find a free slug: my-post, my-post-2, my-post-3…
  const base = slugify(title) || "post";
  const { data: taken } = await supabase
    .from("posts")
    .select("slug")
    .like("slug", `${base}%`);
  const takenSlugs = new Set((taken ?? []).map((row) => row.slug));
  let slug = base;
  for (let n = 2; takenSlugs.has(slug); n++) slug = `${base}-${n}`;

  const { data: post, error } = await supabase
    .from("posts")
    .insert({ slug, title, excerpt, content, cover_image: coverImage })
    .select("*")
    .single<Post>();
  if (error) return { ok: false, message: `Couldn't publish: ${error.message}` };

  revalidatePath("/blog");

  if (notify && emailConfigured()) {
    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("email, unsubscribe_token");
    try {
      await sendNewPostEmails(post, subscribers ?? []);
      return {
        ok: true,
        message: `Published, and emailed ${subscribers?.length ?? 0} subscriber(s).`,
      };
    } catch (err) {
      console.error(err);
      return { ok: true, message: "Published, but the subscriber email failed to send." };
    }
  }

  return { ok: true, message: "Published." };
}

export async function deletePost(formData: FormData) {
  if (!(await isAdmin())) return;
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.from("posts").delete().eq("id", String(formData.get("id")));
  revalidatePath("/blog");
  revalidatePath("/blog/admin");
}
