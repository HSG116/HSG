# 🚨 حل المشكلة - خطوة واحدة فقط!

## ❌ المشكلة
عند إرسال رسالة يظهر خطأ API

## ✅ السبب
**لم تنفذ SQL في Supabase**

---

## 🎯 الحل (خطوة واحدة)

### 1. افتح هذا الرابط:
```
https://supabase.com/dashboard/project/yrtniowowkmsawwcbrky/sql/new
```

### 2. الصق هذا الكود بالضبط:

```sql
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS site_projects CASCADE;

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE site_projects (
  id BIGSERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  category TEXT DEFAULT 'web',
  image_url TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all users" ON messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON messages
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Enable delete for all users" ON messages
  FOR DELETE TO anon, authenticated
  USING (true);

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

CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_email ON messages(email);
CREATE INDEX idx_projects_category ON site_projects(category);
CREATE INDEX idx_projects_created_at ON site_projects(created_at DESC);
```

### 3. اضغط RUN (الزر الأخضر)

### 4. انتظر حتى ترى: "Success"

---

## ✅ بعد كده جرب تاني

1. ارجع لموقعك: http://localhost:5173
2. اذهب لقسم "اتصل بنا"
3. املأ النموذج
4. اضغط إرسال

**🎉 هيشتغل!**

---

## 📸 صورة توضيحية

بعد ما تضغط Run في Supabase، لازم تشوف:
```
Success. No rows returned
```

لو شفت أي خطأ، ابعتهولي.

---

## 🆘 لو لسه مش شغال

افتح Console في المتصفح (F12) وابعتلي الخطأ الظاهر.

---

**🚀 نفذ SQL دلوقتي!**
