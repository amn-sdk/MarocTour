import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata = {
    title: 'Quiz - MarocTour',
    description: 'Testez vos connaissances sur les villes du Maroc',
};

export default function QuizPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);
    const t = useTranslations('quiz');

    const quizzes = [
        {
            id: 'nador',
            title: 'Nador',
            description: 'Découvrez la perle du Rif et ses secrets.',
            image: '/images/cities/nador/nador.jpg',
            link: '/city/nador',
            difficult: 'Moyen'
        },
        {
            id: 'kenitra',
            title: 'Kénitra',
            description: 'Ville dynamique du Gharb, entre Sebou et océan.',
            image: '/images/cities/kenitra.jpg',
            link: '/quiz/kenitra',
            difficult: 'Facile'
        },
        {
            id: 'fes',
            title: 'Fès',
            description: 'Capitale spirituelle et culturelle, berceau millénaire de l\'érudition islamique.',
            image: '/images/cities/fes.jpg',
            link: '/city/fes',
            difficult: 'Moyen'
        },
        {
            id: 'casablanca',
            title: 'Casablanca',
            description: 'La ville blanche, poumon économique du Royaume.',
            image: '/images/cities/casablanca/hero.png',
            link: '/city/casablanca',
            difficult: 'Facile'
        },
        {
            id: 'meknes',
            title: 'Meknès',
            description: 'Le Versailles Marocain, cité impériale de Moulay Ismail.',
            image: '/images/cities/meknes/bab_mansour.png',
            link: '/city/meknes',
            difficult: 'Moyen'
        }
        // Future quizzes will go here
    ];

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: 'url(/images/quiz-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: 0.25,
                }}
            />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">{t('title')}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all">
                            <div className="aspect-video relative overflow-hidden bg-muted">
                                {/* Fallback image logic could go here, for now assuming image exists or using a colored placeholder if not */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
                                    style={{ backgroundImage: `url(${quiz.image})` }}
                                />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                    {quiz.difficult}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm uppercase tracking-wide">{quiz.title}</span>
                                </div>

                                <h3 className="text-2xl font-semibold mb-2">{quiz.title}</h3>
                                <p className="text-muted-foreground mb-6 line-clamp-2">
                                    {quiz.description}
                                </p>

                                <Button asChild className="w-full">
                                    <Link href={quiz.link}>
                                        {t('start')}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
