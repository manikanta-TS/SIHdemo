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
  ShoppingBag,
  User,
  Sparkles,
  ArrowRightLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const mainNavItems = [
  { href: '/buyer', label: 'Marketplace' },
  { href: '/buyer/explore', label: 'Explore Catalog' },
  { href: '/buyer/categories', label: 'Craft Traditions' },
  { href: '/buyer/artisans', label: 'Master Artisans' },
  { href: '/buyer/orders', label: 'My Orders' },
  { href: '/buyer/wishlist', label: 'Saved Pieces' },
];

const mobileNavItems = [
  { href: '/buyer', label: 'Home', icon: Home },
  { href: '/buyer/explore', label: 'Explore', icon: Search },
  { href: '/buyer/categories', label: 'Traditions', icon: LayoutGrid },
  { href: '/buyer/artisans', label: 'Artisans', icon: Users },
  { href: '/buyer/cart', label: 'Cart', icon: ShoppingBag, isCart: true },
];

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlist, setRole } = useApp();

  const handleSwitchRole = () => {
    setRole('seller');
    router.push('/seller');
  };

  return (
    <div className="min-h-screen relative text-[#1A1715] bg-[#FBF9F5] flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <AnimatedBackground variant="buyer" />

      {/* Editorial Luxury Top Header */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/90 backdrop-blur-xl border-b border-stone-200/80">
        {/* Tier 1: Brand, Global Search, and Utility Actions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Editorial Seal */}
          <div className="flex items-center gap-6">
            <Link href="/buyer" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-amber-100" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
                  Hastkala
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-sans -mt-0.5">
                  Patron Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Center Search Pill */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                document.dispatchEvent(event);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-stone-200/90 hover:border-amber-700/40 text-xs text-stone-500 hover:text-stone-800 transition-all text-left shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-3.5 h-3.5 text-stone-400" />
                <span className="truncate">Search Kalamkari, Pashmina, Dhokra, Silks...</span>
              </div>
              <kbd className="text-[10px] font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-500 border border-stone-200">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <LanguageSelector compact />
            <NotificationBell />

            {/* Wishlist Link */}
            <Link
              href="/buyer/wishlist"
              className={cn(
                'relative p-2 rounded-xl border transition-all',
                pathname === '/buyer/wishlist'
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white/80 border-stone-200/90 hover:bg-stone-100/80 text-stone-700 hover:text-stone-900 shadow-sm'
              )}
              aria-label="Saved Pieces"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/buyer/cart"
              className={cn(
                'relative p-2 rounded-xl border transition-all',
                pathname === '/buyer/cart'
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white/80 border-stone-200/90 hover:bg-stone-100/80 text-stone-700 hover:text-stone-900 shadow-sm'
              )}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Link */}
            <Link
              href="/buyer/profile"
              className={cn(
                'hidden sm:flex items-center gap-1.5 p-2 rounded-xl border transition-all text-xs font-medium',
                pathname === '/buyer/profile'
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white/80 border-stone-200/90 hover:bg-stone-100/80 text-stone-700 hover:text-stone-900 shadow-sm'
              )}
              aria-label="Patron Profile"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Role Switcher */}
            <button
              onClick={handleSwitchRole}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 shadow-sm transition-all"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-700" />
              <span>Artisan Mode</span>
            </button>
          </div>
        </div>

        {/* Tier 2: Editorial Micro-Navigation (Desktop) */}
        <div className="border-t border-stone-200/60 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-8 h-10 overflow-x-auto scrollbar-hide">
              {mainNavItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative text-xs font-medium tracking-wide transition-colors py-2 whitespace-nowrap',
                      active
                        ? 'text-amber-800 font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    )}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="buyerNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Dock Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-stone-200/90 px-3 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          {mobileNavItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all relative',
                  active ? 'text-amber-800 font-semibold' : 'text-stone-500 hover:text-stone-800'
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[10px] tracking-tight">{item.label}</span>
                {item.isCart && cartCount > 0 && (
                  <span className="absolute top-0 right-2 w-3.5 h-3.5 rounded-full bg-amber-700 text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                {active && (
                  <span className="w-1 h-1 rounded-full bg-amber-700 mt-0.5" />
                )}
              </Link>
            );
          })}
          <button
            onClick={handleSwitchRole}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-stone-500 hover:text-stone-800 transition-all"
          >
            <ArrowRightLeft className="w-4 h-4 text-stone-400" />
            <span className="text-[10px] tracking-tight">Artisan</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
