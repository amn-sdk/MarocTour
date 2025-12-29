import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { MapFixed } from '@/components/map/map-fixed';
import { cities } from '@/data/cities';

export const metadata = {
  title: 'Carte Interactive - MarocTour',
  description: 'Explorez les principales villes du Maroc sur une carte interactive',
};

export default function MapPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('map');

  // Filter cities to only show those with dedicated pages
  const activeCities = cities.filter(city =>
    ['fes', 'nador', 'meknes', 'casablanca', 'kenitra'].includes(city.slug)
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="rounded-lg overflow-hidden border shadow-lg">
        <MapFixed cities={activeCities} />
      </div>

      {/* Cities List (Alternative for accessibility) */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('citiesList')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCities.map((city) => (
            <a
              key={city.id}
              href={`/city/${city.slug}`}
              className="p-4 rounded-lg border hover:shadow-md transition-all hover:border-primary"
            >
              <h3 className="font-semibold text-lg mb-1">{city.name}</h3>
              <p className="text-sm text-muted-foreground">{city.region}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Population: {city.population?.toLocaleString()}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

