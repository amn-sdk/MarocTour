import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CasablancaPageClient from './casablanca-client';

// Génération des métadonnées
export const metadata: Metadata = {
  title: 'Casablanca - Histoire et Culture | MarocTour',
  description: 'Découvrez l\'histoire fascinante de Casablanca, capitale économique du Maroc. De la médina historique à la modernité, explorez cette métropole cosmopolite.',
  keywords: 'Casablanca, Maroc, Mosquée Hassan II, Histoire, Quiz, Tourisme, Économie, Corniche',
  openGraph: {
    title: 'Casablanca - Capitale Économique du Maroc',
    description: 'Explorez l\'histoire et la modernité de Casablanca, de la médina aux gratte-ciels',
    images: ['/images/cities/casablanca.jpg'],
  }
};

export default function CasablancaPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  
  return <CasablancaPageClient />;
}

