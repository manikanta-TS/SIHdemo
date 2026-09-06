'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  gradient: string;
  delay?: number;
}

export function StatCard({ label, value, icon, trend, trendUp, gradient, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-5 text-white shadow-lg',
        gradient
      )}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-full bg-white/5 blur-xl" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={cn('text-xs mt-1 font-medium', trendUp ? 'text-white/90' : 'text-white/70')}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">{icon}</div>
      </div>
    </motion.div>
  );
}
