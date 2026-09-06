'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { products, artisans } from '@/lib/mock-data';
import { ProductCard } from '@/components/shared/ProductCard';
import { BadgeCheck, Star, Users, Package, MapPin, Globe2, Share2, Edit } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SellerStorePage() {
  const { sellerProducts } = useApp();
  const artisan = artisans.find((a) => a.id === 'a1')!;
  const myProducts = [...sellerProducts, ...products.filter((p) => p.artisanId === 'a1')];

  return (
    <div className="space-y-6">
      {/* Store hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-6 sm:p-10">
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white/30 shrink-0">
            <Image src={artisan.image} alt={artisan.name} fill className="object-cover" sizes="144px" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-bold">Lakshmi's Handcrafted Collection</h1>
              {artisan.verified && <BadgeCheck className="w-6 h-6 text-cyan-300" />}
            </div>
            <p className="flex items-center gap-1 justify-center sm:justify-start text-white/80 mt-2 text-sm"><MapPin className="w-4 h-4" /> {artisan.village}, {artisan.state}</p>
            <p className="mt-3 text-white/90 text-sm leading-relaxed max-w-xl">{artisan.story}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-300 text-yellow-300" /> {artisan.rating}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {artisan.followers.toLocaleString('en-IN')} followers</span>
              <span className="flex items-center gap-1"><Package className="w-4 h-4" /> {myProducts.length} products</span>
              <span className="flex items-center gap-1"><Globe2 className="w-4 h-4" /> {artisan.languages.join(', ')}</span>
            </div>
            <div className="flex gap-2 mt-5 justify-center sm:justify-start">
              <Link href="/seller/profile" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm font-semibold"><Edit className="w-4 h-4" /> Edit Store</Link>
              <button onClick={() => toast.success('Store link copied!')} className="p-2 rounded-full bg-white/20 hover:bg-white/30"><Share2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Products */}
      <div>
        <h2 className="text-xl font-bold mb-4">Products ({myProducts.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
