'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { sellerOrders } from '@/lib/mock-data';
import { X, Package, Truck, Check, MapPin, User, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New' },
  { id: 'processing', label: 'Processing' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'delivered', label: 'Delivered' },
];

const statusColors: Record<string, string> = {
  new: 'bg-orange-100 text-orange-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
};

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState(sellerOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof sellerOrders[number] | null>(null);

  const filtered = activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);

  const updateStatus = (id: string, status: typeof sellerOrders[number]['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setSelectedOrder((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    toast.success(`Order marked as ${status}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={cn('px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors', activeTab === t.id ? 'bg-purple-500 text-white' : 'bg-white/80 border border-purple-100 text-gray-700')}>
            {t.label}
            <span className="ml-1.5 text-xs opacity-70">{t.id === 'all' ? orders.length : orders.filter((o) => o.status === t.id).length}</span>
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setSelectedOrder(order)} className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 border border-purple-100/60 cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0"><Image src={order.productImage} alt={order.product} fill className="object-cover" sizes="56px" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{order.id}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{order.product}</p>
              <p className="text-xs text-gray-400">{order.customer} · {order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">₹{order.amount.toLocaleString('en-IN')}</p>
              <span className={cn('inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1', statusColors[order.status])}>{order.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order detail drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedOrder(null)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 overflow-y-auto shadow-2xl">
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg">{selectedOrder.id}</h2>
                  <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden"><Image src={selectedOrder.productImage} alt={selectedOrder.product} fill className="object-cover" sizes="384px" /></div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">{selectedOrder.product}</p>
                  <div className="flex items-center gap-2 text-gray-500"><User className="w-4 h-4" /> {selectedOrder.customer}</div>
                  <div className="flex items-center gap-2 text-gray-500"><MapPin className="w-4 h-4" /> Hyderabad, Telangana 500034</div>
                  <div className="flex items-center gap-2 text-gray-500"><IndianRupee className="w-4 h-4" /> ₹{selectedOrder.amount.toLocaleString('en-IN')}</div>
                  <div className="flex items-center gap-2 text-gray-500"><Package className="w-4 h-4" /> Ordered on {selectedOrder.date}</div>
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-purple-50">
                  <p className="text-xs font-semibold text-gray-400 uppercase">Actions</p>
                  {selectedOrder.status === 'new' && <button onClick={() => updateStatus(selectedOrder.id, 'processing')} className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-blue-500 text-white text-sm font-semibold"><Package className="w-4 h-4" /> Mark as Packed</button>}
                  {selectedOrder.status === 'processing' && <button onClick={() => updateStatus(selectedOrder.id, 'shipped')} className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-purple-500 text-white text-sm font-semibold"><Truck className="w-4 h-4" /> Mark as Shipped</button>}
                  {selectedOrder.status === 'shipped' && <button onClick={() => updateStatus(selectedOrder.id, 'delivered')} className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-green-500 text-white text-sm font-semibold"><Check className="w-4 h-4" /> Mark as Delivered</button>}
                  <button className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-300 text-gray-600 text-sm font-semibold"><User className="w-4 h-4" /> View Customer</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
