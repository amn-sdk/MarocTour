import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import KenitraPageClient from './kenitra-client';

export const metadata: Metadata = {
  title: 'Kénitra - Ville et Culture | MarocTour',
  description:
    "Découvrez Kénitra, son histoire et ses points d'intérêt majeurs. Accédez aux informations clés et naviguez depuis la carte interactive.",
  keywords:
    'Kénitra, Kenitra, Maroc, Sebou, Mehdia, Histoire, Tourisme, Université',
};

export default function KenitraPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <KenitraPageClient />;
}


