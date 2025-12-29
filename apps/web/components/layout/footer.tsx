import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-morocco-red" />
              <span className="text-xl font-bold">MarocTour</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('explore.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/map" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('explore.map')}
                </Link>
              </li>
              <li>
                <Link href="/itineraries" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('explore.itineraries')}
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('explore.quiz')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{t('legal.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('legal.terms')}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('legal.cookies')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} MarocTour. {t('rights')}
            </p>
          </div>
        </div>
    </footer>
  );
}

