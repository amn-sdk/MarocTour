'use client';

import { QuizLeaderboard } from '@/components/quiz/quiz-leaderboard';
import { useMemo } from 'react';

export default function FesScoresClient() {
  // Pas de currentScore ici, juste la lecture du classement stocké
  const cityLabel = useMemo(() => 'Fès', []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Classement - Quiz Fès</h1>
        <p className="text-lg text-muted-foreground">
          Découvrez les meilleurs scores du quiz sur l&apos;histoire et la culture de Fès
        </p>
      </div>
      <QuizLeaderboard city={cityLabel} storageKey="quiz-scores-fes" />
    </div>
  );
}
