'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  gradient?: string;
  delay?: number;
}

export function StatCard({ label, value, icon, trend, trendUp = true, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-2xl p-5 bg-white border border-stone-200/90 hover:border-amber-500/40 hover:shadow-md transition-all shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 mt-1.5 tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold font-mono',
                  trendUp
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                )}
              >
                {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trend}
              </span>
              <span className="text-[11px] text-stone-400">vs last cycle</span>
            </div>
          )}
        </div>
        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-800">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
