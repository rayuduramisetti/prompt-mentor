"use client";
import Link from 'next/link';
import { useTimer } from '@/components/TimerProvider';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function SummaryPage() {
  const { seconds } = useTimer();
  return (
    <main>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>🎉 Course Complete!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: '#444' }}>
        You finished the interactive prompt engineering course.<br />
        <span style={{ fontWeight: 600, color: '#a05a2c' }}>
          Total time: {formatTime(seconds)}
        </span>
      </p>
      <Link href="/" style={{ color: '#a05a2c', textDecoration: 'underline', fontWeight: 600, fontSize: '1.1rem' }}>
        ← Back to Home
      </Link>
    </main>
  );
} 