import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AppProvider } from '@/lib/store';
import { CommandPalette } from '@/components/shared/CommandPalette';
import { Toaster } from 'sonner';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Hastkala — AI-Driven Market Linkage for Artisans',
  description:
    'Smart India Hackathon Finalist — Autonomous craft recognition, pricing intelligence, and multilingual digital storefront generation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakarta.className} bg-[#08090D] text-white selection:bg-amber-500/20 selection:text-amber-300 min-h-screen antialiased`}>
        <AppProvider>
          {children}
          <CommandPalette />
          <Toaster theme="dark" position="bottom-right" richColors />
        </AppProvider>
      </body>
    </html>
  );
}
