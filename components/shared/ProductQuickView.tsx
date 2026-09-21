'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  MapPin,
  Sparkles,
  ArrowRight,
  Truck,
  Check,
  Share2,
} from 'lucide-react';
import { useApp } from '@/lib/store';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { cart, addToCart, updateCartQty, wishlist, toggleWishlist } = useApp();

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const cartItem = cart.find((i) => i.product.id === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success(`Added ${product.name} to your bag`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-[#FAF7F2] border border-stone-300/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white shadow-sm transition-all"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Left: Product Imagery & Provenance */}
            <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-stone-100 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold tracking-wide uppercase bg-emerald-700 text-white rounded-full shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> GI Authenticated
                </span>
                {product.trending && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold tracking-wide uppercase bg-amber-600 text-white rounded-full shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" /> Festival Special
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-2xl p-3 shadow-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="font-semibold text-stone-800">{product.region}</span>
                </div>
                <span className="text-[11px] font-mono text-stone-500">{product.craft}</span>
              </div>
            </div>

            {/* Right: Craft Details & Purchase Options */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-white">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                  <span className="font-mono uppercase font-bold tracking-wider text-amber-700">
                    {product.craft}
                  </span>
                  <div className="flex items-center gap-1 text-stone-700">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-stone-400">({product.reviews} reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
                  {product.name}
                </h2>

                <p className="text-xs text-stone-600 mt-1.5 flex items-center gap-1.5">
                  <span>Handcrafted by master artisan</span>
                  <span className="font-semibold text-stone-900">{product.artisanName}</span>
                </p>

                <p className="text-xs text-stone-600 mt-3.5 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Specs Pill Matrix */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-stone-100 text-[11px]">
                  <div className="p-2 rounded-xl bg-[#FAF7F2] border border-stone-200/70">
                    <span className="text-stone-400 block text-[10px]">Material</span>
                    <span className="font-semibold text-stone-800">{product.material}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF7F2] border border-stone-200/70">
                    <span className="text-stone-400 block text-[10px]">Technique</span>
                    <span className="font-semibold text-stone-800 truncate block">{product.technique}</span>
                  </div>
                </div>
              </div>

              {/* Pricing and Direct Impact Guarantee */}
              <div className="pt-3 border-t border-stone-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-stone-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-400 line-through font-mono">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    80% Direct to Artisan
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{qtyInCart > 0 ? `In Bag (${qtyInCart}) • Add More` : 'Add to Bag'}</span>
                  </button>

                  <button
                    onClick={() => {
                      toggleWishlist(product.id);
                      toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist');
                    }}
                    className={cn(
                      'p-3 rounded-xl border transition-all',
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-[#FAF7F2] border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-rose-50/50'
                    )}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={cn('w-4 h-4', isWishlisted && 'fill-rose-500')} />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                    Ships in {product.estimatedDelivery}
                  </span>
                  <Link
                    href={`/buyer/product/${product.id}`}
                    onClick={onClose}
                    className="font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                  >
                    <span>Full Story &amp; Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
