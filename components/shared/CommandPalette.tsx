'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ShoppingBag,
  Store,
  Search,
  Package,
  Heart,
  TrendingUp,
  BarChart3,
  User,
  ArrowRight,
  Globe,
  Sliders,
  LogIn,
  Check,
  Shield,
  Layers,
} from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command';
import { useApp } from '@/lib/store';
import { products, artisans, languages } from '@/lib/mock-data';
import { toast } from 'sonner';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { role, setRole, login, setLanguage, language } = useApp();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-[#0D0F17] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <CommandInput
            placeholder="Type a command, search products, crafts, or artisans... (ESC to close)"
            className="text-white placeholder:text-zinc-500 border-b border-white/10 bg-transparent py-4 text-sm font-medium"
          />
          <CommandList className="max-h-[420px] p-2 text-zinc-300">
            <CommandEmpty className="py-8 text-center text-sm text-zinc-500">
              No matching commands or craft items found.
            </CommandEmpty>

            {/* Quick Actions */}
            <CommandGroup heading="Quick Actions" className="text-zinc-400 text-xs font-semibold px-2">
              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    setRole('seller');
                    router.push('/seller/add-product');
                  })
                }
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-amber-500/10 hover:text-amber-400 text-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-white">Launch AI Product Scanner</span>
                  <p className="text-xs text-zinc-400">Scan physical craft into an instant catalog</p>
                </div>
                <CommandShortcut className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-zinc-400">
                  SCAN
                </CommandShortcut>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    const nextRole = role === 'seller' ? 'buyer' : 'seller';
                    setRole(nextRole);
                    router.push(nextRole === 'seller' ? '/seller' : '/buyer');
                    toast.success(`Switched to ${nextRole === 'seller' ? 'Artisan Studio' : 'Buyer Marketplace'}`);
                  })
                }
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/5 text-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-white">
                    Switch Persona: {role === 'seller' ? 'Artisan Studio → Buyer' : 'Buyer → Artisan Studio'}
                  </span>
                  <p className="text-xs text-zinc-400">Current view: {role === 'seller' ? 'Artisan' : 'Buyer'}</p>
                </div>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    login();
                    setRole('seller');
                    router.push('/seller');
                    toast.success('Signed in as Artisan Lakshmi Devi (Demo Mode)');
                  })
                }
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/5 text-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-emerald-300">Judge Shortcut: 1-Click Artisan Login</span>
                  <p className="text-xs text-zinc-400">Preload active verified master artisan profile</p>
                </div>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator className="my-2 bg-white/5" />

            {/* Navigation */}
            <CommandGroup heading="Navigation" className="text-zinc-400 text-xs font-semibold px-2">
              <CommandItem
                onSelect={() => runCommand(() => router.push('/buyer/explore'))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 text-sm"
              >
                <Search className="w-4 h-4 text-zinc-400" />
                <span>Explore All Handcrafted Items</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/buyer/artisans'))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 text-sm"
              >
                <Store className="w-4 h-4 text-zinc-400" />
                <span>Browse Verified Artisans</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/seller/market'))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 text-sm"
              >
                <TrendingUp className="w-4 h-4 text-zinc-400" />
                <span>Market Intelligence Radar</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/seller/analytics'))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 text-sm"
              >
                <BarChart3 className="w-4 h-4 text-zinc-400" />
                <span>Store Revenue Analytics</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator className="my-2 bg-white/5" />

            {/* Products Search */}
            <CommandGroup heading="Craft Products" className="text-zinc-400 text-xs font-semibold px-2">
              {products.slice(0, 6).map((p) => (
                <CommandItem
                  key={p.id}
                  onSelect={() => runCommand(() => router.push(`/buyer/product/${p.id}`))}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 text-sm"
                >
                  <Package className="w-4 h-4 text-amber-400" />
                  <span className="text-zinc-200 font-medium line-clamp-1">{p.name}</span>
                  <span className="text-xs text-zinc-500 ml-auto font-mono">₹{p.price}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator className="my-2 bg-white/5" />

            {/* Language Switch */}
            <CommandGroup heading="Indic Languages" className="text-zinc-400 text-xs font-semibold px-2">
              {languages.map((l) => (
                <CommandItem
                  key={l.code}
                  onSelect={() =>
                    runCommand(() => {
                      setLanguage(l.code);
                      toast.success(`Language set to ${l.nativeName}`);
                    })
                  }
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/5 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-zinc-300">{l.nativeName} ({l.name})</span>
                  </div>
                  {language === l.code && <Check className="w-4 h-4 text-amber-400" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
