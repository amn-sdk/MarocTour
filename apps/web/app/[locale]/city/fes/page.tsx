import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FesPageClient from './fes-client';

export const metadata: Metadata = {
  title: 'Fès - Capitale Spirituelle et Culturelle | MarocTour',
  description:
    "Découvrez Fès, la capitale spirituelle et culturelle du Maroc. Explorez la médina millénaire, l'Université Al Quaraouiyine et les tanneries traditionnelles.",
  keywords:
    'Fès, Fez, Maroc, Médina, Al Quaraouiyine, Tanneries, Histoire, Culture, Tourisme, Fès-Meknès',
  openGraph: {
    title: 'Fès - Capitale Spirituelle du Maroc',
    description: 'Explorez la médina millénaire de Fès et son patrimoine culturel exceptionnel',
    images: ['/images/cities/fes.jpg'],
  }
};

export default function FesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <FesPageClient />;
}

