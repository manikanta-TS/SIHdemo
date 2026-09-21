'use client';

import { useState, useMemo } from 'react';
import { artisans } from '@/lib/mock-data';
import { ArtisanCard } from '@/components/shared/ArtisanCard';
import { Search, MapPin, Award, Users } from 'lucide-react';

export default function ArtisansPage() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const states = ['all', 'Andhra Pradesh', 'Telangana', 'Madhya Pradesh'];

  const filtered = useMemo(() => {
    return artisans.filter((a) => {
      const matchQuery =
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.craft.toLowerCase().includes(query.toLowerCase()) ||
        a.village.toLowerCase().includes(query.toLowerCase());
      const matchState = selectedState === 'all' || a.state === selectedState;
      return matchQuery && matchState;
    });
  }, [query, selectedState]);

  return (
    <div className="space-y-6 text-stone-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Master Artisans of India</h1>
          <p className="text-xs text-stone-500 mt-1 font-mono">
            Directly connect with certified generational craftspeople preserving national heritage
          </p>
        </div>
        <span className="text-xs font-mono text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit font-semibold shadow-xs">
          12,480+ Verified Artisans
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search master artisans by name, village, or craft technique..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200/90 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-700/60 shadow-sm transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border shadow-xs ${
                selectedState === st
                  ? 'bg-amber-100/80 border-amber-300 text-amber-900 font-semibold'
                  : 'bg-white border-stone-200/80 text-stone-600 hover:border-stone-300'
              }`}
            >
              {st === 'all' ? 'All Origin States' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((a, i) => (
          <ArtisanCard key={a.id} artisan={a} index={i} />
        ))}
      </div>
    </div>
  );
}
