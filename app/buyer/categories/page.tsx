'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories, products } from '@/lib/mock-data';
import { ShoppingBag, Shirt, Home as HomeIcon, Gem, TreePine, Palette, Coffee, Lightbulb, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag, Shirt, Home: HomeIcon, Gem, TreePine, Palette, Coffee, Lightbulb,
};

const colorMap: Record<string, string> = {
  saffron: 'from-orange-400 to-orange-500',
  magenta: 'from-pink-400 to-pink-500',
  turquoise: 'from-teal-400 to-teal-500',
  gold: 'from-amber-400 to-amber-500',
  coral: 'from-red-400 to-red-500',
  royal: 'from-blue-400 to-blue-500',
  teal: 'from-cyan-400 to-cyan-500',
  indigo: 'from-indigo-400 to-indigo-500',
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-sm text-gray-500 mt-1">Browse by craft type</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || ShoppingBag;
          const count = products.filter((p) => p.category === cat.name).length;
          return (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
              <Link href={`/buyer/explore?category=${encodeURIComponent(cat.name)}`}>
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorMap[cat.color]} text-white p-6 shadow-lg hover:shadow-xl transition-shadow`}>
                  <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-white/80">{count} products</p>
                  <ArrowRight className="w-4 h-4 mt-3 opacity-70" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
