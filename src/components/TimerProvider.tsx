"use client";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

const TimerContext = createContext<{
  seconds: number;
  showTimer: boolean;
  setShowTimer: (show: boolean) => void;
  stopTimer: () => void;
  startTimer: () => void;
}>({ seconds: 0, showTimer: true, setShowTimer: () => {}, stopTimer: () => {}, startTimer: () => {} });

export function TimerProvider({ children }: { children: ReactNode }) {
  const [seconds, setSeconds] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (!isRunning && !intervalRef.current) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <TimerContext.Provider value={{ seconds, showTimer, setShowTimer, stopTimer, startTimer }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
} 