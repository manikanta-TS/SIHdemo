'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { PlusCircle, Package, Star, IndianRupee, Edit2, Eye, Sparkles, Filter, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SellerProductsPage() {
  const { sellerProducts } = useApp();
  const myProducts = [...sellerProducts, ...products.filter((p) => p.artisanId === 'a1')];
  const [filter, setFilter] = useState<'all' | 'in-stock' | 'featured'>('all');

  const filtered = myProducts.filter((p) => {
    if (filter === 'in-stock') return p.stock > 0;
    if (filter === 'featured') return p.featured;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Artisan Inventory & Catalog</h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            {myProducts.length} verified craft pieces currently in digital distribution
          </p>
        </div>
        <Link
          href="/seller/add-product"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shadow-md shadow-amber-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Scan New Craft</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: `All Catalog (${myProducts.length})` },
          { id: 'in-stock', label: 'Active Inventory' },
          { id: 'featured', label: 'Featured Showcases' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all border ${
              filter === tab.id
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-semibold'
                : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="flex flex-col bg-[#10121A] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/[0.16] transition-all group"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
              <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              {p.featured && (
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-mono font-bold">
                  Featured
                </span>
              )}
              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                {p.craft}
              </span>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-sm text-white line-clamp-2">{p.name}</h3>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="font-mono font-bold text-base text-white">₹{p.price.toLocaleString('en-IN')}</span>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{p.rating || '5.0'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1 font-mono">
                  <Package className="w-3 h-3 text-emerald-400" />
                  <span>{p.stock} units available in workshop</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => toast.info(`Quick edit modal for ${p.name}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs font-medium transition-colors"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <Link
                  href={`/buyer/product/${p.id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-medium transition-colors"
                >
                  <Eye className="w-3 h-3" /> Live View
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
