-- حذف الجداول القديمة إن وجدت (لتجنب التعارض)
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS site_projects CASCADE;

-- إنشاء جدول الرسائل
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- إنشاء جدول المشاريع
CREATE TABLE site_projects (
  id BIGSERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  category TEXT DEFAULT 'web',
  image_url TEXT,
  url TEXT,
  technologies TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- تفعيل Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_projects ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للرسائل (السماح للجميع)
CREATE POLICY "Enable insert for all users" ON messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON messages
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Enable delete for all users" ON messages
  FOR DELETE TO anon, authenticated
  USING (true);

-- سياسات الأمان للمشاريع
CREATE POLICY "Enable read for all users" ON site_projects
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Enable insert for all users" ON site_projects
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON site_projects
  FOR UPDATE TO anon, authenticated
  USING (true);

CREATE POLICY "Enable delete for all users" ON site_projects
  FOR DELETE TO anon, authenticated
  USING (true);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_email ON messages(email);
CREATE INDEX idx_projects_category ON site_projects(category);
CREATE INDEX idx_projects_created_at ON site_projects(created_at DESC);
