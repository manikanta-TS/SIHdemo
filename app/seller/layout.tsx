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
  BarChart3,
  TrendingUp,
  Store,
  User,
  Sparkles,
  ArrowRightLeft,
  Command,
  Search,
  ChevronRight,
  Radio,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/seller', label: 'Command Center', icon: LayoutDashboard, badge: 'LIVE' },
  { href: '/seller/add-product', label: 'AI Craft Scanner', icon: PlusCircle, highlight: true },
  { href: '/seller/products', label: 'Inventory', icon: Package },
  { href: '/seller/orders', label: 'Orders & Fulfillment', icon: ShoppingCart },
  { href: '/seller/analytics', label: 'Revenue Telemetry', icon: BarChart3 },
  { href: '/seller/market', label: 'Market Intelligence', icon: TrendingUp },
  { href: '/seller/store', label: 'Public Storefront', icon: Store },
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
    <div className="min-h-screen relative text-[#1A1715] bg-[#FBF9F5] flex selection:bg-amber-100 selection:text-amber-900">
      <AnimatedBackground variant="seller" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-[#F5F1E8]/95 backdrop-blur-2xl border-r border-stone-200/90 z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-200/80">
          <Link href="/seller" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base tracking-tight text-stone-900">Hastkala</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold">
                Artisan Producer Suite
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group',
                  item.highlight && !active
                    ? 'bg-amber-700 hover:bg-amber-800 text-white font-semibold shadow-sm'
                    : active
                    ? 'bg-amber-100/80 text-amber-900 border border-amber-300 font-semibold shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/70'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn('w-4 h-4 transition-colors', item.highlight && !active ? 'text-white' : active ? 'text-amber-800' : 'text-stone-500 group-hover:text-stone-800')} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !active && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-stone-200/80 space-y-1">
          <Link
            href="/seller/profile"
            className={cn(
              'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all',
              pathname === '/seller/profile'
                ? 'bg-amber-100/80 text-amber-900 font-semibold border border-amber-200'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/70'
            )}
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-stone-500" />
              <span>Artisan Credentials</span>
            </div>
          </Link>

          <button
            onClick={handleSwitchRole}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-all"
          >
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-4 h-4 text-emerald-700" />
              <span>Switch to Buyer Mode</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-3.5 bg-[#FBF9F5]/90 backdrop-blur-xl border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <Link href="/seller" className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 rounded-lg bg-amber-700 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-serif font-bold text-sm text-stone-900">Artisan Studio</span>
            </Link>

            {/* Command Trigger */}
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                document.dispatchEvent(event);
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-200/90 hover:border-amber-700/40 text-xs text-stone-500 hover:text-stone-900 transition-all shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-stone-400" />
              <span>Quick command or search...</span>
              <kbd className="text-[10px] font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-500 border border-stone-200">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/seller/add-product"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Scan Craft</span>
            </Link>
            <LanguageSelector compact />
            <NotificationBell />
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 px-4 sm:px-8 py-6 pb-24 lg:pb-12 max-w-7xl w-full mx-auto">
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
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-2xl border-t border-stone-200/90 px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around overflow-x-auto scrollbar-hide">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all',
                  active ? 'text-amber-800 font-semibold' : 'text-stone-500 hover:text-stone-800'
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[10px]">{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
          <button
            onClick={handleSwitchRole}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-emerald-700"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span className="text-[10px]">Buyer</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
