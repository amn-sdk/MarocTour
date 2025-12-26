'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Quiz } from '@/components/quiz/quiz';
import { QuizLeaderboard } from '@/components/quiz/quiz-leaderboard';
import { kenitraQuestions } from '@/data/quizzes/kenitra';

type CurrentScore = {
  id: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  city: string;
  timeSpent: number;
};

export default function KenitraQuizClient() {
  const [currentScore, setCurrentScore] = useState<CurrentScore | undefined>(undefined);
  const title = useMemo(() => 'Quiz Kénitra', []);

  const handleComplete = (score: number, total: number, timeSpent: number, playerName: string) => {
    const percentage = Math.round((score / total) * 100);
    setCurrentScore({
      id: `${Date.now()}`,
      playerName,
      score,
      totalQuestions: total,
      percentage,
      completedAt: new Date().toISOString(),
      city: 'Kénitra',
      timeSpent,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="relative aspect-[16/5] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/cities/kenitra.jpg"
            alt="Kénitra"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <Quiz questions={kenitraQuestions} title={title} onQuizComplete={handleComplete} />

      <QuizLeaderboard currentScore={currentScore} city="Kénitra" storageKey="quiz-scores-kenitra" />
    </div>
  );
}


