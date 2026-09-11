'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { User, MapPin, Phone, Mail, Globe, CreditCard, Edit, Check, Store, BadgeCheck, Camera, ShieldCheck, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function SellerProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Lakshmi Devi');
  const [phone, setPhone] = useState('+91 98480 22334');
  const [email, setEmail] = useState('artisan.lakshmi@hastkala.in');
  const [location, setLocation] = useState('Srikalahasti, Andhra Pradesh');
  const [craft, setCraft] = useState('Kalamkari Hand-painted Natural Dye Textiles');
  const [languages, setLanguages] = useState('Telugu, Hindi, English');
  const [upi, setUpi] = useState('lakshmidevi@upi');

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-bold">Artisan Credentials & Payout Setup</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Verified artisan identity, bank settlement routing, and guild credentials
        </p>
      </div>

      {/* Profile Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#10121A] border border-white/[0.08] p-6 sm:p-8">
        <div className="relative flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/20 relative bg-zinc-800 shadow-xl">
              <Image
                src="https://images.pexels.com/photos/11538902/pexels-photo-11538902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => toast.info('Photo upload selector triggered')}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-md hover:scale-105 transition-transform"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{name}</h2>
              <BadgeCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-xs text-amber-400 font-mono mt-0.5">Verified Master Artisan · Craft Guild #AP-412</p>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-zinc-500" /> {location}
            </p>
          </div>
        </div>
      </div>

      {/* Profile details form */}
      <div className="p-6 rounded-2xl bg-[#10121A] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <h3 className="font-bold text-sm text-white">Artisan Information</h3>
          <button
            onClick={() => {
              if (editing) {
                setEditing(false);
                toast.success('Artisan credentials updated');
              } else {
                setEditing(true);
              }
            }}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            {editing ? <><Check className="w-3.5 h-3.5" /> Save Changes</> : <><Edit className="w-3.5 h-3.5" /> Edit Profile</>}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: User, label: 'Legal Name', value: name, setter: setName },
            { icon: Phone, label: 'Mobile Number (WhatsApp)', value: phone, setter: setPhone },
            { icon: Mail, label: 'Email Address', value: email, setter: setEmail },
            { icon: MapPin, label: 'Artisan Village & State', value: location, setter: setLocation },
            { icon: Store, label: 'Specialized Heritage Craft', value: craft, setter: setCraft },
            { icon: Globe, label: 'Spoken Dialects', value: languages, setter: setLanguages },
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

      {/* Direct UPI Settlement */}
      <div className="p-6 rounded-2xl bg-[#10121A] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Direct Bank Payout Settlement (Instant UPI)</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Active & Verified
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400">Linked VPA / UPI ID</span>
            {editing ? (
              <input
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-emerald-500/40 bg-white/[0.04] text-xs font-mono text-emerald-300 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-mono font-bold text-emerald-300 mt-0.5">{upi}</p>
            )}
            <p className="text-[11px] text-zinc-400 mt-1">100% of order payouts transfer within 24 hours of delivery confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
