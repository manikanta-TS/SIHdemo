'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { PlusCircle, Package, Star, IndianRupee, Edit2, Eye } from 'lucide-react';

export default function SellerProductsPage() {
  const { sellerProducts } = useApp();
  const myProducts = [...sellerProducts, ...products.filter((p) => p.artisanId === 'a1')];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="text-sm text-gray-500 mt-1">{myProducts.length} products in your store</p>
        </div>
        <Link href="/seller/add-product" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">
          <PlusCircle className="w-4 h-4" /> Add Product
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myProducts.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl overflow-hidden border border-purple-100/60 shadow-sm hover:shadow-lg transition-shadow">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              {p.featured && <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs font-medium">Featured</span>}
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-sm line-clamp-2">{p.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">₹{p.price.toLocaleString('en-IN')}</span>
                <div className="flex items-center gap-1 text-xs text-gray-500"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {p.rating || 'New'}</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500"><Package className="w-3.5 h-3.5" /> {p.stock} in stock</div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium hover:bg-purple-100 transition-colors"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 transition-colors"><Eye className="w-3.5 h-3.5" /> View</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
