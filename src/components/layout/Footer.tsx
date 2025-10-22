import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Newsletter } from "@/components/home/Newsletter";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Newsletter />

      <footer className="relative bg-gradient-to-b from-background to-muted/40 border-t border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* --- BRAND --- */}
            <div>
              <h3 className="text-2xl font-heading font-bold text-gradient mb-4">
                Bibisora
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("footer.description")}
              </p>
            </div>

            {/* --- QUICK LINKS --- */}
            <div>
              <h4 className="font-heading font-semibold mb-4">
                {t("footer.quickLinks")}
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  to="/gallery"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.gallery")}
                </Link>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.about")}
                </Link>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.blog")}
                </Link>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.faq")}
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </nav>
            </div>

            {/* --- SOCIAL LINKS --- */}
            <div>
              <h4 className="font-heading font-semibold mb-4">
                {t("footer.followMe")}
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="mailto:bibisora@example.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* --- COPYRIGHT --- */}
            <div className="flex flex-col items-start md:items-end">
              <p className="text-sm text-muted-foreground mb-2">
                © {currentYear} Bibisora
              </p>
              <p className="text-sm text-muted-foreground">
                {t("footer.rights")}
              </p>
            </div>
          </div>

          {/* --- LOGO (bottom-right) --- */}
          <div className="absolute bottom-6 right-6">
            <Link to="/" className="block group">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border shadow-md bg-card group-hover:shadow-lg transition-all duration-300">
                <img
                  src="/logo.jpg"
                  alt="Bibisora Logo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Subtle glowing ring on hover */}
                <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
