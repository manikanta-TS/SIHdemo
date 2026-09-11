'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { toast } from 'sonner';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col bg-[#10121A] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300"
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-[4/4.5] overflow-hidden bg-zinc-900/60">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Ambient Dark Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10121A] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.trending && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black rounded-full shadow-lg">
              <Sparkles className="w-3 h-3" /> Trending
            </span>
          )}
          {product.region && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-black/60 backdrop-blur-md text-zinc-300 rounded-md border border-white/10">
              <MapPin className="w-2.5 h-2.5 text-amber-400" /> {product.region}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
            toast(isWishlisted ? 'Removed from saved items' : 'Saved to wishlist');
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 hover:text-rose-400 hover:bg-black/80 transition-all z-10"
          aria-label="Save to wishlist"
        >
          <Heart
            className={cn(
              'w-3.5 h-3.5 transition-colors',
              isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-zinc-300'
            )}
          />
        </button>

        {product.originalPrice && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-md">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="font-medium text-amber-400/90">{product.craft}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-zinc-200">{product.rating}</span>
              <span className="text-zinc-500">({product.reviews})</span>
            </div>
          </div>

          <h3 className="font-semibold text-sm leading-snug text-zinc-100 line-clamp-2 group-hover:text-amber-300 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
            <span>By</span>
            <span className="text-zinc-300 font-medium">{product.artisanName}</span>
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-white font-mono">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product.id);
              toast.success(`Added ${product.name} to cart`);
            }}
            className="flex items-center justify-center p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
