import React from 'react';

interface ScoreDisplayProps {
  score: number;
  onNextSong: () => void;
  isNextDisabled: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  score, 
  onNextSong, 
  isNextDisabled 
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-blue-200/30 relative overflow-hidden min-w-[200px]">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-3xl"></div>
      
      <div className="text-center mb-6 mt-2">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Score</h3>
        <div className="text-6xl font-bold text-blue-600 mb-2">{score}</div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-sky-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(score, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {score >= 90 ? '🌟 Amazing!' : 
           score >= 75 ? '🎵 Great job!' : 
           score >= 60 ? '👍 Good effort!' : 
           '🎤 Keep singing!'}
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