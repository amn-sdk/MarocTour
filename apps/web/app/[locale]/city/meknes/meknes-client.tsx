'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Users, Building2, Crown, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function MeknesClient() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

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

    return (
        <div className="min-h-screen bg-background">
            {/* Header Navigation */}
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/map">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Retour à la carte
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%)',
                    }}
                />

                <div className="absolute inset-0 bg-black/40 z-0" />

                <div className="relative z-10 text-center text-white px-4 max-w-5xl">
                    <div className="mb-4 flex justify-center">
                        <Crown className="h-16 w-16 text-yellow-400 animate-pulse" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl tracking-tight">
                        Meknès
                    </h1>

                    <p className="text-2xl md:text-4xl mb-4 drop-shadow-xl font-light italic">
                        La Cité Impériale de Moulay Ismail
                    </p>

                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                        Dernière ville impériale fondée au Maroc, Meknès brille par son patrimoine architectural
                        exceptionnel et son histoire fascinante sous le règne du sultan Moulay Ismail.
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
            </section>

            {/* Presentation Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        Perle de l'Empire Chérifien
                    </h2>

                    <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
                        <p>
                            Fondée au <strong>XIe siècle</strong> par les Almoravides, Meknès connaît son apogée sous le règne du sultan
                            <strong> Moulay Ismail (1672-1727)</strong>, qui en fait sa capitale impériale. La ville devient alors
                            un centre politique et culturel majeur du Maghreb.
                        </p>

                        <p>
                            Surnommée le <em>"Versailles marocain"</em>, Meknès impressionne par ses monumentales portes fortifiées,
                            ses palais somptueux et ses jardins luxuriants. La <strong>Bab Mansour</strong>, considérée comme la
                            plus belle porte d'Afrique du Nord, symbolise la grandeur de cette époque dorée.
                        </p>

                        <p>
                            Classée au <strong>patrimoine mondial de l'UNESCO depuis 1996</strong>, la médina de Meknès témoigne
                            de l'architecture hispano-mauresque exceptionnelle et du rayonnement culturel de la dynastie alaouite.
                            À proximité se trouvent les ruines romaines de <strong>Volubilis</strong>, ancienne capitale de la
                            Maurétanie Tingitane.
                        </p>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex items-center gap-3 mb-12 justify-center">
                        <Landmark className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold text-center">
                            Histoire de Meknès
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
                                    Meknès est fondée par la tribu berbère des Meknassa au XIe siècle. La ville se développe
                                    progressivement comme centre commercial et agricole dans la fertile plaine du Saïss.
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
                                    Le sultan Moulay Ismail choisit Meknès comme capitale de son empire. Il transforme la ville
                                    en une cité grandiose rivale de Versailles, avec des palais somptueux, des jardins luxuriants
                                    et des fortifications monumentales.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    La construction de <strong>Bab Mansour</strong>, la plus belle porte du Maghreb, symbolise
                                    la puissance et le raffinement de cette époque. Le sultan fait également édifier son mausolée,
                                    chef-d'œuvre de l'architecture alaouite.
                                </p>
                            </div>
                        </div>

                        {/* Timeline Item 3 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-right">
                                <span className="text-2xl font-bold text-primary">XVIIIe</span>
                                <p className="text-sm text-muted-foreground">siècle</p>
                            </div>
                            <div className="flex-1 border-l-4 border-orange-500 pl-6 pb-8">
                                <h3 className="text-xl font-semibold mb-2">Déclin et Transfert de Capitale</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Après la mort de Moulay Ismail, ses successeurs déplacent la capitale à Marrakech puis Fès.
                                    Meknès connaît un déclin politique mais conserve son importance économique et religieuse grâce
                                    à son agriculture prospère et ses sanctuaires.
                                </p>
                            </div>
                        </div>

                        {/* Timeline Item 4 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-right">
                                <span className="text-2xl font-bold text-primary">1996</span>
                            </div>
                            <div className="flex-1 border-l-4 border-green-500 pl-6">
                                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-green-500" />
                                    Reconnaissance UNESCO
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    La médina historique de Meknès est inscrite au patrimoine mondial de l'UNESCO,
                                    reconnaissant son architecture hispano-mauresque exceptionnelle et son témoignage unique
                                    de l'apogée de la dynastie alaouite au Maroc.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
