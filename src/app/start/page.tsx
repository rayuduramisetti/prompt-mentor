"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useTimer } from '@/components/TimerProvider';

const facts = [
  'Prompting is the new literacy for working with AI.',
  'A well-crafted prompt can make AI your most powerful tool.',
  'Prompt engineering is key to unlocking the full potential of language models.',
  'In the AI era, those who can prompt well will lead the way.'
];

export default function StartPage() {
  const [factIdx, setFactIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const { startTimer } = useTimer();

  const handleStartLearning = () => {
    startTimer();
  };

  useEffect(() => {
    setDisplayed('');
    setTyping(true);
    let i = 0;
    function type() {
      setDisplayed(facts[factIdx].slice(0, i + 1));
      if (i < facts[factIdx].length - 1) {
        typingRef.current = setTimeout(type, 22);
        i++;
      } else {
        setTyping(false);
        autoAdvanceRef.current = setTimeout(() => {
          setFactIdx((idx) => (idx + 1) % facts.length);
        }, 3000);
      }
    }
    typingRef.current = setTimeout(type, 22);
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [factIdx]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
              Unlock the Power of Prompting
            </h1>
            <p className="text-gray-600 text-base">
              In this new era of AI, <strong className="text-gray-900">prompt engineering</strong> is the skill that lets you communicate, create, and innovate with language models. Whether you&apos;re a developer, writer, or curious learner, mastering prompts will help you get the most out of AI tools like ChatGPT, Copilot, and more.
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="text-gray-900 text-sm font-medium">Did you know?</div>
            <div className="bg-gray-50 rounded-md p-4">
              <div className="text-gray-900 text-sm min-h-[2.5rem] flex items-center justify-center text-center">
                {displayed}
                {typing && <span className="inline-block w-0.5 ml-1 bg-gray-900 h-4 animate-blink"></span>}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-gray-900 text-base font-medium">Have 5 minutes?</div>
              <p className="text-gray-600 text-sm">
                Let me give you a quick, interactive overview of what prompt engineering is and why it matters. You&apos;ll see real examples, try prompts yourself, and learn the essentials—fast.
              </p>
            </div>
            
            <Link 
              href="/prompt/zero-shot" 
              onClick={handleStartLearning}
              className="block w-full bg-gray-900 text-white rounded-md px-4 py-3 font-medium text-center hover:bg-gray-800 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}