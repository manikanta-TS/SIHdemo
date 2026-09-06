'use client';

import { motion } from 'framer-motion';
import { trendingCrafts, priceTrendData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, Sparkles, Flame, Lightbulb, Package, IndianRupee } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

export default function MarketIntelPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2"><TrendingUp className="w-6 h-6 text-purple-600" /><div><h1 className="text-2xl font-bold">Market Intelligence</h1><p className="text-sm text-gray-500">AI-powered market insights for your craft</p></div></div>

      {/* Trending crafts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
        <h3 className="font-bold text-sm mb-4">Trending Crafts</h3>
        <div className="space-y-2">
          {trendingCrafts.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50/50 to-transparent">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <span className="font-semibold text-sm flex-1">{c.name}</span>
              <span className={cn('flex items-center gap-1 text-sm font-medium', c.trend === 'up' ? 'text-green-600' : 'text-red-500')}>
                {c.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />} {c.change}
              </span>
              <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', c.demand === 'High' ? 'bg-green-100 text-green-700' : c.demand === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600')}>{c.demand}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Price trends */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><IndianRupee className="w-4 h-4 text-purple-600" /> Price Trends — Handwoven Bags</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={priceTrendData}>
            <CartesianGrid vertical={false} stroke="#f3e8ff" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f3e8ff', fontSize: 12 }} />
            <Line type="monotone" dataKey="price" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">Average price for handwoven bags has increased by 18% over 7 months.</p>
      </motion.div>

      {/* AI Recommendations */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-600" /> AI Recommendations</h3>
        {[
          { icon: Flame, text: 'Kalamkari handbags are trending. Consider adding 3-5 more designs.', color: 'from-orange-500 to-red-500' },
          { icon: Lightbulb, text: 'Products priced between ₹1,400–₹1,800 are receiving higher engagement.', color: 'from-amber-500 to-orange-500' },
          { icon: Package, text: 'Consider increasing inventory for your top-selling Kalamkari Bag.', color: 'from-purple-500 to-pink-500' },
          { icon: TrendingUp, text: 'Handloom sarees see a 22% demand spike during festival season. Plan ahead.', color: 'from-teal-500 to-cyan-500' },
        ].map((rec, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }} className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100/60">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center shrink-0`}><rec.icon className="w-4 h-4 text-white" /></div>
              <p className="text-sm text-gray-700 pt-1.5">{rec.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
