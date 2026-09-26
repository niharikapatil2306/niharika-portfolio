# Blog setup

The blog needs three free accounts. Until they're connected, `/blog` shows
"coming soon" and the rest of the site works as normal.

## 1. Supabase (stores posts, likes, subscribers, cover images)

1. Create a project at https://supabase.com.
2. **SQL Editor → New query**, paste all of `supabase/schema.sql`, and click **Run**.
3. **Project Settings → API**: copy the **Project URL** and the **service_role** key.
   The service_role key is secret: put it only in env vars, never in code.

## 2. Resend (emails subscribers when you publish)

1. Create an account at https://resend.com and an **API key**.
2. **Domains → Add domain** and add the DNS records it shows you. You need your
   own domain for this, because a `*.vercel.app` address can't be verified.
   Until a domain is verified, Resend only delivers to your own email address.

## 3. Environment variables

Copy `.env.example` to `.env.local`, then fill it in for local development. Add
the same keys in **Vercel → Project → Settings → Environment Variables**, then
redeploy.

## Writing a post

Go to `/blog/admin` and sign in with `ADMIN_PASSWORD`. Write the post and click
Publish. Tick "Email this post to subscribers" to send it out. Posts use
Markdown: `# Heading`, `**bold**`, `*italic*`, `[text](https://link)`, `- list`,
`> quote`.
