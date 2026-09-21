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
        <div className="bg-[#FAF7F2] border border-stone-200 rounded-2xl overflow-hidden shadow-2xl text-stone-900">
          <CommandInput
            placeholder="Type a command, search products, crafts, or artisans... (ESC to close)"
            className="text-stone-900 placeholder:text-stone-400 border-b border-stone-200/80 bg-transparent py-4 text-sm font-medium"
          />
          <CommandList className="max-h-[420px] p-2 text-stone-700">
            <CommandEmpty className="py-8 text-center text-sm text-stone-400">
              No matching commands or craft items found.
            </CommandEmpty>

            {/* Quick Actions */}
            <CommandGroup heading="Quick Actions" className="text-stone-500 text-xs font-semibold px-2">
              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    setRole('seller');
                    router.push('/seller/add-product');
                  })
                }
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-amber-50 hover:text-amber-900 text-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-stone-900">Launch AI Craft Scanner</span>
                  <p className="text-xs text-stone-500">Scan physical craft into your digital catalog</p>
                </div>
                <CommandShortcut className="text-[10px] bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded text-stone-600 font-mono">
                  SCAN
                </CommandShortcut>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    const nextRole = role === 'seller' ? 'buyer' : 'seller';
                    setRole(nextRole);
                    router.push(nextRole === 'seller' ? '/seller' : '/buyer');
                    toast.success(`Switched to ${nextRole === 'seller' ? 'Artisan Studio' : 'Patron Marketplace'}`);
                  })
                }
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-stone-100/70 text-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-stone-900">
                    Switch Workspace: {role === 'seller' ? 'Artisan Studio → Patron Marketplace' : 'Marketplace → Artisan Studio'}
                  </span>
                  <p className="text-xs text-stone-500">Active mode: {role === 'seller' ? 'Artisan Producer' : 'Patron'}</p>
                </div>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    login();
                    setRole('seller');
                    router.push('/seller');
                    toast.success('Signed in as Artisan Lakshmi Devi');
                  })
                }
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-emerald-50 text-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-emerald-900">Instant Access: Master Artisan Lakshmi Devi</span>
                  <p className="text-xs text-stone-500">Load verified Kalamkari artisan producer workspace</p>
                </div>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator className="my-2 bg-stone-200/60" />

            {/* Navigation */}
            <CommandGroup heading="Navigation" className="text-stone-500 text-xs font-semibold px-2">
              <CommandItem
                onSelect={() => runCommand(() => router.push('/buyer/explore'))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-stone-100/70 text-sm"
              >
                <Search className="w-4 h-4 text-stone-500" />
                <span className="text-stone-800">Explore Handcrafted Catalog</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/buyer/artisans'))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-stone-100/70 text-sm"
              >
                <Store className="w-4 h-4 text-stone-500" />
                <span className="text-stone-800">Browse Master Artisans</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/seller/market'))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-stone-100/70 text-sm"
              >
                <TrendingUp className="w-4 h-4 text-stone-500" />
                <span className="text-stone-800">Market Demand &amp; Trends</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/seller/analytics'))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-stone-100/70 text-sm"
              >
                <BarChart3 className="w-4 h-4 text-stone-500" />
                <span className="text-stone-800">Store Revenue &amp; Insights</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator className="my-2 bg-stone-200/60" />

            {/* Products Search */}
            <CommandGroup heading="Handcrafted Creations" className="text-stone-500 text-xs font-semibold px-2">
              {products.slice(0, 6).map((p) => (
                <CommandItem
                  key={p.id}
                  onSelect={() => runCommand(() => router.push(`/buyer/product/${p.id}`))}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-amber-50/70 text-sm"
                >
                  <Package className="w-4 h-4 text-amber-700" />
                  <span className="text-stone-800 font-medium line-clamp-1">{p.name}</span>
                  <span className="text-xs text-stone-500 ml-auto font-mono">₹{p.price.toLocaleString('en-IN')}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator className="my-2 bg-stone-200/60" />

            {/* Language Switch */}
            <CommandGroup heading="Indic Languages" className="text-stone-500 text-xs font-semibold px-2">
              {languages.map((l) => (
                <CommandItem
                  key={l.code}
                  onSelect={() =>
                    runCommand(() => {
                      setLanguage(l.code);
                      toast.success(`Language set to ${l.nativeName}`);
                    })
                  }
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer hover:bg-stone-100/70 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-stone-500" />
                    <span className="text-stone-800">{l.nativeName} ({l.name})</span>
                  </div>
                  {language === l.code && <Check className="w-3.5 h-3.5 text-amber-700" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
