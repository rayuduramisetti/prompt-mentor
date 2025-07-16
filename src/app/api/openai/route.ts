import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ 
      error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.' 
    }, { status: 500 });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt },
        ],
        max_tokens: 256,
        temperature: 0.7,
      }),
    });
    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      let errorMessage = errorText;
      
      // Provide more helpful error messages for common issues
      if (openaiRes.status === 401) {
        errorMessage = 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env.local';
      } else if (openaiRes.status === 429) {
        errorMessage = 'OpenAI API rate limit exceeded. Please try again in a moment.';
      } else if (openaiRes.status === 402) {
        errorMessage = 'OpenAI API quota exceeded. Please check your billing at platform.openai.com';
      }
      
      return NextResponse.json({ error: errorMessage }, { status: openaiRes.status });
    }
    const data = await openaiRes.json();
    const result = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'OpenAI request failed' }, { status: 500 });
  }
} 