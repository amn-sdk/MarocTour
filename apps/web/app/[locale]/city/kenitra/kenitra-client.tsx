
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Map, HelpCircle } from 'lucide-react';
import { Quiz } from '@/components/quiz/quiz';
import { kenitraQuestions } from '@/data/quizzes/kenitra';
import { QuizLeaderboard } from '@/components/quiz/quiz-leaderboard';

export default function KenitraPageClient() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentScore, setCurrentScore] = useState<any>(undefined);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Kénitra</h1>
          <div className="flex gap-2">
            <Link href="/map">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la carte
              </Button>
            </Link>
            <Link href="#quiz">
              <Button>
                <PlayCircle className="h-4 w-4 mr-2" />
                Participer au quiz
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero visuel */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{
              backgroundImage: 'url(/images/cities/kenitra/hero.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              backgroundImage: 'url(/images/cities/kenitra/mehdi_couche_soleil.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow">Kénitra, entre Sebou et Atlantique</h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg opacity-95">
            Ville jeune et dynamique, carrefour ferroviaire et autoroutier, Kénitra s’ouvre sur les espaces
            naturels de la Mamora et l’embouchure du Sebou, avec Mehdia toute proche.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/map">
              <Button variant="secondary" className="gap-2">
                <Map className="h-4 w-4" />
                Explorer la carte
              </Button>
            </Link>
            <Link href="#quiz">
              <Button className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Lancer le quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Sections illustrées */}
        <section id="presentation" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Présentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 rounded-lg overflow-hidden border bg-card">
              <div
                className="h-56 w-full"
                style={{
                  backgroundImage: 'url(/images/cities/kenitra.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-5 text-muted-foreground">
                Située sur l’oued Sebou et à proximité de l’Atlantique, Kénitra s’appuie sur un tissu
                industriel en croissance, des mobilités efficaces et des espaces naturels remarquables.
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card">
              <div
                className="h-56 w-full"
                style={{
                  backgroundImage: 'url(/images/cities/kenitra/kenitra_gare.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-5 text-muted-foreground">
                Une position stratégique sur l’axe ferroviaire et autoroutier nord‑sud.
              </div>
            </div>
          </div>
        </section>

        <section id="histoire" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Histoire</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden border bg-card">
              <div
                className="h-40 w-full"
                style={{
                  backgroundImage: 'url(/images/cities/kenitra/mehdi_couche_soleil.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-5 text-muted-foreground">
                Structuration au XXe siècle autour du transport, du port et de l’agriculture du Gharb.
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card">
              <div
                className="h-40 w-full"
                style={{
                  backgroundImage: 'url(/images/cities/kenitra/hero.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-5 text-muted-foreground">
                Diversification vers l’industrie et l’enseignement supérieur.
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card">
              <div className="p-5 text-muted-foreground">
                La ville affirme aujourd’hui un rôle régional, connectant espaces naturels et dynamique urbaine.
              </div>
            </div>
          </div>
        </section>

        <section id="culture" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Culture & Nature</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden border bg-card">
              <div className="p-5 text-muted-foreground">
                Vie associative, initiatives étudiantes et événements locaux rythment la vie culturelle.
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card">
              <div
                className="h-40 w-full"
                style={{
                  backgroundImage: 'url(/images/cities/kenitra/kenitra_gare.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-5 text-muted-foreground">
                Mehdia et la Mamora favorisent les activités de plein air et la détente.
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card">
              <div
                className="h-40 w-full"
                style={{
                  backgroundImage: 'url(/images/cities/kenitra.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-5 text-muted-foreground">
                Un cadre accessible et une qualité de vie attractive pour les familles et les étudiants.
              </div>
            </div>
          </div>
        </section>

        {/* Quiz embarqué */}
        <section id="quiz" className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold">Quiz Kénitra</h3>
            <div className="flex gap-2">
              <Link href="/quiz/kenitra">
                <Button variant="outline">Ouvrir en page dédiée</Button>
              </Link>
              <Button onClick={() => setShowQuiz((v) => !v)}>
                {showQuiz ? 'Masquer' : 'Jouer ici'}
              </Button>
            </div>
          </div>
          {showQuiz && (
            <div className="max-w-3xl">
              <Quiz
                questions={kenitraQuestions}
                title="Quiz Kénitra"
                onQuizComplete={(score, total, time, player) => {
                  const percentage = Math.round((score / total) * 100);
                  setCurrentScore({
                    id: `${Date.now()}`,
                    playerName: player,
                    score,
                    totalQuestions: total,
                    percentage,
                    completedAt: new Date().toISOString(),
                    city: 'Kénitra',
                    timeSpent: time,
                  });
                }}
              />
              <QuizLeaderboard currentScore={currentScore} city="Kénitra" storageKey="quiz-scores-kenitra" />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}


