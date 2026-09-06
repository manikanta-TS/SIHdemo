'use client';

import { useApp } from '@/lib/store';
import { languages } from '@/lib/mock-data';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find((l) => l.code === language);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors',
          compact ? 'px-3 py-1.5' : 'px-4 py-2'
        )}
      >
        <Globe className="w-4 h-4 text-orange-600" />
        <span className="text-sm font-medium">{current?.nativeName || 'English'}</span>
        <ChevronDown className={cn('w-3.5 h-3.5 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-xl border border-orange-100 bg-white shadow-xl z-50 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors',
                  language === lang.code && 'bg-orange-50'
                )}
              >
                <div>
                  <span className="font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-gray-400 ml-2">{lang.name}</span>
                </div>
                {language === lang.code && <Check className="w-4 h-4 text-orange-600" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
