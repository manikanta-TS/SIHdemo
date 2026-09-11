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
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                    : isActive
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-110 font-black'
                    : 'bg-white/[0.04] border border-white/[0.08] text-zinc-500'
                )}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : i + 1}
              </div>
              <span
                className={cn(
                  'text-[11px] font-medium tracking-tight hidden md:block transition-colors',
                  isActive
                    ? 'text-amber-300 font-semibold'
                    : isDone
                    ? 'text-zinc-300'
                    : 'text-zinc-500'
                )}
              >
                {step}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
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
