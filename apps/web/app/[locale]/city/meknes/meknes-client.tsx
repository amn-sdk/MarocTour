'use client';

import { useState, useEffect } from 'react';
import { Quiz } from '@/components/quiz/quiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Users, Building2, Crown, Landmark, Palmtree } from 'lucide-react';
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

async function getMeknesData() {
    try {
        const response = await fetch('/api/cities/meknes', {
            cache: 'force-cache'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Meknès data');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching Meknès data:', error);
        return null;
    }
}

export default function MeknesClient() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentScore, setCurrentScore] = useState<QuizScore | null>(null);

    useEffect(() => {
        getMeknesData().then((result) => {
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
            city: 'Meknès',
            timeSpent
        };

        setCurrentScore(newScore);

        // Submit to backend
        try {
            // 1. Get City ID
            const cityRes = await fetch('http://localhost:8000/api/v1/cities/slug/meknes');
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
                    <p className="text-muted-foreground italic">Découverte de la cité impériale...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Impossible de charger les données de Meknès</h1>
                    <p className="text-muted-foreground mb-6">Une erreur s'est produite</p>
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
            {/* Hero Section - Structure identique à Casablanca */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Image de gauche - Bab Mansour */}
                    <div
                        className="absolute top-0 left-0 w-1/2 h-full"
                        style={{
                            backgroundImage: 'url(/images/cities/meknes/bab_mansour.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />

                    {/* Image de droite - Mausolée Moulay Ismail */}
                    <div
                        className="absolute top-0 right-0 w-1/2 h-full"
                        style={{
                            backgroundImage: 'url(/images/cities/meknes/mausoleum.png)',
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
                        Meknès
                    </h1>
                    <p className="text-xl md:text-3xl mb-8 drop-shadow-xl font-light">
                        Le Versailles Marocain
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center text-sm font-medium">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                            <MapPin className="h-5 w-5 text-blue-400" />
                            <span>Région Fès-Meknès</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                            <Users className="h-5 w-5 text-green-400" />
                            <span>632 000 habitants</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                            <Building2 className="h-5 w-5 text-yellow-400" />
                            <span>Patrimoine UNESCO</span>
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

            {/* Presentation Section - Contenu enrichi */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        La Cité Impériale de Moulay Ismail
                    </h2>

                    <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
                        <p>
                            Fondée au <strong>XIe siècle</strong> par les Almoravides sur le site antique de la tribu berbère
                            des <strong>Meknassa</strong>, Meknès connaît son apogée extraordinaire sous le règne du sultan
                            <strong> Moulay Ismail (1672-1727)</strong>. Ce souverain visionnaire transforme une modeste cité
                            en capitale impériale rivale des plus grandes cours européennes.
                        </p>

                        <p>
                            Sous l'impulsion de Moulay Ismail, Meknès devient le <em>"Versailles marocain"</em>, ornée de
                            <strong> 25 kilomètres de remparts</strong>, de palais somptueux et de jardins luxuriants.
                            Le sultan y fait construire plus de 50 palais et édifices monumentaux, employant des dizaines de
                            milliers d'artisans et de prisonniers de guerre européens pour ériger sa cité de rêve.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-6">
                            <h3 className="text-xl font-semibold mb-3 text-foreground">
                                <Crown className="inline h-6 w-6 text-amber-600 mr-2" />
                                Les Monuments Emblématiques
                            </h3>
                            <ul className="space-y-2 text-foreground">
                                <li><strong>Bab Mansour el-Aleuj</strong> - La plus belle porte d'Afrique du Nord, achevée en 1732</li>
                                <li><strong>Mausolée de Moulay Ismail</strong> - Sanctuaire majestueux aux colonnes de marbre</li>
                                <li><strong>Heri es-Souani</strong> - Greniers et écuries royales pour 12 000 chevaux</li>
                                <li><strong>Bassin de l'Agdal</strong> - Immense réservoir d'eau de 4 hectares</li>
                            </ul>
                        </div>

                        <p>
                            La médina historique de Meknès, <strong>classée au patrimoine mondial de l'UNESCO depuis 1996</strong>,
                            témoigne de l'architecture hispano-mauresque exceptionnelle et du raffinement artistique de l'époque
                            alaouite. Ses souks animés, ses medersas ornées de zelliges et ses palais cachés révèlent un patrimoine
                            culturel d'une richesse inestimable.
                        </p>

                        <p>
                            <Palmtree className="inline h-5 w-5 mr-1" />
                            À seulement 30 kilomètres se trouvent les <strong>ruines romaines de Volubilis</strong>, ancienne capitale
                            de la Maurétanie Tingitane, offrant un témoignage unique de 2000 ans d'histoire au cœur du Maroc.
                        </p>
                    </div>
                </div>
            </section>

            {/* History Section - Timeline enrichie */}
            <section className="py-20 bg-muted/30 relative overflow-hidden">
                {/* Background image with subtle opacity */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'url(/images/cities/meknes/history_imperial.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="flex items-center gap-3 mb-12 justify-center">
                        <Landmark className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold text-center">
                            Histoire Millénaire de Meknès
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {/* Timeline Item 1 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-right">
                                <span className="text-2xl font-bold text-primary">XIe</span>
                                <p className="text-sm text-muted-foreground">siècle</p>
                            </div>
                            <div className="flex-1 border-l-4 border-primary pl-6 pb-8">
                                <h3 className="text-xl font-semibold mb-2">Fondation par les Almoravides</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    La ville est fondée par la tribu berbère des <strong>Meknassa</strong> au XIe siècle sous
                                    la dynastie almoravide. Située dans la fertile plaine du Saïss, la cité se développe
                                    rapidement comme centre de commerce agricole, réputée pour ses olives, ses céréales
                                    et son élevage de chevaux.
                                </p>
                            </div>
                        </div>

                        {/* Timeline Item 2 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-right">
                                <span className="text-2xl font-bold text-primary">1672</span>
                                <p className="text-sm text-muted-foreground">-1727</p>
                            </div>
                            <div className="flex-1 border-l-4 border-yellow-500 pl-6 pb-8">
                                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                    <Crown className="h-5 w-5 text-yellow-500" />
                                    L'Âge d'Or sous Moulay Ismail
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    Le sultan <strong>Moulay Ismail</strong> choisit Meknès comme capitale de son empire et
                                    entreprend une transformation spectaculaire. En 55 ans de règne, il fait construire
                                    plus de <strong>50 palais</strong>, des mosquées grandioses, et entoure la ville de
                                    <strong> 25 kilomètres de rempart</strong>s fortifiés.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    La construction de <strong>Bab Mansour el-Aleuj</strong>, achevée en 1732, symbolise
                                    la puissance impériale. Cette porte monumentale de 16 mètres de haut, ornée de colonnes
                                    de marbre vert et de zelliges somptueux, reste la plus belle du Maghreb.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Le sultan fait également édifier son <strong>mausolée</strong>, chef-d'œuvre de
                                    l'architecture alaouite avec ses colonnes de marbre, ses plafonds en cèdre sculpté
                                    et ses fontaines de zellige. C'est le seul monument religieux du Maroc accessible
                                    aux non-musulmans.
                                </p>
                            </div>
                        </div>

                        {/* Timeline Item 3 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-right">
                                <span className="text-2xl font-bold text-primary">1755</span>
                            </div>
                            <div className="flex-1 border-l-4 border-red-500 pl-6 pb-8">
                                <h3 className="text-xl font-semibold mb-2">Le Séisme dévastateur</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Le <strong>tremblement de terre de Lisbonne de 1755</strong> cause des dégâts importants
                                    à Meknès, détruisant de nombreux palais et édifices impériaux. Cet événement marque
                                    symboliquement la fin de la splendeur absolue de la cité.
                                </p>
                            </div>
                        </div>

                        {/* Timeline Item 4 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-right">
                                <span className="text-2xl font-bold text-primary">XVIIIe</span>
                                <p className="text-sm text-muted-foreground">-XIXe</p>
                            </div>
                            <div className="flex-1 border-l-4 border-orange-500 pl-6 pb-8">
                                <h3 className="text-xl font-semibold mb-2">Déclin politique et essor économique</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Après la mort de Moulay Ismail, ses successeurs déplacent la capitale à Marrakech puis Fès.
                                    Meknès perd son statut politique mais conserve son importance économique grâce à son
                                    agriculture prospère (vignobles, oliviers, céréales) et ses célèbres sanctuaires religieux
                                    qui attirent pèlerins et commerçants.
                                </p>
                            </div>
                        </div>

                        {/* Timeline Item 5 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-right">
                                <span className="text-2xl font-bold text-primary">1996</span>
                            </div>
                            <div className="flex-1 border-l-4 border-green-500 pl-6">
                                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-green-500" />
                                    Reconnaissance UNESCO
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    La <strong>médina historique de Meknès</strong> est inscrite au patrimoine mondial de l'UNESCO,
                                    reconnaissant son architecture hispano-mauresque exceptionnelle, ses monuments impériaux
                                    uniques et son témoignage de l'apogée de la dynastie alaouite.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Aujourd'hui, Meknès attire des visiteurs du monde entier, séduits par son authenticité
                                    préservée, son artisanat traditionnel (dinanderie, tapis, poterie) et sa proximité avec
                                    les sites archéologiques de Volubilis et Moulay Idriss Zerhoun.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quiz Section */}
            {data.quiz && data.quiz.length > 0 && (
                <section id="quiz" className="py-20 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                            <Crown className="inline h-10 w-10 text-yellow-500 mr-3" />
                            Quiz sur Meknès
                        </h2>
                        <Quiz
                            questions={data.quiz}
                            onQuizComplete={handleQuizComplete}
                        />
                    </div>
                </section>
            )}
        </div>
    );
}
