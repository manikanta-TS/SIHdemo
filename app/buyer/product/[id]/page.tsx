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
  BadgeCheck,
  ArrowLeft,
  Store,
  ShieldCheck,
  Award,
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
    <div className="space-y-8 text-stone-900 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      {/* Main Presentation */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Visual Gallery */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-md"
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
                  'relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-stone-100',
                  selectedImage === i ? 'border-amber-600 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                )}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        {/* Craft Details & Purchase Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-amber-800">
              <span className="font-semibold uppercase tracking-wider">{product.craft}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500">{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-2.5 text-xs text-stone-500">
              <Link href={`/buyer/artisans/${artisan.id}`} className="text-stone-800 font-medium hover:text-amber-800 transition-colors">
                By {product.artisanName}
              </Link>
              <span className="text-stone-300">·</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="font-bold text-stone-900">{product.rating}</span>
                <span className="text-stone-400">({product.reviews} reviews)</span>
              </div>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1 font-mono">
                <MapPin className="w-3 h-3 text-amber-700" /> {product.artisanState}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/90 flex items-baseline justify-between shadow-xs">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold font-mono text-stone-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-stone-400 line-through font-mono">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% Discount vs Retail
                  </span>
                </>
              )}
            </div>
            <span className="text-[11px] font-mono text-emerald-800 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> 100% Direct Payout
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Craft Specifications */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-stone-200/90 text-xs shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">Material Composition</span>
              <p className="font-semibold text-stone-900 mt-0.5">{product.material}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">Weaving / Dye Technique</span>
              <p className="font-semibold text-stone-900 mt-0.5">{product.technique}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">Dimensions</span>
              <p className="font-semibold text-stone-900 mt-0.5">{product.dimensions}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">Workshop Availability</span>
              <p className="font-semibold text-emerald-800 font-mono mt-0.5">{product.stock} units hand-finished</p>
            </div>
          </div>

          {/* Transparent Economic Breakdown */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-amber-900">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-700" /> Fair-Trade Cost Allocation
              </span>
              <span className="text-stone-500 font-normal">Direct Remuneration</span>
            </div>
            <div className="h-2 rounded-full bg-stone-200 overflow-hidden flex">
              <div className="bg-amber-600 w-[78%]" title="78% Direct to Artisan Household" />
              <div className="bg-emerald-600 w-[12%]" title="12% Raw Materials & Natural Dyes" />
              <div className="bg-stone-400 w-[10%]" title="10% Insured Packaging & Transit" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-stone-600 pt-0.5">
              <span>₹{Math.round(product.price * 0.78).toLocaleString('en-IN')} Direct to Maker</span>
              <span>₹{Math.round(product.price * 0.12).toLocaleString('en-IN')} Raw Materials</span>
              <span>₹{Math.round(product.price * 0.10).toLocaleString('en-IN')} Safe Transit</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1 border border-stone-200 rounded-xl p-1 bg-[#FAF7F2] shadow-xs">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-mono font-bold text-xs text-stone-900">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-semibold text-xs transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-stone-600" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 active:scale-95 transition-all"
            >
              <span>Instant Checkout</span>
            </button>

            <button
              onClick={() => {
                toggleWishlist(product.id);
                toast(isWishlisted ? 'Removed from saved pieces' : 'Saved to wishlist');
              }}
              className={cn(
                'p-3 rounded-xl border transition-colors shadow-sm',
                isWishlisted
                  ? 'border-rose-300 bg-rose-50 text-rose-600'
                  : 'border-stone-200 bg-white text-stone-500 hover:text-stone-900'
              )}
              aria-label="Wishlist toggle"
            >
              <Heart className={cn('w-4 h-4', isWishlisted && 'fill-current text-rose-600')} />
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-mono text-stone-500 border-t border-stone-200/80">
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-amber-700" /> Insured Pan-India Delivery</span>
            <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-emerald-700" /> Tamper-Proof Packaging</span>
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-indigo-700" /> GI Seal Authenticity Certificate</span>
          </div>
        </div>
      </div>

      {/* Meet the Artisan Banner */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
          <Image src={artisan.image} alt={artisan.name} fill className="object-cover" />
        </div>
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <h2 className="text-lg font-serif font-bold text-stone-900">Crafted by Master Artisan {artisan.name}</h2>
            {artisan.verified && <BadgeCheck className="w-4 h-4 text-emerald-600" />}
          </div>
          <p className="text-xs text-stone-500 font-mono">
            {artisan.village}, {artisan.state} · {artisan.yearsExperience} Years Experience
          </p>
          <p className="text-xs text-stone-600 leading-relaxed max-w-xl">{artisan.story}</p>
          <div className="pt-2">
            <Link
              href={`/buyer/artisans/${artisan.id}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 hover:text-amber-900 hover:underline"
            >
              <Store className="w-3.5 h-3.5" /> View Artisan Guild &amp; Full Catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
