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
  title: 'Hastkala — Digital Platform for Indian Mastercraft & Artisans',
  description:
    'Discover, preserve, and acquire authentic Indian handcrafted masterpieces directly from master artisan lineages with certified geographical indication provenance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} bg-[#FBF9F5] text-[#1A1715] selection:bg-amber-500/20 selection:text-amber-900 min-h-screen antialiased`}>
        <AppProvider>
          {children}
          <CommandPalette />
          <Toaster theme="light" position="bottom-right" richColors />
        </AppProvider>
      </body>
    </html>
  );
}
