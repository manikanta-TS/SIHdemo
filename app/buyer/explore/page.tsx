'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductQuickView } from '@/components/shared/ProductQuickView';
import { products, categories } from '@/lib/mock-data';
import { Search, SlidersHorizontal, Star, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'recommended', label: 'Curated Selection' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Patronized' },
  { value: 'newest', label: 'Recently Added' },
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
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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
    <div className="space-y-6 text-stone-900">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Explore Handcrafted Masterpieces</h1>
        <p className="text-xs text-stone-500 mt-1 font-mono">
          Authentic GI-verified handicrafts directly from master artisan families
        </p>
      </div>

      {/* Search & Action Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by craft technique, material, artisan name, or motif..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200/90 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 shadow-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Drawer Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border shadow-sm',
              showFilters || activeFiltersCount > 0
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white border-stone-200/90 text-stone-700 hover:border-stone-300'
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-stone-200/90 text-xs text-stone-700 focus:outline-none cursor-pointer shadow-sm"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-stone-900">
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
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-mono font-bold uppercase text-amber-800 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-amber-700" /> Refine By Craft Heritage
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs text-stone-500 hover:text-amber-800 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Filters
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-5 text-xs">
                {/* Craft Traditions */}
                <div>
                  <p className="text-stone-500 font-mono text-[10px] uppercase mb-2 font-semibold">Heritage Craft Technique</p>
                  <div className="flex flex-wrap gap-1.5">
                    {craftTypes.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleArray(selectedCrafts, c, setSelectedCrafts)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border shadow-xs',
                          selectedCrafts.includes(c)
                            ? 'bg-amber-100 border-amber-400 text-amber-900 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Provenance Regions */}
                <div>
                  <p className="text-stone-500 font-mono text-[10px] uppercase mb-2 font-semibold">Origin State / Region</p>
                  <div className="flex flex-wrap gap-1.5">
                    {regions.map((r) => (
                      <button
                        key={r}
                        onClick={() => toggleArray(selectedRegions, r, setSelectedRegions)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border shadow-xs',
                          selectedRegions.includes(r)
                            ? 'bg-peacock-50 border-peacock-300 text-peacock-900 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Natural Materials */}
                <div>
                  <p className="text-stone-500 font-mono text-[10px] uppercase mb-2 font-semibold">Natural Material Base</p>
                  <div className="flex flex-wrap gap-1.5">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => toggleArray(selectedMaterials, m, setSelectedMaterials)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border shadow-xs',
                          selectedMaterials.includes(m)
                            ? 'bg-terracotta-50 border-terracotta-300 text-terracotta-900 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
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

      {/* Active count bar */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
        <span>Showing {filtered.length} authentic handcrafted creations</span>
      </div>

      {/* Product Results Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-stone-900">No craft pieces match this filter</h3>
            <p className="text-xs text-stone-500 mt-1">Try resetting filters or expanding search keywords.</p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Clear All Criteria
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
