import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import SubscribeForm from "@/components/blog/SubscribeForm";
import { formatDate, listPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Niharika Patil",
  description: "Notes on fashion, marketing and the numbers behind them.",
};

export default async function BlogPage() {
  const posts = await listPosts();

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative isolate overflow-hidden px-5 pt-36 pb-16 sm:px-8">
        <div className="bokeh pointer-events-none absolute inset-0 -z-10 opacity-60" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,rgba(10,10,11,0.7)_50%,rgba(10,10,11,0.96)_85%)]" />
        <div className="animate-fade-in mx-auto max-w-6xl text-center">
          <h1 className="font-[family-name:var(--font-jost)] text-[clamp(2.75rem,10vw,7rem)] font-extralight lowercase leading-[0.9] text-cream">
            the blog
          </h1>
          <p className="mt-5 font-[family-name:var(--font-jost)] text-[0.7rem] uppercase tracking-[0.42em] text-cream-dim sm:text-sm">
            Fashion, marketing &amp; the numbers behind them
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="latest" accent="text-gold" />

          {posts.length === 0 ? (
            <p className="font-[family-name:var(--font-cormorant)] text-2xl text-cream-dim">
              The first post is coming soon. You know you love me.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl glass text-card-ink shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  {post.cover_image && (
                    <div className="relative h-40 w-full bg-ink-soft">
                      <Image
                        src={post.cover_image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[0.56rem] uppercase tracking-[0.18em] text-card-dim">
                      {formatDate(post.published_at)}
                    </p>
                    <h2 className="mt-1.5 font-[family-name:var(--font-cormorant)] text-2xl font-bold leading-tight">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2.5 line-clamp-3 text-[0.82rem] leading-relaxed text-card-dim">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-auto pt-4 text-[0.6rem] uppercase tracking-[0.18em] text-card-ink group-hover:text-coral">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-20 max-w-xl">
            <SubscribeForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
