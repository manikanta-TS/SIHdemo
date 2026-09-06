'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/shared/ProductCard';
import { products, searchSuggestions, categories } from '@/lib/mock-data';
import { Search, SlidersHorizontal, X, Star, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
];

const regions = ['Andhra Pradesh', 'Telangana', 'Madhya Pradesh', 'West Bengal', 'Uttar Pradesh', 'Kerala'];
const craftTypes = ['Kalamkari', 'Handloom Weaving', 'Terracotta', 'Woodcraft', 'Brass Craft', 'Bamboo Craft', 'Madhubani Painting', 'Wire-wrapping'];
const materials = ['Cotton', 'Silk', 'Terracotta Clay', 'Ankudu Wood', 'Brass', 'Bamboo', 'Stone & Wire', 'Canvas'];

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCrafts, setSelectedCrafts] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
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
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);
    if (verifiedOnly) result = result.filter((p) => p.tags.includes('Handmade'));

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break;
      case 'newest': result.reverse(); break;
    }
    return result;
  }, [query, selectedCategory, priceRange, selectedRegions, selectedCrafts, selectedMaterials, minRating, verifiedOnly, sort]);

  const activeFilters =
    (selectedCategory ? 1 : 0) +
    selectedRegions.length +
    selectedCrafts.length +
    selectedMaterials.length +
    (minRating > 0 ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search products, artisans, crafts..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-orange-100 text-sm focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-colors',
              showFilters ? 'bg-orange-500 text-white' : 'bg-white/80 border border-orange-100 text-gray-700'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilters > 0 && (
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>
        <AnimatePresence>
          {showSuggestions && !query && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 left-0 right-0 rounded-2xl bg-white shadow-xl border border-orange-100 p-3 z-20"
            >
              <p className="text-xs text-gray-400 font-medium px-2 mb-2">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={() => setQuery(s)}
                    className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm hover:bg-orange-100 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => setSelectedCategory('')}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
            !selectedCategory ? 'bg-orange-500 text-white' : 'bg-white/80 border border-orange-100 text-gray-700'
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              selectedCategory === cat.name ? 'bg-orange-500 text-white' : 'bg-white/80 border border-orange-100 text-gray-700'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {/* Filters sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="w-64 space-y-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">Filters</h3>
                  {activeFilters > 0 && (
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setSelectedRegions([]);
                        setSelectedCrafts([]);
                        setSelectedMaterials([]);
                        setMinRating(0);
                        setVerifiedOnly(false);
                        setPriceRange([0, 15000]);
                      }}
                      className="text-xs text-orange-600 hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Sort */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Sort by</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-orange-100 text-sm bg-white"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Price Range</label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-2 py-1.5 rounded-lg border border-orange-100 text-sm"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-2 py-1.5 rounded-lg border border-orange-100 text-sm"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Min Rating</label>
                  <div className="flex gap-1 mt-2">
                    {[0, 3, 4, 4.5].map((r) => (
                      <button
                        key={r}
                        onClick={() => setMinRating(r)}
                        className={cn(
                          'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors',
                          minRating === r ? 'bg-orange-500 text-white' : 'bg-orange-50 text-gray-700'
                        )}
                      >
                        {r === 0 ? 'Any' : (
                          <>
                            <Star className="w-3 h-3 fill-current" /> {r}+
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified */}
                <div>
                  <button
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <div className={cn('w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors', verifiedOnly ? 'bg-orange-500 border-orange-500' : 'border-gray-300')}>
                      {verifiedOnly && <Check className="w-3 h-3 text-white" />}
                    </div>
                    Handmade & Verified only
                  </button>
                </div>

                {/* Region */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Region</label>
                  <div className="space-y-1 mt-1">
                    {regions.map((r) => (
                      <button
                        key={r}
                        onClick={() => toggleArray(selectedRegions, r, setSelectedRegions)}
                        className={cn(
                          'block w-full text-left px-2 py-1 rounded-lg text-sm transition-colors',
                          selectedRegions.includes(r) ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-600 hover:bg-orange-50'
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Craft */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Craft Type</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {craftTypes.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleArray(selectedCrafts, c, setSelectedCrafts)}
                        className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium transition-colors',
                          selectedCrafts.includes(c) ? 'bg-orange-500 text-white' : 'bg-orange-50 text-gray-700'
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Material</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => toggleArray(selectedMaterials, m, setSelectedMaterials)}
                        className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium transition-colors',
                          selectedMaterials.includes(m) ? 'bg-orange-500 text-white' : 'bg-orange-50 text-gray-700'
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-3">{filtered.length} products found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No products match your filters</p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('');
                  setSelectedRegions([]);
                  setSelectedCrafts([]);
                  setSelectedMaterials([]);
                  setMinRating(0);
                  setPriceRange([0, 15000]);
                }}
                className="mt-4 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((p, i) => (
                <Link key={p.id} href={`/buyer/product/${p.id}`}>
                  <ProductCard product={p} index={i} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
