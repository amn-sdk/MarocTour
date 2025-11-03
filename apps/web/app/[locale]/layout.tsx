import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Amiri } from 'next/font/google';
import { locales, type Locale } from '@/i18n';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const amiri = Amiri({ 
  weight: ['400', '700'], 
  subsets: ['arabic'], 
  variable: '--font-amiri' 
});

// Les metadata sont gérées au niveau du layout racine
export const metadata: Metadata = {};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Indiquer à Next/next-intl la locale courante pour permettre un rendu statique
  setRequestLocale(locale as Locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </Providers>
    </NextIntlClientProvider>
  );
}

