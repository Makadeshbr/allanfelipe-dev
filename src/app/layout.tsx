/**
 * ============================================
 * ROOT LAYOUT - Complete Edition
 * ============================================
 * 
 * Layout com AppShell que gerencia:
 * - PageLoader
 * - PageTransition
 * - CustomCursor
 * - Header/Footer
 * - ContactModal
 */

import type { Metadata } from 'next';
import { AppShell } from '@/components/layout';
import { LanguageProvider } from '@/context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Allan Felipe | Full-Stack Developer',
  description:
    'Desenvolvedor Full-Stack especializado em React, React Native, Next.js, Node.js e TypeScript. Transformando ideias em experiências digitais extraordinárias.',
  keywords: [
    'desenvolvedor full-stack',
    'react developer',
    'react native',
    'next.js',
    'node.js',
    'typescript',
    'javascript',
    'freelancer',
    'desenvolvimento web',
    'aplicativos mobile',
  ],
  authors: [{ name: 'Allan Felipe' }],
  creator: 'Allan Felipe',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://allanfelipe.dev',
    title: 'Allan Felipe | Full-Stack Developer',
    description:
      'Desenvolvedor Full-Stack especializado em criar experiências digitais únicas.',
    siteName: 'Allan Felipe Dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allan Felipe | Full-Stack Developer',
    description:
      'Desenvolvedor Full-Stack especializado em criar experiências digitais únicas.',
    creator: '@allanfelipe',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
