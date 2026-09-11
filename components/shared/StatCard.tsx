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
      className="relative overflow-hidden rounded-2xl p-5 bg-[#10121A] border border-white/[0.08] hover:border-white/[0.16] transition-all shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1.5 tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold font-mono',
                  trendUp
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                )}
              >
                {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trend}
              </span>
              <span className="text-[11px] text-zinc-500">vs last cycle</span>
            </div>
          )}
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-amber-400">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
