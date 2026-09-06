'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/shared/StatCard';
import { revenueData, viewsData, topProducts } from '@/lib/mock-data';
import { useApp } from '@/lib/store';
import { Sparkles, Package, IndianRupee, Eye, ShoppingBag, ArrowRight, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';

export default function SellerDashboard() {
  const { sellerProducts } = useApp();
  const totalProducts = 12 + sellerProducts.length;

  return (
    <div className="space-y-6">
      {/* AI CTA */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <Link href="/seller/add-product">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 text-white p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow group cursor-pointer">
            <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors" />
            <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-cyan-300/20 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Sparkles className="w-8 h-8" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold">Create Product with AI</h2>
                <p className="text-white/80 text-sm mt-1">Take one photo. We'll help you create a professional product listing.</p>
              </div>
              <ArrowRight className="w-6 h-6 opacity-70 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Revenue" value="₹24,850" icon={<IndianRupee className="w-5 h-5" />} trend="18.4%" trendUp gradient="bg-gradient-to-br from-orange-400 to-orange-600" delay={0.15} />
        <StatCard label="Orders" value="18" icon={<ShoppingBag className="w-5 h-5" />} trend="12.2%" trendUp gradient="bg-gradient-to-br from-purple-400 to-purple-600" delay={0.2} />
        <StatCard label="Products" value={String(totalProducts)} icon={<Package className="w-5 h-5" />} gradient="bg-gradient-to-br from-teal-400 to-teal-600" delay={0.25} />
        <StatCard label="Store Views" value="1,248" icon={<Eye className="w-5 h-5" />} trend="8.1%" trendUp gradient="bg-gradient-to-br from-pink-400 to-pink-600" delay={0.3} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
          <h3 className="font-bold text-sm mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f3e8ff', fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
          <h3 className="font-bold text-sm mb-4">Views This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={viewsData}>
              <CartesianGrid vertical={false} stroke="#f3e8ff" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f3e8ff', fontSize: 12 }} />
              <Bar dataKey="views" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Insight */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/60">
        <div className="flex items-start gap-3">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <p className="font-bold text-sm text-purple-900">AI Insight</p>
            <p className="text-sm text-gray-600 mt-1">Your Kalamkari bags are receiving 34% more views than your other products. Demand appears to be increasing for handmade bags — consider producing 3–5 more units this week.</p>
          </div>
        </div>
      </motion.div>

      {/* Top products */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm">Top Products</h3>
          <Link href="/seller/products" className="text-xs text-purple-600 font-medium hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">{p.views} views · {p.sales} sales</p>
              </div>
              <span className="text-sm font-bold">₹{p.revenue.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
