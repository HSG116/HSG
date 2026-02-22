# 🚨 حل مشكلة API - خطوة بخطوة

## ❌ المشكلة
عند إرسال رسالة من نموذج الاتصال، يظهر خطأ API.

## ✅ السبب
جدول `messages` غير موجود في قاعدة بيانات Supabase.

---

## 🔧 الحل السريع (3 دقائق)

### 1️⃣ افتح Supabase Dashboard
```
https://supabase.com/dashboard/project/yrtniowowkmsawwcbrky
```

### 2️⃣ افتح SQL Editor
- من القائمة الجانبية → **SQL Editor**
- اضغط **New query**

### 3️⃣ انسخ والصق هذا الكود

افتح ملف `SUPABASE_SETUP.sql` وانسخ كل محتوياته، أو انسخ هذا:

```sql
-- حذف الجداول القديمة إن وجدت
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

-- سياسات الأمان للرسائل
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

### 4️⃣ شغّل الكود
اضغط **Run** أو `Ctrl + Enter`

### 5️⃣ تحقق من النجاح
يجب أن ترى رسالة: **Success. No rows returned**

---

## ✅ التحقق

### في Supabase:
1. اذهب إلى **Table Editor**
2. يجب أن ترى:
   - ✅ جدول `messages`
   - ✅ جدول `site_projects`

### في موقعك:
1. افتح `http://localhost:5173`
2. اذهب إلى قسم "اتصل بنا"
3. املأ النموذج وأرسل
4. يجب أن ترى: ✅ **تم إرسال رسالتك بنجاح!**

### في لوحة التحكم:
1. اذهب إلى `http://localhost:5173/admin`
2. يجب أن ترى الرسالة التي أرسلتها

---

## 🎯 النتيجة

بعد تنفيذ SQL:
- ✅ نموذج الاتصال يعمل
- ✅ الرسائل تُحفظ في قاعدة البيانات
- ✅ لوحة التحكم تعرض الرسائل
- ✅ يمكنك حذف الرسائل
- ✅ المشاريع تُعرض من قاعدة البيانات

---

## 📝 ملاحظات

### بيانات الاتصال الصحيحة:
```
Project URL: https://yrtniowowkmsawwcbrky.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### الملفات المهمة:
- `SUPABASE_SETUP.sql` - الكود الذي يجب تنفيذه
- `client/src/lib/supabase.ts` - ملف الاتصال
- `FIX_API_ERROR.md` - هذا الملف

---

## 🆘 إذا استمرت المشكلة

### افحص Console في المتصفح:
1. اضغط `F12`
2. اذهب إلى **Console**
3. حاول إرسال رسالة
4. انظر إلى الخطأ

### تأكد من المفاتيح:
في Supabase Dashboard:
1. **Settings** → **API**
2. تأكد من أن المفتاح في `supabase.ts` يطابق **anon public** key

---

**🎊 نفذ SQL الآن وسيعمل كل شيء!**

Made with ❤️ by HSG
