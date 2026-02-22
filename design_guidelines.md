# تصميم موقع شركة HSG - دليل التصميم الشامل

## منهجية التصميم
**النهج المختار**: Reference-Based Design مستوحى من Linear و Stripe و Notion
- **المبرر**: موقع شركة تقنية يحتاج إلى تصميم احترافي فخم يعكس الابتكار والحداثة مع الحفاظ على وضوح المعلومات

## مبادئ التصميم الأساسية
1. **الفخامة الرقمية**: تصميم premium مع تأثيرات Glassmorphism وتدرجات ناعمة
2. **التفاعلية المتقدمة**: حركات سلسة ثلاثية الأبعاد للبطاقات والعناصر
3. **الوضوح المعلوماتي**: تنظيم محكم للمحتوى مع تسلسل هرمي واضح
4. **الاحترافية البصرية**: استخدام المساحات البيضاء والتباين الذكي

## الطباعة Typography

### الخطوط
- **Primary Font**: Cairo (Google Fonts)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold)

### التدرج الهرمي
- **Hero Headings (h1)**: 3rem - 4rem, weight 800, line-height 1.2
- **Section Headings (h2)**: 2.5rem - 3rem, weight 700, line-height 1.3
- **Card Titles (h3)**: 1.5rem - 1.8rem, weight 600, line-height 1.4
- **Body Text**: 1rem - 1.1rem, weight 400, line-height 1.8
- **Small Text/Labels**: 0.9rem, weight 500, line-height 1.6

## نظام التخطيط Layout System

### Spacing Units (Tailwind)
- **Core Units**: استخدام p-2, p-4, p-6, p-8, p-12, p-16, p-20
- **Gaps**: gap-4, gap-6, gap-8 للشبكات
- **Margins**: m-4, m-8, m-12, m-16 للفواصل بين الأقسام
- **Container**: max-w-7xl مع px-4 md:px-8

### Grid System
- **Projects Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- **Services Grid**: grid-cols-1 lg:grid-cols-3 gap-6
- **Contact Info**: grid-cols-1 md:grid-cols-3 gap-6

## مكونات الواجهة Components

### 1. Navigation
- Header لزج (sticky) مع تأثير backdrop blur عند التمرير
- Logo HSG على اليمين (RTL)
- قائمة أفقية مع أيقونات Font Awesome
- Mobile: hamburger menu مع قائمة منزلقة كاملة الشاشة
- Active state: تحديد بخط تحتي متحرك

### 2. Hero Section
- **Layout**: Two-column (60/40) - محتوى على اليمين، شعار HSG على اليسار
- **Image**: شعار HSG الكبير (880o868973.png) مع تأثير orbital dots متحركة
- **Background**: نجوم متحركة (stars animation) مع shooting stars
- **CTA Buttons**: اثنان - primary و secondary مع أيقونات
- **Spacing**: py-20 md:py-32
- تأثير Parallax خفيف على الشعار

### 3. Services Section
- **Layout**: 3 بطاقات أفقية (vertical stack on mobile)
- **Card Design**: 
  - Glassmorphic background مع backdrop blur
  - أيقونة كبيرة دائرية بتدرج لوني في الأعلى
  - عنوان بارز + وصف قصير
  - قائمة features مع check icons
  - قسم Portfolio/Examples منفصل
- **Hover Effects**: رفع البطاقة (translateY-2) + توهج ناعم + تأثير 3D tilt خفيف
- **Icons**: Font Awesome بحجم fa-2x

### 4. Projects Section (23 مشروع)
- **Filter System**:
  - أزرار فلترة أعلى الشبكة (all, ai, islamic, web, tools)
  - Active state واضح مع background fill
  - عداد ديناميكي لعدد المشاريع في كل فئة
  - Mobile: شبكة 3 أزرار أعلى + 2 أسفل
  
- **Project Cards**:
  - صورة المشروع كاملة الارتفاع في الأعلى (aspect-ratio: 16/9)
  - Overlay معتم عند hover مع ظهور category badge
  - Corner decorations (زوايا مزخرفة)
  - Title + short description
  - Tech stack badges (pills بألوان خفيفة)
  - زرين: "زيارة الموقع" (primary) + "تفاصيل أكثر" (secondary)
  
- **Hover Interaction**:
  - Scale up قليلاً (1.02)
  - Shadow expansion
  - Reveal project overlay
  - Category badge يظهر من الأعلى
  
- **Modal للتفاصيل**:
  - Full-screen overlay معتم
  - بطاقة مركزية كبيرة
  - صورة المشروع
  - Long description
  - قائمة التقنيات المستخدمة بشكل مميز
  - زر CTA لزيارة الموقع

### 5. About Section
- **Layout**: بطاقة مركزية واحدة كبيرة (max-w-4xl)
- **Design**: Background فاتح مع border ناعم
- محتوى نصي منظم:
  - اسم الشركة بتنسيق بارز مع توهج
  - وصف رئيسي
  - قسم Achievements مميز بخلفية ملونة خفيفة
  - Process text مع border يمين
  - توقيع المدير (اسم + منصب) في الأسفل يسار

### 6. Contact Section
- **Layout**: Form مركزي + Contact info grid أسفله
- **Form Design**:
  - Glassmorphic background
  - Input fields مع backdrop blur وborder ناعم
  - Focus states مع glow effect
  - Submit button بتدرج لوني + hover animation
- **Contact Grid**: 3 أعمدة (email, phone, social) مع أيقونات كبيرة
- **WhatsApp CTA**: زر بارز منفصل
- Hover effects على contact cards

### 7. Footer
- بسيط مع copyright
- روابط اجتماعية مع hover effects
- Newsletter subscription (اختياري)

## التأثيرات البصرية

### Animations
- **Page Load**: Stagger animation للعناصر (fade up)
- **Scroll Reveals**: Intersection Observer للأقسام
- **Stars Background**: Twinkling + shooting stars
- **Card Hovers**: Transform + shadow + glow
- **Button Hovers**: Scale + shine effect
- **Filter Transitions**: Fade + slide للمشاريع

### 3D Effects
- Card tilt على hover (خفيف جداً)
- Orbital dots حول شعار Hero
- Parallax على Hero background

## الصور Images

### Hero Section
- **شعار HSG الرئيسي**: 880o868973.png
  - Placement: يسار الشاشة في Hero
  - Treatment: orbital animation + glow effect
  - Size: كبير (~400px على desktop)

### Logo في Header
- **شعار HSG الصغير**: 9709798.png
  - Placement: أقصى اليمين في navigation
  - Size: 40-50px height

### Project Images
- جميع المشاريع الـ23 لها صور محددة في البيانات
- Aspect ratio: 16:9 موحد
- Treatment: rounded corners, shadow, overlay on hover

## إمكانية الوصول Accessibility
- Contrast ratios عالية للنصوص
- Focus states واضحة لجميع العناصر التفاعلية
- ARIA labels للأيقونات
- Keyboard navigation كامل
- RTL support كامل للعربية

## Responsive Breakpoints
- **Mobile**: < 768px (single column, stacked layout)
- **Tablet**: 768px - 1024px (2 columns للمشاريع)
- **Desktop**: > 1024px (3 columns, full layout)