"use client";

import { useActionState } from "react";
import { login } from "@/app/blog/admin/actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <form
      action={formAction}
      className="mx-auto max-w-sm rounded-2xl bg-card p-7 text-card-ink shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold">
        Who&apos;s asking?
      </p>
      <label htmlFor="admin-password" className="sr-only">
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="Password"
        className="mt-5 w-full rounded-full border border-card-ink/20 bg-transparent px-5 py-3 text-sm outline-none focus:border-card-ink"
      />
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 w-full rounded-full bg-card-ink px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-card transition-colors hover:bg-coral disabled:opacity-60"
      >
        {isPending ? "Checking…" : "Sign in"}
      </button>
      {state && !state.ok && (
        <p className="mt-3 text-sm text-coral">{state.message}</p>
      )}
    </form>
  );
}
