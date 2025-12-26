import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Route, Brain, Phone } from 'lucide-react';
import { TopScores } from '@/components/quiz/top-scores';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('home');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/marocpageaccueil.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="bg-morocco-red hover:bg-morocco-red/90">
              <Link href="/map">
                <MapPin className="mr-2 h-5 w-5" />
                {t('hero.exploreMap')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm">
              <Link href="/itineraries">
                <Route className="mr-2 h-5 w-5" />
                {t('hero.itineraries')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t('features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<MapPin className="h-12 w-12 text-morocco-red" />}
            title={t('features.map.title')}
            description={t('features.map.description')}
            href="/map"
          />
          <FeatureCard
            icon={<Route className="h-12 w-12 text-morocco-green" />}
            title={t('features.itineraries.title')}
            description={t('features.itineraries.description')}
            href="/itineraries"
          />
          <FeatureCard
            icon={<Brain className="h-12 w-12 text-morocco-gold" />}
            title={t('features.quiz.title')}
            description={t('features.quiz.description')}
            href="/quiz"
          />
          <FeatureCard
            icon={<Phone className="h-12 w-12 text-primary" />}
            title={t('features.contact.title')}
            description={t('features.contact.description')}
            href="/contact"
          />
        </div>
      </section>

      {/* Top Scores Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {t('topScores.title')}
          </h2>
          <TopScores limit={10} />
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/quiz">
                {t('topScores.participate')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-morocco-red to-morocco-green py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <Button asChild size="lg" className="bg-white text-morocco-red hover:bg-white/90">
            <Link href="/map">
              {t('cta.button')}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:-translate-y-1 h-full">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

