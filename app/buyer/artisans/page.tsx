'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { artisans, products } from '@/lib/mock-data';
import { ArtisanCard } from '@/components/shared/ArtisanCard';
import { ProductCard } from '@/components/shared/ProductCard';
import { ArrowLeft, MapPin, BadgeCheck, Star, Users, Package, Globe2, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ArtisansPage() {
  const params = useParams();
  const router = useRouter();
  const [following, setFollowing] = useState(false);
  const artisanId = params.id as string | undefined;

  if (artisanId) {
    const artisan = artisans.find((a) => a.id === artisanId);
    if (!artisan) return <div className="text-center py-20">Artisan not found</div>;
    const artisanProducts = products.filter((p) => p.artisanId === artisan.id);
    return (
      <div className="space-y-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"><ArrowLeft className="w-4 h-4" /> Back</button>
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-white/30 shrink-0"><Image src={artisan.image} alt={artisan.name} fill className="object-cover" sizes="160px" /></div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start"><h1 className="text-3xl font-bold">{artisan.name}</h1>{artisan.verified && <BadgeCheck className="w-6 h-6 text-cyan-300" />}</div>
              <p className="flex items-center gap-1 justify-center sm:justify-start text-white/80 mt-2 text-sm"><MapPin className="w-4 h-4" /> {artisan.village}, {artisan.state}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3"><span className="px-3 py-1 rounded-full bg-white/20 text-xs font-medium">{artisan.craft}</span><span className="px-3 py-1 rounded-full bg-white/20 text-xs font-medium">{artisan.specialization}</span></div>
              <p className="mt-4 text-white/90 text-sm leading-relaxed max-w-xl">{artisan.story}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-sm"><span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-300 text-yellow-300" /> {artisan.rating}</span><span className="flex items-center gap-1"><Users className="w-4 h-4" /> {artisan.followers.toLocaleString('en-IN')} followers</span><span className="flex items-center gap-1"><Package className="w-4 h-4" /> {artisan.productsCount} products</span><span className="flex items-center gap-1"><Globe2 className="w-4 h-4" /> {artisan.languages.join(', ')}</span></div>
              <div className="flex gap-2 mt-5 justify-center sm:justify-start"><button onClick={() => setFollowing(!following)} className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors', following ? 'bg-white text-orange-600' : 'bg-white/20 hover:bg-white/30')}><Heart className={cn('w-4 h-4', following && 'fill-current')} /> {following ? 'Following' : 'Follow'}</button><button className="p-2 rounded-full bg-white/20 hover:bg-white/30"><Share2 className="w-4 h-4" /></button></div>
            </div>
          </div>
        </div>
        <div><h2 className="text-xl font-bold mb-4">{artisan.name}'s Collection</h2><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">{artisanProducts.map((p, i) => <Link key={p.id} href={`/buyer/product/${p.id}`}><ProductCard product={p} index={i} /></Link>)}</div></div>
      </div>
    );
  }

  return (
    <div className="space-y-6"><div><h1 className="text-2xl font-bold">Meet the Artisans</h1><p className="text-sm text-gray-500 mt-1">The talented hands and stories behind every product</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{artisans.map((a, i) => <ArtisanCard key={a.id} artisan={a} index={i} />)}</div></div>
  );
}
