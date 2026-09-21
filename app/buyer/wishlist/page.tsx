'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/shared/ProductCard';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const { wishlist } = useApp();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-stone-900">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 shadow-sm">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">No saved craft pieces yet</h2>
            <p className="text-xs text-stone-500 mt-1">Tap the heart icon on any masterpiece to curate your private collection.</p>
          </div>
          <Link
            href="/buyer/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-stone-900">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Saved Pieces & Wishlist</h1>
        <p className="text-xs text-stone-500 mt-1 font-mono">
          {wishlistProducts.length} curated artisanal works saved for future patronage
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistProducts.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
