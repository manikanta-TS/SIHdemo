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
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm',
            className
          )}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          {label || 'GI Certified'}
        </span>
      );
    case 'verified-artisan':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-amber-50 border border-amber-200 text-amber-800 shadow-sm',
            className
          )}
        >
          <Award className="w-3.5 h-3.5 text-amber-700" />
          {label || 'Master Artisan'}
        </span>
      );
    case 'heritage-weave':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-50 border border-indigo-200 text-indigo-800 shadow-sm',
            className
          )}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
          {label || 'Heritage Technique'}
        </span>
      );
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-stone-100 border border-stone-200 text-stone-700 shadow-sm',
            className
          )}
        >
          <Sparkles className="w-3.5 h-3.5 text-stone-500" />
          {label || '100% Handcrafted'}
        </span>
      );
  }
}
