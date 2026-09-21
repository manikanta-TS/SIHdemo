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
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  Truck,
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
      toast.success('Order placed! Directly routed to artisan guild.');
    }, 1600);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-stone-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-xl space-y-5"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
            <Check className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">Order Confirmed &amp; Artisan Guaranteed</h1>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Your patronage directly supports traditional master artisans. Your order has been transmitted directly to their workshop.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 text-left space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-stone-500">Order Reference:</span>
              <span className="font-bold text-amber-800">{generatedOrderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Direct Artisan Share:</span>
              <span className="text-emerald-800 font-bold">₹{directArtisanAmount.toLocaleString('en-IN')} (78%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Total Settled:</span>
              <span className="font-bold text-stone-900">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex gap-2.5 pt-2">
            <Link
              href="/buyer/orders"
              className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all text-center"
            >
              Track Order Status
            </Link>
            <Link
              href="/buyer/explore"
              className="flex-1 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs border border-stone-200 text-center transition-colors shadow-sm"
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
      <div className="min-h-[60vh] flex items-center justify-center text-stone-900">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">Your shopping bag is empty</h2>
            <p className="text-xs text-stone-500 mt-1">Discover certified handmade crafts from master artisans across India.</p>
          </div>
          <Link
            href="/buyer/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-stone-900">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Patron Bag &amp; Fair Checkout</h1>
        <p className="text-xs text-stone-500 mt-1 font-mono">
          {cart.reduce((s, i) => s + i.quantity, 0)} pieces directly supporting rural artisan families
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
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
                >
                  <Link href={`/buyer/product/${product.id}`} className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/buyer/product/${product.id}`} className="font-semibold text-xs text-stone-900 hover:text-amber-800 line-clamp-1">
                          {product.name}
                        </Link>
                        <button
                          onClick={() => {
                            removeFromCart(product.id);
                            toast.info(`Removed ${product.name}`);
                          }}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label={`Remove ${product.name} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">By {product.artisanName} · {product.craft}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 border border-stone-200 rounded-lg p-0.5 bg-[#FAF7F2]">
                        <button
                          onClick={() => updateCartQty(product.id, item.quantity - 1)}
                          className="p-1 rounded hover:bg-stone-200 text-stone-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(product.id, item.quantity + 1)}
                          className="p-1 rounded hover:bg-stone-200 text-stone-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-mono font-bold text-stone-900">
                        ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Economic Impact Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Direct Artisan Guarantee:</strong> ₹{directArtisanAmount.toLocaleString('en-IN')} from this purchase transfers directly to the artisan&apos;s bank account with zero intermediary commissions.
                </p>
              </div>
            </div>

            {/* Summary & Checkout trigger */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
                <h2 className="font-serif font-bold text-sm text-stone-900">Order Summary</h2>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-stone-500">
                    <span>Craft Subtotal</span>
                    <span className="text-stone-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Insured Delivery</span>
                    <span className={delivery === 0 ? 'text-emerald-700 font-bold' : 'text-stone-900'}>
                      {delivery === 0 ? 'FREE' : `₹${delivery}`}
                    </span>
                  </div>
                  <div className="border-t border-stone-100 pt-2 flex justify-between font-bold text-sm text-stone-900">
                    <span>Total Amount</span>
                    <span className="text-base text-amber-800">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Proceed to Delivery Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-stone-500 font-mono text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Authenticity &amp; Safe Transit Guaranteed
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Multi-step Checkout */
          <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
            {/* Step indicators */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              {['Address & Delivery', 'Payment Settlement'].map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-xs">
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs',
                      i + 1 <= checkoutStep ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-500'
                    )}
                  >
                    {i + 1}
                  </div>
                  <span className={i + 1 <= checkoutStep ? 'text-stone-900 font-semibold' : 'text-stone-400'}>{s}</span>
                </div>
              ))}
            </div>

            {checkoutStep === 1 && (
              <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-sm text-stone-900">Delivery Destination</h3>
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-amber-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">Aarav Sharma</span>
                    <span className="text-[10px] font-mono text-amber-900 bg-amber-100 px-2 py-0.5 rounded font-semibold">Primary Address</span>
                  </div>
                  <p className="text-stone-600">24 Lake View Road, Banjara Hills, Hyderabad, Telangana 500034</p>
                  <p className="text-stone-500 font-mono">+91 98765 43210</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span className="text-stone-700">Standard Insured Logistics (5-7 Business Days)</span>
                  </div>
                  <span className="text-emerald-800 font-bold font-mono">INCLUDED</span>
                </div>

                <button
                  onClick={() => setCheckoutStep(2)}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-sm text-stone-900">Select Payment Method</h3>

                {isPaying ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-10 h-10 border-2 border-amber-600/30 border-t-amber-700 rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-mono text-stone-600">Processing secure UPI payment...</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {[
                        { id: 'upi', label: 'UPI Instant Pay (Google Pay, PhonePe, Paytm)', sub: 'Instant direct transfer to artisan', icon: Smartphone },
                        { id: 'card', label: 'Credit / Debit Card (RuPay, Visa, Mastercard)', sub: '3D Secure encrypted transaction', icon: CreditCard },
                        { id: 'cod', label: 'Cash on Delivery (COD)', sub: 'Pay upon delivery inspection', icon: Banknote },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          className={cn(
                            'w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all',
                            paymentMethod === m.id
                              ? 'bg-amber-50 border-amber-400 text-stone-900 shadow-xs'
                              : 'bg-[#FAF7F2] border-stone-200 text-stone-600 hover:border-stone-300'
                          )}
                        >
                          <m.icon className="w-4 h-4 text-amber-700 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-stone-900 truncate">{m.label}</p>
                            <p className="text-[10px] text-stone-500">{m.sub}</p>
                          </div>
                          {paymentMethod === m.id && <Check className="w-4 h-4 text-amber-700" />}
                        </button>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between font-mono text-xs">
                      <span className="text-stone-500">Payable Amount:</span>
                      <span className="text-base font-bold text-amber-800">₹{total.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="px-4 py-3 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePayment}
                        className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all active:scale-95"
                      >
                        Confirm &amp; Support Artisan ₹{total.toLocaleString('en-IN')}
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
