import { SERVICES } from "@/data/services";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "react-i18next";

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="py-20 md:py-28 relative"
      data-testid="services-section"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400 mb-6 pb-2 inline-block opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}>
            <i className="fas fa-cogs ml-2 text-blue-400"></i>
            {t("services.title")}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6 rounded-full opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }} />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg opacity-0 animate-fade-in-up font-light leading-relaxed" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
