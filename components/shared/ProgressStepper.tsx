'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProgressStepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="flex items-center justify-between w-full py-2 px-1">
      {steps.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300',
                  isDone
                    ? 'bg-emerald-50 border border-emerald-500/40 text-emerald-700'
                    : isActive
                    ? 'bg-amber-500 text-[#1A1715] shadow-editorial-sm scale-110 font-black'
                    : 'bg-[#FAF8F5] border border-[#E7E3DA] text-[#8E887F]'
                )}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : i + 1}
              </div>
              <span
                className={cn(
                  'text-[11px] font-medium tracking-tight hidden md:block transition-colors',
                  isActive
                    ? 'text-amber-800 font-bold'
                    : isDone
                    ? 'text-[#1A1715]'
                    : 'text-[#8E887F]'
                )}
              >
                {step}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 bg-[#E7E3DA] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                  initial={{ width: '0%' }}
                  animate={{ width: isDone ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
