# 🚨 خطوات حل مشكلة API

## المشكلة
عند إرسال رسالة، يظهر خطأ في API لأن جدول `messages` غير موجود في Supabase.

## ✅ الحل (خطوة بخطوة)

### الخطوة 1: افتح Supabase Dashboard
اذهب إلى:
```
https://supabase.com/dashboard/project/yrtniowowkmsawwcbrky
```

### الخطوة 2: افتح SQL Editor
1. من القائمة الجانبية اليسرى
2. اضغط على **SQL Editor**
3. اضغط **New query**

### الخطوة 3: انسخ والصق SQL التالي

```sql
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

-- إنشاء فهارس
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_email ON messages(email);
CREATE INDEX idx_projects_category ON site_projects(category);
CREATE INDEX idx_projects_created_at ON site_projects(created_at DESC);
```

### الخطوة 4: تنفيذ SQL
اضغط **Run** أو اضغط `Ctrl + Enter`

### الخطوة 5: التحقق
1. اذهب إلى **Table Editor** من القائمة الجانبية
2. يجب أن ترى جدولين:
   - ✅ `messages`
   - ✅ `site_projects`

### الخطوة 6: اختبار النموذج
1. ارجع إلى موقعك: `http://localhost:5173`
2. اذهب إلى قسم "اتصل بنا"
3. املأ النموذج وأرسل رسالة
4. يجب أن تظهر رسالة نجاح ✅

### الخطوة 7: تحقق من الرسائل
1. اذهب إلى `/admin` في موقعك
2. يجب أن ترى الرسالة التي أرسلتها

---

## 🔍 إذا استمرت المشكلة

### تحقق من المفاتيح
1. اذهب إلى **Settings** → **API** في Supabase
2. تأكد من أن:
   - **Project URL**: `https://yrtniowowkmsawwcbrky.supabase.co`
   - **anon public key**: يبدأ بـ `eyJ...`

### تحقق من Console في المتصفح
1. افتح Developer Tools (F12)
2. اذهب إلى **Console**
3. حاول إرسال رسالة
4. انظر إلى الخطأ الظاهر

---

## ✅ بعد تنفيذ SQL

سيعمل كل شيء بشكل صحيح:
- ✅ إرسال الرسائل
- ✅ حفظها في قاعدة البيانات
- ✅ عرضها في لوحة التحكم
- ✅ حذفها

---

**🎯 نفذ SQL الآن وجرب!**
