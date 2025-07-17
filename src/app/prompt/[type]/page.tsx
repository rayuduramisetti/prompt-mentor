"use client";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { promptTypes } from '@/config/promptTypes';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function PromptTypePage() {
  const params = useParams();
  const type = params.type as string;
  
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const promptType = promptTypes.find((pt) => pt.key === type);
  const idx = promptTypes.findIndex((pt) => pt.key === type);
  const prev = idx > 0 ? promptTypes[idx - 1] : null;
  const next = idx < promptTypes.length - 1 ? promptTypes[idx + 1] : null;

  useEffect(() => {
    if (promptType && prompt === '') {
      setPrompt(promptType.example);
    }
  }, [promptType, prompt]);

  if (!promptType) return notFound();

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
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-semibold text-gray-900">{promptType.name}</h1>
            <p className="text-gray-600 text-sm">{promptType.description}</p>
          </div>
          
          <section className="space-y-3">
            <h2 className="text-gray-900 text-base font-medium">Example Prompt</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm font-mono whitespace-pre-wrap">
              {promptType.example}
            </div>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-gray-900 text-base font-medium">Analogies</h2>
            <div className="bg-gray-50 rounded-md p-4">
              <ul className="space-y-2 text-gray-600 text-sm">
                {promptType.analogies.map((a, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-gray-900 text-base font-medium">Try it Yourself</h2>
            <div className="space-y-3">
              <textarea
                rows={3}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 resize-vertical min-h-[80px]"
                placeholder="Edit the prompt and try it..."
              />
              <button
                onClick={handleRunPrompt}
                disabled={loading || !prompt.trim()}
                className="w-full bg-gray-900 text-white rounded-md px-4 py-2 font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Running...' : 'Run Prompt'}
              </button>
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
                  {error}
                </div>
              )}
              {response && (
                <div className="space-y-2">
                  <div className="text-gray-900 text-sm font-medium">Response:</div>
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm font-mono whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              )}
            </div>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-gray-900 text-base font-medium">Additional Resources</h2>
            <div className="space-y-2">
              {promptType.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-900 hover:text-gray-600 underline"
                >
                  {r.label}
                </a>
              ))}
            </div>
          </section>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            {prev ? (
              <Link 
                href={`/prompt/${prev.key}`} 
                className="bg-white border border-gray-300 text-gray-900 rounded-md px-4 py-2 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                ← Previous
              </Link>
            ) : (
              <Link 
                href="/start" 
                className="bg-white border border-gray-300 text-gray-900 rounded-md px-4 py-2 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                ← Back to Home
              </Link>
            )}
            
            {next ? (
              <Link 
                href={`/prompt/${next.key}`} 
                className="bg-gray-900 text-white rounded-md px-4 py-2 font-medium text-sm hover:bg-gray-800 transition-colors"
              >
                Next →
              </Link>
            ) : (
              <Link 
                href="/summary" 
                className="bg-gray-900 text-white rounded-md px-4 py-2 font-medium text-sm hover:bg-gray-800 transition-colors"
              >
                Finish
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}