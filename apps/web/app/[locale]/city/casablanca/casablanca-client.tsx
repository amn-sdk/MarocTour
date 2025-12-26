'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Users, Building2 } from 'lucide-react';
import Link from 'next/link';

async function getCasablancaData() {
    try {
        const response = await fetch('/api/cities/casablanca', {
            cache: 'force-cache'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Casablanca data');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching Casablanca data:', error);
        return null;
    }
}

export default function CasablancaClient() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCasablancaData().then((result) => {
            setData(result);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-muted-foreground italic">Exploration de la ville blanche...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Oups ! Casablanca est un peu timide...</h1>
                    <p className="text-muted-foreground mb-6">Impossible de charger les données pour le moment.</p>
                    <Link href="/map">
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour à la carte
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation retour */}
            <div className="absolute top-6 left-6 z-20">
                <Link href="/map">
                    <Button variant="secondary" className="bg-background/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour à la carte
                    </Button>
                </Link>
            </div>

            {/* Squelette de la page - Contenu à implémenter dans les prochains commits */}
            <div className="py-20 text-center">
                <h1 className="text-6xl font-black mb-4 tracking-tighter text-foreground">
                    {data.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">
                    {data.hero.subtitle}
                </p>
            </div>
        </div>
    );
}
