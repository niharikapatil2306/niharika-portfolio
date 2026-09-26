"use client";

import { useState, useTransition } from "react";
import { toggleLike } from "@/app/blog/actions";

export default function LikeButton({
  postId,
  initialCount,
  initialLiked,
}: {
  postId: string;
  initialCount: number;
  initialLiked: boolean;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    // Optimistic: flip immediately, then settle on the server's numbers.
    setLiked(!liked);
    setCount(count + (liked ? -1 : 1));
    startTransition(async () => {
      const result = await toggleLike(postId);
      setLiked(result.liked);
      setCount(result.count);
    });
  };

  return (
    <button
      onClick={onClick}
      disabled={isPending}
      aria-pressed={liked}
      className={`group flex items-center gap-2.5 rounded-full border px-5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 ${
        liked
          ? "border-rose bg-rose/10 text-rose"
          : "border-ink-line bg-ink-soft text-cream-dim hover:border-rose hover:text-rose"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-transform ${liked ? "scale-110 fill-rose" : "fill-none stroke-current"}`}
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4 6.4 4c2.3 0 3.8 1.3 5.6 3.3C13.8 5.3 15.3 4 17.6 4c4.1 0 6 4.4 4.4 7.7C19.5 16.4 12 21 12 21z" />
      </svg>
      <span className="text-[0.7rem] uppercase tracking-[0.18em]">
        {count} {count === 1 ? "like" : "likes"}
      </span>
    </button>
  );
}
