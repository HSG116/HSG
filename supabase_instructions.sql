
-- Run this SQL in your Supabase Project's SQL Editor

-- 1. Create table for storing messages/requests
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  project_type text,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create table for storing portfolio projects/sites
create table if not exists public.site_projects (
  id uuid default gen_random_uuid() primary key,
  name_ar text,
  name_en text,
  description_ar text,
  description_en text,
  section text,
  url text,
  image_url text,
  category text, -- New column for filtering (ai, web, islamic, tools)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS) - Required for Supabase
alter table public.messages enable row level security;
alter table public.site_projects enable row level security;

-- 4. Create Policies
-- WARNING: Since we are using a simple client-side password and the public API key,
-- we must allow public access to these tables for the Admin Panel to function.

-- Allow anyone to create a message (submit form)
create policy "Enable all access for messages" on public.messages
  for all using (true) with check (true);

-- Allow all access for projects (so admin can read/write)
-- Drop existing policy if needed to avoid conflicts or just run:
-- drop policy if exists "Enable all access for site_projects" on public.site_projects;
create policy "Enable all access for site_projects" on public.site_projects
  for all using (true) with check (true);
