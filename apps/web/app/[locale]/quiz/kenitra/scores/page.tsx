import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import KenitraScoresClient from './scores-client';

export const metadata: Metadata = {
  title: 'Top Scores - Quiz Kénitra | MarocTour',
  description: 'Classement des meilleurs scores pour le quiz de Kénitra',
};

export default function KenitraScoresPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <KenitraScoresClient />;
}


