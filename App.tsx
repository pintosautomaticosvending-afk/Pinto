
import React, { useState, useEffect, useCallback } from 'react';
import { ColorType, DuckInfo, GameState } from './types';
import { generateDucks } from './constants';
import { speak } from './services/ttsService';
import Duck from './components/Duck';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    targetDuck: null,
    ducks: [],
    score: 0,
    status: 'idle',
  });

  const startRound = useCallback(async () => {
    const newDucks = generateDucks(3);
    const target = newDucks[Math.floor(Math.random() * newDucks.length)];
    
    setGameState(prev => ({
      ...prev,
      ducks: newDucks,
      targetDuck: target,
      status: 'playing'
    }));

    await speak(`Onde é que está o pato ${target.color}?`);
  }, []);

  useEffect(() => {
    // Initial start
    const timer = setTimeout(() => {
      if (gameState.status === 'idle') {
        startRound();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [gameState.status, startRound]);

  const handleDuckClick = async (clickedDuck: DuckInfo) => {
    if (gameState.status !== 'playing' || !gameState.targetDuck) return;

    if (clickedDuck.color === gameState.targetDuck.color) {
      setGameState(prev => ({ ...prev, status: 'feedback_correct', score: prev.score + 1 }));
      await speak("Bate palmas! Muito bem!");
      setTimeout(() => {
        startRound();
      }, 2000);
    } else {
      setGameState(prev => ({ ...prev, status: 'feedback_incorrect' }));
      await speak("Errado. Tenta outra vez!");
      setTimeout(() => {
        setGameState(prev => ({ ...prev, status: 'playing' }));
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-sky-300 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 text-white opacity-60">
        <svg width="100" height="40" viewBox="0 0 100 40">
           <circle cx="20" cy="20" r="15" fill="currentColor" />
           <circle cx="45" cy="20" r="20" fill="currentColor" />
           <circle cx="75" cy="20" r="15" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-20 right-20 text-white opacity-40 transform scale-150">
        <svg width="100" height="40" viewBox="0 0 100 40">
           <circle cx="20" cy="20" r="15" fill="currentColor" />
           <circle cx="45" cy="20" r="20" fill="currentColor" />
           <circle cx="75" cy="20" r="15" fill="currentColor" />
        </svg>
      </div>

      {/* Header */}
      <div className="z-10 text-center mt-8">
        <h1 className="text-5xl md:text-7xl font-fredoka text-white drop-shadow-lg mb-2">
          Patinhos Coloridos
        </h1>
        {gameState.targetDuck && gameState.status === 'playing' && (
          <p className="text-2xl md:text-3xl font-bold text-blue-900 bg-white/50 px-6 py-2 rounded-full inline-block">
            Procura o patinho <span className="underline decoration-4">{gameState.targetDuck.color}</span>!
          </p>
        )}
      </div>

      {/* Main Game Area (Pond) */}
      <div className="flex-1 w-full max-w-4xl flex items-center justify-center relative">
        {/* Pond circle */}
        <div className="absolute inset-0 m-auto w-[90%] aspect-square bg-blue-400/30 rounded-full blur-2xl -z-10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center w-full">
          {gameState.ducks.map((duck) => (
            <Duck
              key={duck.id}
              duck={duck}
              onClick={handleDuckClick}
              disabled={gameState.status !== 'playing' && gameState.status !== 'feedback_incorrect'}
              isWinning={gameState.status === 'feedback_correct' && duck.color === gameState.targetDuck?.color}
            />
          ))}
        </div>
      </div>

      {/* Feedback Overlay */}
      {gameState.status === 'feedback_correct' && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">👏</div>
        </div>
      )}

      {/* Footer / UI */}
      <div className="z-10 w-full flex flex-col items-center mb-8 gap-4">
        <div className="bg-yellow-400 text-yellow-900 font-bold px-8 py-3 rounded-full text-2xl shadow-lg border-4 border-white">
          Estrelas: {gameState.score} ⭐
        </div>
        
        {gameState.status === 'idle' && (
          <button
            onClick={startRound}
            className="bg-green-500 hover:bg-green-600 text-white font-fredoka text-3xl px-12 py-4 rounded-2xl shadow-2xl transition-all transform hover:scale-105 active:scale-95"
          >
            VAMOS JOGAR!
          </button>
        )}
      </div>

      {/* Water line */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-blue-500/40 -z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,60 C150,110 350,10 500,60 C650,110 850,10 1000,60 C1150,110 1350,10 1500,60 L1500,120 L0,120 Z" fill="#3B82F6"></path>
        </svg>
      </div>
    </div>
  );
};

export default App;
