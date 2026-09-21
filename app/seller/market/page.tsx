'use client';

import { motion } from 'framer-motion';
import { trendingCrafts, priceTrendData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, Flame, IndianRupee, Radio, Compass } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

export default function MarketIntelPage() {
  return (
    <div className="space-y-6 text-stone-900">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-stone-900">National Craft Demand &amp; Market Trends</h1>
          <p className="text-xs text-stone-500 mt-1 font-mono">
            Direct demand signals, pricing trends, and festival season forecasts
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
          <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
          <span>Active Market Pulse</span>
        </span>
      </div>

      {/* Trending crafts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm text-stone-900">Craft Demand Trajectory</h3>
            <p className="text-[11px] text-stone-500 font-mono">Ranked by search interest across major metro regions</p>
          </div>
        </div>

        <div className="space-y-2">
          {trendingCrafts.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-stone-200/80 hover:bg-stone-50 transition-colors"
            >
              <span className="w-6 h-6 rounded-lg bg-white border border-stone-200 text-stone-600 font-mono text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="font-semibold text-xs text-stone-900 flex-1">{c.name}</span>
              <span
                className={cn(
                  'flex items-center gap-1 text-xs font-mono font-bold',
                  c.trend === 'up' ? 'text-emerald-700' : 'text-rose-600'
                )}
              >
                {c.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}{' '}
                {c.change}
              </span>
              <span
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase border',
                  c.demand === 'High'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                )}
              >
                {c.demand} Demand
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Price trends */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm text-stone-900 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-amber-700" />
              <span>Fair Value Curve — Handcrafted Kalamkari Textiles</span>
            </h3>
            <p className="text-[11px] text-stone-500 font-mono">Average patron acquisition price per verified piece</p>
          </div>
          <span className="text-[11px] font-mono text-amber-800 font-semibold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
            +18% 7-Month Appreciation
          </span>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={priceTrendData}>
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
            <Line type="monotone" dataKey="price" stroke="#E88219" strokeWidth={3} dot={{ fill: '#E88219', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Strategic Recommendations */}
      <div className="space-y-3">
        <h3 className="font-semibold text-xs text-stone-500 uppercase tracking-wider font-mono">
          Strategic Market Recommendations
        </h3>
        {[
          {
            icon: Flame,
            text: 'Kalamkari artisanal shoulder bags are trending across metro collectors. Introducing 2-3 additional earth colorways will capture upcoming festival intent.',
            title: 'Inventory Opportunity',
          },
          {
            icon: Compass,
            text: 'Pieces priced in the fair range of ₹1,550–₹1,750 enjoy an 82% faster sales cycle with high patron rating satisfaction.',
            title: 'Pricing Sweet Spot',
          },
          {
            icon: TrendingUp,
            text: 'Handloom weaves experience a recurring 28% pre-festival demand increase. Plan organic raw material sourcing 3 weeks in advance.',
            title: 'Festival Season Signal',
          },
        ].map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
            className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-700 mt-0.5">
              <rec.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">{rec.title}</p>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{rec.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
