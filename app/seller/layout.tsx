'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { NotificationBell } from '@/components/shared/NotificationBell';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  Users,
  BarChart3,
  TrendingUp,
  Store,
  User,
  Palette,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/seller', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/seller/products', label: 'My Products', icon: Package },
  { href: '/seller/add-product', label: 'Add Product', icon: PlusCircle },
  { href: '/seller/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/seller/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/seller/market', label: 'Market Intel', icon: TrendingUp },
  { href: '/seller/store', label: 'My Store', icon: Store },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setRole } = useApp();

  const handleSwitchRole = () => {
    setRole('buyer');
    router.push('/buyer');
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground variant="seller" />

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-white/70 backdrop-blur-xl border-r border-purple-100/60 z-30">
        <div className="p-6 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg text-gray-900">Hastkala</span>
            <p className="text-[10px] text-purple-600 font-medium">Artisan Studio</p>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-purple-50'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-purple-50">
          <Link
            href="/seller/profile"
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
              pathname === '/seller/profile'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-purple-50'
            )}
          >
            <User className="w-5 h-5" />
            Profile
          </Link>
          <button
            onClick={handleSwitchRole}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Switch Role
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-2 px-4 sm:px-6 py-3 bg-white/60 backdrop-blur-xl border-b border-purple-100/40">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Artisan Studio</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <LanguageSelector compact />
            <NotificationBell />
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-purple-100/60">
        <div className="flex items-center justify-around py-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors shrink-0',
                  active ? 'text-purple-600' : 'text-gray-400'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[9px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
