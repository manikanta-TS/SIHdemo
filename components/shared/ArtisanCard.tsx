'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, MapPin, BadgeCheck, ArrowUpRight, Award } from 'lucide-react';
import Link from 'next/link';
import type { Artisan } from '@/lib/types';

export function ArtisanCard({ artisan, index = 0 }: { artisan: Artisan; index?: number }) {
  return (
    <Link href={`/buyer/artisans/${artisan.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
        whileHover={{ y: -4 }}
        className="group relative flex flex-col bg-[#10121A] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
      >
        <div className="relative h-52 overflow-hidden bg-zinc-900">
          <Image
            src={artisan.image}
            alt={artisan.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10121A] via-black/30 to-transparent" />

          {/* Top verified badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{artisan.yearsExperience} Years Legacy</span>
          </div>

          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                {artisan.name}
              </h3>
              {artisan.verified && <BadgeCheck className="w-5 h-5 text-cyan-400 shrink-0" />}
            </div>
            <div className="flex items-center gap-1 text-xs text-zinc-300 mt-0.5">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{artisan.village}, {artisan.state}</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-semibold text-[11px]">
                {artisan.craft}
              </span>
              <span className="text-zinc-400 text-xs">{artisan.specialization}</span>
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{artisan.story}</p>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06] text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-zinc-200">{artisan.rating}</span>
            </div>
            <span className="text-zinc-400">{artisan.productsCount} items listed</span>
            <span className="text-zinc-500 font-mono">{artisan.followers.toLocaleString('en-IN')} patrons</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
