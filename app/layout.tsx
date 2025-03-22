import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from 'geist/font/sans';
import 'katex/dist/katex.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Metadata, Viewport } from "next";
import { Syne, Montserrat } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL("https://scira.ai"),
  title: "ذكي AI",
  description: "ذكي AI is a minimalistic AI-powered search engine that helps you find information on the internet.",
  openGraph: {
    url: "https://scira.ai",
    siteName: "ذكي AI",
  },
  keywords: [
    "ذكي ai",
    "ذكي AI",
    "AI search engine",
    "ذكي",
    "ai search engine",
    "open source ai search engine",
    "minimalistic ai search engine",
    "ai search engine",
    "AI Search Engine",
    "search engine",
    "AI",
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' }
  ],
}

const syne = Syne({ 
  subsets: ['latin'], 
  variable: '--font-syne',
  preload: true,
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  preload: true,
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`bg-black min-h-screen ${GeistSans.variable} ${syne.variable} ${montserrat.variable}`}>
        <NuqsAdapter>
          <Providers>
            <Toaster position="top-center" richColors theme="system" />
            {children}
          </Providers>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  )
}
