import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MarocTour - Découvrez le Maroc',
  description: 'Explorez les villes, itinéraires et culture du Maroc',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}


