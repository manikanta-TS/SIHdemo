'use client';

import { useApp } from '@/lib/store';
import { languages } from '@/lib/mock-data';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
          'flex items-center gap-2 rounded-xl border border-stone-200/90 bg-white/80 hover:bg-stone-100/80 text-stone-700 hover:text-stone-900 shadow-sm transition-all',
          compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
        )}
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-amber-600" />
        <span className="font-medium">{current?.nativeName || 'English'}</span>
        <ChevronDown className={cn('w-3.5 h-3.5 text-stone-500 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 rounded-2xl border border-stone-200 bg-white/95 backdrop-blur-2xl shadow-xl z-50 overflow-hidden divide-y divide-stone-100"
          >
            <div className="p-2.5 bg-stone-50/80">
              <p className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider px-2">
                Supported Indic Languages
              </p>
            </div>
            <div className="max-h-64 overflow-y-auto p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                    toast.success(`Language set to ${lang.nativeName} (${lang.name})`);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors text-left',
                    language === lang.code
                      ? 'bg-amber-50 text-amber-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  )}
                >
                  <div>
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-[10px] text-stone-400 ml-1.5 font-mono">({lang.name})</span>
                  </div>
                  {language === lang.code && <Check className="w-3.5 h-3.5 text-amber-700" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
