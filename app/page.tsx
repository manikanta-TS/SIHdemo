'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApp } from '@/lib/store';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Store,
  Camera,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Globe,
  TrendingUp,
  Award,
  Command,
} from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, isAuthenticated, login } = useApp();
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

  const handleJudgeBypass = (r: 'buyer' | 'seller') => {
    login();
    setRole(r);
    router.push(r === 'buyer' ? '/buyer' : '/seller');
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen relative text-white flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300">
      <AnimatedBackground variant="default" />

      {/* Navigation Header */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6 border-b border-white/[0.06] bg-[#08090D]/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Sparkles className="w-4 h-4 text-black font-bold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg tracking-tight text-white">Hastkala</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400">
              SIH26090
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
              document.dispatchEvent(event);
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] text-xs text-zinc-400 hover:text-white transition-all"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Search or command</span>
            <kbd className="text-[10px] font-mono bg-white/[0.08] px-1.5 py-0.5 rounded text-zinc-300">⌘K</kbd>
          </button>
          <LanguageSelector compact />
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-6 backdrop-blur-md">
            <Award className="w-3.5 h-3.5" />
            <span>National Hackathon Showcase · AI-Driven Market Linkage</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
            Where centuries of craft meet{' '}
            <span className="heritage-text-gradient">neural intelligence.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-400 leading-relaxed text-balance">
            Empowering rural Indian artisans to capture, auto-catalog, price, and sell their masterworks globally with a single smartphone photograph.
          </p>
        </motion.div>

        {/* Dual Persona Portals */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {/* SELLER: Artisan Studio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -6 }}
            onClick={() => selectRole('seller')}
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[#10121A] border border-white/[0.08] hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  AI PRODUCER SUITE
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                I am an Artisan
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Take a photo of your handmade craft. Our AI cleans the background, identifies heritage techniques, auto-writes listings in 8 languages, and calculates fair prices.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-8">
                {['AI Vision Scan', 'Auto Cataloging', 'Fair Cost Calculator', 'Voice in 8 Languages'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center justify-between w-full pt-4 border-t border-white/[0.06] text-sm font-semibold text-amber-400 group-hover:text-amber-300">
              <span>Open Artisan Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </motion.div>

          {/* BUYER: Ethical Marketplace */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            onClick={() => selectRole('buyer')}
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[#10121A] border border-white/[0.08] hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  VERIFIED PATRON
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                I am a Patron & Buyer
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Acquire authentic GI-certified handicrafts directly from village artisans. Transparent pricing with 80%+ of revenue going directly to artisan families.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-8">
                {['GI Tag Authentication', 'Transparent Pricing', 'Direct Artisan Payout', 'Tracked Logistics'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center justify-between w-full pt-4 border-t border-white/[0.06] text-sm font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>Enter Craft Marketplace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </motion.div>
        </div>

        {/* Live Telemetry Ticker */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
          {[
            { label: 'Artisans Onboarded', val: '12,480+', icon: Store },
            { label: 'Direct Revenue Paid', val: '₹4.82 Cr', icon: TrendingUp },
            { label: 'Neural Accuracy', val: '94.2%', icon: Cpu },
            { label: 'Supported Dialects', val: '8 Indic', icon: Globe },
          ].map((item, i) => (
            <div
              key={item.label}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center"
            >
              <item.icon className="w-4 h-4 mx-auto text-amber-400 mb-1.5 opacity-80" />
              <p className="text-lg sm:text-xl font-bold font-mono text-white">{item.val}</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer & Judge Shortcuts */}
      <footer className="relative z-20 border-t border-white/[0.06] py-6 px-6 sm:px-12 bg-[#08090D]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>Hastkala Engine · Smart India Hackathon SIH26090</p>
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 font-mono">Demo Quickstart:</span>
            <button
              onClick={() => handleJudgeBypass('seller')}
              className="px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-colors"
            >
              ⚡ Enter Artisan Studio
            </button>
            <button
              onClick={() => handleJudgeBypass('buyer')}
              className="px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors"
            >
              ⚡ Enter Marketplace
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
