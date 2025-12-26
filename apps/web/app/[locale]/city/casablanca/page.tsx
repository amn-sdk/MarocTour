import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CasablancaClient from './casablanca-client';

export const metadata: Metadata = {
    title: 'Casablanca - Histoire et Modernité | MarocTour',
    description: 'Explorez Casablanca, métropole cosmopolite fusionnant architecture Art Déco et patrimoine millénaire. Découvrez son histoire et testez vos connaissances sur la ville blanche.',
    keywords: 'Casablanca, Casablanca-Settat, Maroc, Histoire, Art Déco, Mosquée Hassan II, Tourisme, Économie',
};

export default function CasablancaPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);

    return <CasablancaClient />;
}
