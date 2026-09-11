'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApp } from '@/lib/store';
import { products, artisans } from '@/lib/mock-data';
import { ProvenanceBadge } from '@/components/shared/ProvenanceBadge';
import {
  Star,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  MapPin,
  Truck,
  Package,
  Check,
  BadgeCheck,
  ArrowLeft,
  Store,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const product = products.find((p) => p.id === id) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  const artisan = artisans.find((a) => a.id === product.artisanId) || artisans[0];
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, qty);
    toast.success(`${product.name} (Qty: ${qty}) added to your bag`);
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    router.push('/buyer/cart');
  };

  return (
    <div className="space-y-8 text-white max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      {/* Main Specimen Presentation */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Visual Gallery */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/[0.08] shadow-2xl"
          >
            <Image
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <ProvenanceBadge type="gi-tag" label="GI Authenticated" />
              {product.trending && <ProvenanceBadge type="heritage-weave" label="Trending Craft" />}
            </div>
          </motion.div>

          <div className="flex gap-2.5 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-zinc-900',
                  selectedImage === i ? 'border-amber-400 shadow-md shadow-amber-400/20' : 'border-transparent opacity-70 hover:opacity-100'
                )}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        {/* Specimen Dossier & Buying Action */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-amber-400">
              <span className="font-semibold uppercase tracking-wider">{product.craft}</span>
              <span>·</span>
              <span className="text-zinc-400">{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-2.5 text-xs text-zinc-400">
              <Link href={`/buyer/artisans/${artisan.id}`} className="text-zinc-300 font-medium hover:text-amber-400 transition-colors">
                By {product.artisanName}
              </Link>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-zinc-500">({product.reviews} reviews)</span>
              </div>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono">
                <MapPin className="w-3 h-3 text-amber-400" /> {product.artisanState}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-[#10121A] border border-white/[0.08] flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold font-mono text-white">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-zinc-500 line-through font-mono">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% Middleman Arbitrage Saved
                  </span>
                </>
              )}
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Direct Payout
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {product.description}
          </p>

          {/* Specimen Technical Matrix */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#10121A] border border-white/[0.08] text-xs">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Material Composition</span>
              <p className="font-semibold text-white mt-0.5">{product.material}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Weaving / Dye Technique</span>
              <p className="font-semibold text-white mt-0.5">{product.technique}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Dimensions</span>
              <p className="font-semibold text-white mt-0.5">{product.dimensions}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Artisan Availability</span>
              <p className="font-semibold text-emerald-400 font-mono mt-0.5">{product.stock} units hand-finished</p>
            </div>
          </div>

          {/* Transparent Economic Breakdown */}
          <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-amber-300">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" /> Transparent Economic Allocation
              </span>
              <span>Fair-Trade Model</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden flex">
              <div className="bg-amber-400 w-[75%]" title="75% Direct to Artisan" />
              <div className="bg-emerald-400 w-[15%]" title="15% Raw Material & Logistics" />
              <div className="bg-zinc-500 w-[10%]" title="10% Escrow & Insurance" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-400 pt-0.5">
              <span>₹{Math.round(product.price * 0.75)} Direct to Artisan</span>
              <span>₹{Math.round(product.price * 0.15)} Materials/Transit</span>
              <span>₹{Math.round(product.price * 0.10)} Escrow</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1 border border-white/10 rounded-xl p-1 bg-white/[0.03]">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-mono font-bold text-xs">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-xs transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Instant Checkout</span>
            </button>

            <button
              onClick={() => {
                toggleWishlist(product.id);
                toast(isWishlisted ? 'Removed from saved pieces' : 'Saved to wishlist');
              }}
              className={cn(
                'p-3 rounded-xl border transition-colors',
                isWishlisted
                  ? 'border-rose-500/50 bg-rose-500/10 text-rose-400'
                  : 'border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-white'
              )}
              aria-label="Wishlist"
            >
              <Heart className={cn('w-4 h-4', isWishlisted && 'fill-current')} />
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-mono text-zinc-400 border-t border-white/[0.06]">
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-amber-400" /> Insured Pan-India Transit</span>
            <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-emerald-400" /> Tamper-Proof Artisan Packaging</span>
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-cyan-400" /> GI Seal Authenticity Certificate</span>
          </div>
        </div>
      </div>

      {/* Meet the Artisan Banner */}
      <div className="p-6 rounded-3xl bg-[#10121A] border border-white/[0.08] flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-zinc-800">
          <Image src={artisan.image} alt={artisan.name} fill className="object-cover" />
        </div>
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <h2 className="text-lg font-bold text-white">Crafted by Master Artisan {artisan.name}</h2>
            {artisan.verified && <BadgeCheck className="w-4 h-4 text-cyan-400" />}
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {artisan.village}, {artisan.state} · {artisan.yearsExperience} Years Experience
          </p>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">{artisan.story}</p>
          <div className="pt-2">
            <Link
              href={`/buyer/artisans/${artisan.id}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:underline"
            >
              <Store className="w-3.5 h-3.5" /> View Artisan Guild & Full Catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
