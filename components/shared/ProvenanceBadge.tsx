import React from 'react';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProvenanceBadgeProps {
  type?: 'gi-tag' | 'verified-artisan' | 'handmade' | 'heritage-weave';
  label?: string;
  className?: string;
}

export function ProvenanceBadge({ type = 'gi-tag', label, className }: ProvenanceBadgeProps) {
  switch (type) {
    case 'gi-tag':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 backdrop-blur-md',
            className
          )}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          {label || 'GI Certified'}
        </span>
      );
    case 'verified-artisan':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-amber-950/60 border border-amber-500/30 text-amber-300 backdrop-blur-md',
            className
          )}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          {label || 'Master Artisan'}
        </span>
      );
    case 'heritage-weave':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 backdrop-blur-md',
            className
          )}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          {label || 'Heritage Technique'}
        </span>
      );
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/5 border border-white/10 text-zinc-300 backdrop-blur-md',
            className
          )}
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          {label || '100% Handcrafted'}
        </span>
      );
  }
}
