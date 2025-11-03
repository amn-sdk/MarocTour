'use client';

import { useTranslations } from 'next-intl';

interface TopScoresProps {
  limit?: number;
}

export function TopScores({ limit = 10 }: TopScoresProps) {
  const t = useTranslations('quiz');
  
  // Mock data - in production, fetch from API
  const scores = [
    { rank: 1, name: 'Ahmed', score: 95, city: 'Marrakech' },
    { rank: 2, name: 'Fatima', score: 92, city: 'Casablanca' },
    { rank: 3, name: 'Youssef', score: 88, city: 'Fès' },
    { rank: 4, name: 'Sara', score: 85, city: 'Rabat' },
    { rank: 5, name: 'Omar', score: 82, city: 'Tanger' },
  ].slice(0, limit);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Nom</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Ville</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {scores.map((score) => (
              <tr key={score.rank} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 text-sm">
                  {score.rank === 1 && '🥇'}
                  {score.rank === 2 && '🥈'}
                  {score.rank === 3 && '🥉'}
                  {score.rank > 3 && score.rank}
                </td>
                <td className="px-4 py-3 text-sm font-medium">{score.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{score.city}</td>
                <td className="px-4 py-3 text-sm font-bold text-right">{score.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

