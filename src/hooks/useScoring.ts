import { useState, useCallback, useRef } from 'react';

export const useScoring = () => {
  const [score, setScore] = useState(0);
  const [isScoring, setIsScoring] = useState(false);
  const scoringIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScoring = useCallback(() => {
    if (scoringIntervalRef.current) return;

    setIsScoring(true);
    setScore(0);

    scoringIntervalRef.current = setInterval(() => {
      setScore(prevScore => {
        const change = Math.random() * 10 - 3; // -3 to +7 range
        const newScore = Math.max(0, Math.min(100, prevScore + change));
        return Math.round(newScore);
      });
    }, 2000);
  }, []);

  const stopScoring = useCallback(() => {
    if (scoringIntervalRef.current) {
      clearInterval(scoringIntervalRef.current);
      scoringIntervalRef.current = null;
    }
    setIsScoring(false);
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
    stopScoring();
  }, [stopScoring]);

  return {
    score,
    isScoring,
    startScoring,
    stopScoring,
    resetScore,
  };
};