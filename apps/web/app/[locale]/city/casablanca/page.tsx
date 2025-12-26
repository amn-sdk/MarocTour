import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities } from '@/data/cities';

export const metadata: Metadata = {
    title: 'Casablanca - MarocTour',
    description: 'Découvrez Casablanca, la capitale économique du Maroc',
};

export default function CasablancaPage() {
    const city = cities.find((c) => c.slug === 'casablanca');

    if (!city) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen pt-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">{city.name}</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    {city.description}
                </p>
                <div className="p-4 bg-muted rounded-lg">
                    <p>Page en construction...</p>
                </div>
            </div>
        </div>
    );
}
