import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AppProvider } from '@/lib/store';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Hastkala — From Artisan to Market, Powered by AI',
  description:
    'AI-Driven Market Linkage and Smart Cataloging for Marginalized Artisans. Empowering Hands. Connecting Markets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
