'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, MapPin, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import type { Artisan } from '@/lib/types';

export function ArtisanCard({ artisan, index = 0 }: { artisan: Artisan; index?: number }) {
  return (
    <Link href={`/buyer/artisans/${artisan.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -6 }}
        className="group bg-white rounded-2xl overflow-hidden border border-orange-100/60 shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={artisan.image}
            alt={artisan.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-lg">{artisan.name}</h3>
              {artisan.verified && <BadgeCheck className="w-5 h-5 text-cyan-400" />}
            </div>
            <div className="flex items-center gap-1 text-sm text-white/90">
              <MapPin className="w-3.5 h-3.5" />
              {artisan.village}, {artisan.state}
            </div>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium text-xs">
              {artisan.craft}
            </span>
            <span className="text-gray-500 text-xs">{artisan.yearsExperience} yrs exp</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{artisan.story}</p>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{artisan.rating}</span>
            </div>
            <span className="text-xs text-gray-500">{artisan.followers.toLocaleString('en-IN')} followers</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
