'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 border-purple-300/50 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 shadow-lg',
        className
      )}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-pulse" />
      </div>
      <div className="relative flex items-center gap-2 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-5 h-5 text-purple-600" />
        </motion.div>
        <h3 className="font-bold text-purple-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={i} className="flex items-center gap-3">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                  done
                    ? 'bg-green-500 text-white'
                    : active
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                )}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                className={cn(
                  'text-sm transition-colors',
                  done ? 'text-gray-600' : active ? 'text-purple-900 font-semibold' : 'text-gray-400'
                )}
              >
                {step}
              </span>
              {active && (
                <motion.div
                  className="ml-auto flex gap-1"
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-purple-500"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
