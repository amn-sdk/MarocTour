import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import NadorPageClient from './nador-client';

// Génération des métadonnées
export const metadata: Metadata = {
  title: 'Nador - Histoire et Culture | MarocTour',
  description: 'Découvrez l\'histoire fascinante de Nador, de l\'Antiquité à nos jours. Testez vos connaissances avec notre quiz interactif sur cette perle du Rif Oriental.',
  keywords: 'Nador, Maroc, Rif, Histoire, Quiz, Tourisme, Méditerranée, Marchica',
  openGraph: {
    title: 'Nador - Perle du Rif Oriental',
    description: 'Explorez l\'histoire millénaire de Nador et testez vos connaissances',
    images: ['/images/cities/nador/hero.webp'],
  }
};

export default function NadorPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  
  return <NadorPageClient />;
}
