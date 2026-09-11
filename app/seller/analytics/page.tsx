'use client';

import { motion } from 'framer-motion';
import { StatCard } from '@/components/shared/StatCard';
import { revenueData, viewsData, topProducts } from '@/lib/mock-data';
import { IndianRupee, ShoppingBag, Eye, TrendingUp, Zap, Package, ArrowUpRight } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const conversionData = [
  { stage: 'Specimen Views', value: 1248 },
  { stage: 'Bag Additions', value: 186 },
  { stage: 'Paid Orders', value: 18 },
];

const pieData = [
  { name: 'Kalamkari Handbags', value: 8, color: '#f59e0b' },
  { name: 'Embroidered Cushion Covers', value: 6, color: '#10b981' },
  { name: 'Chanderi Silk Sarees', value: 2, color: '#6366f1' },
  { name: 'Hand-painted Wall Hangings', value: 1, color: '#06b6d4' },
];

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-bold">Financial Telemetry & Analytics</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Real-time performance tracking and direct artisan income realization
        </p>
      </div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <StatCard
          label="Gross Revenue"
          value="₹24,850"
          icon={<IndianRupee className="w-5 h-5" />}
          trend="+18.4%"
          trendUp={true}
        />
        <StatCard
          label="Delivered Orders"
          value="18"
          icon={<ShoppingBag className="w-5 h-5" />}
          trend="+12.2%"
          trendUp={true}
        />
        <StatCard
          label="Unique Patrons"
          value="1,248"
          icon={<Eye className="w-5 h-5" />}
          trend="+8.1%"
          trendUp={true}
        />
        <StatCard
          label="Conversion Velocity"
          value="1.44%"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="+0.3%"
          trendUp={true}
        />
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Revenue Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-white">Net Income Progression</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Artisan monthly take-home payouts</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Zero Commission
            </span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
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
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Order Volumes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-white">Order Volume by Month</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Direct patron acquisitions</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
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
              <Bar dataKey="orders" fill="#d97706" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Funnel & Product Share */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
        >
          <h3 className="font-semibold text-sm text-white mb-1">Patron Conversion Funnel</h3>
          <p className="text-[11px] text-zinc-400 font-mono mb-4">Visitor retention to purchase completion</p>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={conversionData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="stage"
                type="category"
                tick={{ fontSize: 11, fill: '#a1a1aa' }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161922',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#fff',
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {conversionData.map((_, i) => (
                  <Cell key={i} fill={['#f59e0b', '#d97706', '#10b981'][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Share by Craft Category */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
        >
          <h3 className="font-semibold text-sm text-white mb-1">Revenue Share by Craft Line</h3>
          <p className="text-[11px] text-zinc-400 font-mono mb-2">Category distribution</p>

          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={35}
                stroke="none"
              >
                {pieData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161922',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap gap-3 mt-1 justify-center">
            {pieData.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span>{d.name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Actionable Directives */}
      <div className="space-y-2.5">
        <h3 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider font-mono">
          Automated Revenue Directives
        </h3>
        {[
          {
            title: 'Kalamkari Demand Spurt',
            text: 'Your Kalamkari bags are generating 34% more views than regional craft baseline. High probability of price elasticity up to ₹1,750.',
            tag: 'Pricing Opportunity',
          },
          {
            title: 'Bundle Opportunity',
            text: 'Cushion covers are viewed in pairs 68% of the time. Adding a "Set of 2" listing will increase average order value by ₹800.',
            tag: 'Catalog Strategy',
          },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-[#10121A] border border-white/[0.08] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-white">{item.title}</p>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
