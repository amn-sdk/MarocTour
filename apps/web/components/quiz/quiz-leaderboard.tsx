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
  const [loading, setLoading] = useState(true);
  const [cityId, setCityId] = useState<string | null>(null);
  const key = getStorageKey(city, storageKey);

  // Get city ID from backend
  useEffect(() => {
    const fetchCityId = async () => {
      try {
        const citySlug = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
        const response = await fetch(`http://localhost:8000/api/v1/cities/slug/${citySlug}`);
        if (response.ok) {
          const cityData = await response.json();
          setCityId(cityData.id);
        }
      } catch (error) {
        console.error('Failed to fetch city ID:', error);
      }
    };
    fetchCityId();
  }, [city]);

  useEffect(() => {
    if (cityId) {
      loadScoresFromBackend();
    } else {
      loadScoresFromLocalStorage();
    }
  }, [city, key, cityId]);

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
        // Reload scores after saving
        if (cityId) {
          loadScoresFromBackend();
        } else {
          loadScoresFromLocalStorage();
        }
      }
    }
  }, [currentScore, key, cityId]);

  const loadScoresFromBackend = async () => {
    if (!cityId) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/quiz/top-scores?limit=10&city_id=${cityId}`);
      if (response.ok) {
        const backendScores = await response.json();
        const formattedScores: QuizScore[] = backendScores.map((s: any, index: number) => ({
          id: s.id || `backend-${s.player_name}-${s.completed_at}-${index}`,
          playerName: s.player_name,
          score: s.score, // Backend stores percentage as score
          totalQuestions: 10, // Default, could be enhanced
          percentage: s.score, // Backend score is already a percentage
          completedAt: s.completed_at,
          city: s.city_name || city,
          timeSpent: 0, // Backend doesn't store time yet
        }));

        // Merge with localStorage scores for time data
        const savedScores = localStorage.getItem(key);
        if (savedScores) {
          const localScores: QuizScore[] = JSON.parse(savedScores);
          const mergedScores = formattedScores.map(backendScore => {
            const localMatch = localScores.find(
              (ls: QuizScore) => ls.playerName === backendScore.playerName &&
                Math.abs(new Date(ls.completedAt).getTime() - new Date(backendScore.completedAt).getTime()) < 60000
            );
            return localMatch ? { ...backendScore, timeSpent: localMatch.timeSpent } : backendScore;
          });
          setScores(mergedScores);
        } else {
          setScores(formattedScores);
        }
      } else {
        // Fallback to localStorage if backend fails
        loadScoresFromLocalStorage();
      }
    } catch (error) {
      console.error('Failed to load scores from backend:', error);
      // Fallback to localStorage
      loadScoresFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadScoresFromLocalStorage = () => {
    setLoading(true);
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
    setLoading(false);
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
    if (cityId) {
      loadScoresFromBackend();
    } else {
      loadScoresFromLocalStorage();
    }
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
    <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 mt-8 border">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Classement - Quiz {city}</h2>
      </div>

      {/* Score actuel du joueur */}
      {currentScore && (
        <div className="bg-green-100/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
            🎉 Performance de {currentScore.playerName}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-500">
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
              <p className="text-sm text-muted-foreground mt-1">
                Temps: {formatTime(currentScore.timeSpent)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-600 dark:text-green-500 font-medium">
                ✅ Enregistré au classement !
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-8 text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Chargement du classement...</p>
        </div>
      )}

      {/* Tableau des scores */}
      {!loading && scores.length > 0 ? (
        <div className="space-y-3">
          {scores.map((score, index) => (
            <div
              key={score.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-colors border ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-200 dark:border-yellow-900/30' :
                  'bg-muted/30 hover:bg-muted/50 border-transparent'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 flex justify-center">
                  {getRankIcon(index)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{score.playerName}</span>
                    <span className={`text-sm ${getPlayerLevel(score.score, score.totalQuestions).color}`}>
                      {getPlayerLevel(score.score, score.totalQuestions).icon}
                      {getPlayerLevel(score.score, score.totalQuestions).level}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  <span className="text-lg font-bold text-foreground">{score.score}/{score.totalQuestions}</span>
                  <span className={`font-semibold ${getScoreColor(score.percentage)}`}>
                    {score.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <p>Aucun score enregistré pour le moment.</p>
          <p className="text-sm">Soyez le premier à apparaître dans le classement !</p>
        </div>
      ) : null}

      {/* Statistiques globales */}
      {scores.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-500">{scores.length}</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                {Math.round(scores.reduce((acc, s) => acc + s.percentage, 0) / scores.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Score Moyen</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-500">
                {formatTime(Math.round(scores.reduce((acc, s) => acc + s.timeSpent, 0) / scores.length))}
              </div>
              <div className="text-sm text-muted-foreground">Temps Moyen</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
