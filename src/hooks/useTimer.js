import { useState, useEffect } from 'react';

export const useTimer = (initialTime, isRunning, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isRunning, onTimeUp]);

  return { timeLeft, setTimeLeft };
};