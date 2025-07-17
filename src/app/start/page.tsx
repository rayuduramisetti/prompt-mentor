"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

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
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', maxWidth: 600, margin: '0 auto', padding: 0 }}>
      <h1 style={{ fontSize: '2.1rem', fontWeight: 700, marginBottom: '1rem', color: '#a05a2c', fontFamily: 'Merriweather, Georgia, serif' }}>
        Unlock the Power of Prompting
      </h1>
      <p style={{ fontSize: '1.05rem', color: '#444', maxWidth: 480, marginBottom: '1.2rem', marginTop: 0 }}>
        In this new era of AI, <b>prompt engineering</b> is the skill that lets you communicate, create, and innovate with language models. Whether you’re a developer, writer, or curious learner, mastering prompts will help you get the most out of AI tools like ChatGPT, Copilot, and more.
      </p>
      <div style={{ color: '#a05a2c', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2em', display: 'block' }}>
        Did you know?
      </div>
      <div style={{ color: '#000', fontSize: '1.45rem', fontWeight: 400, marginBottom: '1.1rem', width: 540, textAlign: 'center', minHeight: '3.2em', maxHeight: '3.2em', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'all 0.3s' }}>
        {displayed}
        {typing && <span style={{ display: 'inline-block', width: 10, marginLeft: 2, background: '#a05a2c', height: 26, verticalAlign: 'middle', animation: 'blink 1s steps(1) infinite' }} />}
      </div>
      <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
      <div style={{ marginTop: '0.3rem', marginBottom: '0.7rem', maxWidth: 420 }}>
        <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#a05a2c', marginBottom: '0.4rem' }}>Have 5 minutes?</div>
        <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: '1.1rem' }}>
          Let me give you a quick, interactive overview of what prompt engineering is and why it matters. You’ll see real examples, try prompts yourself, and learn the essentials—fast.
        </div>
        <Link href="/prompt/zero-shot" style={{ background: '#a05a2c', color: '#fff', borderRadius: 6, padding: '0.7rem 1.7rem', fontWeight: 700, fontSize: '1.08rem', textDecoration: 'none', boxShadow: '0 2px 8px #0001', display: 'inline-block' }}>
          Start
        </Link>
      </div>
    </main>
  );
} 