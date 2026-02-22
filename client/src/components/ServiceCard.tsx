import type { Service } from "@/data/services";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const { t } = useTranslation();
  return (
    <div
      className="group relative bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 opacity-0 animate-fade-in-up overflow-visible"
      style={{
        animationDelay: `${0.1 + index * 0.15}s`,
        animationFillMode: "forwards",
      }}
      data-testid={`service-card-${service.id}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
        <i className={`${service.icon} text-2xl md:text-3xl text-white`}></i>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        {t(`services.${service.id.replace(/-/g, '_')}`)}
      </h3>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        {t(`services.${service.id.replace(/-/g, '_')}_desc`)}
      </p>

      <div className="bg-primary/5 rounded-xl p-4 md:p-5 mb-4 border border-primary/10">
        <h4 className="text-accent font-semibold mb-3 flex items-center gap-2">
          <i className="fas fa-star text-sm"></i>
          {t("services.features_title")}
        </h4>
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-foreground/80 text-sm md:text-base group/item"
            >
              <i className="fas fa-check-circle text-accent mt-1 group-hover/item:scale-110 transition-transform"></i>
              <span>{feature.key ? t(`services.${feature.key}`) : feature.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {service.portfolio && (
        <div className="mt-4">
          <h4 className="text-primary font-semibold mb-3">{service.portfolio.title}</h4>
          <ul className="space-y-1">
            {service.portfolio.items.map((item, idx) => (
              <li key={idx} className="text-muted-foreground text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.result && (
        <div className="mt-4 bg-primary/10 border-r-4 border-accent rounded-lg p-4">
          <p className="text-foreground font-medium">{service.result}</p>
        </div>
      )}

      {service.highlight && (
        <div className="mt-4 bg-gradient-to-l from-primary/10 to-accent/10 border-r-4 border-primary rounded-lg p-4">
          <p className="text-foreground font-medium">{service.highlight}</p>
        </div>
      )}
    </div>
  );
}
