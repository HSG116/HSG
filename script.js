document.addEventListener('DOMContentLoaded', function() {
  // إنشاء النجوم العشوائية
  createStars();
  
  // إنشاء المذنب
  createComet();
  
  // تأثيرات التمرير
  setupScrollEffects();
  
  // فلترة المشاريع
  setupProjectFilter();
  
  // المودال
  setupModal();
  
  // العداد الرقمي
  setupCounters();
  
  // القائمة المتحركة للجوال
  setupMobileMenu();
  
  // زر العودة للأعلى
  setupBackToTop();
  
  // تأثيرات إضافية
  setupAdditionalEffects();
});

function createStars() {
  const starsContainer = document.querySelector('.stars');
  const starCount = 200;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // مواصفات عشوائية للنجوم
    const size = Math.random() * 3;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 5;
    
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.animationDelay = `${delay}s`
    
    starsContainer.appendChild(star);
  }
}

function createComet() {
  const comet = document.createElement('div');
  comet.classList.add('comet');
  document.body.appendChild(comet);
  
  // مواصفات عشوائية للمذنب
  const delay = 5 + Math.random() * 20;
  comet.style.animationDelay = `${delay}s`;
}

function setupScrollEffects() {
  // تأثيرات الظهور عند التمرير
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .service-card, .stat-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // تطبيق التأثيرات عند التحميل والتمرير
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // تهيئة العناصر بالخصائص الأولية
  document.querySelectorAll('.project-card, .service-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
  });
}

function setupProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // إزالة الفعالية من جميع الأزرار
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // إضافة الفعالية للزر المحدد
      button.classList.add('active');
      
      const filter = button.dataset.filter;
      
      // تصفية المشاريع
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function setupModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const projectButtons = document.querySelectorAll('.project-details-btn');
  
  // بيانات المشاريع
  const projectsData = {
    1: {
      title: "موقع الصحة النفسية",
      description: "منصة متكاملة للدعم النفسي والتوعية بالصحة العقلية تقدم موارد تعليمية وجلسات استشارية مع مختصين. تم تطوير الواجهة لتكون سهلة الاستخدام مع مراعاة خصوصية المستخدمين.",
      image: "https://i.postimg.cc/PJBLsxjq/Screenshot-com-android-chrome-Chrome-Tabbed-Activity-edit-1928197670304710.jpg",
      link: "https://mental-health-website-hsg.netlify.app/",
      tech: ["HTML5", "CSS3", "JavaScript", "React", "Firebase"]
    },
    2: {
      title: "أذكار الصباح والمساء",
      description: "تطبيق إلكتروني للأذكار اليومية مع مؤقت وتذكيرات. يحتوي على ميزة العد التلقائي وإشعارات لتذكير المستخدمين بالأذكار في أوقاتها المحددة.",
      image: "https://i.postimg.cc/Nfp8V8yJ/Screenshot-20250415-030906-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://azkar-sabah-and-almasa-hsg.netlify.app/",
      tech: ["PWA", "Service Workers", "Local Storage", "Notifications API"]
    },
    3: {
      title: "مسبحة الكترونية",
      description: "مسبحة رقمية بتصميم عصري وواجهة سهلة الاستخدام مع إمكانية تخصيص الأذكار وعد التسبيح تلقائيًا.",
      image: "https://i.postimg.cc/yNSFkwLt/Screenshot-20250415-030950-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://electronic-masbaha-hsg.netlify.app/",
      tech: ["JavaScript", "CSS3", "Local Storage"]
    },
    4: {
      title: "اكواد برمجية جاهزة",
      description: "منصة تعليم البرمجة وتطوير الويب للمبتدئين والمحترفين تحتوي على أمثلة عملية وأكواد جاهزة للاستخدام.",
      image: "https://i.postimg.cc/85QLWt35/Screenshot-20250415-031016-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://coding-max-hsg.netlify.app/",
      tech: ["Vue.js", "Firebase", "Markdown"]
    },
    5: {
      title: "مواقيت الصلاة في مصر",
      description: "خدمة دقيقة لمواقيت الصلاة حسب الموقع الجغرافي مع تنبيهات قبل الأذان وإمكانية تحديد الموقع يدويًا.",
      image: "https://i.postimg.cc/g2xhTCbj/Screenshot-20250415-031053-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://prayer-times-in-egypt-hsg.netlify.app/",
      tech: ["API", "Geolocation", "Notifications"]
    },
    6: {
      title: "مترجم HSG",
      description: "أداة ترجمة فورية متعددة اللغات بدقة عالية مع إمكانية حفظ تاريخ الترجمات والاستماع للنطق.",
      image: "https://i.postimg.cc/nrVjY51H/Screenshot-20250415-031120-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://hsg-translator.netlify.app/",
      tech: ["AI", "Translation API", "Speech Synthesis"]
    },
    7: {
      title: "موقع تحديد الطقس",
      description: "تطبيق متكامل للتنبؤات الجوية بخرائط تفاعلية وعرض مفصل لحالة الطقس لعدة أيام قادمة.",
      image: "https://i.postimg.cc/nzFc6m92/Screenshot-20250415-031148-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://hsg-weather.netlify.app/",
      tech: ["Weather API", "Chart.js", "Geolocation"]
    },
    8: {
      title: "نظام إشارات التداول المتقدم",
      description: "منصة احترافية لتحليل الأسواق المالية وإشارات التداول مع لوحة تحكم متكاملة وتنبيهات فورية.",
      image: "https://i.postimg.cc/mDm2RrQs/Screenshot-20250415-031221-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://advanced-trading-signals-ystem-hsg.netlify.app/",
      tech: ["Financial Data", "WebSockets", "Data Visualization"]
    },
    9: {
      title: "HSG Currency",
      description: "محول عملات متقدم مع تحديثات الأسعار في الوقت الحقيقي وإمكانية تتبع أسعار العملات المفضلة.",
      image: "https://i.postimg.cc/KjVGksqp/Screenshot-20250415-031304-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://hsg-currency.netlify.app/",
      tech: ["Exchange Rates API", "Real-time", "Local Storage"]
    },
    10: {
      title: "HSG Remove Background",
      description: "أداة متقدمة لإزالة خلفيات الصور بضغطة زر مع إمكانية التعديل على الصورة بعد إزالة الخلفية.",
      image: "https://i.postimg.cc/Xq3jwC4d/Screenshot-20250417-010017-com-android-chrome-Chrome-Tabbed-Activity.jpg",
      link: "https://hsg-remove-background.netlify.app/",
      tech: ["Image Processing", "AI", "Canvas API"]
    }
  };
  
  // فتح المودال
  projectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.dataset.project;
      const project = projectsData[projectId];
      
      if (project) {
        document.getElementById('modal-project-title').textContent = project.title;
        document.getElementById('modal-project-description').textContent = project.description;
        document.getElementById('modal-project-image').src = project.image;
        document.getElementById('modal-project-image').alt = project.title;
        document.getElementById('modal-project-link').href = project.link;
        
        const techContainer = document.getElementById('modal-project-tech');
        techContainer.innerHTML = '';
        
        project.tech.forEach(tech => {
          const span = document.createElement('span');
          span.textContent = tech;
          techContainer.appendChild(span);
        });
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // إغلاق المودال
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  });
  
  // إغلاق عند النقر خارج المحتوى
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
}

function setupCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.dataset.count;
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  };
  
  // بدء العد عند التمرير إلى القسم
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stats').forEach(stats => {
    observer.observe(stats);
  });
}

function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav a');
  
  // تهيئة القائمة للجوال
  const initMobileMenu = () => {
    if (window.innerWidth <= 768) {
      nav.style.transition = 'all 0.3s ease-out';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '100%';
      nav.style.right = '0';
      nav.style.background = 'rgba(10, 4, 26, 0.95)';
      nav.style.backdropFilter = 'blur(10px)';
      nav.style.borderRadius = '0 0 0 15px';
      nav.style.padding = '20px';
      nav.style.width = '70%';
      nav.style.maxWidth = '300px';
      nav.style.borderLeft = '1px solid rgba(110, 0, 255, 0.3)';
      nav.style.borderBottom = '1px solid rgba(110, 0, 255, 0.3)';
      nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
      nav.style.zIndex = '100';
      nav.style.display = 'none';
      nav.style.opacity = '0';
      nav.style.transform = 'translateY(-20px)';
      
      // تعديل تنسيق روابط القائمة للجوال
      navLinks.forEach(link => {
        link.style.padding = '12px 15px';
        link.style.display = 'block';
        link.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      });
    } else {
      // إعادة الضبط لشاشات الكمبيوتر
      nav.style = '';
      navLinks.forEach(link => {
        link.style = '';
      });
    }
  };
  
  // إظهار/إخفاء القائمة عند النقر على زر القائمة
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('show');
    menuToggle.classList.toggle('open');
    
    if (nav.classList.contains('show')) {
      nav.style.display = 'flex';
      setTimeout(() => {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
      }, 10);
    } else {
      nav.style.opacity = '0';
      nav.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        nav.style.display = 'none';
      }, 300);
    }
  });
  
  // إغلاق القائمة عند النقر على أي رابط (للجوال فقط)
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        nav.classList.remove('show');
        menuToggle.classList.remove('open');
        nav.style.opacity = '0';
        nav.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          nav.style.display = 'none';
        }, 300);
      }
    });
  });
  
  // التهيئة الأولية والاستجابة لتغيير حجم الشاشة
  initMobileMenu();
  window.addEventListener('resize', initMobileMenu);
}

function setupBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  // التحقق من وجود الزر
  if (!backToTopButton) return;
  
  // إظهار/إخفاء الزر حسب موضع التمرير
  const toggleBackToTop = () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
      backToTopButton.setAttribute('aria-hidden', 'false');
    } else {
      backToTopButton.classList.remove('show');
      backToTopButton.setAttribute('aria-hidden', 'true');
    }
  };
  
  // النقر على الزر للعودة للأعلى
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    backToTopButton.blur(); // إزالة التركيز بعد النقر
  });
  
  // المتابعة عند التمرير
  window.addEventListener('scroll', toggleBackToTop);
  
  // التهيئة الأولية
  toggleBackToTop();
}

function setupAdditionalEffects() {
  // تحديث سنة حقوق النشر
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // تأثيرات الضغط على الأزرار والروابط
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mousedown', () => {
      el.style.transform = 'scale(0.95)';
    });
    
    el.addEventListener('mouseup', () => {
      el.style.transform = '';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
  
  // تأثيرات الشعار
  const logo = document.querySelector('.logo');
  if (logo) {
    let rotation = 0;
    
    logo.addEventListener('mousemove', (e) => {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      rotation = Math.atan2(y, x) * (180 / Math.PI);
      logo.style.transform = `rotate(${rotation}deg)`;
    });
    
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = '';
    });
  }
  
  // تأثيرات الخلفية التفاعلية
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.setProperty('--mouse-x', x);
    document.body.style.setProperty('--mouse-y', y);
  });
}