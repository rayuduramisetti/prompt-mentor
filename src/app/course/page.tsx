"use client";
import Link from 'next/link';
import { promptTypes } from '@/config/promptTypes';

export default function CoursePage() {
  return (
    <main>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Prompt Mentor</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: '#444' }}>
        Welcome! This interactive course will teach you the fundamentals of prompt engineering in 5-10 minutes. Click a prompt type below to get started.
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {promptTypes.map((pt) => (
          <li key={pt.key} style={{ marginBottom: '2rem' }}>
            <Link href={`/prompt/${pt.key}`} style={{ fontSize: '1.3rem', fontWeight: 600, color: '#a05a2c', textDecoration: 'underline' }}>
              {pt.name}
            </Link>
            <div style={{ color: '#666', marginTop: '0.3rem', fontSize: '1rem' }}>{pt.description}</div>
          </li>
        ))}
      </ul>
    </main>
  );
} 