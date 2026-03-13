import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Lock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer
      className="py-12 relative z-50"
      data-testid="footer"
    >

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-foreground font-bold text-xl tracking-tight">HSG Studio</span>
            <p className="text-muted-foreground text-sm max-w-xs text-center md:text-start">
              201 Lormont BLVD, Stoney Creek ON. Canada<br />
              Postal Code: L8J 0K1
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-end">
            <div className="flex flex-col gap-1">
              <a href="https://wa.me/14167377776" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                +1 (416) 737-7776
              </a>
              <p className="text-muted-foreground text-sm">
                {t("footer.text", { year: currentYear })}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Admin Login Button */}
              <Link href="/admin" className="text-muted-foreground/30 hover:text-primary transition-colors flex items-center gap-1 group">
                <Lock className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
