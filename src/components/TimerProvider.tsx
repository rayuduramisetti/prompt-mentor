"use client";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

const TimerContext = createContext<{
  seconds: number;
  showTimer: boolean;
  setShowTimer: (show: boolean) => void;
  stopTimer: () => void;
}>({ seconds: 0, showTimer: true, setShowTimer: () => {}, stopTimer: () => {} });

export function TimerProvider({ children }: { children: ReactNode }) {
  const [seconds, setSeconds] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startedRef = useRef(false);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <TimerContext.Provider value={{ seconds, showTimer, setShowTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
} 