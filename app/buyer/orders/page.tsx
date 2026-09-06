'use client';

import { useApp } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, Check, Clock, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusSteps = ['placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
const statusLabels: Record<string, string> = {
  placed: 'Order Placed', confirmed: 'Confirmed', packed: 'Packed', shipped: 'Shipped', out_for_delivery: 'Out for Delivery', delivered: 'Delivered',
};
const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  placed: Clock, confirmed: Check, packed: Package, shipped: Truck, out_for_delivery: Truck, delivered: Check,
};

export default function OrdersPage() {
  const { orders } = useApp();

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-5">
            <Package className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold">No orders yet</h1>
          <p className="text-gray-500 mt-2">Your orders will appear here once you make a purchase.</p>
          <Link href="/buyer/explore" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Orders</h1>
      {orders.map((order, idx) => {
        const currentStep = statusSteps.indexOf(order.status);
        return (
          <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="rounded-2xl bg-white/80 border border-orange-100/60 overflow-hidden">
            <div className="p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-sm">Order {order.id}</p>
                  <p className="text-xs text-gray-500">Placed on {order.date}</p>
                </div>
                <span className={cn('px-3 py-1 rounded-full text-xs font-semibold', order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700')}>
                  {statusLabels[order.status]}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">by {item.artisanName} · Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              {/* Tracking timeline */}
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, i) => {
                    const Icon = statusIcons[step];
                    const done = i <= currentStep;
                    return (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                          <div className={cn('w-8 h-8 rounded-full flex items-center justify-center transition-colors', done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400')}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={cn('text-[10px] hidden sm:block', done ? 'text-gray-700 font-medium' : 'text-gray-400')}>{statusLabels[step]}</span>
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div className={cn('flex-1 h-1 mx-1 rounded-full', i < currentStep ? 'bg-green-500' : 'bg-gray-200')} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-orange-50">
                <div className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="w-3.5 h-3.5" /> {order.address}</div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">Total: ₹{order.total.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-gray-500">Est. delivery: {order.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
