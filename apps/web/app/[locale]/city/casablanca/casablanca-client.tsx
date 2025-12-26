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
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Image de gauche - Mosquée Hassan II */}
                    <div
                        className="absolute top-0 left-0 w-1/2 h-full"
                        style={{
                            backgroundImage: 'url(/images/cities/casablanca/hero.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />

                    {/* Image de droite - Centre Ville Art Déco */}
                    <div
                        className="absolute top-0 right-0 w-1/2 h-full"
                        style={{
                            backgroundImage: 'url(/images/cities/casablanca/art_deco.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />

                    {/* Overlay sombre pour la lisibilité du texte */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-2xl tracking-tight">
                        {data.hero.title}
                    </h1>
                    <p className="text-xl md:text-3xl mb-8 drop-shadow-xl font-light">
                        {data.hero.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center text-sm font-medium">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                            <MapPin className="h-5 w-5 text-blue-400" />
                            <span>Région Casablanca-Settat</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                            <Users className="h-5 w-5 text-green-400" />
                            <span>3.36 Millions d'habitants</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                            <Building2 className="h-5 w-5 text-yellow-400" />
                            <span>Capitale Économique</span>
                        </div>
                    </div>
                </div>

                {/* Navigation retour */}
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/map">
                        <Button variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour à la carte
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Navigation interne */}
            <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex gap-8 py-4 overflow-x-auto justify-center">
                        <a href="#presentation" className="text-primary/80 hover:text-primary font-medium whitespace-nowrap transition-colors flex items-center gap-2">
                            <Building2 className="h-4 w-4" /> Présentation
                        </a>
                        <a href="#histoire" className="text-primary/80 hover:text-primary font-medium whitespace-nowrap transition-colors flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Histoire
                        </a>
                        <a href="#quiz" className="text-primary/80 hover:text-primary font-medium whitespace-nowrap transition-colors flex items-center gap-2">
                            🧠 Quiz
                        </a>
                    </div>
                </div>
            </nav>

            {/* Section Présentation Rapide */}
            <section id="presentation" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-8">La Ville Blanche</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Casablanca est bien plus qu'une simple capitale économique. C'est un laboratoire d'architecture à ciel ouvert,
                        où les immeubles Art Déco des années 30 côtoient les gratte-ciels modernes de Casa Anfa.
                        Ville effervescente, elle incarne le Maroc moderne, tourné vers l'avenir tout en restant fier de son héritage.
                    </p>
                </div>
            </section>
        </div>
    );
}
