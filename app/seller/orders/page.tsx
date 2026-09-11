'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { sellerOrders } from '@/lib/mock-data';
import { X, Package, Truck, Check, MapPin, User, IndianRupee, ArrowRight, Clock, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const tabs = [
  { id: 'all', label: 'All Orders' },
  { id: 'new', label: 'New Action Needed' },
  { id: 'processing', label: 'Packaging' },
  { id: 'shipped', label: 'In Transit' },
  { id: 'delivered', label: 'Completed' },
];

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  new: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  processing: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  shipped: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  delivered: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
};

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState(sellerOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof sellerOrders[number] | null>(null);

  const filtered = activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);

  const updateStatus = (id: string, status: typeof sellerOrders[number]['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setSelectedOrder((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    toast.success(`Order ${id} transitioned to "${status.toUpperCase()}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders & Direct Fulfillment</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Manage packing, courier handover, and direct artisan bank disbursements
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border',
              activeTab === t.id
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-md'
                : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:border-white/20'
            )}
          >
            {t.label}
            <span className="ml-1.5 font-mono text-[10px] opacity-70">
              ({t.id === 'all' ? orders.length : orders.filter((o) => o.status === t.id).length})
            </span>
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-3">
        {filtered.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.2) }}
            onClick={() => setSelectedOrder(order)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#10121A] border border-white/[0.08] hover:border-white/[0.18] cursor-pointer transition-all group"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-white/10">
              <Image src={order.productImage} alt={order.product} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-white">{order.id}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-xs text-zinc-400 font-medium truncate">{order.customer}</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold mt-0.5 truncate group-hover:text-amber-300 transition-colors">
                {order.product}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Placed on {order.date}</p>
            </div>

            <div className="text-right">
              <p className="font-mono font-bold text-sm text-white">₹{order.amount.toLocaleString('en-IN')}</p>
              <span
                className={cn(
                  'inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase mt-1 border',
                  statusStyles[order.status].bg,
                  statusStyles[order.status].text,
                  statusStyles[order.status].border
                )}
              >
                {order.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slide-over Inspection Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#0E1017] border-l border-white/10 z-50 overflow-y-auto p-6 space-y-5 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Order Dossier</span>
                  <h2 className="text-lg font-bold font-mono text-white">{selectedOrder.id}</h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                <Image src={selectedOrder.productImage} alt={selectedOrder.product} fill className="object-cover" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-white">{selectedOrder.product}</h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">₹{selectedOrder.amount.toLocaleString('en-IN')} via UPI Instant Pay</p>
              </div>

              {/* Customer & Address Details */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">{selectedOrder.customer}</span>
                </div>
                <div className="flex items-start gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>24 Lake View Road, Banjara Hills, Hyderabad, Telangana 500034</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Order Timestamp: {selectedOrder.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <p className="text-[10px] font-mono uppercase text-zinc-400 font-semibold mb-2">
                  Fulfillment Status Transitions
                </p>

                {selectedOrder.status === 'new' && (
                  <button
                    onClick={() => updateStatus(selectedOrder.id, 'processing')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    <span>Confirm Craft Inspection & Pack</span>
                  </button>
                )}

                {selectedOrder.status === 'processing' && (
                  <button
                    onClick={() => updateStatus(selectedOrder.id, 'shipped')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold transition-colors"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Generate Shipping Label & Handover</span>
                  </button>
                )}

                {selectedOrder.status === 'shipped' && (
                  <button
                    onClick={() => updateStatus(selectedOrder.id, 'delivered')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm Delivery & Disburse Funds</span>
                  </button>
                )}

                <button
                  onClick={() => toast.success('Generated digital packing manifest slip for courier')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs font-semibold border border-white/[0.08] transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Print Packaging QR Seal</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
