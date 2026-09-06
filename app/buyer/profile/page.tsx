'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, CreditCard, Edit, Check, Package, Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function BuyerProfilePage() {
  const { orders, wishlist, cartCount } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('aarav.sharma@email.com');
  const [address, setAddress] = useState('24 Lake View Road, Banjara Hills, Hyderabad, Telangana 500034');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-6 sm:p-8">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-white/80 text-sm">Hyderabad, Telangana</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Package, label: 'Orders', value: orders.length, color: 'text-orange-600 bg-orange-100' },
          { icon: Heart, label: 'Wishlist', value: wishlist.length, color: 'text-pink-600 bg-pink-100' },
          { icon: ShoppingBag, label: 'Cart', value: cartCount, color: 'text-teal-600 bg-teal-100' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-2xl bg-white/80 border border-orange-100/60 text-center">
            <div className={cn('w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2', s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Profile details */}
      <div className="p-5 rounded-2xl bg-white/80 border border-orange-100/60 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Profile Details</h2>
          <button onClick={() => { if (editing) { setEditing(false); toast.success('Profile updated'); } else setEditing(true); }} className="flex items-center gap-1 text-sm text-orange-600 font-medium hover:underline">
            {editing ? <><Check className="w-4 h-4" /> Save</> : <><Edit className="w-4 h-4" /> Edit</>}
          </button>
        </div>
        <div className="space-y-3">
          {[
            { icon: User, label: 'Name', value: name, setter: setName },
            { icon: Phone, label: 'Phone', value: phone, setter: setPhone },
            { icon: Mail, label: 'Email', value: email, setter: setEmail },
            { icon: MapPin, label: 'Address', value: address, setter: setAddress },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <f.icon className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">{f.label}</p>
                {editing ? (
                  <input value={f.value} onChange={(e) => f.setter(e.target.value)} className="w-full mt-0.5 px-2 py-1 rounded-lg border border-orange-200 text-sm" />
                ) : (
                  <p className="text-sm font-medium">{f.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods */}
      <div className="p-5 rounded-2xl bg-white/80 border border-orange-100/60 space-y-3">
        <h2 className="font-bold flex items-center gap-2"><CreditCard className="w-5 h-5 text-orange-600" /> Saved Payment Methods</h2>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100">
          <div className="w-10 h-7 rounded bg-gradient-to-r from-orange-500 to-pink-500" />
          <div><p className="text-sm font-medium">HDFC Bank •••• 4521</p><p className="text-xs text-gray-500">Expires 08/27</p></div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
          <div className="w-10 h-7 rounded bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">UPI</div>
          <div><p className="text-sm font-medium">Google Pay</p><p className="text-xs text-gray-500">aarav@okhdfcbank</p></div>
        </div>
      </div>
    </div>
  );
}
