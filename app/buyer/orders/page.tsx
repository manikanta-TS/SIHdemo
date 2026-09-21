'use client';

import { useApp } from '@/lib/store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, Check, Clock, MapPin, ArrowRight, ShieldCheck, QrCode, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const statusSteps = ['placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
const statusLabels: Record<string, string> = {
  placed: 'Order Placed',
  confirmed: 'Artisan Confirmed',
  packed: 'Craft Packaged',
  shipped: 'Handed to Courier',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Safely Delivered',
};
const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  placed: Clock,
  confirmed: Check,
  packed: Package,
  shipped: Truck,
  out_for_delivery: Truck,
  delivered: Check,
};

export default function OrdersPage() {
  const { orders } = useApp();

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-stone-900">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 shadow-sm">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">No active order history</h2>
            <p className="text-xs text-stone-500 mt-1">Acquired handcrafted pieces and delivery tracking will appear here.</p>
          </div>
          <Link
            href="/buyer/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Start Exploring <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-stone-900 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">My Craft Acquisitions & Orders</h1>
        <p className="text-xs text-stone-500 mt-1 font-mono">
          Track fulfillment status, courier dispatch, and digital authenticity certificates
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order, idx) => {
          const currentStep = statusSteps.indexOf(order.status);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-3xl bg-white border border-stone-200/90 shadow-sm overflow-hidden p-5 sm:p-6 space-y-5"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-stone-900">Order {order.id}</span>
                    <span className="text-[10px] font-mono text-stone-400">· Placed on {order.date}</span>
                  </div>
                </div>
                <span
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border shadow-xs',
                    order.status === 'delivered'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  )}
                >
                  {statusLabels[order.status]}
                </span>
              </div>

              {/* Items in Order */}
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                        Handcrafted by {item.artisanName} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-mono font-bold text-stone-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Live Tracking Timeline */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider block mb-3 font-semibold">
                  Live Dispatch Progression
                </span>
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, i) => {
                    const Icon = statusIcons[step];
                    const done = i <= currentStep;
                    return (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={cn(
                              'w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs',
                              done
                                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                                : 'bg-stone-100 border border-stone-200 text-stone-400'
                            )}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span
                            className={cn(
                              'text-[9px] font-mono hidden sm:block',
                              done ? 'text-stone-800 font-semibold' : 'text-stone-400'
                            )}
                          >
                            {statusLabels[step].split(' ')[0]}
                          </span>
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div
                            className={cn(
                              'flex-1 h-[2px] mx-1 rounded-full',
                              i < currentStep ? 'bg-emerald-600' : 'bg-stone-200'
                            )}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Details & Certificates */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span className="truncate max-w-xs">{order.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toast.success('Digital Authenticity Certificate downloaded (PDF with QR hash)')}
                    className="flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-900 font-medium underline"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-700" /> Certificate
                  </button>
                  <span className="text-stone-900 font-bold">Total: ₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
