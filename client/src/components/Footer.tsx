import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Lock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer
      className="py-8 bg-gradient-to-t from-black to-black/80 backdrop-blur-xl relative z-50 mt-[-20px]"
      data-testid="footer"
    >
      {/* Glow Line at Top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-foreground font-bold text-lg">HSG</span>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {t("footer.text", { year: currentYear })}
            </p>
            {/* Admin Login Button */}
            <Link href="/admin" className="text-muted-foreground/50 hover:text-primary transition-colors flex items-center gap-1 group">
              <Lock className="w-3 h-3 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
