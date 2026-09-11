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
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Master Artisans of India</h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Directly connect with certified generational craftspeople preserving national heritage
          </p>
        </div>
        <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit">
          12,480+ Verified Artisans
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search master artisans by name, village, or craft technique..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/40 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                selectedState === st
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold'
                  : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:border-white/20'
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
