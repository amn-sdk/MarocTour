import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import MeknesClient from './meknes-client';

export const metadata: Metadata = {
    title: 'Meknès - Cité Impériale | MarocTour',
    description: "Découvrez Meknès, ville impériale classée au patrimoine mondial de l'UNESCO. Explorez son histoire fascinante et testez vos connaissances sur la capitale historique du Maroc.",
    keywords: 'Meknès, Meknes, Fès-Meknès, Maroc, Histoire, Moulay Ismail, Bab Mansour, Volubilis, Patrimoine UNESCO, Tourisme',
};

export default function MeknesPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);

    return <MeknesClient />;
}
