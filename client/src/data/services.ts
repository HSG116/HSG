export interface Service {
  id: string;
  animationType: 'workflow' | 'terminal' | 'calendar';
}

export const SERVICES: Service[] = [
  {
    id: "workflows",
    animationType: "workflow"
  },
  {
    id: "data_processing",
    animationType: "terminal"
  },
  {
    id: "integration",
    animationType: "calendar"
  }
];

export const NAV_LINKS = [
  { href: "#home", label: "Home", icon: "fas fa-home", key: "home" },
  { href: "#services", label: "Services", icon: "fas fa-cogs", key: "services" },
  { href: "#projects", label: "Projects", icon: "fas fa-laptop-code", key: "projects" },
  { href: "#about", label: "About", icon: "fas fa-info-circle", key: "about" },
  { href: "#contact", label: "Contact", icon: "fas fa-paper-plane", key: "contact" },
];
