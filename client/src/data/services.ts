export interface ServiceFeature {
  text: string;
  key?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: ServiceFeature[];
  portfolio?: {
    title: string;
    items: string[];
  };
  result?: string;
  highlight?: string;
}

export const SERVICES: Service[] = [
  {
    id: "web-design",
    title: "تصميم وتطوير مواقع احترافية",
    description: "أصمم وأطور مواقع ويب احترافية تعكس هويتك وتحقق أهدافك بأسلوب عصري وفخم.",
    icon: "fas fa-globe",
    features: [
      { text: "تصميم أنيق وعصري متكامل", key: "feature1" },
      { text: "متجاوب 100٪ مع جميع الشاشات", key: "feature2" },
      { text: "تحميل سريع وتجربة مستخدم سلسة", key: "feature3" },
      { text: "دعم كامل للغتين (العربية والإنجليزية)", key: "feature4" },
      { text: "صفحات منظمة وجذابة", key: "feature5" },
      { text: "حماية عالية وسيو (SEO) احترافي", key: "feature6" },
    ],
  },
  {
    id: "maintenance",
    title: "إعادة تصميم وصيانة المواقع",
    description: "أساعدك في تحديث موقعك القديم وإضافة ميزات جديدة أو صيانته بشكل منتظم.",
    icon: "fas fa-tools",
    features: [
      { text: "تحديث التصاميم القديمة", key: "feature7" },
      { text: "إضافة ميزات وفيتشرات جديدة", key: "feature8" },
      { text: "إصلاح الأخطاء والمشاكل", key: "feature9" },
      { text: "دعم وصيانة شهرية", key: "feature10" },
      { text: "تحسين الأداء والسيو", key: "feature11" },
    ],
  },
];

export const NAV_LINKS = [
  { href: "#home", label: "الرئيسية", icon: "fas fa-home", key: "home" },
  { href: "#services", label: "خدماتي", icon: "fas fa-cogs", key: "services" },
  { href: "#projects", label: "مشاريعي", icon: "fas fa-laptop-code", key: "projects" },
  { href: "#about", label: "من أنا", icon: "fas fa-user", key: "about" },
  { href: "#contact", label: "تواصل معي", icon: "fas fa-paper-plane", key: "contact" },
];
