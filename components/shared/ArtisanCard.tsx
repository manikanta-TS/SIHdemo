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
        className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-700/40 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300 cursor-pointer"
      >
        <div className="relative h-56 overflow-hidden bg-stone-100">
          <Image
            src={artisan.image}
            alt={artisan.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top verified badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-semibold text-amber-900 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{artisan.yearsExperience} Years Legacy</span>
          </div>

          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 flex items-center justify-center text-stone-700 group-hover:text-amber-700 group-hover:border-amber-300 transition-colors shadow-sm">
            <ArrowUpRight className="w-4 h-4" />
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition-colors drop-shadow-sm">
                {artisan.name}
              </h3>
              {artisan.verified && <BadgeCheck className="w-5 h-5 text-emerald-400 shrink-0" />}
            </div>
            <div className="flex items-center gap-1 text-xs text-stone-200 mt-0.5">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{artisan.village}, {artisan.state}</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-semibold text-[11px]">
                {artisan.craft}
              </span>
              <span className="text-stone-500 text-xs">{artisan.specialization}</span>
            </div>
            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{artisan.story}</p>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-stone-100 text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-bold text-stone-800">{artisan.rating}</span>
            </div>
            <span className="text-stone-600">{artisan.productsCount} items listed</span>
            <span className="text-stone-500 font-mono">{artisan.followers.toLocaleString('en-IN')} patrons</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
