import { useState, useEffect, useCallback } from 'react';

export const useScoring = () => {
  const [score, setScore] = useState(0);
  const [isScoring, setIsScoring] = useState(false);

  const startScoring = useCallback(() => {
    setIsScoring(true);
    setScore(0);

    // Simulate dynamic scoring based on singing performance
    // In a real implementation, this would analyze microphone input
    const scoringInterval = setInterval(() => {
      setScore(prevScore => {
        // Simulate random scoring with slight upward trend
        const change = Math.random() * 10 - 3; // -3 to +7 range
        const newScore = Math.max(0, Math.min(100, prevScore + change));
        return Math.round(newScore);
      });
    }, 2000); // Update every 2 seconds

    return () => {
      clearInterval(scoringInterval);
      setIsScoring(false);
    };
  }, []);

  const stopScoring = useCallback(() => {
    setIsScoring(false);
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
    setIsScoring(false);
  }, []);

  // Auto-start scoring when a song begins (simulated)
  useEffect(() => {
    if (isScoring) {
      const cleanup = startScoring();
      return cleanup;
    }
  }, [isScoring, startScoring]);

  return {
    score,
    isScoring,
    startScoring: () => setIsScoring(true),
    stopScoring,
    resetScore
  };
};