import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TimerProvider } from '@/components/TimerProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt Mentor - Master AI Prompt Engineering",
  description: "Learn prompt engineering with 20 interactive techniques. Master AI communication through hands-on practice with zero-shot, few-shot, chain-of-thought, and advanced prompting methods.",
  keywords: ["prompt engineering", "AI prompting", "ChatGPT", "OpenAI", "AI communication", "prompt techniques", "AI training", "machine learning"],
  authors: [{ name: "Prompt Mentor" }],
  creator: "Prompt Mentor",
  publisher: "Prompt Mentor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://promptmentor.rayuduramisetti.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://promptmentor.rayuduramisetti.com',
    title: 'Prompt Mentor - Master AI Prompt Engineering',
    description: 'Learn prompt engineering with 20 interactive techniques. Master AI communication through hands-on practice with zero-shot, few-shot, chain-of-thought, and advanced prompting methods.',
    siteName: 'Prompt Mentor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prompt Mentor - Master AI Prompt Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Mentor - Master AI Prompt Engineering',
    description: 'Learn prompt engineering with 20 interactive techniques. Master AI communication through hands-on practice.',
    images: ['/og-image.png'],
    creator: '@promptmentor',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TimerProvider>
          {children}
        </TimerProvider>
      </body>
    </html>
  );
}
