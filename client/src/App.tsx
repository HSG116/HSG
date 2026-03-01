import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminPage from "@/pages/admin";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={Home} />
      <Route path="/services" component={Home} />
      <Route path="/projects" component={Home} />
      <Route path="/contact" component={Home} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
