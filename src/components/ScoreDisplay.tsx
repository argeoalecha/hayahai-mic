import React from 'react';
import { useSpring, animated } from 'react-spring';

interface ScoreDisplayProps {
  score: number;
  onNextSong: () => void;
  isNextDisabled: boolean;
}

const motivationalMessages = [
  '🌟 Amazing!',
  '🎵 Great job!',
  '👍 Good effort!',
  '🎤 Keep singing!',
  '🎉 You rock!',
  '🤩 Superstar!',
];

const getMotivationalMessage = (score: number) => {
  if (score >= 90) {
    return motivationalMessages[0];
  }
  if (score >= 75) {
    return motivationalMessages[1];
  }
  if (score >= 60) {
    return motivationalMessages[2];
  }
  return motivationalMessages[Math.floor(Math.random() * (motivationalMessages.length - 3)) + 3];
};

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  score, 
  onNextSong, 
  isNextDisabled 
}) => {
  const { number } = useSpring({ from: { number: 0 }, number: score, delay: 200 });

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-blue-200/30 relative overflow-hidden min-w-[200px]">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-3xl"></div>
      
      <div className="text-center mb-6 mt-2">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Score</h3>
        <animated.div className="text-6xl font-bold text-blue-600 mb-2">
          {number.to(n => n.toFixed(0))}
        </animated.div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-sky-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(score, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {getMotivationalMessage(score)}
        </p>
      </div>

      <button
        onClick={onNextSong}
        disabled={isNextDisabled}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        Next Song
      </button>
    </div>
  );
};