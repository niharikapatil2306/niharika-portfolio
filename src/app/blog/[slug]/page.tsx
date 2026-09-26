import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LikeButton from "@/components/blog/LikeButton";
import ShareButtons from "@/components/blog/ShareButtons";
import SubscribeForm from "@/components/blog/SubscribeForm";
import { formatDate, getLikeCount, getPost, hasLiked } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "Post not found | Niharika Patil" };
  return {
    title: `${post.title} | Niharika Patil`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const visitorId = (await cookies()).get("visitor_id")?.value;
  const [likeCount, liked] = await Promise.all([
    getLikeCount(post.id),
    hasLiked(post.id, visitorId),
  ]);
  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="px-5 pt-32 pb-24 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="text-[0.66rem] uppercase tracking-[0.22em] text-cream-dim transition-colors hover:text-gold"
          >
            ← All posts
          </Link>

          <p className="mt-10 font-[family-name:var(--font-jost)] text-[0.68rem] uppercase tracking-[0.22em] text-cream-dim">
            {formatDate(post.published_at)}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl leading-tight font-semibold text-cream md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-cream-dim">{post.excerpt}</p>
          )}

          {post.cover_image && (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-ink-soft">
              <Image
                src={post.cover_image}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          )}

          <div className="post-body mt-10">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <p className="mt-12 font-[family-name:var(--font-cormorant)] text-2xl italic text-cream">
            XOXO, Nicks
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-ink-line pt-8">
            <LikeButton postId={post.id} initialCount={likeCount} initialLiked={liked} />
            <ShareButtons url={url} title={post.title} />
          </div>

          <div className="mt-14">
            <SubscribeForm />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
