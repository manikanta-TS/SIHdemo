'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export function ProgressStepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                i < current
                  ? 'bg-green-500 text-white'
                  : i === current
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white scale-110 shadow-lg'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                i <= current ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-1 mx-2 rounded-full bg-gray-200 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
                initial={{ width: '0%' }}
                animate={{ width: i < current ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
