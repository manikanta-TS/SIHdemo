'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/shared/ProductCard';
import { ArtisanCard } from '@/components/shared/ArtisanCard';
import { products, artisans, categories, artisanStories } from '@/lib/mock-data';
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Shirt,
  Home as HomeIcon,
  Gem,
  TreePine,
  Palette,
  Coffee,
  Lightbulb,
  Quote,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Shirt,
  Home: HomeIcon,
  Gem,
  TreePine,
  Palette,
  Coffee,
  Lightbulb,
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

export default function BuyerHome() {
  const { wishlist } = useApp();
  const featured = products.filter((p) => p.featured);
  const trending = products.filter((p) => p.trending);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-8 sm:p-12">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full bg-yellow-300/20 blur-2xl" />
        <div className="relative max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Authentic Handcrafted Products
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-balance">
              Discover the hands behind every masterpiece.
            </h1>
            <p className="mt-3 text-lg text-white/90 max-w-xl">
              Shop authentic handcrafted products directly from India's talented artisans.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/buyer/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-orange-600 font-semibold text-sm hover:bg-orange-50 transition-colors"
              >
                <Search className="w-4 h-4" />
                Explore Products
              </Link>
              <Link
                href="/buyer/artisans"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/30 transition-colors"
              >
                Discover Artisans
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Floating product images */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute right-8 top-8 hidden md:block"
        >
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="w-24 h-28 rounded-xl overflow-hidden shadow-lg">
                <Image src={p.image} alt={p.name} width={96} height={112} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
          <Link href="/buyer/categories" className="text-sm text-orange-600 font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || ShoppingBag;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/buyer/explore?category=${encodeURIComponent(cat.name)}`}>
                  <div className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-br ${colorMap[cat.color]} text-white shadow-md hover:shadow-lg transition-shadow`}>
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-semibold text-center leading-tight">{cat.name}</span>
                    <span className="text-[10px] text-white/80">{cat.count} items</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-sm text-gray-500">Handpicked treasures from our artisans</p>
          </div>
          <Link href="/buyer/explore" className="text-sm text-orange-600 font-medium hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {featured.map((p, i) => (
            <Link key={p.id} href={`/buyer/product/${p.id}`}>
              <ProductCard product={p} index={i} />
            </Link>
          ))}
        </div>
      </section>

      {/* Artisan Stories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Artisan Stories</h2>
          <Link href="/buyer/artisans" className="text-sm text-orange-600 font-medium hover:underline">
            Meet all artisans
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {artisanStories.map((story, i) => {
            const artisan = artisans.find((a) => a.id === story.artisanId);
            return (
              <motion.div
                key={story.artisanId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/buyer/artisans/${story.artisanId}`}>
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 p-5 text-white">
                      <Quote className="w-6 h-6 mb-2 opacity-60" />
                      <h3 className="font-bold text-lg">{story.title}</h3>
                      <p className="text-sm text-white/80 mt-1 line-clamp-2">{story.excerpt}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-sm font-medium">{artisan?.name}</span>
                        <span className="text-xs text-white/60">· {artisan?.state}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trending */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Trending Crafts</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {trending.map((p, i) => (
            <Link key={p.id} href={`/buyer/product/${p.id}`}>
              <ProductCard product={p} index={i} />
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
