'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { NotificationBell } from '@/components/shared/NotificationBell';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import {
  Home,
  Search,
  LayoutGrid,
  Users,
  Package,
  Heart,
  ShoppingCart,
  User,
  Palette,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { href: '/buyer', label: 'Home', icon: Home },
  { href: '/buyer/explore', label: 'Explore', icon: Search },
  { href: '/buyer/categories', label: 'Categories', icon: LayoutGrid },
  { href: '/buyer/artisans', label: 'Artisans', icon: Users },
  { href: '/buyer/orders', label: 'Orders', icon: Package },
  { href: '/buyer/wishlist', label: 'Wishlist', icon: Heart },
];

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setRole } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSwitchRole = () => {
    setRole('seller');
    router.push('/seller');
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground variant="buyer" />

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-white/70 backdrop-blur-xl border-r border-orange-100/60 z-30">
        <div className="p-6 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900">Hastkala</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-orange-50'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-orange-50">
          <Link
            href="/buyer/profile"
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
              pathname === '/buyer/profile'
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-orange-50'
            )}
          >
            <User className="w-5 h-5" />
            Profile
          </Link>
          <button
            onClick={handleSwitchRole}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Switch Role
          </button>
        </div>
      </aside>

      {/* Top bar (mobile + desktop content) */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-2 px-4 sm:px-6 py-3 bg-white/60 backdrop-blur-xl border-b border-orange-100/40">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Hastkala</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md hidden sm:block">
            <Link href="/buyer/explore" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-orange-100 text-sm text-gray-400 hover:border-orange-300 transition-colors">
              <Search className="w-4 h-4" />
              <span>Search products, artisans...</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector compact />
            <NotificationBell />
            <Link href="/buyer/cart" className="relative p-2 rounded-full hover:bg-orange-50 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        <main className="px-4 sm:px-6 py-4 pb-24 lg:pb-8 min-h-[calc(100vh-64px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-orange-100/60">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors',
                  active ? 'text-orange-600' : 'text-gray-400'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <Link
            href="/buyer/cart"
            className={cn(
              'flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors relative',
              pathname === '/buyer/cart' ? 'text-orange-600' : 'text-gray-400'
            )}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[10px] font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-orange-500 text-white text-[8px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}
