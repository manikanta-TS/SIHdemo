'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/store';
import { products } from '@/lib/mock-data';
import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  Package,
  Truck,
  Sparkles,
  QrCode,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function CartPage() {
  const router = useRouter();
  const { cart, cartTotal, updateCartQty, removeFromCart, wishlist, toggleWishlist, addOrder, clearCart } = useApp();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPaying, setIsPaying] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const cartProducts = cart
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((x): x is { item: typeof cart[number]; product: typeof products[number] } => Boolean(x.product));

  const delivery = cartTotal > 999 ? 0 : cartTotal > 0 ? 80 : 0;
  const total = cartTotal + delivery;
  const directArtisanAmount = Math.round(cartTotal * 0.78);

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      const orderId = `HK-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedOrderId(orderId);
      addOrder({
        id: orderId,
        items: cartProducts.map(({ item, product }) => ({
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: item.quantity,
          artisanName: product.artisanName,
        })),
        total,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'placed',
        address: 'Aarav Sharma, 24 Lake View Road, Banjara Hills, Hyderabad, Telangana 500034',
        paymentMethod: paymentMethod.toUpperCase(),
        estimatedDelivery: '5-7 business days',
      });
      clearCart();
      setIsPaying(false);
      setOrderPlaced(true);
      toast.success('Order successfully placed and routed to artisan!');
    }, 1800);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg p-8 rounded-3xl bg-[#10121A] border border-emerald-500/30 shadow-2xl space-y-5"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">Order Confirmed & Escrow Funded!</h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed">
              Your patronage directly supports traditional master artisans. Your order has been transmitted directly to their village workshops.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-500">Order Reference:</span>
              <span className="font-bold text-amber-400">{generatedOrderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Direct Artisan Fund:</span>
              <span className="text-emerald-400 font-bold">₹{directArtisanAmount.toLocaleString('en-IN')} (78%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Total Settled:</span>
              <span className="font-bold text-white">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex gap-2.5 pt-2">
            <Link
              href="/buyer/orders"
              className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all text-center"
            >
              Track Live Timeline
            </Link>
            <Link
              href="/buyer/explore"
              className="flex-1 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 font-semibold text-xs border border-white/[0.08] text-center transition-colors"
            >
              Continue Exploring
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-500">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Your patronage bag is empty</h2>
            <p className="text-xs text-zinc-400 mt-1">Discover certified handmade masterpieces from across India.</p>
          </div>
          <Link
            href="/buyer/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-md shadow-amber-500/20"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-bold">Patron Bag & Ethical Checkout</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          {cart.reduce((s, i) => s + i.quantity, 0)} pieces supporting independent Indian craftspeople
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showCheckout ? (
          <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-3">
              {cartProducts.map(({ item, product }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-2xl bg-[#10121A] border border-white/[0.08]"
                >
                  <Link href={`/buyer/product/${product.id}`} className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-white/10">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/buyer/product/${product.id}`} className="font-semibold text-xs text-white hover:text-amber-400 line-clamp-1">
                          {product.name}
                        </Link>
                        <button
                          onClick={() => {
                            removeFromCart(product.id);
                            toast.info(`Removed ${product.name}`);
                          }}
                          className="text-zinc-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">By {product.artisanName} · {product.craft}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 border border-white/10 rounded-lg p-0.5 bg-white/[0.02]">
                        <button
                          onClick={() => updateCartQty(product.id, item.quantity - 1)}
                          className="p-1 rounded hover:bg-white/10 text-zinc-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(product.id, item.quantity + 1)}
                          className="p-1 rounded hover:bg-white/10 text-zinc-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-mono font-bold text-white">
                        ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Economic Impact Badge */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Direct Economic Guarantee:</strong> ₹{directArtisanAmount.toLocaleString('en-IN')} from this acquisition transfers directly to the artisan&apos;s bank account with zero intermediary commission deductions.
                </p>
              </div>
            </div>

            {/* Summary & Checkout trigger */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 p-6 rounded-3xl bg-[#10121A] border border-white/[0.08] space-y-4">
                <h2 className="font-bold text-sm text-white">Order Valuation</h2>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Craft Subtotal</span>
                    <span className="text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Insured Courier</span>
                    <span className={delivery === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                      {delivery === 0 ? 'FREE' : `₹${delivery}`}
                    </span>
                  </div>
                  <div className="border-t border-white/[0.08] pt-2 flex justify-between font-bold text-sm text-white">
                    <span>Gross Total</span>
                    <span className="text-base text-amber-400">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Proceed to Dispatch Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-zinc-500 font-mono text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Insured Escrow Protection
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Multi-step Checkout */
          <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
            {/* Step indicators */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              {['Address & Delivery', 'Payment Settlement'].map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-xs">
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs',
                      i + 1 <= checkoutStep ? 'bg-amber-500 text-black' : 'bg-white/10 text-zinc-500'
                    )}
                  >
                    {i + 1}
                  </div>
                  <span className={i + 1 <= checkoutStep ? 'text-white font-semibold' : 'text-zinc-500'}>{s}</span>
                </div>
              ))}
            </div>

            {checkoutStep === 1 && (
              <div className="p-6 rounded-3xl bg-[#10121A] border border-white/[0.08] space-y-4">
                <h3 className="font-bold text-sm text-white">Patron Delivery Destination</h3>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-amber-500/30 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Aarav Sharma</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Default Residence</span>
                  </div>
                  <p className="text-zinc-400">24 Lake View Road, Banjara Hills, Hyderabad, Telangana 500034</p>
                  <p className="text-zinc-500 font-mono">+91 98765 43210</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span className="text-zinc-300">Standard Insured Logistics (5-7 Business Days)</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">INCLUDED</span>
                </div>

                <button
                  onClick={() => setCheckoutStep(2)}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="p-6 rounded-3xl bg-[#10121A] border border-white/[0.08] space-y-4">
                <h3 className="font-bold text-sm text-white">Select Direct Settlement Channel</h3>

                {isPaying ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-10 h-10 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-mono text-zinc-300">Processing secure UPI escrow transfer...</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {[
                        { id: 'upi', label: 'UPI Instant Payout (Google Pay, PhonePe, Paytm)', sub: 'Zero latency escrow transfer', icon: Smartphone },
                        { id: 'card', label: 'Credit / Debit Card (RuPay, Visa, Mastercard)', sub: '3D Secure encrypted', icon: CreditCard },
                        { id: 'cod', label: 'Verified Cash on Delivery (COD)', sub: 'Pay upon courier inspection', icon: Banknote },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          className={cn(
                            'w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all',
                            paymentMethod === m.id
                              ? 'bg-amber-500/10 border-amber-500/40 text-white'
                              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/20'
                          )}
                        >
                          <m.icon className="w-4 h-4 text-amber-400 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{m.label}</p>
                            <p className="text-[10px] text-zinc-500">{m.sub}</p>
                          </div>
                          {paymentMethod === m.id && <Check className="w-4 h-4 text-amber-400" />}
                        </button>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
                      <span className="text-zinc-400">Payable Amount:</span>
                      <span className="text-base font-bold text-amber-400">₹{total.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="px-4 py-3 rounded-xl bg-white/[0.04] text-zinc-400 hover:text-white text-xs font-semibold"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePayment}
                        className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
                      >
                        Pay & Fund Artisan ₹{total.toLocaleString('en-IN')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
