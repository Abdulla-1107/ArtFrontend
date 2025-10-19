import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Newsletter } from '@/components/home/Newsletter';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Newsletter />
      <footer className="bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-heading font-bold text-gradient mb-4">Bibisora</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.gallery')}
                </Link>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.blog')}
                </Link>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.faq')}
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </nav>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4">{t('footer.followMe')}</h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="mailto:bibisora@example.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-start md:items-end">
              <p className="text-sm text-muted-foreground mb-2">
                © {currentYear} Bibisora
              </p>
              <p className="text-sm text-muted-foreground">{t('footer.rights')}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
