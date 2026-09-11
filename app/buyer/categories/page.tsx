'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories, products } from '@/lib/mock-data';
import { 
  ShoppingBag, 
  Shirt, 
  Home as HomeIcon, 
  Gem, 
  TreePine, 
  Palette, 
  Coffee, 
  Lightbulb, 
  ArrowUpRight, 
  Layers, 
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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

const categoryDescriptions: Record<string, { desc: string; regions: string[]; materials: string[] }> = {
  'Textiles & Apparel': {
    desc: 'Handloom weaving, block printing, and heritage embroidery from historic weaving clusters.',
    regions: ['Varanasi', 'Kashmir', 'Chanderi', 'Sambalpur'],
    materials: ['Mulberry Silk', 'Pashmina Wool', 'Organic Cotton'],
  },
  'Pottery & Ceramics': {
    desc: 'Quartz and fuller-earth glazed terracotta sculpted on manual kick wheels.',
    regions: ['Jaipur', 'Khurja', 'Nizamabad'],
    materials: ['Quartz Frit', 'Natural Glaze', 'River Terracotta'],
  },
  'Jewelry & Accessories': {
    desc: 'Filigree, Kundan, and Dhokra lost-wax ornaments crafted with generational precision.',
    regions: ['Cuttack', 'Jaipur', 'Bastar'],
    materials: ['Sterling Silver', 'Brass Alloy', 'Natural Stones'],
  },
  'Home Decor': {
    desc: 'Artisanal brassware, marble inlay, and hand-carved accents celebrating royal heritage.',
    regions: ['Moradabad', 'Agra', 'Saharanpur'],
    materials: ['Pure Brass', 'Makrana Marble', 'Cast Iron'],
  },
  'Paintings & Art': {
    desc: 'Indigenous folk and tribal storytelling rendered on handmade papers and treated fabrics.',
    regions: ['Madhubani', 'Warli', 'Patachitra'],
    materials: ['Mineral Pigments', 'Handmade Paper', 'Rice Paste'],
  },
  'Woodwork': {
    desc: 'Intricate fretwork, jaali panels, and turned woodwork from seasoned hardwood forests.',
    regions: ['Saharanpur', 'Kashmir', 'Channapatna'],
    materials: ['Sheesham Wood', 'Walnut Wood', 'Ivory Wood'],
  },
  'Metal Crafts': {
    desc: 'Ancient lost-wax bell metal casting, Bidriware damascening, and repoussé art.',
    regions: ['Bastar', 'Bidar', 'Moradabad'],
    materials: ['Bell Metal', 'Zinc-Copper Alloy', 'Silver Wire'],
  },
  'Lighting & Diyas': {
    desc: 'Perforated brass lanterns, terracotta oil lamps, and atmospheric ambient illuminations.',
    regions: ['Moradabad', 'Gorakhpur', 'Kutch'],
    materials: ['Etched Brass', 'Clay Ceramic', 'Copper Sheet'],
  },
};

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((cat) => {
    const query = searchQuery.toLowerCase();
    const meta = categoryDescriptions[cat.name];
    return (
      cat.name.toLowerCase().includes(query) ||
      (meta && meta.desc.toLowerCase().includes(query)) ||
      (meta && meta.regions.some((r) => r.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#151824] to-[#0D0E15] p-8 md:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Guilds & Traditions</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-serif">
            The Craft <span className="italic font-light text-amber-400">Atlas</span>
          </h1>

          <p className="mt-3 text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl">
            Explore India’s timeless artisanal disciplines. Every guild represents centuries of verified
            lineage, sovereign intellectual property, and authentic Geographical Indications.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Search craft guilds, regions, or materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-zinc-600 focus-visible:ring-amber-500/50 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Aggregate Stats Pill */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% GI-Tagged Lineages</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>8 Master Guild Disciplines</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-zinc-200">{products.length}</span> Masterworks Indexed
          </div>
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || ShoppingBag;
          const count = products.filter((p) => p.category === cat.name).length;
          const meta = categoryDescriptions[cat.name] || {
            desc: 'Indigenous crafts hand-created by verified guild masters.',
            regions: ['National Lineage'],
            materials: ['Natural Resources'],
          };

          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group h-full"
            >
              <Link
                href={`/buyer/explore?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col justify-between h-full rounded-2xl border border-white/[0.08] bg-[#10121A]/80 hover:bg-[#151824] hover:border-amber-500/40 p-6 transition-all duration-300 shadow-lg hover:shadow-amber-500/5 backdrop-blur-sm relative overflow-hidden"
              >
                {/* Subtle top edge accent glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/0 group-hover:via-amber-500/60 to-transparent transition-all duration-500" />

                <div>
                  {/* Icon & Count Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-500/40 group-hover:bg-amber-500/10 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <Badge variant="outline" className="border-white/[0.1] bg-white/[0.03] text-zinc-400 group-hover:border-amber-500/30 group-hover:text-amber-300 text-[11px] font-mono">
                      {count} {count === 1 ? 'piece' : 'pieces'}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                    {cat.name}
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">
                    {meta.desc}
                  </p>

                  {/* Regional Provenance Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {meta.regions.map((reg) => (
                      <span
                        key={reg}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-400"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 group-hover:text-amber-400 transition-colors">
                  <span className="font-medium">Explore Guild</span>
                  <span className="text-[11px] font-mono text-zinc-600 group-hover:text-amber-400/80">View collection →</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
