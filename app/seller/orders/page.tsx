'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { sellerOrders } from '@/lib/mock-data';
import { X, Package, Truck, Check, MapPin, User, Clock, QrCode } from 'lucide-react';
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
  new: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  processing: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
  shipped: { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
  delivered: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
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
        <h1 className="text-2xl font-bold text-stone-900">Orders &amp; Direct Fulfillment</h1>
        <p className="text-xs text-stone-500 mt-1 font-mono">
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
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700'
            )}
          >
            {t.label}
            <span className="ml-1.5 font-mono text-[10px] opacity-60">
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
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200/90 hover:border-amber-700/30 hover:shadow-md cursor-pointer transition-all group"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
              <Image src={order.productImage} alt={order.product} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-stone-900">{order.id}</span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500 font-medium truncate">{order.customer}</span>
              </div>
              <p className="text-xs text-stone-800 font-semibold mt-0.5 truncate group-hover:text-amber-800 transition-colors">
                {order.product}
              </p>
              <p className="text-[11px] text-stone-400 font-mono mt-0.5">Placed on {order.date}</p>
            </div>

            <div className="text-right">
              <p className="font-mono font-bold text-sm text-stone-900">₹{order.amount.toLocaleString('en-IN')}</p>
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
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 transition-opacity"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white border-l border-stone-200 z-50 overflow-y-auto p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Order Dossier</span>
                  <h2 className="text-lg font-bold font-mono text-stone-900">{selectedOrder.id}</h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 hover:bg-stone-100 text-stone-400 hover:text-stone-700 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <Image src={selectedOrder.productImage} alt={selectedOrder.product} fill className="object-cover" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-stone-900">{selectedOrder.product}</h3>
                <p className="text-xs text-amber-800 font-mono mt-0.5">₹{selectedOrder.amount.toLocaleString('en-IN')} via UPI Instant Pay</p>
              </div>

              {/* Customer & Address Details */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <User className="w-4 h-4 text-amber-700" />
                  <span className="font-medium">{selectedOrder.customer}</span>
                </div>
                <div className="flex items-start gap-2 text-stone-500">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>24 Lake View Road, Banjara Hills, Hyderabad, Telangana 500034</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Order Timestamp: {selectedOrder.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <p className="text-[10px] font-mono uppercase text-stone-400 font-semibold mb-2">
                  Fulfillment Status Transitions
                </p>

                {selectedOrder.status === 'new' && (
                  <button
                    onClick={() => updateStatus(selectedOrder.id, 'processing')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <Package className="w-4 h-4" />
                    <span>Confirm Craft Inspection &amp; Pack</span>
                  </button>
                )}

                {selectedOrder.status === 'processing' && (
                  <button
                    onClick={() => updateStatus(selectedOrder.id, 'shipped')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Generate Shipping Label &amp; Handover</span>
                  </button>
                )}

                {selectedOrder.status === 'shipped' && (
                  <button
                    onClick={() => updateStatus(selectedOrder.id, 'delivered')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm Delivery &amp; Disburse Funds</span>
                  </button>
                )}

                <button
                  onClick={() => toast.success('Generated digital packing manifest slip for courier')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200 transition-colors"
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
