'use client';

import { motion } from 'framer-motion';
import { trendingCrafts, priceTrendData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, Sparkles, Flame, Lightbulb, Package, IndianRupee, Radio, Compass } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

export default function MarketIntelPage() {
  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">National Craft Market Intelligence</h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Real-time demand signals, price elasticity curves, and festival season forecasts
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>LIVE RADAR SYNC</span>
        </span>
      </div>

      {/* Trending crafts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm text-white">Craft Demand Trajectory Radar</h3>
            <p className="text-[11px] text-zinc-400 font-mono">Ranked by search volume acceleration across Tier 1 metros</p>
          </div>
        </div>

        <div className="space-y-2">
          {trendingCrafts.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
            >
              <span className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 font-mono text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="font-semibold text-xs text-white flex-1">{c.name}</span>
              <span
                className={cn(
                  'flex items-center gap-1 text-xs font-mono font-bold',
                  c.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
                )}
              >
                {c.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}{' '}
                {c.change}
              </span>
              <span
                className={cn(
                  'px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase border',
                  c.demand === 'High'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
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
        className="p-5 rounded-2xl bg-[#10121A] border border-white/[0.08]"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-amber-400" />
              <span>Valuation Elasticity — Handcrafted Kalamkari Textiles</span>
            </h3>
            <p className="text-[11px] text-zinc-400 font-mono">Average transacted price per verified piece</p>
          </div>
          <span className="text-[10px] font-mono text-amber-400">+18% 7-Month Appreciation</span>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={priceTrendData}>
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
            <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Tactical Recommendations */}
      <div className="space-y-3">
        <h3 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider font-mono">
          Strategic Market Advisories
        </h3>
        {[
          {
            icon: Flame,
            text: 'Kalamkari artisanal shoulder bags are trending across Mumbai & Bangalore. Creating 3-5 new colorways will capture surplus seasonal intent.',
            title: 'Inventory Acceleration',
          },
          {
            icon: Compass,
            text: 'Products priced at the sweet-spot of ₹1,550–₹1,750 have an 82% faster sales cycle with highest review satisfaction.',
            title: 'Pricing Optimization',
          },
          {
            icon: TrendingUp,
            text: 'Handloom weaves experience an annual 28% pre-Diwali demand spike. Plan raw material procurement 3 weeks in advance.',
            title: 'Seasonal Procurement Signal',
          },
        ].map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
            className="p-4 rounded-2xl bg-[#10121A] border border-white/[0.08] flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
              <rec.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{rec.title}</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{rec.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
