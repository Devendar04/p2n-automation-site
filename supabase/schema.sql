-- =========================================================
-- SUPABASE SCHEMA
-- Run this entire script in the Supabase SQL Editor
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- MEETINGS  (Quick Contact / Meeting Scheduler Modal)
-- ---------------------------------------------------------
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null check (
    city in ('Jaipur','Udaipur','Ajmer','Delhi','Kota','Jodhpur','NCR','Other')
  ),
  services text[] not null default '{}',
  preferred_date date not null,
  preferred_time text not null,
  message text,
  status text not null default 'new' check (status in ('new','contacted','scheduled','closed')),
  created_at timestamptz not null default now()
);

alter table public.meetings enable row level security;

create policy "Anyone can submit a meeting request"
  on public.meetings for insert
  with check (true);

create policy "Only service role can read meetings"
  on public.meetings for select
  using (auth.role() = 'service_role');

-- ---------------------------------------------------------
-- BLOGS
-- ---------------------------------------------------------
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text,
  tag text not null check (tag in ('Software','Hardware','Training')),
  author_name text not null,
  author_avatar_url text,
  reading_time_minutes integer not null default 5,
  like_count integer not null default 0,
  published_at timestamptz not null default now()
);

alter table public.blogs enable row level security;

create policy "Anyone can read published blogs"
  on public.blogs for select
  using (true);

create or replace function public.increment_blog_like(blog_id uuid)
returns integer
language plpgsql
security definer
as $$
declare
  new_count integer;
begin
  update public.blogs
    set like_count = like_count + 1
    where id = blog_id
    returning like_count into new_count;
  return new_count;
end;
$$;

-- ---------------------------------------------------------
-- BLOG COMMENTS
-- ---------------------------------------------------------
create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  author_name text not null,
  comment_body text not null,
  created_at timestamptz not null default now()
);

alter table public.blog_comments enable row level security;

create policy "Anyone can read comments"
  on public.blog_comments for select
  using (true);

create policy "Anyone can post a comment"
  on public.blog_comments for insert
  with check (char_length(comment_body) between 1 and 2000);

-- ---------------------------------------------------------
-- PROJECTS  (Enterprise B2B + Student capstone showcase)
-- ---------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  view_type text not null check (view_type in ('client','student')),
  category text not null check (category in ('Software','Hardware/IoT','AI & Automation','Student Innovations')),
  thumbnail_url text,
  problem_statement text,
  solution_delivered text,
  tech_stack text[] not null default '{}',
  case_study_url text,
  demo_url text,
  github_url text,
  hiring_badge boolean not null default false,
  testimonial_author text,
  testimonial_role text,
  testimonial_rating integer check (testimonial_rating between 1 and 5),
  testimonial_quote text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Anyone can read projects"
  on public.projects for select
  using (true);

create index if not exists idx_blogs_tag on public.blogs (tag);
create index if not exists idx_projects_view_category on public.projects (view_type, category);
create index if not exists idx_comments_blog_id on public.blog_comments (blog_id);

-- ---------------------------------------------------------
-- PARTNERSHIP INQUIRIES  (Careers page — "Become a Partner")
-- ---------------------------------------------------------
create table if not exists public.partnership_inquiries (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  contact_person text not null,
  email text not null,
  phone text not null,
  partnership_type text not null check (
    partnership_type in ('Academic Institution','Corporate Client','Tech Vendor','Research Partner')
  ),
  city text not null,
  message text,
  status text not null default 'new' check (status in ('new','contacted','active','closed')),
  created_at timestamptz not null default now()
);

alter table public.partnership_inquiries enable row level security;

create policy "Anyone can submit a partnership inquiry"
  on public.partnership_inquiries for insert
  with check (true);

create policy "Only authenticated staff can read partnership inquiries"
  on public.partnership_inquiries for select
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- INTERNSHIP APPLICATIONS  (Careers page — "Apply for Internship")
-- ---------------------------------------------------------
create table if not exists public.internship_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  school_name text not null,
  degree_year text not null,
  track text not null check (
    track in ('Software Development','Embedded Systems & Hardware','AI & Automation','UI/UX Design')
  ),
  preferred_start_date date not null,
  resume_url text,
  status text not null default 'new' check (status in ('new','reviewing','accepted','rejected')),
  created_at timestamptz not null default now()
);

alter table public.internship_applications enable row level security;

create policy "Anyone can submit an internship application"
  on public.internship_applications for insert
  with check (true);

create policy "Only authenticated staff can read internship applications"
  on public.internship_applications for select
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- JOB APPLICATIONS  (Careers page — "Apply for Job")
-- ---------------------------------------------------------
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  target_role text not null check (
    target_role in ('Senior Full-Stack Engineer','Embedded IoT Developer','Technical Lead','Mentor')
  ),
  years_experience text not null,
  current_ctc text,
  expected_ctc text,
  resume_url text not null,
  cover_note text,
  status text not null default 'new' check (status in ('new','reviewing','interviewing','offered','rejected')),
  created_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

create policy "Anyone can submit a job application"
  on public.job_applications for insert
  with check (true);

create policy "Only authenticated staff can read job applications"
  on public.job_applications for select
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- TRAINING TRACKS  (Admin-managed academy tracks)
-- ---------------------------------------------------------
create table if not exists public.training_tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  duration text not null,
  tech_stack text[] not null default '{}',
  fee_or_stipend text,
  status text not null default 'Open' check (status in ('Open','Applications Closed')),
  created_at timestamptz not null default now()
);

alter table public.training_tracks enable row level security;

create policy "Anyone can read training tracks"
  on public.training_tracks for select
  using (true);

create policy "Only authenticated staff can write training tracks"
  on public.training_tracks for insert
  with check (auth.role() = 'authenticated');

create policy "Only authenticated staff can update training tracks"
  on public.training_tracks for update
  using (auth.role() = 'authenticated');

create policy "Only authenticated staff can delete training tracks"
  on public.training_tracks for delete
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- Authenticated-staff write access on blogs / projects
-- (the earlier policies only covered public SELECT — the
-- admin portal needs INSERT/UPDATE/DELETE for logged-in staff)
-- ---------------------------------------------------------
create policy "Only authenticated staff can write blogs"
  on public.blogs for insert
  with check (auth.role() = 'authenticated');

create policy "Only authenticated staff can update blogs"
  on public.blogs for update
  using (auth.role() = 'authenticated');

create policy "Only authenticated staff can delete blogs"
  on public.blogs for delete
  using (auth.role() = 'authenticated');

create policy "Only authenticated staff can write projects"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

create policy "Only authenticated staff can update projects"
  on public.projects for update
  using (auth.role() = 'authenticated');

create policy "Only authenticated staff can delete projects"
  on public.projects for delete
  using (auth.role() = 'authenticated');

create index if not exists idx_partnership_status on public.partnership_inquiries (status);
create index if not exists idx_internship_apps_status on public.internship_applications (status);
create index if not exists idx_job_apps_status on public.job_applications (status);
