"use client";

import { notFound } from 'next/navigation';
import { promptTypes } from '@/config/promptTypes';
import Link from 'next/link';
import { useState } from 'react';
import { useTimer } from '@/components/TimerProvider';
import { useRouter } from 'next/navigation';

function formatMinutes(seconds: number) {
  const m = Math.floor(seconds / 60);
  return `${m} min`;
}

export default function PromptTypePage({ params }: { params: { type: string } }) {
  const promptType = promptTypes.find((pt) => pt.key === params.type);
  if (!promptType) return notFound();

  const { seconds, showTimer, setShowTimer, stopTimer } = useTimer();
  const router = useRouter();

  const [showAnalogies, setShowAnalogies] = useState(true);
  const idx = promptTypes.findIndex((pt) => pt.key === params.type);
  const prev = idx > 0 ? promptTypes[idx - 1] : null;
  const next = idx < promptTypes.length - 1 ? promptTypes[idx + 1] : null;

  const [prompt, setPrompt] = useState(promptType.example);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRunPrompt() {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResponse(data.result || '');
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div style={{ marginBottom: '0.5rem' }}>
        <Link href="/" style={{ color: '#a05a2c', textDecoration: 'underline', fontWeight: 600, fontSize: '1rem' }}>
          ← Home
        </Link>
      </div>
      <h1 style={{ fontSize: '1.15rem', marginBottom: '0.3rem', marginTop: 0, fontWeight: 700 }}>{promptType.name}</h1>
      <p style={{ color: '#444', fontSize: '1.05rem', marginBottom: '0.8rem', marginTop: 0 }}>{promptType.description}</p>

      <div style={{ marginBottom: '0.8rem', marginTop: '0.4rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem', marginTop: 0 }}>Example Prompt</h2>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '1.05rem', padding: '0.5rem 0.8rem', background: 'none' }}>{promptType.example}</pre>
      </div>

      <div style={{ marginBottom: '0.8rem', marginTop: '0.4rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem', marginTop: 0 }}>Analogies</h2>
        <ul style={{ color: '#444', marginTop: 0, fontSize: '1.05rem', paddingLeft: 16 }}>
          {promptType.analogies.map((a, i) => (
            <li key={i} style={{ marginBottom: '0.2rem' }}>{a}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '0.8rem', marginTop: '0.4rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem', marginTop: 0 }}>Try it Yourself</h2>
        <textarea
          rows={2}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          style={{ fontSize: '1.05rem', padding: '0.5rem 0.8rem', marginBottom: '0.3rem', minHeight: 32, maxHeight: 70, resize: 'vertical' }}
        />
        <button
          onClick={handleRunPrompt}
          disabled={loading || !prompt.trim()}
          style={{ background: '#a05a2c', color: '#fff', borderRadius: 4, padding: '0.4rem 1rem', fontWeight: 600, fontSize: '1.05rem', textDecoration: 'none', border: 'none', marginTop: 0, marginBottom: 0, display: 'inline-block', cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer', opacity: loading || !prompt.trim() ? 0.6 : 1 }}
        >
          {loading ? 'Running...' : 'Run Prompt'}
        </button>
        {error && <div style={{ color: '#b91c1c', marginTop: '0.3rem', fontSize: '1.05rem' }}>{error}</div>}
        {response && (
          <div style={{ marginTop: '0.3rem' }}>
            <span style={{ color: '#a05a2c', fontWeight: 700, marginBottom: '0.1rem', display: 'block', fontSize: '1.05rem' }}>Response:</span>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '1.05rem', padding: '0.5rem 0.8rem', background: 'none' }}>{response}</pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '0.8rem', marginTop: '0.4rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem', marginTop: 0 }}>Additional Resources</h2>
        <ul style={{ color: '#444', marginTop: 0, fontSize: '1.05rem', paddingLeft: 16 }}>
          {promptType.resources.map((r, i) => (
            <li key={i} style={{ marginBottom: '0.2rem' }}>
              <a href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem', alignItems: 'center' }}>
        {prev ? (
          <Link href={`/prompt/${prev.key}`} style={{ color: '#a05a2c', textDecoration: 'underline', fontWeight: 600, fontSize: '0.92rem' }}>
            ← {prev.name}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/prompt/${next.key}`} style={{ color: '#a05a2c', textDecoration: 'underline', fontWeight: 600, fontSize: '0.92rem' }}>
            {next.name} →
          </Link>
        ) : <span />}
      </div>
      {next === null && (
        <div style={{ marginTop: '0.3rem', textAlign: 'center' }}>
          <button
            onClick={() => {
              stopTimer();
              router.push('/summary');
            }}
            style={{ background: '#a05a2c', color: '#fff', borderRadius: 4, padding: '0.4rem 1.1rem', fontWeight: 600, fontSize: '0.98rem', textDecoration: 'none', border: 'none', display: 'inline-block', cursor: 'pointer' }}
          >
            Finish
          </button>
        </div>
      )}
    </main>
  );
} 