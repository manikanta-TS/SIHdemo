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
    <div className="max-w-3xl mx-auto space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-bold">Patron Account & Preferences</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Manage shipping destinations, payment methods, and cultural heritage patronage history
        </p>
      </div>

      {/* Profile Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#10121A] border border-white/[0.08] p-6 sm:p-8 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl font-bold font-mono text-amber-400">
          {name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Verified Patron
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" /> Hyderabad, Telangana
          </p>
        </div>
      </div>

      {/* Patron Metrics */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Package, label: 'Craft Acquisitions', value: orders.length },
          { icon: Heart, label: 'Saved Pieces', value: wishlist.length },
          { icon: ShoppingBag, label: 'In Bag', value: cartCount },
        ].map((s, i) => (
          <div
            key={s.label}
            className="p-4 rounded-2xl bg-[#10121A] border border-white/[0.08] text-center"
          >
            <s.icon className="w-4 h-4 mx-auto text-amber-400 mb-1" />
            <p className="text-2xl font-bold font-mono text-white">{s.value}</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Profile details form */}
      <div className="p-6 rounded-2xl bg-[#10121A] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <h3 className="font-bold text-sm text-white">Contact & Delivery Profile</h3>
          <button
            onClick={() => {
              if (editing) {
                setEditing(false);
                toast.success('Patron details updated');
              } else {
                setEditing(true);
              }
            }}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
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
            <div key={f.label} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">{f.label}</span>
              {editing ? (
                <input
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-white/[0.04] text-xs text-white focus:outline-none"
                />
              ) : (
                <p className="text-xs font-medium text-white">{f.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Saved payment channels */}
      <div className="p-6 rounded-2xl bg-[#10121A] border border-white/[0.08] space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-amber-400" />
          <span>Settlement Methods</span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">HDFC Bank Card •••• 4521</p>
              <p className="text-[10px] text-zinc-500 font-mono">Expires 08/28 · RuPay Platinum</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Active</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Instant UPI Virtual Address</p>
              <p className="text-[10px] text-zinc-500 font-mono">aarav@okhdfcbank</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
