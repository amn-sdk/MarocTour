'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  correct_index: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
  onQuizComplete?: (score: number, totalQuestions: number, timeSpent: number, playerName: string) => void;
}

export function Quiz({ questions, title = "Quiz", onQuizComplete }: QuizProps) {
  const [playerName, setPlayerName] = useState<string>('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map());
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Timer pour mettre à jour l'horloge
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getElapsedTime = () => {
    return Math.floor((currentTime - startTime) / 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    if (!playerName.trim()) return;
    setQuizStarted(true);
    setStartTime(Date.now());
    setCurrentTime(Date.now());
  };

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);
    
    // Enregistrer la réponse si c'est la première fois
    if (!answeredQuestions.has(currentQuestion)) {
      setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
      setUserAnswers(prev => new Map([...prev, [currentQuestion, selectedAnswer]]));
      
      if (selectedAnswer === question.correct_index) {
        setScore(prev => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      
      // Restaurer la réponse précédente si elle existe
      const previousAnswer = userAnswers.get(currentQuestion - 1);
      if (previousAnswer !== undefined) {
        setSelectedAnswer(previousAnswer);
        setShowExplanation(true);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setPlayerName('');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setUserAnswers(new Map());
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    setQuizCompleted(false);
  };

  // Déclencher le callback de completion une seule fois
  useEffect(() => {
    if (answeredQuestions.size === questions.length && isLastQuestion && showExplanation && !quizCompleted) {
      setQuizCompleted(true);
      if (onQuizComplete) {
        const timeSpent = getElapsedTime();
        onQuizComplete(score, questions.length, timeSpent, playerName.trim());
      }
    }
  }, [answeredQuestions.size, questions.length, isLastQuestion, showExplanation, score, quizCompleted, onQuizComplete, getElapsedTime, playerName]);

  // Écran d'accueil pour demander le nom
  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🧠</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-2">
              {questions.length} questions vous attendent !
            </p>
            <p className="text-sm text-gray-500">
              Testez vos connaissances et découvrez votre niveau
            </p>
          </div>

          <div className="mb-8">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              Votre nom ou pseudo
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Entrez votre nom..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
              maxLength={25}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && playerName.trim()) {
                  startQuiz();
                }
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Votre nom apparaîtra dans le classement
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={startQuiz}
              disabled={!playerName.trim()}
              size="lg"
              className="w-full"
            >
              🚀 Commencer le Quiz
            </Button>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Durée estimée : 5-10 minutes</p>
              <p>• Votre temps sera chronométré</p>
              <p>• Vous pouvez naviguer entre les questions</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Affichage final des résultats
  if (answeredQuestions.size === questions.length && isLastQuestion && showExplanation) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mb-6">
            {percentage >= 80 ? (
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : percentage >= 60 ? (
              <CheckCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold mb-2">Félicitations {playerName} !</h2>
          <p className="text-lg text-gray-600 mb-4">Quiz terminé avec succès</p>
          
          <div className="text-6xl font-bold mb-4">
            <span className={
              percentage >= 80 ? 'text-green-600' : 
              percentage >= 60 ? 'text-yellow-600' : 
              'text-red-600'
            }>
              {score}
            </span>
            <span className="text-gray-400">/{questions.length}</span>
          </div>
          
          <p className="text-xl text-gray-600 mb-6">
            Votre score : {percentage}%
          </p>
          
          <div className="mb-6">
            {percentage >= 80 && (
              <p className="text-green-600 font-semibold">Excellent ! Vous maîtrisez parfaitement l'histoire de Nador.</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-yellow-600 font-semibold">Bien joué ! Vous avez de bonnes connaissances sur Nador.</p>
            )}
            {percentage < 60 && (
              <p className="text-red-600 font-semibold">Il serait bon de relire l'histoire de Nador pour améliorer vos connaissances.</p>
            )}
          </div>
          
          <Button onClick={resetQuiz} className="px-8 py-2">
            Recommencer le Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* En-tête avec progression */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{formatTime(getElapsedTime())}</span>
            </div>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
        </div>
        
        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 leading-relaxed">
          {question.question}
        </h3>
        
        {/* Choix de réponses */}
        <div className="space-y-3">
          {question.choices.map((choice, index) => {
            let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all ";
            
            if (showExplanation) {
              if (index === question.correct_index) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && index !== question.correct_index) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else {
              if (index === selectedAnswer) {
                buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
              } else {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showExplanation}
              >
                <div className="flex items-center">
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{choice}</span>
                  {showExplanation && index === question.correct_index && (
                    <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                  )}
                  {showExplanation && index === selectedAnswer && index !== question.correct_index && (
                    <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explication */}
      {showExplanation && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h4 className="font-semibold text-blue-800 mb-2">Explication :</h4>
          <p className="text-blue-700">{question.explanation}</p>
        </div>
      )}

      {/* Boutons de navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>

        <div className="flex gap-2">
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="px-6"
            >
              Soumettre
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={isLastQuestion && answeredQuestions.size === questions.length}
              className="flex items-center gap-2 px-6"
            >
              {isLastQuestion ? 'Voir Résultats' : 'Suivant'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
