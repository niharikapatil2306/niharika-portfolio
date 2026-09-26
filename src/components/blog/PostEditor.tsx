"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPost } from "@/app/blog/admin/actions";

const field =
  "w-full rounded-xl border border-card-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-card-ink";
const label =
  "mb-1.5 block text-[0.62rem] uppercase tracking-[0.22em] text-card-dim";

export default function PostEditor({ canEmail }: { canEmail: boolean }) {
  const [state, formAction, isPending] = useActionState(createPost, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-5 rounded-2xl glass p-7 text-card-ink shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <div>
        <label htmlFor="title" className={label}>Title</label>
        <input id="title" name="title" required maxLength={160} className={`${field} font-[family-name:var(--font-cormorant)] text-xl`} />
      </div>

      <div>
        <label htmlFor="excerpt" className={label}>Teaser (shown on the blog list and in emails)</label>
        <input id="excerpt" name="excerpt" maxLength={280} className={field} />
      </div>

      <div>
        <label htmlFor="cover" className={label}>Cover image (optional, max 4 MB)</label>
        <input
          id="cover"
          name="cover"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="block w-full text-sm text-card-dim file:mr-4 file:rounded-full file:border-0 file:bg-card-ink file:px-4 file:py-2 file:text-[0.66rem] file:uppercase file:tracking-[0.16em] file:text-card"
        />
      </div>

      <div>
        <label htmlFor="content" className={label}>
          Post — Markdown works: # heading, **bold**, *italic*, [link](https://…), - lists, &gt; quotes
        </label>
        <textarea id="content" name="content" required rows={16} className={`${field} leading-relaxed`} />
      </div>

      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" name="notify" defaultChecked={canEmail} disabled={!canEmail} className="h-4 w-4 accent-[#dcc48e]" />
        {canEmail
          ? "Email this post to subscribers"
          : "Emailing subscribers is off until Resend is set up"}
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-card-ink px-7 py-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-card transition-colors hover:bg-coral disabled:opacity-60"
        >
          {isPending ? "Publishing…" : "Publish"}
        </button>
        {state && (
          <p className={`text-sm ${state.ok ? "text-card-ink" : "text-coral"}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
