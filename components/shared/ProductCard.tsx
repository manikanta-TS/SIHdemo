'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, MapPin, Sparkles, Eye } from 'lucide-react';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { toast } from 'sonner';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.28) }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-600/40 hover:shadow-xl hover:shadow-amber-950/5 transition-all duration-300"
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-[4/4.5] overflow-hidden bg-[#FAF7F2]">
        <Link href={`/buyer/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.trending && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" /> Trending
            </span>
          )}
          {product.region && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-white/90 backdrop-blur-md text-stone-700 rounded-md border border-stone-200 shadow-sm">
              <MapPin className="w-2.5 h-2.5 text-amber-700" /> {product.region}
            </span>
          )}
        </div>

        {/* Action Button Strip: Wishlist & Quick View */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
              toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist');
            }}
            className="p-2 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-white shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={cn(
                'w-3.5 h-3.5 transition-colors',
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-500'
              )}
            />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-stone-600 hover:text-amber-700 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label={`Quick view ${product.name}`}
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {product.originalPrice && (
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-md shadow-sm">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="font-semibold text-amber-700 tracking-wide uppercase text-[10px]">
              {product.craft}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-stone-800">{product.rating}</span>
              <span className="text-stone-400">({product.reviews})</span>
            </div>
          </div>

          <Link href={`/buyer/product/${product.id}`} className="group-hover:text-amber-800 transition-colors">
            <h3 className="font-serif font-semibold text-sm sm:text-base leading-snug text-stone-900 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
            <span>By</span>
            <span className="text-stone-800 font-medium">{product.artisanName}</span>
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-stone-900 font-mono">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product.id);
              toast.success(`Added ${product.name} to bag`);
            }}
            className="flex items-center justify-center p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
