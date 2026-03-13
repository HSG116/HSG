import { useEffect } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminPage from "@/pages/admin";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import i18n from "@/lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={Home} />
      <Route path="/services" component={Home} />
      <Route path="/projects" component={Home} />
      <Route path="/contact" component={Home} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}


function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Check for saved language preference on initial mount
    const savedLng = localStorage.getItem('i18nextLng');
    if (savedLng && (savedLng === 'ar' || savedLng === 'en') && i18n.language !== savedLng) {
      i18n.changeLanguage(savedLng);
    }
  }, []);

  useEffect(() => {
    // Restore proper RTL support based on the user's latest clarification
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
    
    // Save language preference whenever it changes
    localStorage.setItem('i18nextLng', i18n.language);

    // Apply the premium Arabic font
    if (i18n.language === "ar") {
      document.body.classList.add("arabic-font");
    } else {
      document.body.classList.remove("arabic-font");
    }
  }, [i18n.language]);

  return <>{children}</>;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageWrapper>
            <Toaster />
            <Router />
          </LanguageWrapper>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
