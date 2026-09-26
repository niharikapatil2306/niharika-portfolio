"use client";

import { useActionState } from "react";
import { subscribe } from "@/app/blog/actions";

export default function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(subscribe, null);

  return (
    <div className="rounded-2xl glass p-7 text-card-ink shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold">
        Spotted: you, subscribing.
      </p>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-card-dim">
        Get new posts in your inbox. No spam, unsubscribe any time.
      </p>

      {state?.ok ? (
        <p className="mt-5 text-sm font-medium text-card-ink">{state.message}</p>
      ) : (
        <form action={formAction} className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <label htmlFor="subscribe-email" className="sr-only">
            Email address
          </label>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-full border border-card-ink/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-card-dim/70 focus:border-card-ink"
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-card-ink px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-card transition-colors hover:bg-coral disabled:opacity-60"
          >
            {isPending ? "…" : "Subscribe"}
          </button>
        </form>
      )}
      {state && !state.ok && (
        <p className="mt-3 text-sm text-coral">{state.message}</p>
      )}
    </div>
  );
}
