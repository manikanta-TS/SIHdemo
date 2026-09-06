'use client';

import { motion } from 'framer-motion';
import { StatCard } from '@/components/shared/StatCard';
import { revenueData, viewsData, topProducts } from '@/lib/mock-data';
import { IndianRupee, ShoppingBag, Eye, TrendingUp, Zap, Package } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const conversionData = [
  { stage: 'Views', value: 1248 },
  { stage: 'Cart', value: 186 },
  { stage: 'Orders', value: 18 },
];

const pieData = [
  { name: 'Kalamkari Bag', value: 8, color: '#a855f7' },
  { name: 'Cushion Covers', value: 6, color: '#ec4899' },
  { name: 'Saree', value: 2, color: '#f59e0b' },
  { name: 'Wall Art', value: 1, color: '#14b8a6' },
];

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Analytics</h1><p className="text-sm text-gray-500 mt-1">Track your store performance</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Revenue" value="₹24,850" icon={<IndianRupee className="w-5 h-5" />} trend="18.4%" trendUp gradient="bg-gradient-to-br from-orange-400 to-orange-600" />
        <StatCard label="Orders" value="18" icon={<ShoppingBag className="w-5 h-5" />} trend="12.2%" trendUp gradient="bg-gradient-to-br from-purple-400 to-purple-600" />
        <StatCard label="Views" value="1,248" icon={<Eye className="w-5 h-5" />} trend="8.1%" trendUp gradient="bg-gradient-to-br from-teal-400 to-teal-600" />
        <StatCard label="Conversion" value="1.4%" icon={<TrendingUp className="w-5 h-5" />} gradient="bg-gradient-to-br from-pink-400 to-pink-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
          <h3 className="font-bold text-sm mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} /><stop offset="100%" stopColor="#a855f7" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="#f3e8ff" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f3e8ff', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
          <h3 className="font-bold text-sm mb-4">Orders Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid vertical={false} stroke="#fce7f3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #fce7f3', fontSize: 12 }} />
              <Bar dataKey="orders" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
          <h3 className="font-bold text-sm mb-4">Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={conversionData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f3e8ff', fontSize: 12 }} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {conversionData.map((_, i) => <Cell key={i} fill={['#a855f7', '#ec4899', '#f59e0b'][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
          <h3 className="font-bold text-sm mb-4">Sales by Product</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f3e8ff', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {pieData.map((d) => <span key={d.name} className="flex items-center gap-1 text-xs text-gray-600"><span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}</span>)}
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <div className="space-y-3">
        {[
          { icon: Zap, text: 'Your Kalamkari bags are receiving 34% more views than your other products.', color: 'from-purple-500 to-pink-500' },
          { icon: TrendingUp, text: 'Demand appears to be increasing for handmade bags. Consider producing 3–5 more units this week.', color: 'from-teal-500 to-cyan-500' },
          { icon: Package, text: 'Your cushion covers have a high view-to-cart ratio. Consider bundling them as a set.', color: 'from-orange-500 to-pink-500' },
        ].map((insight, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05 }} className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100/60">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center shrink-0`}><insight.icon className="w-4 h-4 text-white" /></div>
              <p className="text-sm text-gray-700 pt-1.5">{insight.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
