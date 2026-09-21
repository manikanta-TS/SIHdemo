'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { ProvenanceBadge } from '@/components/shared/ProvenanceBadge';
import { products, artisans } from '@/lib/mock-data';
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Store,
  Camera,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Globe,
  TrendingUp,
  Award,
  Command,
  Star,
  MapPin,
  Heart,
  Search,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole } = useApp();

  const selectRole = (r: 'buyer' | 'seller') => {
    setRole(r);
    router.push(r === 'buyer' ? '/buyer' : '/seller');
  };

  return (
    <div className="min-h-screen relative text-[#1E1B18] flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      <AnimatedBackground variant="default" />

      {/* Editorial Navigation Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-12 py-4 border-b border-stone-200/90 bg-[#FAF7F2]/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight text-stone-900">Hastkala</span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-amber-800 font-semibold">
                Modern Indian Craft Festival
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-stone-600">
          <Link href="/buyer" className="hover:text-amber-700 transition-colors">
            Marketplace
          </Link>
          <Link href="/buyer/explore" className="hover:text-amber-700 transition-colors">
            Curated Catalog
          </Link>
          <Link href="/buyer/categories" className="hover:text-amber-700 transition-colors">
            Craft Traditions
          </Link>
          <Link href="/buyer/artisans" className="hover:text-amber-700 transition-colors">
            Master Artisans
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
              document.dispatchEvent(event);
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-200/90 hover:border-amber-500/40 text-xs text-stone-600 hover:text-stone-900 transition-all shadow-sm"
          >
            <Command className="w-3.5 h-3.5 text-amber-700" />
            <span>Search or command</span>
            <kbd className="text-[10px] font-mono bg-[#FAF7F2] border border-stone-200 px-1.5 py-0.5 rounded text-stone-500">
              ⌘K
            </kbd>
          </button>
          <LanguageSelector compact />
          <Link
            href="/seller"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-[#FAF7F2] text-xs font-semibold text-stone-800 transition-colors shadow-sm"
          >
            <span>Artisan Studio</span>
          </Link>
          <Link
            href="/buyer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* MAIN CINEMATIC STORY EXPERIENCE */}
      <main className="relative z-10 flex-1">
        {/* SECTION 1: HERO VIEWPORT */}
        <section className="max-w-6xl mx-auto px-6 sm:px-12 pt-16 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-900 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Authentic Geographical Indication (GI) Heritage Crafts</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-stone-900 leading-[1.1]">
              A vibrant celebration of{' '}
              <span className="festive-text-gradient">India&apos;s living craft lineages.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
              Direct from master weavers, sculptors, and folk artists to connoisseurs worldwide. Authenticated GI craft origins, transparent pricing, and 80%+ direct artisan income realization.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/buyer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Artisan Marketplace</span>
              </Link>
              <Link
                href="/seller/add-product"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7F2] border border-stone-300 text-stone-800 font-semibold text-sm shadow-sm transition-all"
              >
                <Camera className="w-4 h-4 text-amber-700" />
                <span>Launch AI Craft Scanner</span>
              </Link>
            </div>
          </motion.div>

          {/* Key Impact & Community Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Master Artisans', val: '2,480+', desc: 'Across 18 craft states', icon: Store, color: 'text-amber-700' },
              { label: 'Direct Artisan Share', val: '78% - 85%', desc: 'Straight to family bank', icon: TrendingUp, color: 'text-emerald-700' },
              { label: 'GI Certification', val: '100% Verified', desc: 'Individually authenticated', icon: ShieldCheck, color: 'text-peacock' },
              { label: 'Regional Languages', val: '8 Indic', desc: 'Voice & text cataloging', icon: Globe, color: 'text-lotus' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="p-5 rounded-3xl bg-white border border-stone-200/90 text-center shadow-sm hover:shadow-md transition-all"
              >
                <item.icon className={`w-5 h-5 mx-auto ${item.color} mb-2`} />
                <p className="text-xl sm:text-2xl font-bold font-mono text-stone-900">{item.val}</p>
                <p className="text-xs font-semibold text-stone-800 mt-1">{item.label}</p>
                <p className="text-[11px] text-stone-500 mt-0.5">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 2: CURATED CRAFT CREATIONS */}
        <section className="py-16 bg-[#F5EFEB] border-y border-stone-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
                  Curator&apos;s Selection
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                  Living Masterpieces of Heritage Craft
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Each creation carries authentic Geographical Indication credentials and direct maker attribution.
                </p>
              </div>
              <Link
                href="/buyer/explore"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  href={`/buyer/product/${product.id}`}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-200/90 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-950/5 transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-white/95 backdrop-blur-md text-stone-800 rounded-full border border-stone-200 shadow-sm">
                        <MapPin className="w-2.5 h-2.5 text-amber-700" /> {product.region}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-amber-800 font-semibold uppercase">{product.craft}</span>
                      <h3 className="font-serif font-semibold text-sm text-stone-900 mt-1 line-clamp-1 group-hover:text-amber-800 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">By {product.artisanName}</p>
                    </div>
                    <div className="pt-3 border-t border-stone-100 mt-3 flex items-center justify-between">
                      <span className="font-mono font-bold text-base text-stone-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        GI Tagged
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: HUMAN ARTISAN STORYTELLING */}
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200/90">
                <Image
                  src={artisans[0].image}
                  alt={artisans[0].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-5 rounded-3xl bg-white border border-stone-200 shadow-lg max-w-xs hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-sm text-stone-900">22 Years Craft Lineage</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Three generations painting natural indigo and madder root dyes onto hand-loomed organic cotton.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
                The Hands That Shape India
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-stone-900 leading-tight">
                Honoring the generational lineage behind every brushstroke and loom.
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Indian handicrafts are living expressions of ancient metallurgy, botanical dyeing, and handloom geometry passed down through families over generations.
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Hastkala removes traditional intermediary margins, connecting rural artisan guilds directly to patrons worldwide with transparent cost realization and insured safe delivery.
              </p>

              <div className="pt-2">
                <Link
                  href="/buyer/artisans"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-xs font-bold text-stone-900 transition-colors shadow-sm"
                >
                  <span>Meet Our Master Artisans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FAIR REVENUE MODEL */}
        <section className="py-16 bg-white border-y border-stone-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold">
                Ethical Craft Standard
              </span>
              <h2 className="text-3xl font-serif font-extrabold text-stone-900">
                Transparent Economic Realization
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Traditional retail chains siphon up to 70% of craft revenues. Hastkala guarantees 78%+ direct remuneration to the artisan family.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-stone-200 max-w-3xl mx-auto space-y-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-900">
                <span>Fair-Trade Revenue Distribution</span>
                <span className="text-emerald-700">Artisan Payout Guarantee</span>
              </div>

              <div className="h-3 rounded-full bg-stone-200 overflow-hidden flex shadow-inner">
                <div className="bg-amber-500 w-[78%]" title="78% Direct to Artisan Household" />
                <div className="bg-emerald-600 w-[12%]" title="12% Raw Material & Tooling" />
                <div className="bg-stone-400 w-[10%]" title="10% Insured Transit & Packaging" />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center pt-2">
                <div className="p-3 rounded-2xl bg-white border border-stone-200">
                  <p className="font-mono font-bold text-lg text-amber-800">78%</p>
                  <p className="text-[11px] font-semibold text-stone-900 mt-0.5">Direct Artisan Payout</p>
                  <p className="text-[10px] text-stone-500">Instant UPI Bank Transfer</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-stone-200">
                  <p className="font-mono font-bold text-lg text-emerald-700">12%</p>
                  <p className="text-[11px] font-semibold text-stone-900 mt-0.5">Raw Materials</p>
                  <p className="text-[10px] text-stone-500">Organic dyes &amp; wood</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-stone-200">
                  <p className="font-mono font-bold text-lg text-stone-700">10%</p>
                  <p className="text-[11px] font-semibold text-stone-900 mt-0.5">Insured Logistics</p>
                  <p className="text-[10px] text-stone-500">Tamper-proof packaging</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: DUAL PERSONA GATEWAYS */}
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
              Choose Your Journey
            </span>
            <h2 className="text-3xl font-serif font-extrabold text-stone-900 mt-1">
              Step Into The Craft Sanctuary
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Patron Card */}
            <div
              onClick={() => selectRole('buyer')}
              className="group p-8 rounded-3xl bg-white border border-stone-200 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/5 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  Collector &amp; Patron
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-3 group-hover:text-amber-800 transition-colors">
                  Acquire Mastercrafted Works
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Discover authenticated GI-certified creations. Every purchase directly sustains indigenous families and craft lineages.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-6">
                  {['GI Provenance Seals', 'Transparent Pricing', 'Insured Pan-India Transit', 'Direct Artisan Payout'].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-xs text-stone-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 mt-8 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-900">
                <span>Enter Patron Marketplace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Artisan Card */}
            <div
              onClick={() => selectRole('seller')}
              className="group p-8 rounded-3xl bg-white border border-stone-200 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/5 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  Artisan Maker Suite
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-3 group-hover:text-amber-800 transition-colors">
                  Digitize Your Workshop
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Point your camera at your craft. Our vision intelligence writes descriptions in 8 languages and calculates fair selling prices.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-6">
                  {['Live Camera Scanner', '8 Indic Languages', 'Fair Cost Calculator', 'Instant Public Storefront'].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-xs text-stone-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 mt-8 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-900">
                <span>Launch Artisan Producer Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="border-t border-stone-200 bg-white py-12 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm text-stone-900">Hastkala</p>
              <p className="text-[11px] text-stone-500">Preserving India&apos;s Living Mastercraft Heritage</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600">
            <Link href="/buyer" className="hover:text-stone-900 transition-colors">
              Marketplace
            </Link>
            <Link href="/buyer/explore" className="hover:text-stone-900 transition-colors">
              Explore Collection
            </Link>
            <Link href="/buyer/artisans" className="hover:text-stone-900 transition-colors">
              Artisan Guilds
            </Link>
            <Link href="/seller" className="hover:text-stone-900 transition-colors">
              Producer Studio
            </Link>
            <Link href="/seller/add-product" className="hover:text-stone-900 transition-colors">
              AI Scanner
            </Link>
          </div>

          <p className="text-[11px] font-mono text-stone-500">
            © {new Date().getFullYear()} Hastkala. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
