'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, User, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizScore {
  id: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  city: string;
  timeSpent: number; // en secondes
}

interface QuizLeaderboardProps {
  currentScore?: QuizScore;
  city: string; // Affichage lisible (ex: "Kénitra")
  storageKey?: string; // Optionnel: clé dédiée (ex: "quiz-scores-kenitra")
}

function getStorageKey(city: string, storageKey?: string) {
  if (storageKey) return storageKey;
  const slug = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  return `quiz-scores-${slug}`;
}

export function QuizLeaderboard({ currentScore, city, storageKey }: QuizLeaderboardProps) {
  const [scores, setScores] = useState<QuizScore[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showAddScore, setShowAddScore] = useState(false);
  const key = getStorageKey(city, storageKey);

  useEffect(() => {
    loadScores();
  }, [city, key]);

  useEffect(() => {
    // Auto-save le score courant s'il a un nom
    if (currentScore && currentScore.playerName.trim()) {
      // Back-compat: fusionner ancien stockage global s'il existe
      const legacy = localStorage.getItem('quiz-scores');
      const legacyScores = legacy ? JSON.parse(legacy) : [];
      const savedScores = localStorage.getItem(key);
      const allScores = savedScores ? JSON.parse(savedScores) : legacyScores;
      
      // Vérifier si ce score n'est pas déjà sauvegardé
      const exists = allScores.some((score: QuizScore) => score.id === currentScore.id);
      if (!exists) {
        allScores.push(currentScore);
        localStorage.setItem(key, JSON.stringify(allScores));
        loadScores();
      }
    }
  }, [currentScore, key]);

  const loadScores = () => {
    const savedScores = localStorage.getItem(key);
    if (savedScores) {
      const allScores = JSON.parse(savedScores);
      const cityScores = allScores
        .filter((score: QuizScore) => score.city === city)
        .sort((a: QuizScore, b: QuizScore) => {
          // Trier par pourcentage, puis par temps (plus rapide = mieux)
          if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
          }
          return a.timeSpent - b.timeSpent;
        });
      setScores(cityScores.slice(0, 10)); // Top 10
    }
  };

  const saveScore = () => {
    if (!currentScore || !playerName.trim()) return;

    const newScore: QuizScore = {
      ...currentScore,
      id: Date.now().toString(),
      playerName: playerName.trim(),
      completedAt: new Date().toISOString(),
    };

    const savedScores = localStorage.getItem(key);
    const allScores = savedScores ? JSON.parse(savedScores) : [];
    allScores.push(newScore);
    
    localStorage.setItem(key, JSON.stringify(allScores));
    loadScores();
    setShowAddScore(false);
    setPlayerName('');
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1: return <Medal className="h-6 w-6 text-gray-400" />;
      case 2: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>;
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlayerLevel = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 95) return { level: 'Expert', color: 'text-purple-600', icon: '👑' };
    if (percentage >= 90) return { level: 'Maître', color: 'text-gold-600', icon: '🎓' };
    if (percentage >= 80) return { level: 'Avancé', color: 'text-blue-600', icon: '⭐' };
    if (percentage >= 70) return { level: 'Intermédiaire', color: 'text-green-600', icon: '📚' };
    if (percentage >= 60) return { level: 'Débutant', color: 'text-yellow-600', icon: '🌱' };
    return { level: 'Novice', color: 'text-gray-600', icon: '🚀' };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Classement - Quiz {city}</h2>
      </div>

      {/* Score actuel du joueur */}
      {currentScore && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">
            🎉 Performance de {currentScore.playerName}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">
                  {currentScore.score}/{currentScore.totalQuestions}
                </span>
                <span className={`font-semibold ${getScoreColor(currentScore.percentage)}`}>
                  ({currentScore.percentage}%)
                </span>
                {getPlayerLevel(currentScore.score, currentScore.totalQuestions).icon}
                <span className={`font-medium ${getPlayerLevel(currentScore.score, currentScore.totalQuestions).color}`}>
                  {getPlayerLevel(currentScore.score, currentScore.totalQuestions).level}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Temps: {formatTime(currentScore.timeSpent)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-600 font-medium">
                ✅ Enregistré au classement !
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des scores */}
      {scores.length > 0 ? (
        <div className="space-y-3">
          {scores.map((score, index) => (
            <div
              key={score.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 
                'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 flex justify-center">
                  {getRankIcon(index)}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{score.playerName}</span>
                    <span className={`text-sm ${getPlayerLevel(score.score, score.totalQuestions).color}`}>
                      {getPlayerLevel(score.score, score.totalQuestions).icon} 
                      {getPlayerLevel(score.score, score.totalQuestions).level}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {new Date(score.completedAt).toLocaleDateString('fr-FR')}
                    </span>
                    <span>Temps: {formatTime(score.timeSpent)}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{score.score}/{score.totalQuestions}</span>
                  <span className={`font-semibold ${getScoreColor(score.percentage)}`}>
                    {score.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Aucun score enregistré pour le moment.</p>
          <p className="text-sm">Soyez le premier à apparaître dans le classement !</p>
        </div>
      )}

      {/* Statistiques globales */}
      {scores.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{scores.length}</div>
              <div className="text-sm text-gray-600">Participants</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(scores.reduce((acc, s) => acc + s.percentage, 0) / scores.length)}%
              </div>
              <div className="text-sm text-gray-600">Score Moyen</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {formatTime(Math.round(scores.reduce((acc, s) => acc + s.timeSpent, 0) / scores.length))}
              </div>
              <div className="text-sm text-gray-600">Temps Moyen</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
