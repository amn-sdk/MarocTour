import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import KenitraQuizClient from './kenitra-client';

export const metadata: Metadata = {
  title: 'Quiz Kénitra | MarocTour',
  description: 'Testez vos connaissances sur Kénitra: Sebou, Mehdia, Mamora…',
};

export default function KenitraQuizPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <KenitraQuizClient />;
}


