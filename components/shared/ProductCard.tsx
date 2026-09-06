'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, MapPin } from 'lucide-react';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-orange-100/60 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors',
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            )}
          />
        </button>
        {product.trending && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow">
            Trending
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute bottom-3 left-3 px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full shadow">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 space-y-2">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3" />
          <span>{product.artisanState}</span>
          <span className="mx-1">·</span>
          <span>{product.craft}</span>
        </div>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">by {product.artisanName}</p>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id);
            }}
            className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-110 active:scale-95 transition-transform shadow-md"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
