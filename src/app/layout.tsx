import type { Metadata } from 'next';
import './globals.css';
import { WhatsAppWidget } from '@/components';

export const metadata: Metadata = {
  metadataBase: new URL('https://allanfelipef.dev'),
  title: 'Allan Felipe | Desenvolvedor Full Stack & Mobile',
  description:
    'Desenvolvimento de landing pages, sites, aplicativos mobile e automações. Transformo ideias em produtos digitais que funcionam.',
  keywords: [
    'desenvolvedor',
    'full stack',
    'react',
    'react native',
    'next.js',
    'landing page',
    'aplicativo',
    'mobile',
    'freelancer',
    'brasil',
  ],
  authors: [{ name: 'Allan Felipe', url: 'https://allanfelipef.dev' }],
  creator: 'Allan Felipe',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://allanfelipef.dev',
    siteName: 'Allan Felipe - Dev',
    title: 'Allan Felipe | Desenvolvedor Full Stack & Mobile',
    description:
      'Desenvolvimento de landing pages, sites, aplicativos mobile e automações. Transformo ideias em produtos digitais que funcionam.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Allan Felipe - Desenvolvedor Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allan Felipe | Desenvolvedor Full Stack & Mobile',
    description:
      'Desenvolvimento de landing pages, sites, aplicativos mobile e automações.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0D9488" />
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}

