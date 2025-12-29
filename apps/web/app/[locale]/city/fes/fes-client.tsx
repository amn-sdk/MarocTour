'use client';

import { useState, useEffect } from 'react';
import { Quiz } from '@/components/quiz/quiz';
import { QuizLeaderboard } from '@/components/quiz/quiz-leaderboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Users, Building2, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface QuizScore {
    id: string;
    playerName: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    completedAt: string;
    city: string;
    timeSpent: number;
}

async function getFesData() {
    try {
        const response = await fetch('/api/cities/fes', {
            cache: 'force-cache'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Fès data');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching Fès data:', error);
        return null;
    }
}

export default function FesPageClient() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentScore, setCurrentScore] = useState<QuizScore | null>(null);

    useEffect(() => {
        getFesData().then((result) => {
            setData(result);
            setLoading(false);
        });
    }, []);

    const handleQuizComplete = async (score: number, totalQuestions: number, timeSpent: number, playerName: string) => {
        const percentage = Math.round((score / totalQuestions) * 100);
        const newScore: QuizScore = {
            id: Date.now().toString(),
            playerName: playerName,
            score,
            totalQuestions,
            percentage,
            completedAt: new Date().toISOString(),
            city: 'Fès',
            timeSpent
        };

        setCurrentScore(newScore);

        // Submit to backend
        try {
            // 1. Get City ID
            const cityRes = await fetch('http://localhost:8000/api/v1/cities/slug/fes');
            if (!cityRes.ok) throw new Error('Failed to fetch city ID');
            const cityData = await cityRes.json();

            // 2. Submit Attempt
            const attemptRes = await fetch('http://localhost:8000/api/v1/quiz/attempt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    city_id: cityData.id,
                    player_name: playerName,
                    answers: [],
                    score: percentage
                })
            });

            if (!attemptRes.ok) {
                console.error('Failed to submit score to backend');
            } else {
                console.log('Score submitted successfully!');
            }
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-muted-foreground italic">Exploration de la capitale spirituelle...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Oups ! Fès est un peu timide...</h1>
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
                    {/* Image de gauche - Médina de Fès avec fallback gradient */}
                    <div
                        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700"
                        style={{
                            backgroundImage: 'url(/images/cities/fes/medina.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />

                    {/* Image de droite - Tanneries avec fallback gradient */}
                    <div
                        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-red-900 via-red-800 to-amber-900"
                        style={{
                            backgroundImage: 'url(/images/cities/fes/tanneries.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />

                    {/* Overlay léger pour la lisibilité du texte */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/10 to-black/15" />
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
                            <span>Région Fès-Meknès</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                            <Users className="h-5 w-5 text-green-400" />
                            <span>1.15 Millions d&apos;habitants</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                            <BookOpen className="h-5 w-5 text-yellow-400" />
                            <span>Capitale Spirituelle</span>
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
                        <a href="#classement" className="text-primary/80 hover:text-primary font-medium whitespace-nowrap transition-colors flex items-center gap-2">
                            🏆 Classement
                        </a>
                    </div>
                </div>
            </nav>

            {/* Section Présentation Rapide */}
            <section id="presentation" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-8">La Capitale Spirituelle</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Fès est la capitale spirituelle et culturelle du Maroc, une ville qui incarne plus de douze siècles d&apos;histoire et de tradition.
                        Fondée en 789 par Idris Ier, elle abrite la médina la plus ancienne et la mieux préservée du monde arabe,
                        classée au patrimoine mondial de l&apos;UNESCO depuis 1981.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                        Avec une population de plus d&apos;un million d&apos;habitants, Fès est un centre majeur de l&apos;artisanat traditionnel,
                        de l&apos;éducation et de la culture islamique. La ville se distingue par son architecture andalouse,
                        ses médersas historiques, et ses souks animés où se perpétuent des métiers ancestraux.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                        Fès est également le berceau de l&apos;Université Al Quaraouiyine, fondée en 859, considérée comme la plus ancienne
                        université du monde encore en activité. Cette institution millénaire a façonné l&apos;identité intellectuelle
                        et spirituelle de la ville.
                    </p>
                </div>
            </section>

            {/* Section Histoire */}
            <section id="histoire" className="py-20 relative overflow-hidden">
                {/* Background vintage pour l'ambiance avec fallback gradient */}
                <div
                    className="absolute inset-0 opacity-5 z-0 pointer-events-none bg-gradient-to-br from-amber-100 via-blue-50 to-red-100"
                    style={{
                        backgroundImage: 'url(/images/cities/fes/history_foundation.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Une Histoire Millénaire</h2>
                        <p className="text-xl text-muted-foreground">
                            De la fondation idrisside à la capitale spirituelle du Maroc
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-4 text-sm font-medium text-primary">
                            <Clock className="h-4 w-4" />
                            <span>Voyage à travers le temps</span>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {data.history.map((period: any, index: number) => (
                            <div key={period.id} className="relative pl-8 md:pl-0">
                                {/* Ligne de temps verticale */}
                                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

                                <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Date / Période (côté opposé) */}
                                    <div className="hidden md:block w-5/12 text-right" />

                                    {/* Marqueur central */}
                                    <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary z-10 -translate-x-1/2 flex items-center justify-center shadow-lg">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    </div>

                                    {/* Contenu */}
                                    <div className="w-full md:w-5/12 bg-card rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                                                {index + 1}
                                            </span>
                                            {period.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm">
                                            {period.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Quiz */}
            <section id="quiz" className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Testez vos Connaissances</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Maintenant que vous avez découvert l&apos;histoire de Fès,
                            évaluez vos connaissances avec notre quiz interactif de 10 questions.
                        </p>
                    </div>

                    <Quiz
                        questions={data.quiz}
                        title="Quiz Histoire de Fès"
                        onQuizComplete={handleQuizComplete}
                    />
                </div>
            </section>

            {/* Section Classement */}
            <section id="classement" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <QuizLeaderboard
                        currentScore={currentScore || undefined}
                        city="Fès"
                        storageKey="quiz-scores-fes"
                    />
                </div>
            </section>
        </div>
    );
}
