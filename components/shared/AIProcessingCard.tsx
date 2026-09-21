'use client';

import { motion } from 'framer-motion';
import { Sparkles, Check, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIProcessingCardProps {
  title: string;
  steps: string[];
  currentStep: number;
  className?: string;
}

export function AIProcessingCard({ title, steps, currentStep, className }: AIProcessingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-[#E7E3DA] bg-white p-6 sm:p-7 shadow-editorial-md',
        className
      )}
    >
      {/* Top glowing amber accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="relative flex items-center justify-between mb-5 pb-3 border-b border-[#E7E3DA]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-[#1A1715] text-sm">{title}</h3>
            <p className="text-[11px] text-[#635F59] font-mono">Vision AI Engine Analyzing Craft</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
          STAGE {Math.min(currentStep + 1, steps.length)} / {steps.length}
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={i} className="flex items-center gap-3">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all',
                  done
                    ? 'bg-emerald-50 border border-emerald-500/40 text-emerald-700'
                    : active
                    ? 'bg-amber-500 text-[#1A1715] shadow-editorial-xs font-bold'
                    : 'bg-[#FAF8F5] border border-[#E7E3DA] text-[#8E887F]'
                )}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  'text-xs transition-colors',
                  done
                    ? 'text-[#1A1715]'
                    : active
                    ? 'text-amber-800 font-bold'
                    : 'text-[#8E887F]'
                )}
              >
                {step}
              </span>
              {active && (
                <div className="ml-auto flex items-center gap-1">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-amber-500"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
