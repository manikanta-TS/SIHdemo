'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/shared/StatCard';
import { revenueData, viewsData, topProducts } from '@/lib/mock-data';
import { useApp } from '@/lib/store';
import {
  Sparkles,
  Package,
  IndianRupee,
  Eye,
  ShoppingBag,
  ArrowRight,
  Zap,
  TrendingUp,
  MapPin,
  Award,
  Camera,
  Layers,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { useState } from 'react';

export default function SellerDashboard() {
  const { sellerProducts } = useApp();
  const totalProducts = 12 + sellerProducts.length;
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('30D');

  return (
    <div className="space-y-6">
      {/* Artisan Identity Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#10121A] border border-white/[0.08] relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-bold text-xl font-mono">
            LD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Lakshmi Devi&apos;s Artisan Studio</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Master Artisan
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" /> Srikalahasti, Andhra Pradesh
              </span>
              <span>·</span>
              <span className="text-amber-300 font-medium">Kalamkari Craft Guild #AP-412</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/seller/add-product"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Launch AI Scanner</span>
          </Link>
          <Link
            href="/seller/store"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-zinc-300 transition-colors"
          >
            <span>View Public Store</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Flagship AI Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Link href="/seller/add-product">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-[#131622] to-amber-600/10 border border-amber-500/30 p-6 sm:p-7 shadow-2xl hover:border-amber-500/50 transition-all group cursor-pointer">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">AI Vision Cataloging Engine</h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                      READY TO SCAN
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    Convert any raw physical handicraft into a professional, studio-lit catalog item with GI-tag identification, automated description in 8 languages, and fair price discovery in under 60 seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform">
                <span>Start AI Scan</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <StatCard
          label="Total Revenue"
          value="₹24,850"
          icon={<IndianRupee className="w-5 h-5" />}
          trend="+18.4%"
          trendUp={true}
          delay={0.15}
        />
        <StatCard
          label="Active Orders"
          value="18"
          icon={<ShoppingBag className="w-5 h-5" />}
          trend="+12.2%"
          trendUp={true}
          delay={0.2}
        />
        <StatCard
          label="Active Catalog"
          value={String(totalProducts)}
          icon={<Package className="w-5 h-5" />}
          delay={0.25}
        />
        <StatCard
          label="Patron Views"
          value="1,248"
          icon={<Eye className="w-5 h-5" />}
          trend="+8.1%"
          trendUp={true}
          delay={0.3}
        />
      </div>

      {/* Telemetry Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Revenue Growth */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-white">Revenue Trajectory</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Monthly gross payouts to artisan account</p>
            </div>
            <div className="flex gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono">
              {(['7D', '30D', '90D'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-2 py-0.5 rounded ${
                    timeRange === t ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161922',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#fff',
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2.5} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-white">Patron Engagement</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Profile and catalog view volume</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              +14% vs avg
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={viewsData}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161922',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#fff',
                }}
              />
              <Bar dataKey="views" fill="#d97706" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Neural Tactical Directive */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-5 rounded-2xl bg-[#10121A] border border-amber-500/30 relative overflow-hidden"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm text-white">AI Tactical Recommendation</p>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                High Confidence (92%)
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
              Your <strong className="text-amber-300 font-semibold">Handcrafted Kalamkari Cotton Shoulder Bag</strong> is experiencing a 34% surge in search traffic across metro areas. We predict a stockout within 6 days at current velocity. Consider producing a batch of 4 additional units at the current optimal price point of ₹1,650.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Link
                href="/seller/add-product"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                <span>Add Inventory Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Performing Crafts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm text-white">Top Performing Catalog Items</h3>
            <p className="text-[11px] text-zinc-400">Ranked by revenue contribution</p>
          </div>
          <Link href="/seller/products" className="text-xs text-amber-400 hover:underline">
            Manage Catalog
          </Link>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {topProducts.map((p, i) => (
            <div key={p.name} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 font-mono text-xs font-bold flex items-center justify-center">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">{p.name}</p>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {p.views} views · {p.sales} orders placed
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-amber-400">
                ₹{p.revenue.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
