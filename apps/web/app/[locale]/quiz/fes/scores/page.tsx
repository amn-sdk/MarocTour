import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import FesScoresClient from './scores-client';

export const metadata: Metadata = {
  title: 'Top Scores - Quiz Fès | MarocTour',
  description: 'Classement des meilleurs scores pour le quiz de Fès',
};

export default function FesScoresPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <FesScoresClient />;
}

