'use client';

import { useTranslations } from 'next-intl';

interface TopScoresProps {
  limit?: number;
}

import { useEffect, useState } from 'react';

interface TopScore {
  player_name: string;
  score: number;
  city_name: string;
  completed_at: string;
}

export function TopScores({ limit = 10 }: TopScoresProps) {
  const t = useTranslations('quiz');
  const [scores, setScores] = useState<TopScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/quiz/top-scores?limit=' + limit);
        if (response.ok) {
          const data = await response.json();
          setScores(data);
        }
      } catch (error) {
        console.error('Failed to fetch scores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [limit]);

  if (loading) {
    return <div className="text-center py-8">Loading scores...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">{t('name') || 'Nom'}</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">{t('city') || 'Ville'}</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">{t('score') || 'Score'}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {scores.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No scores yet. Be the first!
                </td>
              </tr>
            ) : (
              scores.map((score, index) => (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{score.player_name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{score.city_name}</td>
                  <td className="px-4 py-3 text-sm font-bold text-right">{score.score}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

