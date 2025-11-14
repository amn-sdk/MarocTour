'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quiz } from '@/components/quiz/quiz';
import { QuizLeaderboard } from '@/components/quiz/quiz-leaderboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Users, Anchor } from 'lucide-react';
import Link from 'next/link';

interface QuizScore {
  id: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  city: string;
  timeSpent: number;
}

async function getNadorData() {
  try {
    const response = await fetch('/api/cities/nador', {
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Nador data');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching Nador data:', error);
    return null;
  }
}

export default function NadorPageClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentScore, setCurrentScore] = useState<QuizScore | null>(null);

  useEffect(() => {
    getNadorData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  const handleQuizComplete = (score: number, totalQuestions: number, timeSpent: number, playerName: string) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const newScore: QuizScore = {
      id: Date.now().toString(),
      playerName: playerName,
      score,
      totalQuestions,
      percentage,
      completedAt: new Date().toISOString(),
      city: 'Nador',
      timeSpent
    };
    
    setCurrentScore(newScore);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement des informations de Nador...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur de chargement</h1>
          <p className="text-gray-600 mb-6">Impossible de charger les informations sur Nador.</p>
          <Link href="/map">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la carte
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Image de gauche - nador.jpg */}
          <div 
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{
              backgroundImage: 'url(/images/cities/nador/nador.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {/* Image de droite - Maroc_nador.jpg */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              backgroundImage: 'url(/images/cities/nador/Maroc_nador.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {/* Overlay sombre pour la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            {data.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            {data.hero.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="h-4 w-4" />
              <span>Région Oriental</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="h-4 w-4" />
              <span>161,000 habitants</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Anchor className="h-4 w-4" />
              <span>Port Méditerranéen</span>
            </div>
          </div>
        </div>

        {/* Navigation retour */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/map">
            <Button variant="secondary" className="bg-white/90 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la carte
            </Button>
          </Link>
        </div>
      </section>

      {/* Navigation interne */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 py-4 overflow-x-auto">
            <a href="#histoire" className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap transition-colors">
              📚 Histoire
            </a>
            <a href="#quiz" className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap transition-colors">
              🧠 Quiz
            </a>
            <a href="#classement" className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap transition-colors">
              🏆 Classement
            </a>
            <a href="#infos" className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap transition-colors">
              ℹ️ Informations
            </a>
          </div>
        </div>
      </nav>

      {/* Section Histoire */}
      <section id="histoire" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Histoire de Nador</h2>
            <p className="text-xl text-gray-600">
              De l'Antiquité à nos jours, découvrez l'évolution de cette perle du Rif Oriental
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Lecture : environ 10 minutes</span>
            </div>
          </div>

          <div className="space-y-12">
            {data.history.map((period: any, index: number) => (
              <article key={period.id} className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {period.title}
                    </h3>
                    <div className="prose prose-lg text-gray-700 leading-relaxed">
                      <p>{period.text}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Quiz */}
      <section id="quiz" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Testez vos Connaissances</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Maintenant que vous avez découvert l'histoire de Nador, 
              évaluez vos connaissances avec notre quiz interactif de 10 questions.
            </p>
          </div>

          <Quiz 
            questions={data.quiz} 
            title="Quiz Histoire de Nador"
            onQuizComplete={handleQuizComplete}
          />
        </div>
      </section>

      {/* Section Classement */}
      <section id="classement" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <QuizLeaderboard 
            currentScore={currentScore || undefined} 
            city="Nador" 
          />
        </div>
      </section>

      {/* Section Informations */}
      <section id="infos" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Informations Pratiques</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Comment s'y rendre</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">✈️</span>
                  <span><strong>Aéroport :</strong> Aéroport de Nador-Al Aroui (15 km du centre)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">🚌</span>
                  <span><strong>Bus :</strong> Liaisons quotidiennes depuis Casablanca, Rabat, Fès</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">🚗</span>
                  <span><strong>Route :</strong> A2 depuis Fès (3h30), A1 depuis Oujda (2h)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Sites à Découvrir</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span><strong>Lagune de Marchica :</strong> Écosystème préservé et plages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">⚓</span>
                  <span><strong>Port de Beni Ensar :</strong> Animation et restaurants de poisson</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">🏔️</span>
                  <span><strong>Monts du Rif :</strong> Randonnées et paysages montagnards</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sources */}
          <div className="mt-12 bg-gray-50 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Sources et Références</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Dernière mise à jour :</strong> {data.meta.last_updated}</p>
              <div>
                <strong>Sources principales :</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {data.meta.sources.map((source: string, index: number) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer call-to-action */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Explorez d'autres villes du Maroc</h2>
          <p className="text-blue-100 mb-6">
            Découvrez l'histoire et la culture des autres perles du royaume
          </p>
          <Link href="/map">
            <Button variant="secondary" size="lg">
              <MapPin className="h-5 w-5 mr-2" />
              Retour à la carte interactive
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
