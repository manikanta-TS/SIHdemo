'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/shared/ProductCard';
import { products, searchSuggestions, categories } from '@/lib/mock-data';
import { Search, SlidersHorizontal, X, Star, Check, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'recommended', label: 'Curated Selection' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Patronized' },
  { value: 'newest', label: 'Newly Minted' },
];

const regions = ['Andhra Pradesh', 'Telangana', 'Madhya Pradesh', 'West Bengal', 'Uttar Pradesh', 'Kerala'];
const craftTypes = ['Kalamkari', 'Handloom Weaving', 'Terracotta', 'Woodcraft', 'Brass Craft', 'Bamboo Craft'];
const materials = ['Cotton', 'Silk', 'Terracotta Clay', 'Ankudu Wood', 'Brass', 'Bamboo'];

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCrafts, setSelectedCrafts] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedRegions([]);
    setSelectedCrafts([]);
    setSelectedMaterials([]);
    setPriceRange([0, 15000]);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.artisanName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedRegions.length) result = result.filter((p) => selectedRegions.includes(p.region));
    if (selectedCrafts.length) result = result.filter((p) => selectedCrafts.includes(p.craft));
    if (selectedMaterials.length) result = result.filter((p) => selectedMaterials.includes(p.material));

    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        result.reverse();
        break;
    }
    return result;
  }, [query, selectedCategory, priceRange, selectedRegions, selectedCrafts, selectedMaterials, sort]);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedRegions.length +
    selectedCrafts.length +
    selectedMaterials.length;

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Explore Handcrafted Masterworks</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Authentic GI-verified handicrafts direct from verified artisan lineages
        </p>
      </div>

      {/* Search & Action Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by craft technique, material, artisan name, or motif..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/40 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Drawer Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border',
              showFilters || activeFiltersCount > 0
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:border-white/20'
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center font-mono">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-300 focus:outline-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#10121A] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Drawer Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" /> Faceted Specimen Criteria
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-400 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Filters
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-5 text-xs">
                {/* Craft Traditions */}
                <div>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase mb-2">Heritage Craft Technique</p>
                  <div className="flex flex-wrap gap-1.5">
                    {craftTypes.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleArray(selectedCrafts, c, setSelectedCrafts)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
                          selectedCrafts.includes(c)
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/20'
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Provenance Regions */}
                <div>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase mb-2">Origin State / Region</p>
                  <div className="flex flex-wrap gap-1.5">
                    {regions.map((r) => (
                      <button
                        key={r}
                        onClick={() => toggleArray(selectedRegions, r, setSelectedRegions)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
                          selectedRegions.includes(r)
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/20'
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Natural Materials */}
                <div>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase mb-2">Natural Material Base</p>
                  <div className="flex flex-wrap gap-1.5">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => toggleArray(selectedMaterials, m, setSelectedMaterials)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
                          selectedMaterials.includes(m)
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/20'
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filters pill bar */}
      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
        <span>Showing {filtered.length} authentic handcrafted specimens</span>
      </div>

      {/* Product Results Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl bg-[#10121A] border border-white/[0.08] space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-500">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No specimens match criteria</h3>
            <p className="text-xs text-zinc-500 mt-1">Try expanding your price range or adjusting origin filters.</p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs transition-colors"
          >
            Clear All Criteria
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <Link key={p.id} href={`/buyer/product/${p.id}`}>
              <ProductCard product={p} index={i} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
