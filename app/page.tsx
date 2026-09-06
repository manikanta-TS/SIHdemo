'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApp } from '@/lib/store';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import {
  ShoppingBag,
  Palette,
  Camera,
  Sparkles,
  ArrowRight,
  Store,
  Search,
  Heart,
  Star,
  TrendingUp,
  Mic,
  Globe,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, isAuthenticated } = useApp();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else {
      setReady(true);
    }
  }, [isAuthenticated, router]);

  const selectRole = (r: 'buyer' | 'seller') => {
    setRole(r);
    router.push(r === 'buyer' ? '/buyer' : '/seller');
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground variant="default" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900">Hastkala</span>
        </div>
        <LanguageSelector compact />
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-8 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-orange-200 text-sm font-medium text-orange-700 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Driven Market Linkage for Artisans
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight text-balance">
            Empowering Hands.{' '}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Connecting Markets.
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            From a single photograph to a professional digital storefront — helping artisans showcase, price, and sell their craft with AI.
          </p>
        </motion.div>
      </section>

      {/* Role selection cards */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* BUYER */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectRole('buyer')}
            className="group relative overflow-hidden rounded-3xl text-left p-8 bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500 text-white shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors" />
            <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-yellow-300/20 blur-2xl group-hover:bg-yellow-300/30 transition-colors" />

            {/* Floating icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-6 right-6 opacity-30"
            >
              <ShoppingBag className="w-16 h-16" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-20 right-12 opacity-20"
            >
              <Heart className="w-10 h-10" />
            </motion.div>

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-2">I'm a Buyer</h2>
              <p className="text-white/90 text-sm mb-6 max-w-xs">
                Discover unique handmade products directly from talented artisans.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                  <Search className="w-3 h-3" /> Explore Products
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                  <Store className="w-3 h-3" /> Discover Artisans
                </span>
              </div>
              <div className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all">
                Start Shopping <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.button>

          {/* SELLER */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectRole('seller')}
            className="group relative overflow-hidden rounded-3xl text-left p-8 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors" />
            <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-cyan-300/20 blur-2xl group-hover:bg-cyan-300/30 transition-colors" />

            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-6 right-6 opacity-30"
            >
              <Camera className="w-16 h-16" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
              className="absolute bottom-20 right-12 opacity-20"
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5">
                <Palette className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-2">I'm an Artisan</h2>
              <p className="text-white/90 text-sm mb-6 max-w-xs">
                Turn your craft into a professional digital business with AI.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                  <Store className="w-3 h-3" /> Create My Store
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                  <Camera className="w-3 h-3" /> Sell My Products
                </span>
              </div>
              <div className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all">
                Start Selling <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.button>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Camera, label: 'AI Photo Scan', color: 'text-orange-600 bg-orange-100' },
            { icon: Sparkles, label: 'Auto Cataloging', color: 'text-purple-600 bg-purple-100' },
            { icon: TrendingUp, label: 'Smart Pricing', color: 'text-teal-600 bg-teal-100' },
            { icon: Globe, label: '8 Languages', color: 'text-blue-600 bg-blue-100' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-orange-100/50"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
                <f.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">{f.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 text-center py-8 text-sm text-gray-500">
        <p>Hastkala — Smart India Hackathon SIH26090</p>
      </footer>
    </div>
  );
}
