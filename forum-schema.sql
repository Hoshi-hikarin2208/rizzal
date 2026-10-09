-- Run this script in the Supabase SQL Editor for the project used by this site.
-- Enable Anonymous Sign-Ins in Authentication > Sign In / Providers first.

create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null default 'Anonymous'
    check (char_length(author_name) between 1 and 40),
  is_anonymous boolean not null default true,
  body text not null check (char_length(trim(body)) between 1 and 1200),
  created_at timestamptz not null default now()
);

create table if not exists public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.forum_posts (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null default 'Anonymous'
    check (char_length(author_name) between 1 and 40),
  is_anonymous boolean not null default true,
  body text not null check (char_length(trim(body)) between 1 and 700),
  created_at timestamptz not null default now()
);

create table if not exists public.forum_post_likes (
  post_id uuid not null references public.forum_posts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table if not exists public.forum_reply_likes (
  reply_id uuid not null references public.forum_replies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (reply_id, user_id)
);

create index if not exists forum_posts_created_at_idx
  on public.forum_posts (created_at desc);
create index if not exists forum_replies_post_id_created_at_idx
  on public.forum_replies (post_id, created_at);

alter table public.forum_posts enable row level security;
alter table public.forum_replies enable row level security;
alter table public.forum_post_likes enable row level security;
alter table public.forum_reply_likes enable row level security;

drop policy if exists "Signed-in readers can read forum posts" on public.forum_posts;
create policy "Signed-in readers can read forum posts"
  on public.forum_posts for select to authenticated using (true);

drop policy if exists "Readers can create their own forum posts" on public.forum_posts;
create policy "Readers can create their own forum posts"
  on public.forum_posts for insert to authenticated
  with check (author_id = (select auth.uid()));

drop policy if exists "Authors can delete their own forum posts" on public.forum_posts;
create policy "Authors can delete their own forum posts"
  on public.forum_posts for delete to authenticated
  using (author_id = (select auth.uid()));

drop policy if exists "Signed-in readers can read forum replies" on public.forum_replies;
create policy "Signed-in readers can read forum replies"
  on public.forum_replies for select to authenticated using (true);

drop policy if exists "Readers can create their own forum replies" on public.forum_replies;
create policy "Readers can create their own forum replies"
  on public.forum_replies for insert to authenticated
  with check (author_id = (select auth.uid()));

drop policy if exists "Authors can delete their own forum replies" on public.forum_replies;
create policy "Authors can delete their own forum replies"
  on public.forum_replies for delete to authenticated
  using (author_id = (select auth.uid()));

drop policy if exists "Signed-in readers can read forum post likes" on public.forum_post_likes;
create policy "Signed-in readers can read forum post likes"
  on public.forum_post_likes for select to authenticated using (true);

drop policy if exists "Readers can like a post as themselves" on public.forum_post_likes;
create policy "Readers can like a post as themselves"
  on public.forum_post_likes for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "Readers can remove their own post like" on public.forum_post_likes;
create policy "Readers can remove their own post like"
  on public.forum_post_likes for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Signed-in readers can read forum reply likes" on public.forum_reply_likes;
create policy "Signed-in readers can read forum reply likes"
  on public.forum_reply_likes for select to authenticated using (true);

drop policy if exists "Readers can like a reply as themselves" on public.forum_reply_likes;
create policy "Readers can like a reply as themselves"
  on public.forum_reply_likes for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "Readers can remove their own reply like" on public.forum_reply_likes;
create policy "Readers can remove their own reply like"
  on public.forum_reply_likes for delete to authenticated
  using (user_id = (select auth.uid()));
