'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { artisans, products } from '@/lib/mock-data';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProvenanceBadge } from '@/components/shared/ProvenanceBadge';
import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  Star,
  Users,
  Package,
  Globe2,
  Heart,
  Share2,
  Award,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ArtisanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [following, setFollowing] = useState(false);
  const artisanId = params.id as string;

  const artisan = artisans.find((a) => a.id === artisanId) || artisans[0];
  const artisanProducts = products.filter((p) => p.artisanId === artisan.id);

  return (
    <div className="space-y-8 text-stone-900">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Artisans Directory
      </button>

      {/* Artisan Master Profile Header */}
      <div className="rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-sm p-6 sm:p-10 relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-700/5 to-transparent pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-stone-200 shrink-0 shadow-md bg-stone-100">
            <Image src={artisan.image} alt={artisan.name} fill className="object-cover" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{artisan.name}</h1>
              {artisan.verified && <BadgeCheck className="w-6 h-6 text-emerald-600" />}
              <ProvenanceBadge type="gi-tag" label="GI Tag Authenticated" />
            </div>

            <p className="flex items-center gap-1.5 justify-center sm:justify-start text-xs text-stone-500 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>{artisan.village}, {artisan.state}</span>
              <span>·</span>
              <span className="text-amber-800 font-semibold">{artisan.yearsExperience} Years Traditional Craft Lineage</span>
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
                {artisan.craft}
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700">
                {artisan.specialization}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl pt-1">
              {artisan.story}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-stone-500 font-mono">
              <span className="flex items-center gap-1 text-stone-800 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {artisan.rating} Rating
              </span>
              <span>{artisan.followers.toLocaleString('en-IN')} Global Patrons</span>
              <span>{artisan.productsCount} Catalog Masterpieces</span>
              <span className="text-stone-400">Dialects: {artisan.languages.join(' · ')}</span>
            </div>

            <div className="flex gap-2 pt-3 justify-center sm:justify-start">
              <button
                onClick={() => {
                  setFollowing(!following);
                  toast(following ? 'Unfollowed artisan' : `Now following ${artisan.name}`);
                }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs',
                  following
                    ? 'bg-amber-700 text-white font-bold'
                    : 'bg-stone-900 hover:bg-amber-800 text-white'
                )}
              >
                <Heart className={cn('w-3.5 h-3.5', following && 'fill-current')} />
                <span>{following ? 'Patron Following' : 'Support & Follow'}</span>
              </button>

              <button
                onClick={() => toast.info('Custom bespoke commission request form triggered')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/90 text-xs font-semibold text-stone-700 shadow-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Custom Commission</span>
              </button>

              <button
                onClick={() => toast.success('Artisan profile link copied to clipboard')}
                className="p-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-700 shadow-xs transition-colors"
                aria-label="Share Artisan Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Artisan's Dedicated Collection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">{artisan.name}&apos;s Masterwork Collection</h2>
            <p className="text-xs text-stone-500 font-mono">100% handcrafted and individually certified</p>
          </div>
          <span className="text-xs font-mono text-stone-400">{artisanProducts.length} Available Works</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artisanProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
