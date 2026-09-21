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
  Zap,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

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
      toast.success('Successfully signed in');
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
    <div className="min-h-screen relative flex flex-col text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      <AnimatedBackground variant="default" />

      {/* Top Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-4 border-b border-stone-200/90 bg-[#FAF7F2]/90 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white font-bold" />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-stone-900">Hastkala</span>
        </Link>
        <LanguageSelector compact />
      </header>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Brand & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Modern Indian Handicrafts Platform</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-serif font-extrabold tracking-tight text-stone-900 leading-tight">
              Direct Global Linkage for{' '}
              <span className="festive-text-gradient">India&apos;s Artisans.</span>
            </h1>

            <p className="text-base text-stone-600 leading-relaxed">
              Bridging traditional indigenous craftsmanship with global patrons through camera-first cataloging, automated multilingual translation, and direct fair-trade realization.
            </p>

            {/* Quick Demo Credentials Box */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600" /> Fast Demo Access
                </span>
                <span className="text-[10px] text-stone-500 font-mono">Instant Entry</span>
              </div>
              <p className="text-xs text-stone-600">
                Choose a pre-configured role below to test the complete user flow without manual entry:
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => handleQuickLogin('seller', 'Lakshmi Devi (Artisan)')}
                  disabled={loading}
                  className="flex items-center justify-between p-3 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-medium transition-all text-left shadow-xs"
                >
                  <div>
                    <p className="font-bold text-amber-900">Artisan Studio</p>
                    <p className="text-[10px] text-amber-700 mt-0.5">Lakshmi Devi · Kalamkari</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1 text-amber-700" />
                </button>

                <button
                  onClick={() => handleQuickLogin('buyer', 'Aarav Sharma (Patron)')}
                  disabled={loading}
                  className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-medium transition-all text-left shadow-xs"
                >
                  <div>
                    <p className="font-bold text-emerald-900">Patron Marketplace</p>
                    <p className="text-[10px] text-emerald-700 mt-0.5">Aarav Sharma · Patron</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1 text-emerald-700" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                'Real-time Camera Catalog Scanner',
                'Fair Price Recommendation Engine',
                'Multilingual Indic Voice Support',
                'Authentic GI Heritage Certification',
              ].map((pill) => (
                <div key={pill} className="flex items-center gap-2 text-xs text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
            <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-xl p-7 sm:p-8">
              {/* Header Mode Toggle */}
              <div className="flex gap-1 p-1 rounded-xl bg-[#FAF7F2] border border-stone-200 mb-6">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'login'
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'signup'
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-serif font-bold text-stone-900">
                  {mode === 'login' ? 'Access your Hastkala workspace' : 'Join the artisan community'}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
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
                      ? 'border-amber-400 bg-amber-50 text-amber-900 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-amber-700" /> Email
                </button>
                <button
                  onClick={() => setMethod('phone')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                    method === 'phone'
                      ? 'border-amber-400 bg-amber-50 text-amber-900 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-700" /> Mobile OTP
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Lakshmi Devi"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-all placeholder:text-stone-400"
                      />
                    </div>
                  </div>
                )}

                {method === 'email' ? (
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="artisan@hastkala.in"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-all placeholder:text-stone-400"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">Mobile Number (India)</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98480 22334"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-all placeholder:text-stone-400"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-stone-700">Password</label>
                    {mode === 'login' && (
                      <button type="button" className="text-xs text-amber-700 hover:underline">
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-all placeholder:text-stone-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-600/20 transition-all disabled:opacity-50 mt-2 active:scale-95"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In to Workspace' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Mobile Quick Entry */}
              <div className="lg:hidden mt-6 pt-5 border-t border-stone-100 space-y-2">
                <p className="text-[11px] font-mono text-amber-800 font-semibold">⚡ 1-Click Fast Demo Access:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickLogin('seller', 'Lakshmi Devi')}
                    className="py-2 px-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold text-center hover:bg-amber-100"
                  >
                    Artisan Login
                  </button>
                  <button
                    onClick={() => handleQuickLogin('buyer', 'Aarav Sharma')}
                    className="py-2 px-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold text-center hover:bg-emerald-100"
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
