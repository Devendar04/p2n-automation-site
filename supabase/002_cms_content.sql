-- =========================================================
-- 002 — CMS content: service pages + "AI placeholder" flags
-- Run ONCE in the Supabase SQL Editor, AFTER schema.sql.
-- Safe to re-run (idempotent).
-- =========================================================

-- Blogs: remember which posts are still AI-generated placeholders
alter table public.blogs
  add column if not exists is_placeholder boolean not null default false;

-- ---------------------------------------------------------
-- SERVICE PAGES  (one row per /services/<slug> page)
-- ---------------------------------------------------------
create table if not exists public.service_pages (
  slug             text primary key,                 -- software | cloud | hardware | network
  sort_order       integer not null default 99,
  icon             text not null default 'Code2',
  title            text not null,
  tagline          text,
  seo_description  text,
  intro            text,                             -- blank line = paragraph
  capabilities     jsonb not null default '[]'::jsonb,   -- [{ "title": "", "description": "" }]
  process          jsonb not null default '[]'::jsonb,   -- [{ "title": "", "description": "" }]
  tech_stack       text[] not null default '{}',
  deliverables     text[] not null default '{}',
  faqs             jsonb not null default '[]'::jsonb,   -- [{ "q": "", "a": "" }]
  related_projects text[] not null default '{}',     -- ids from src/data/siteContent.js PROJECTS
  is_placeholder   boolean not null default false,
  updated_at       timestamptz not null default now()
);

alter table public.service_pages enable row level security;

drop policy if exists "Anyone can read service pages" on public.service_pages;
create policy "Anyone can read service pages"
  on public.service_pages for select
  using (true);

drop policy if exists "Only authenticated staff can insert service pages" on public.service_pages;
create policy "Only authenticated staff can insert service pages"
  on public.service_pages for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "Only authenticated staff can update service pages" on public.service_pages;
create policy "Only authenticated staff can update service pages"
  on public.service_pages for update
  using (auth.role() = 'authenticated');

drop policy if exists "Only authenticated staff can delete service pages" on public.service_pages;
create policy "Only authenticated staff can delete service pages"
  on public.service_pages for delete
  using (auth.role() = 'authenticated');
