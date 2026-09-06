'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const { wishlist } = useApp();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center mb-5">
            <Heart className="w-10 h-10 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold">Your wishlist is empty</h1>
          <p className="text-gray-500 mt-2">Tap the heart on any product to save it here.</p>
          <Link href="/buyer/explore" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm">
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <p className="text-sm text-gray-500 mt-1">{wishlistProducts.length} saved items</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {wishlistProducts.map((p, i) => (
          <Link key={p.id} href={`/buyer/product/${p.id}`}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group bg-white rounded-2xl overflow-hidden border border-orange-100/60 shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-white/80"><Heart className="w-4 h-4 fill-red-500 text-red-500" /></div>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="font-semibold text-sm line-clamp-2">{p.name}</h3>
                <p className="text-xs text-gray-500">by {p.artisanName}</p>
                <p className="font-bold">₹{p.price.toLocaleString('en-IN')}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
