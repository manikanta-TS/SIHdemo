'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { products, artisans } from '@/lib/mock-data';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProvenanceBadge } from '@/components/shared/ProvenanceBadge';
import { BadgeCheck, Star, Users, Package, MapPin, Globe2, Share2, Edit, Award } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SellerStorePage() {
  const { sellerProducts } = useApp();
  const artisan = artisans.find((a) => a.id === 'a1')!;
  const myProducts = [...sellerProducts, ...products.filter((p) => p.artisanId === 'a1')];

  return (
    <div className="space-y-6 text-white">
      {/* Store Header Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-[#10121A] border border-white/[0.08] p-6 sm:p-8"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-white/20 shrink-0 shadow-2xl">
            <Image src={artisan.image} alt={artisan.name} fill className="object-cover" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Lakshmi Devi&apos;s Artisan Guild</h1>
              {artisan.verified && <BadgeCheck className="w-5 h-5 text-cyan-400" />}
              <ProvenanceBadge type="gi-tag" label="GI Authenticated" />
            </div>

            <p className="flex items-center gap-1.5 justify-center sm:justify-start text-zinc-400 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{artisan.village}, {artisan.state}</span>
              <span>·</span>
              <span className="text-amber-400">{artisan.yearsExperience} Years Traditional Weave Legacy</span>
            </p>

            <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl pt-1">{artisan.story}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1 text-white">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {artisan.rating} Rating
              </span>
              <span>{artisan.followers.toLocaleString('en-IN')} Global Patrons</span>
              <span>{myProducts.length} Verified Masterpieces</span>
              <span className="text-zinc-500">{artisan.languages.join(' · ')}</span>
            </div>

            <div className="flex gap-2 pt-3 justify-center sm:justify-start">
              <Link
                href="/seller/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-zinc-200 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" /> Edit Profile & Guild Story
              </Link>
              <button
                onClick={() => toast.success('Public storefront link copied to clipboard!')}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 transition-colors"
                aria-label="Share Storefront"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Artisan Showcase ({myProducts.length})</h2>
          <span className="text-xs text-zinc-500 font-mono">Worldwide Delivery Available</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {myProducts.map((p, i) => (
            <Link key={p.id} href={`/buyer/product/${p.id}`}>
              <ProductCard product={p} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
