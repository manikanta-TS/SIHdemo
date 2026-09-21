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
  { stage: 'Item Views', value: 1248 },
  { stage: 'Bag Additions', value: 186 },
  { stage: 'Delivered Orders', value: 18 },
];

const pieData = [
  { name: 'Kalamkari Bags', value: 8, color: '#E88219' },
  { name: 'Embroidered Covers', value: 6, color: '#15803D' },
  { name: 'Chanderi Sarees', value: 2, color: '#147A83' },
  { name: 'Wall Hangings', value: 1, color: '#C86843' },
];

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-6 text-stone-900">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 font-serif">Artisan Income Insights &amp; Analytics</h1>
        <p className="text-xs text-stone-500 mt-1 font-mono">
          Real-time performance tracking and direct artisan household income realization
        </p>
      </div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <StatCard
          label="Gross Realization"
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
          label="Patron Conversion"
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
          className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-stone-900">Net Income Progression</h3>
              <p className="text-[11px] text-stone-500 font-mono">Monthly take-home disbursements</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
              100% Direct Payout
            </span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E88219" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#E88219" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(42,33,24,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #e7e5e4',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#1c1917',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#E88219" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Order Volumes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-stone-900">Order Volume by Month</h3>
              <p className="text-[11px] text-stone-500 font-mono">Direct patron acquisitions</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid vertical={false} stroke="rgba(42,33,24,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #e7e5e4',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#1c1917',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Bar dataKey="orders" fill="#C86843" radius={[6, 6, 0, 0]} />
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
          className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
        >
          <h3 className="font-semibold text-sm text-stone-900 mb-1">Patron Purchase Journey</h3>
          <p className="text-[11px] text-stone-500 font-mono mb-4">From initial view to confirmed acquisition</p>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={conversionData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="stage"
                type="category"
                tick={{ fontSize: 11, fill: '#57534e' }}
                axisLine={false}
                tickLine={false}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #e7e5e4',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#1c1917',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {conversionData.map((_, i) => (
                  <Cell key={i} fill={['#E88219', '#C86843', '#15803D'][i]} />
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
          className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
        >
          <h3 className="font-semibold text-sm text-stone-900 mb-1">Revenue Share by Craft Line</h3>
          <p className="text-[11px] text-stone-500 font-mono mb-2">Category distribution</p>

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
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #e7e5e4',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#1c1917',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap gap-3 mt-1 justify-center">
            {pieData.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span>{d.name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Helpful Actionable Insights */}
      <div className="space-y-2.5">
        <h3 className="font-semibold text-xs text-stone-500 uppercase tracking-wider font-mono">
          Artisan Growth Insights
        </h3>
        {[
          {
            title: 'Kalamkari Demand Spurt',
            text: 'Your Kalamkari bags are receiving 34% more patron inquiries than the regional baseline. There is strong pricing room up to ₹1,750.',
            tag: 'Pricing Opportunity',
          },
          {
            title: 'Craft Bundle Suggestion',
            text: 'Cushion covers are viewed in pairs 68% of the time. Creating a "Set of 2" listing can increase average order value by ₹800.',
            tag: 'Catalog Strategy',
          },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-stone-900">{item.title}</p>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
