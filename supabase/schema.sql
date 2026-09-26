-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  cover_image text,
  published_at timestamptz not null default now()
);

create table if not exists post_likes (
  post_id uuid not null references posts (id) on delete cascade,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  primary key (post_id, visitor_id)
);

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  unsubscribe_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);

-- RLS on with no policies: the public anon key can read or write nothing.
-- The site talks to these tables only from the server, with the service role key.
alter table posts enable row level security;
alter table post_likes enable row level security;
alter table subscribers enable row level security;

-- Public bucket for blog cover images (uploaded from the admin page).
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;
