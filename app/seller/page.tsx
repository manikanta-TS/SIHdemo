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
    <div className="space-y-6 text-stone-900">
      {/* Artisan Identity Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-900 shrink-0 font-serif font-bold text-xl shadow-xs">
            LD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif font-bold text-stone-900">Lakshmi Devi&apos;s Artisan Studio</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Master Artisan
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 flex items-center gap-2 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-700" /> Srikalahasti, Andhra Pradesh
              </span>
              <span>·</span>
              <span className="text-amber-800 font-semibold">Kalamkari Craft Guild #AP-412</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/seller/add-product"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Launch AI Scanner</span>
          </Link>
          <Link
            href="/seller/store"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs text-stone-700 font-medium transition-colors shadow-sm"
          >
            <span>View Public Store</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-100/90 via-amber-50/80 to-orange-100/90 border border-amber-300/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-700/5 to-transparent pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-amber-100" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-serif font-bold text-stone-900">AI Vision Cataloging Engine</h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                      READY TO SCAN
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
                    Convert any raw physical handicraft into a professional, studio-lit catalog item with GI-tag identification, automated description in 8 languages, and fair price discovery in under 60 seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 shrink-0 group-hover:translate-x-1 transition-transform">
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
          className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Revenue Trajectory</h3>
              <p className="text-[11px] text-stone-500 font-mono">Monthly gross payouts to artisan account</p>
            </div>
            <div className="flex gap-1 p-0.5 rounded-lg bg-stone-50 border border-stone-200 text-[10px] font-mono">
              {(['7D', '30D', '90D'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-2 py-0.5 rounded ${
                    timeRange === t ? 'bg-amber-700 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
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
                  <stop offset="5%" stopColor="#c86d24" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#c86d24" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e7e3da',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#1a1715',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#c86d24" strokeWidth={2.5} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Patron Engagement</h3>
              <p className="text-[11px] text-stone-500 font-mono">Profile and catalog view volume</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
              +14% vs avg
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={viewsData}>
              <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e7e3da',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#1a1715',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              />
              <Bar dataKey="views" fill="#c86d24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Neural Tactical Directive */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 relative overflow-hidden shadow-sm"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-amber-800 mt-0.5 shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-serif font-bold text-sm text-stone-900">AI Tactical Recommendation</p>
              <span className="text-[10px] font-mono text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">
                High Confidence (92%)
              </span>
            </div>
            <p className="text-xs text-stone-700 mt-1 leading-relaxed">
              Your <strong className="text-amber-900 font-semibold">Handcrafted Kalamkari Cotton Shoulder Bag</strong> is experiencing a 34% surge in search traffic across metro areas. We predict a stockout within 6 days at current velocity. Consider producing a batch of 4 additional units at the current optimal price point of ₹1,650.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Link
                href="/seller/add-product"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900"
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
        className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-bold text-sm text-stone-900">Top Performing Catalog Items</h3>
            <p className="text-[11px] text-stone-500">Ranked by revenue contribution</p>
          </div>
          <Link href="/seller/products" className="text-xs text-amber-800 hover:text-amber-900 hover:underline font-medium">
            Manage Catalog
          </Link>
        </div>
        <div className="divide-y divide-stone-100">
          {topProducts.map((p, i) => (
            <div key={p.name} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-stone-50 border border-stone-200 text-stone-500 font-mono text-xs font-bold flex items-center justify-center">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-xs font-semibold text-stone-900">{p.name}</p>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {p.views} views · {p.sales} orders placed
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-stone-900">
                ₹{p.revenue.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
