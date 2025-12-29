import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2 mb-6">
          <MapPin className="h-6 w-6 text-morocco-red" />
          <span className="text-xl font-bold">MarocTour</span>
        </Link>

        {/* Slogan */}
        <h2 className="text-lg md:text-xl font-medium text-muted-foreground mb-12">
          Explorer le Maroc, comme jamais auparavant.
        </h2>

        {/* Copyright */}
        <div className="pt-8 border-t w-full max-w-xs md:max-w-md text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} MarocTour. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
