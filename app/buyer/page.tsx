'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProvenanceBadge } from '@/components/shared/ProvenanceBadge';
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
  ShieldCheck,
  Award,
  ArrowUpRight,
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

export default function BuyerHome() {
  const { wishlist } = useApp();
  const featured = products.filter((p) => p.featured);
  const trending = products.filter((p) => p.trending);

  return (
    <div className="space-y-12 text-white">
      {/* Editorial Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-[#10121A] border border-white/[0.08] p-8 sm:p-12">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-amber-500/10 via-amber-600/5 to-transparent pointer-events-none" />

        <div className="relative max-w-2xl space-y-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Geographical Indication (GI) Provenance</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Acquire authentic craft directly from the <span className="heritage-text-gradient">master artisans.</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl text-balance">
              Zero middlemen markups. Every acquisition directly sustains indigenous craftsmanship and guarantees 80%+ revenue disbursement to artisan families.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/buyer/explore"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Explore Verified Collection</span>
              </Link>

              <Link
                href="/buyer/artisans"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-semibold text-xs transition-colors"
              >
                <span>Meet Master Artisans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Verified Specimen Preview */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-3 pointer-events-none">
          {products.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="w-32 h-44 rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl bg-zinc-900"
            >
              <Image src={p.image} alt={p.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono">
                <p className="font-bold text-white truncate">{p.name}</p>
                <p className="text-amber-400">₹{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Craft Categories Ribbon */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Curated Craft Traditions</h2>
            <p className="text-xs text-zinc-400 font-mono">Filter by authentic indigenous techniques</p>
          </div>
          <Link href="/buyer/categories" className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono">
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || ShoppingBag;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2 }}
              >
                <Link href={`/buyer/explore?category=${encodeURIComponent(cat.name)}`}>
                  <div className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-[#10121A] border border-white/[0.08] hover:border-amber-500/40 text-center transition-all group">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors leading-tight">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">{cat.count} pieces</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Masterworks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Featured Masterpieces</h2>
            <p className="text-xs text-zinc-400 font-mono">Individually appraised for heritage integrity and material authenticity</p>
          </div>
          <Link href="/buyer/explore" className="text-xs text-amber-400 hover:underline font-mono">
            Explore All Catalog
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p, i) => (
            <Link key={p.id} href={`/buyer/product/${p.id}`}>
              <ProductCard product={p} index={i} />
            </Link>
          ))}
        </div>
      </section>

      {/* Meet the Artisans & Heritage Stories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Artisan Guild Chronicles</h2>
            <p className="text-xs text-zinc-400 font-mono">Generational histories and community preservation</p>
          </div>
          <Link href="/buyer/artisans" className="text-xs text-amber-400 hover:underline font-mono">
            Meet All 12,480+ Artisans
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {artisanStories.map((story, i) => {
            const artisan = artisans.find((a) => a.id === story.artisanId);
            return (
              <motion.div
                key={story.artisanId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/buyer/artisans/${story.artisanId}`}>
                  <div className="relative h-72 rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/[0.18] group bg-zinc-900 shadow-xl">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-black/40 to-transparent" />

                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-amber-400 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>

                    <div className="absolute bottom-0 p-5 text-white space-y-1.5">
                      <ProvenanceBadge type="verified-artisan" label={`${artisan?.yearsExperience}y Master Legacy`} />
                      <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {story.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{story.excerpt}</p>
                      <div className="flex items-center gap-2 pt-1 text-xs text-zinc-300 font-mono">
                        <span className="font-semibold">{artisan?.name}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-amber-400">{artisan?.craft}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trending Craftsmanship */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Trending Crafts This Week</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
