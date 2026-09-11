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
    <div className="min-h-screen relative text-white bg-[#08090D] flex">
      <AnimatedBackground variant="seller" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-[#0D0F17]/90 backdrop-blur-2xl border-r border-white/[0.08] z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-white/[0.06]">
          <Link href="/seller" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">Hastkala</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
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
                  active
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                    : item.highlight
                    ? 'text-amber-300 hover:bg-amber-500/10 border border-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn('w-4 h-4 transition-colors', active ? 'text-amber-400' : 'text-zinc-400 group-hover:text-zinc-200')} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !active && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <Link
            href="/seller/profile"
            className={cn(
              'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all',
              pathname === '/seller/profile'
                ? 'bg-white/10 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            )}
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-zinc-400" />
              <span>Artisan Credentials</span>
            </div>
          </Link>

          <button
            onClick={handleSwitchRole}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-4 h-4" />
              <span>Switch to Buyer Mode</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-3.5 bg-[#08090D]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <Link href="/seller" className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-black font-bold">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm text-white">Artisan Studio</span>
            </Link>

            {/* Command Trigger */}
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                document.dispatchEvent(event);
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] text-xs text-zinc-400 hover:text-white transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Quick command or search...</span>
              <kbd className="text-[10px] font-mono bg-white/[0.08] px-1.5 py-0.5 rounded text-zinc-400">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/seller/add-product"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs shadow-md shadow-amber-500/20 transition-all"
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0D0F17]/95 backdrop-blur-2xl border-t border-white/[0.08] px-2 py-2">
        <div className="flex items-center justify-around overflow-x-auto scrollbar-hide">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all',
                  active ? 'text-amber-400 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[10px]">{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
          <button
            onClick={handleSwitchRole}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-emerald-400"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span className="text-[10px]">Buyer</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
