"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { useTimer } from '@/components/TimerProvider';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function SummaryPage() {
  const { seconds, stopTimer } = useTimer();
  
  useEffect(() => {
    // Stop the timer when the summary page loads
    stopTimer();
  }, [stopTimer]);
  
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6 text-center">
          <div className="space-y-4">
            <div className="text-4xl">🎉</div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Course Complete!
            </h1>
            <p className="text-gray-600 text-base">
              Congratulations! You&apos;ve finished the interactive prompt engineering course and learned the fundamentals of working with AI language models.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-md p-4 space-y-2">
            <div className="text-gray-900 text-sm font-medium">Total Time Spent</div>
            <div className="text-2xl font-semibold text-gray-900">{formatTime(seconds)}</div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-gray-900 text-base font-medium">What&apos;s Next?</h2>
              <p className="text-gray-600 text-sm">
                Practice what you&apos;ve learned by experimenting with different prompts in your favorite AI tools. The more you practice, the better you&apos;ll become at prompt engineering.
              </p>
            </div>
            
            <Link 
              href="/start" 
              className="block w-full bg-gray-900 text-white rounded-md px-4 py-3 font-medium text-center hover:bg-gray-800 transition-colors"
            >
              Take the Course Again
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}