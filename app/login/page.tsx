'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/lib/store';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import {
  Palette,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Camera,
  ShoppingBag,
  Smartphone,
  Chrome,
  User,
  Zap,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      router.push('/');
    }, 800);
  };

  const handleGuest = () => {
    login();
    router.push('/');
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      login();
      router.push('/');
    }, 800);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
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

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 pb-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Branding & visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-6"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-orange-200 text-sm font-medium text-orange-700">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Driven Market Linkage for Artisans
            </span>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight text-balance">
              Where every craft finds its{' '}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                marketplace.
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md text-balance">
              Join a community of artisans and buyers. From a single photograph to a professional digital storefront — powered by AI.
            </p>

            {/* Feature pills */}
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {[
                { icon: Camera, label: 'AI Photo Scan', color: 'from-orange-400 to-orange-600' },
                { icon: Sparkles, label: 'Auto Cataloging', color: 'from-purple-400 to-purple-600' },
                { icon: ShoppingBag, label: 'Smart Marketplace', color: 'from-teal-400 to-teal-600' },
                { icon: Zap, label: 'Instant Pricing', color: 'from-pink-400 to-pink-600' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-orange-100/50"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shrink-0`}>
                    <f.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Login card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-orange-100/60 shadow-2xl">
              {/* Decorative gradient bar */}
              <div className="h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

              <div className="p-6 sm:p-8">
                {/* Mobile branding */}
                <div className="lg:hidden flex items-center gap-2 mb-6 justify-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-xl text-gray-900">Hastkala</span>
                </div>

                {/* Toggle: Login / Create Account */}
                <div className="flex gap-1 p-1 rounded-xl bg-orange-50/60 mb-6">
                  <button
                    onClick={() => setMode('login')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      mode === 'login'
                        ? 'bg-white text-orange-700 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      mode === 'signup'
                        ? 'bg-white text-orange-700 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {mode === 'login' ? 'Welcome back' : 'Join Hastkala'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {mode === 'login'
                      ? 'Sign in to continue your craft journey.'
                      : 'Create an account to start buying or selling.'}
                  </p>
                </div>

                {/* Method toggle */}
                <div className="flex gap-2 mb-5">
                  <button
                    onClick={() => setMethod('email')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all border ${
                      method === 'email'
                        ? 'border-orange-300 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" /> Email
                  </button>
                  <button
                    onClick={() => setMethod('phone')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all border ${
                      method === 'phone'
                        ? 'border-orange-300 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Phone
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Lakshmi Devi"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {method === 'email' ? (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white/80 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                  {mode === 'login' && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-orange-500 focus:ring-orange-200" />
                        Remember me
                      </label>
                      <button type="button" className="text-xs text-orange-600 font-medium hover:underline">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow disabled:opacity-60"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        {mode === 'login' ? 'Login' : 'Create Account'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Google login */}
                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-gray-200 bg-white/80 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
                >
                  <Chrome className="w-5 h-5 text-blue-500" />
                  Continue with Google
                </button>

                {/* Continue as Guest */}
                <button
                  onClick={handleGuest}
                  className="w-full flex items-center justify-center gap-2 py-2.5 mt-3 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Continue as Guest <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              By continuing, you agree to Hastkala&apos;s Terms & Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-10 text-center py-6 text-sm text-gray-500">
        <p>Hastkala — Smart India Hackathon SIH26090</p>
      </footer>
    </div>
  );
}
