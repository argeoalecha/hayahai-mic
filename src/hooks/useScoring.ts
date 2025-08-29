import { useState, useCallback, useRef } from 'react';

export const useScoring = () => {
  const [score, setScore] = useState(0);
  const [isScoring, setIsScoring] = useState(false);
  const scoringIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const performanceStateRef = useRef({
    baseline: 65 + Math.random() * 20, // User's base skill (65-85)
    momentum: 0, // Performance momentum
    streak: 0, // Consecutive good notes
    difficulty: 1, // Song difficulty multiplier
  });

  const startScoring = useCallback(() => {
    if (scoringIntervalRef.current) return;

    setIsScoring(true);
    const startingScore = Math.floor(performanceStateRef.current.baseline * 0.6); // Start at 60% of baseline
    setScore(startingScore);
    
    // Reset performance state for new song
    performanceStateRef.current.momentum = 0;
    performanceStateRef.current.streak = 0;

    scoringIntervalRef.current = setInterval(() => {
      setScore(prevScore => {
        const state = performanceStateRef.current;
        
        // Simulate note accuracy (higher chance of good notes)
        const noteAccuracy = Math.random();
        const isGoodNote = noteAccuracy > 0.3; // 70% chance of hitting notes
        const isPerfectNote = noteAccuracy > 0.85; // 15% chance of perfect notes
        
        // Calculate base points for this note
        let notePoints = 0;
        if (isPerfectNote) {
          notePoints = 8 + Math.random() * 4; // 8-12 points
          state.streak += 1;
        } else if (isGoodNote) {
          notePoints = 3 + Math.random() * 4; // 3-7 points  
          state.streak += 0.5;
        } else {
          notePoints = -2 + Math.random() * 3; // -2 to +1 points
          state.streak = Math.max(0, state.streak - 1);
        }
        
        // Apply streak bonus (builds up over time)
        const streakBonus = Math.min(state.streak * 0.5, 5); // Max 5 bonus points
        notePoints += streakBonus;
        
        // Apply momentum (smoother performance curves)
        state.momentum = state.momentum * 0.8 + (notePoints > 5 ? 0.2 : -0.1);
        notePoints += state.momentum * 2;
        
        // Apply difficulty modifier (future feature hook)
        notePoints *= state.difficulty;
        
        // Calculate final score with realistic constraints
        const targetScore = state.baseline + (state.momentum * 10);
        const scoreDrift = (targetScore - prevScore) * 0.1; // Gradual drift toward baseline
        const finalChange = notePoints + scoreDrift;
        
        const newScore = Math.max(0, Math.min(100, prevScore + finalChange));
        return Math.round(newScore * 10) / 10; // Round to 1 decimal place
      });
    }, 1500); // Slightly faster updates for responsiveness
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
    performanceStateRef.current.momentum = 0;
    performanceStateRef.current.streak = 0;
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