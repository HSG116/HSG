# Fakham Design Portfolio - Static SPA

موقع بورتفوليو احترافي تم تحويله إلى Static Single Page Application جاهز للنشر على Netlify.

## 🚀 التثبيت والتشغيل

### 1. تثبيت المكتبات
```bash
npm install
```

### 2. التشغيل محلياً
```bash
npm run dev
```

### 3. البناء للإنتاج
```bash
npm run build
```

سيتم إنشاء مجلد `dist` يحتوي على الموقع الكامل.

## 📦 النشر على Netlify

### الطريقة الأولى: من خلال Netlify CLI
```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# النشر
netlify deploy --prod --dir=dist
```

### الطريقة الثانية: من خلال واجهة Netlify
1. قم برفع مجلد `dist` مباشرة على Netlify
2. أو اربط المشروع بـ GitHub وسيتم البناء تلقائياً

## 📝 ملاحظات هامة

### التغييرات التي تم تنفيذها:
- ✅ إزالة جميع مكتبات Backend (Express, Passport, Drizzle, Supabase, etc.)
- ✅ تحديث `package.json` ليحتوي فقط على مكتبات React و UI
- ✅ تحويل نموذج الاتصال إلى Netlify Forms
- ✅ إزالة الاعتماد على قاعدة البيانات - استخدام البيانات الثابتة فقط
- ✅ إزالة صفحة Admin وجميع الـ routes المتعلقة بها
- ✅ إنشاء ملف `_redirects` لدعم React Router
- ✅ إنشاء ملف `netlify.toml` للتكوين التلقائي

### الملفات المطلوب حذفها يدوياً (اختياري):
يمكنك حذف هذه الملفات والمجلدات لتنظيف المشروع:
- `server/` - مجلد السيرفر
- `script/` - مجلد السكريبتات
- `shared/` - الملفات المشتركة
- `drizzle.config.ts` - إعدادات قاعدة البيانات
- جميع ملفات `.sql`

## 🎨 المميزات

- ⚡ أداء عالي وسريع
- 📱 تصميم متجاوب بالكامل
- 🌐 دعم اللغة العربية (RTL)
- 🎭 تأثيرات حركية احترافية
- 📧 نموذج اتصال يعمل مع Netlify Forms
- 🎯 SEO محسّن

## 📧 نموذج الاتصال (Netlify Forms)

تم تكوين نموذج الاتصال للعمل مع Netlify Forms:
- سيتم استقبال الرسائل في لوحة تحكم Netlify
- يمكنك تفعيل الإشعارات عبر البريد الإلكتروني من إعدادات Netlify

## 🛠️ التقنيات المستخدمة

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Radix UI
- i18next

---

Made with ❤️ by HSG
