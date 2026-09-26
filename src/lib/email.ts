import "server-only";
import { SITE_URL } from "./site";
import type { Post } from "./posts";

type Email = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  headers?: Record<string, string>;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

async function sendBatch(emails: Email[]) {
  // Resend's batch endpoint takes at most 100 emails per request.
  for (let i = 0; i < emails.length; i += 100) {
    const res = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emails.slice(i, i + 100)),
    });
    if (!res.ok) {
      throw new Error(`Resend error ${res.status}: ${await res.text()}`);
    }
  }
}

function layout(body: string, unsubscribeUrl: string): string {
  return `<div style="background:#0a0a0b;padding:32px 16px;font-family:Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#f5f0de;border-radius:16px;padding:32px;color:#26231d">
    <p style="margin:0 0 24px;font-size:12px;letter-spacing:4px;text-transform:lowercase;color:#6b6456">niharika patil</p>
    ${body}
  </div>
  <p style="max-width:560px;margin:16px auto 0;font-size:11px;color:#a39c88;text-align:center">
    You subscribed at ${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}.
    <a href="${unsubscribeUrl}" style="color:#a39c88">Unsubscribe</a>
  </p>
</div>`;
}

export type Recipient = { email: string; unsubscribe_token: string };

function unsubscribeUrl(token: string) {
  return `${SITE_URL}/blog/unsubscribe?token=${token}`;
}

export async function sendNewPostEmails(post: Post, recipients: Recipient[]) {
  if (!emailConfigured() || recipients.length === 0) return;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const body = `<h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:28px">${escapeHtml(post.title)}</h1>
    ${post.excerpt ? `<p style="margin:0 0 24px;line-height:1.6;color:#6b6456">${escapeHtml(post.excerpt)}</p>` : ""}
    <a href="${url}" style="display:inline-block;background:#26231d;color:#f5f0de;padding:12px 22px;border-radius:999px;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase">Read the post</a>`;

  await sendBatch(
    recipients.map((r) => ({
      from: process.env.EMAIL_FROM!,
      to: [r.email],
      subject: `New post: ${post.title}`,
      html: layout(body, unsubscribeUrl(r.unsubscribe_token)),
      headers: { "List-Unsubscribe": `<${unsubscribeUrl(r.unsubscribe_token)}>` },
    }))
  );
}

export async function sendWelcomeEmail(recipient: Recipient) {
  if (!emailConfigured()) return;
  const body = `<h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:28px">You're on the list.</h1>
    <p style="margin:0;line-height:1.6;color:#6b6456">Thanks for subscribing — you'll get an email whenever a new post goes up. XOXO.</p>`;
  await sendBatch([
    {
      from: process.env.EMAIL_FROM!,
      to: [recipient.email],
      subject: "You're subscribed",
      html: layout(body, unsubscribeUrl(recipient.unsubscribe_token)),
    },
  ]);
}
