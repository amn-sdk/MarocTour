'use client';

import { QuizLeaderboard } from '@/components/quiz/quiz-leaderboard';
import { useMemo } from 'react';

export default function KenitraScoresClient() {
  // Pas de currentScore ici, juste la lecture du classement stocké
  const cityLabel = useMemo(() => 'Kénitra', []);
  return (
    <div className="container mx-auto px-4 py-8">
      <QuizLeaderboard city={cityLabel} storageKey="quiz-scores-kenitra" />
    </div>
  );
}


