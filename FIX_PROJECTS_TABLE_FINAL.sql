-- Run this SQL in your Supabase Project's SQL Editor to fix the "Add Project" error

-- 1. Ensure table structure is correct and matches the Admin page
CREATE TABLE IF NOT EXISTS public.site_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_ar TEXT,
    name_en TEXT,
    description_ar TEXT,
    description_en TEXT,
    section TEXT DEFAULT 'projects',
    url TEXT,
    image_url TEXT,
    category TEXT DEFAULT 'web',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add 'category' and 'section' columns if they were missing
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='site_projects' AND column_name='category') THEN 
        ALTER TABLE public.site_projects ADD COLUMN category TEXT DEFAULT 'web';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='site_projects' AND column_name='section') THEN 
        ALTER TABLE public.site_projects ADD COLUMN section TEXT DEFAULT 'projects';
    END IF;
END $$;

-- 3. Reset RLS policies to ensure the Admin Panel can Write/Delete
ALTER TABLE public.site_projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable all access for site_projects" ON public.site_projects;
DROP POLICY IF EXISTS "Enable read access for site_projects" ON public.site_projects;
DROP POLICY IF EXISTS "Enable insert access for site_projects" ON public.site_projects;
DROP POLICY IF EXISTS "Enable update access for site_projects" ON public.site_projects;
DROP POLICY IF EXISTS "Enable delete access for site_projects" ON public.site_projects;

-- Create a permissive policy so the Admin Panel works without complex auth for now
CREATE POLICY "Enable all access for site_projects" ON public.site_projects
    FOR ALL USING (true) WITH CHECK (true);

-- 4. Verify data (Optional: Insert a test project if table is empty)
-- INSERT INTO public.site_projects (name_ar, name_en, category) VALUES ('Test Project', 'Test Project', 'web');
