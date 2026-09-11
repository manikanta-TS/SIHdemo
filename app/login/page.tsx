'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/lib/store';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Smartphone,
  User,
  Shield,
  Zap,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { login, setRole } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('artisan.lakshmi@hastkala.in');
  const [phone, setPhone] = useState('+91 98480 22334');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Lakshmi Devi');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      toast.success('Successfully authenticated');
      router.push('/');
    }, 600);
  };

  const handleQuickLogin = (roleType: 'seller' | 'buyer', personaName: string) => {
    setLoading(true);
    setTimeout(() => {
      login();
      setRole(roleType);
      toast.success(`Welcome back, ${personaName}!`);
      router.push(roleType === 'seller' ? '/seller' : '/buyer');
    }, 400);
  };

  return (
    <div className="min-h-screen relative flex flex-col text-white selection:bg-amber-500/20 selection:text-amber-300">
      <AnimatedBackground variant="default" />

      {/* Top Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-5 border-b border-white/[0.06] bg-[#08090D]/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Sparkles className="w-4 h-4 text-black font-bold" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Hastkala</span>
        </div>
        <LanguageSelector compact />
      </header>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Brand & Competition Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>Smart India Hackathon SIH26090 Platform</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Autonomous Market Linkage for{' '}
              <span className="heritage-text-gradient">India&apos;s Artisans.</span>
            </h1>

            <p className="text-base text-zinc-400 leading-relaxed">
              Bridging the gap between rural craftsmanship and global collectors through computer vision, automated catalog generation, and fair pricing intelligence.
            </p>

            {/* Quick Demo Credentials Box for Hackathon Evaluators */}
            <div className="p-5 rounded-2xl bg-[#10121A] border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Judge & Demo Fast Pass
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">Instant Entry</span>
              </div>
              <p className="text-xs text-zinc-400">
                Click below to instantly launch pre-loaded demo profiles without typing passwords:
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => handleQuickLogin('seller', 'Lakshmi Devi (Artisan)')}
                  disabled={loading}
                  className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-all text-left"
                >
                  <div>
                    <p className="font-bold text-amber-400">Artisan Studio</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Lakshmi Devi · Kalamkari</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                </button>

                <button
                  onClick={() => handleQuickLogin('buyer', 'Aarav Sharma (Buyer)')}
                  disabled={loading}
                  className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-all text-left"
                >
                  <div>
                    <p className="font-bold text-emerald-400">Buyer Marketplace</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Aarav Sharma · Patron</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                'Real-time Computer Vision Scan',
                'Fair Price Elasticity Engine',
                'Multilingual Indic Voice Support',
                'GI Tagged Provenance Tracking',
              ].map((pill) => (
                <div key={pill} className="flex items-center gap-2 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Authentication Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#10121A]/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl p-7 sm:p-8">
              {/* Header Mode Toggle */}
              <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-6">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'login'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'signup'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">
                  {mode === 'login' ? 'Access your Hastkala workspace' : 'Join the artisan revolution'}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  {mode === 'login'
                    ? 'Enter your credentials to continue.'
                    : 'Create your digital craft identity in seconds.'}
                </p>
              </div>

              {/* Login Method Toggle */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setMethod('email')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                    method === 'email'
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      : 'border-white/[0.08] text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
                <button
                  onClick={() => setMethod('phone')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                    method === 'phone'
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      : 'border-white/[0.08] text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile OTP
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Lakshmi Devi"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                )}

                {method === 'email' ? (
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="artisan@hastkala.in"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Mobile Number (India)</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98480 22334"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-zinc-400">Password</label>
                    {mode === 'login' && (
                      <button type="button" className="text-xs text-amber-400 hover:underline">
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-zinc-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all disabled:opacity-50 mt-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In to Workspace' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Mobile Judge Quick Entry */}
              <div className="lg:hidden mt-6 pt-5 border-t border-white/[0.08] space-y-2">
                <p className="text-[11px] font-mono text-amber-400 font-semibold">⚡ Judge 1-Click Fast Pass:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickLogin('seller', 'Lakshmi Devi')}
                    className="py-2 px-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium text-center"
                  >
                    Artisan Login
                  </button>
                  <button
                    onClick={() => handleQuickLogin('buyer', 'Aarav Sharma')}
                    className="py-2 px-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium text-center"
                  >
                    Buyer Login
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
