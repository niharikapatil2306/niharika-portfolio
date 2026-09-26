import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import LoginForm from "@/components/blog/LoginForm";
import PostEditor from "@/components/blog/PostEditor";
import { isAdmin } from "@/lib/auth";
import { emailConfigured } from "@/lib/email";
import { formatDate, listPosts } from "@/lib/posts";
import { getSupabase } from "@/lib/supabase";
import { deletePost, logout } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Write | Niharika Patil",
  robots: { index: false, follow: false },
};

async function subscriberCount() {
  const supabase = getSupabase();
  if (!supabase) return 0;
  const { count } = await supabase
    .from("subscribers")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}

export default async function AdminPage() {
  const signedIn = await isAdmin();
  const configured = Boolean(getSupabase() && process.env.ADMIN_PASSWORD);

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="px-5 pt-32 pb-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading label="write" accent="text-gold" />

          {!configured ? (
            <p className="text-cream-dim">
              The blog isn&apos;t connected yet — set SUPABASE_URL,
              SUPABASE_SERVICE_ROLE_KEY and ADMIN_PASSWORD (see BLOG_SETUP.md).
            </p>
          ) : !signedIn ? (
            <LoginForm />
          ) : (
            <AdminDashboard />
          )}
        </div>
      </section>
    </main>
  );
}

async function AdminDashboard() {
  const [posts, subscribers] = await Promise.all([listPosts(), subscriberCount()]);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-cream-dim">
          {subscribers} subscriber{subscribers === 1 ? "" : "s"} · {posts.length}{" "}
          post{posts.length === 1 ? "" : "s"}
        </p>
        <form action={logout}>
          <button className="text-[0.66rem] uppercase tracking-[0.22em] text-cream-dim hover:text-coral">
            Sign out
          </button>
        </form>
      </div>

      <PostEditor canEmail={emailConfigured()} />

      {posts.length > 0 && (
        <div className="mt-16">
          <h3 className="mb-5 font-[family-name:var(--font-jost)] text-[0.68rem] uppercase tracking-[0.28em] text-cream-dim">
            Published
          </h3>
          <ul className="divide-y divide-ink-line rounded-2xl border border-ink-line bg-ink-soft">
            {posts.map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block truncate font-[family-name:var(--font-cormorant)] text-xl text-cream hover:text-gold"
                  >
                    {post.title}
                  </Link>
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream-dim">
                    {formatDate(post.published_at)}
                  </p>
                </div>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button className="shrink-0 text-[0.62rem] uppercase tracking-[0.2em] text-cream-dim hover:text-coral">
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
