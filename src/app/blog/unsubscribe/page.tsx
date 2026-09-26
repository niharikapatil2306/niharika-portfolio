import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { unsubscribe } from "../actions";

export const metadata: Metadata = {
  title: "Unsubscribe | Niharika Patil",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ token?: string; done?: string }> };

export default async function UnsubscribePage({ searchParams }: Props) {
  const { token, done } = await searchParams;

  // A button rather than unsubscribing on page load, so email link scanners
  // that pre-open URLs can't unsubscribe people by accident.
  async function confirm(formData: FormData) {
    "use server";
    await unsubscribe(formData);
    redirect("/blog/unsubscribe?done=1");
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="px-5 pt-40 pb-24 sm:px-8">
        <div className="mx-auto max-w-md rounded-2xl bg-card p-8 text-center text-card-ink shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {done ? (
            <>
              <p className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold">
                You&apos;re unsubscribed.
              </p>
              <p className="mt-3 text-sm text-card-dim">No more emails. XOXO.</p>
            </>
          ) : token ? (
            <form action={confirm}>
              <input type="hidden" name="token" value={token} />
              <p className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold">
                Leaving so soon?
              </p>
              <button className="mt-6 rounded-full bg-card-ink px-7 py-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-card transition-colors hover:bg-coral">
                Unsubscribe me
              </button>
            </form>
          ) : (
            <p className="text-card-dim">This unsubscribe link is missing its token.</p>
          )}
        </div>
      </section>
    </main>
  );
}
