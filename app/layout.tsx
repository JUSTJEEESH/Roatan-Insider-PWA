import type { Metadata, Viewport } from 'next';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { InstallPrompt } from '@/components/layout/InstallPrompt';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Roatán Insiders | Your Island Guide',
    template: '%s | Roatán Insiders',
  },
  description:
    'Your insider guide to Roatán, Honduras. Curated restaurants, dive shops, tours, beaches, and travel tools — all working offline.',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Roatán Insiders',
    title: 'Roatán Insiders | Your Island Guide',
    description:
      'Your insider guide to Roatán, Honduras. Works offline.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roatán Insiders | Your Island Guide',
    description:
      'Your insider guide to Roatán, Honduras. Works offline.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0C6478',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col md:flex-row">
          <Header />
          <BottomNav />
          <main className="flex-1 pb-20 md:pb-0 md:ml-20 lg:ml-56">
            {children}
          </main>
        </div>
        <InstallPrompt />
      </body>
    </html>
  );
}
