'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { Minus, Plus, Trash2, Heart, ArrowRight, ShoppingBag, ShieldCheck, MapPin, CreditCard, Smartphone, Banknote, Check, Package, Truck, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function CartPage() {
  const router = useRouter();
  const { cart, cartTotal, updateCartQty, removeFromCart, wishlist, toggleWishlist } = useApp();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPaying, setIsPaying] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartProducts = cart
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((x): x is { item: typeof cart[number]; product: typeof products[number] } => Boolean(x.product));
  const delivery = cartTotal > 999 ? 0 : cartTotal > 0 ? 80 : 0;
  const total = cartTotal + delivery;

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setOrderPlaced(true);
    }, 2200);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6"
          >
            <Check className="w-12 h-12 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
          <p className="text-gray-500 mt-2">Your handmade treasures are on their way.</p>
          <div className="mt-6 p-4 rounded-2xl bg-white border border-orange-100 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Order ID</span><span className="font-bold">HK-{Math.floor(10000 + Math.random() * 90000)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Estimated delivery</span><span className="font-medium">5-7 days</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Amount paid</span><span className="font-bold">₹{total.toLocaleString('en-IN')}</span></div>
          </div>
          <div className="flex gap-3 mt-6">
            <Link href="/buyer/orders" className="flex-1 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm">Track Order</Link>
            <Link href="/buyer/explore" className="flex-1 py-3 rounded-full border border-orange-300 text-orange-600 font-semibold text-sm">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-5">
            <ShoppingBag className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold">Your cart is waiting</h1>
          <p className="text-gray-500 mt-2">Discover something beautiful, made by hand.</p>
          <Link href="/buyer/explore" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm">
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p className="text-sm text-gray-500">{cart.reduce((s, i) => s + i.quantity, 0)} items from independent artisans</p>
      </div>

      <AnimatePresence mode="wait">
        {!showCheckout ? (
          <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {cartProducts.map(({ item, product }, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white/80 border border-orange-100/60"
                >
                  <Link href={`/buyer/product/${product.id}`} className="relative w-24 h-28 rounded-xl overflow-hidden shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="96px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link href={`/buyer/product/${product.id}`} className="font-semibold text-sm line-clamp-2 hover:text-orange-600">{product.name}</Link>
                        <p className="text-xs text-gray-500 mt-1">by {product.artisanName}</p>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 border border-orange-200 rounded-full p-0.5">
                        <button onClick={() => updateCartQty(product.id, item.quantity - 1)} className="p-1 rounded-full hover:bg-orange-50"><Minus className="w-3 h-3" /></button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button onClick={() => updateCartQty(product.id, item.quantity + 1)} className="p-1 rounded-full hover:bg-orange-50"><Plus className="w-3 h-3" /></button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{(product.price * item.quantity).toLocaleString('en-IN')}</p>
                        <p className="text-xs text-gray-400">₹{product.price.toLocaleString('en-IN')} each</p>
                      </div>
                    </div>
                    <button onClick={() => toggleWishlist(product.id)} className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
                      <Heart className={cn('w-3.5 h-3.5', wishlist.includes(product.id) && 'fill-red-500 text-red-500')} /> Save for later
                    </button>
                  </div>
                </motion.div>
              ))}
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-teal-50 border border-teal-100 text-sm text-teal-700">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                Your purchase directly supports independent Indian artisans.
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 p-5 rounded-2xl bg-white/80 border border-orange-100/60 space-y-4">
                <h2 className="font-bold">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
                </div>
                <div className="border-t border-orange-100 pt-3 flex justify-between font-bold"><span>Total</span><span className="text-xl">₹{total.toLocaleString('en-IN')}</span></div>
                <button onClick={() => setShowCheckout(true)} className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm hover:shadow-lg transition-shadow">Proceed to Checkout <ArrowRight className="w-4 h-4 inline ml-1" /></button>
                <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure simulated checkout</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
            {/* Steps */}
            <div className="flex items-center justify-between mb-8">
              {['Address', 'Delivery', 'Payment', 'Confirmation'].map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold', i + 1 <= checkoutStep ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500')}>{i + 1 < checkoutStep ? <Check className="w-4 h-4" /> : i + 1}</div>
                    <span className="text-[10px] sm:text-xs text-gray-500">{s}</span>
                  </div>
                  {i < 3 && <div className={cn('flex-1 h-1 mx-2 rounded-full', i + 1 < checkoutStep ? 'bg-orange-500' : 'bg-gray-200')} />}
                </div>
              ))}
            </div>

            {checkoutStep === 1 && (
              <div className="p-6 rounded-2xl bg-white border border-orange-100 space-y-4">
                <h2 className="text-lg font-bold">Delivery Address</h2>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-200"><MapPin className="w-5 h-5 text-orange-600 mt-0.5" /><div><p className="font-semibold text-sm">Home</p><p className="text-sm text-gray-600 mt-1">Aarav Sharma, 24 Lake View Road, Banjara Hills, Hyderabad, Telangana 500034</p></div><Check className="w-5 h-5 text-orange-600 ml-auto" /></div>
                <button onClick={() => setCheckoutStep(2)} className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm">Continue to Delivery <ArrowRight className="w-4 h-4 inline ml-1" /></button>
              </div>
            )}
            {checkoutStep === 2 && (
              <div className="p-6 rounded-2xl bg-white border border-orange-100 space-y-4">
                <h2 className="text-lg font-bold">Delivery Options</h2>
                <div className="p-4 rounded-xl border-2 border-orange-500 bg-orange-50 flex items-center gap-3"><Truck className="w-6 h-6 text-orange-600" /><div className="flex-1"><p className="font-semibold text-sm">Standard Delivery</p><p className="text-xs text-gray-500">Arrives in 5-7 business days</p></div><span className="font-bold text-green-600">FREE</span><Check className="w-5 h-5 text-orange-600" /></div>
                <button onClick={() => setCheckoutStep(3)} className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm">Continue to Payment <ArrowRight className="w-4 h-4 inline ml-1" /></button>
              </div>
            )}
            {checkoutStep === 3 && (
              <div className="p-6 rounded-2xl bg-white border border-orange-100 space-y-4">
                {isPaying ? (
                  <div className="py-10 text-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 mx-auto rounded-full border-4 border-orange-200 border-t-orange-500" /><p className="mt-4 font-semibold">Processing your payment...</p><p className="text-sm text-gray-500">This is a simulated payment</p></div>
                ) : (
                  <>
                    <h2 className="text-lg font-bold">Choose Payment Method</h2>
                    {[
                      { id: 'upi', label: 'UPI', sub: 'Google Pay, PhonePe, Paytm', icon: Smartphone },
                      { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: CreditCard },
                      { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives', icon: Banknote },
                    ].map((p) => (
                      <button key={p.id} onClick={() => setPaymentMethod(p.id)} className={cn('w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-colors', paymentMethod === p.id ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200')}><p.icon className="w-6 h-6 text-orange-600" /><div className="flex-1"><p className="font-semibold text-sm">{p.label}</p><p className="text-xs text-gray-500">{p.sub}</p></div>{paymentMethod === p.id && <Check className="w-5 h-5 text-orange-600" />}</button>
                    ))}
                    <div className="border-t border-orange-100 pt-4 flex items-center justify-between"><span className="font-semibold">Amount to pay</span><span className="text-xl font-bold">₹{total.toLocaleString('en-IN')}</span></div>
                    <button onClick={handlePayment} className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm">Pay ₹{total.toLocaleString('en-IN')}</button>
                  </>
                )}
              </div>
            )}
            {checkoutStep === 4 && <div className="text-center py-10"><Sparkles className="w-10 h-10 text-orange-500 mx-auto" /><p className="font-bold mt-3">Finalizing your order...</p></div>}
            <button onClick={() => setCheckoutStep(Math.max(1, checkoutStep - 1))} className="mt-4 text-sm text-gray-500 hover:text-orange-600">← Back</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
