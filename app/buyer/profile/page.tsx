'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, CreditCard, Edit, Check, Package, Heart, ShoppingBag, ShieldCheck, Award } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto space-y-6 text-stone-900">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Patron Account & Preferences</h1>
        <p className="text-xs text-stone-500 mt-1 font-mono">
          Manage shipping destinations, payment methods, and cultural heritage patronage history
        </p>
      </div>

      {/* Profile Header */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-sm p-6 sm:p-8 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl font-bold font-serif text-amber-900 shadow-xs">
          {name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-stone-900">{name}</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
              Verified Patron
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1 font-mono">
            <MapPin className="w-3.5 h-3.5 text-amber-700" /> Hyderabad, Telangana
          </p>
        </div>
      </div>

      {/* Patron Metrics */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Package, label: 'Craft Acquisitions', value: orders.length },
          { icon: Heart, label: 'Saved Pieces', value: wishlist.length },
          { icon: ShoppingBag, label: 'In Bag', value: cartCount },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm text-center"
          >
            <s.icon className="w-4 h-4 mx-auto text-amber-700 mb-1" />
            <p className="text-2xl font-bold font-mono text-stone-900">{s.value}</p>
            <p className="text-[11px] text-stone-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Profile details form */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="font-serif font-bold text-sm text-stone-900">Contact & Delivery Profile</h3>
          <button
            onClick={() => {
              if (editing) {
                setEditing(false);
                toast.success('Patron details updated');
              } else {
                setEditing(true);
              }
            }}
            className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            {editing ? <><Check className="w-3.5 h-3.5" /> Save Changes</> : <><Edit className="w-3.5 h-3.5" /> Edit Profile</>}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          {[
            { icon: User, label: 'Legal Name', value: name, setter: setName },
            { icon: Phone, label: 'Phone Number', value: phone, setter: setPhone },
            { icon: Mail, label: 'Email Address', value: email, setter: setEmail },
            { icon: MapPin, label: 'Primary Delivery Destination', value: address, setter: setAddress },
          ].map((f) => (
            <div key={f.label} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1 font-semibold">{f.label}</span>
              {editing ? (
                <input
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-amber-600/50 bg-white text-xs text-stone-900 focus:outline-none"
                />
              ) : (
                <p className="text-xs font-medium text-stone-900">{f.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Saved payment channels */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
        <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-amber-700" />
          <span>Settlement Methods</span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div>
              <p className="font-semibold text-stone-900">HDFC Bank Card •••• 4521</p>
              <p className="text-[10px] text-stone-500 font-mono">Expires 08/28 · RuPay Platinum</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 font-semibold">Active</span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div>
              <p className="font-semibold text-stone-900">Instant UPI Virtual Address</p>
              <p className="text-[10px] text-stone-500 font-mono">aarav@okhdfcbank</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
