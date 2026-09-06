'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { User, MapPin, Phone, Mail, Globe, CreditCard, Edit, Check, Store, BadgeCheck, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function SellerProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Lakshmi Devi');
  const [phone, setPhone] = useState('+91 98765 12345');
  const [email, setEmail] = useState('lakshmi.hastkala@email.com');
  const [location, setLocation] = useState('Srikalahasti, Andhra Pradesh');
  const [craft, setCraft] = useState('Kalamkari Hand-painted Textiles');
  const [languages, setLanguages] = useState('Telugu, Hindi, English');
  const [upi, setUpi] = useState('lakshmi@okhdfcbank');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white p-6 sm:p-8">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/30">
              <Image src="https://images.pexels.com/photos/11538902/pexels-photo-11538902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile" fill className="object-cover" sizes="80px" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md"><Camera className="w-3.5 h-3.5" /></button>
          </div>
          <div>
            <div className="flex items-center gap-2"><h1 className="text-2xl font-bold">{name}</h1><BadgeCheck className="w-5 h-5 text-cyan-300" /></div>
            <p className="text-white/80 text-sm">Verified Artisan · {craft}</p>
          </div>
        </div>
      </div>

      {/* Profile details */}
      <div className="p-5 rounded-2xl bg-white/80 border border-purple-100/60 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Profile Details</h2>
          <button onClick={() => { if (editing) { setEditing(false); toast.success('Profile updated'); } else setEditing(true); }} className="flex items-center gap-1 text-sm text-purple-600 font-medium hover:underline">
            {editing ? <><Check className="w-4 h-4" /> Save</> : <><Edit className="w-4 h-4" /> Edit</>}
          </button>
        </div>
        <div className="space-y-3">
          {[
            { icon: User, label: 'Name', value: name, setter: setName },
            { icon: Phone, label: 'Phone', value: phone, setter: setPhone },
            { icon: Mail, label: 'Email', value: email, setter: setEmail },
            { icon: MapPin, label: 'Location', value: location, setter: setLocation },
            { icon: Store, label: 'Craft Specialization', value: craft, setter: setCraft },
            { icon: Globe, label: 'Languages', value: languages, setter: setLanguages },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0"><f.icon className="w-4 h-4 text-purple-600" /></div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">{f.label}</p>
                {editing ? <input value={f.value} onChange={(e) => f.setter(e.target.value)} className="w-full mt-0.5 px-2 py-1 rounded-lg border border-purple-200 text-sm" /> : <p className="text-sm font-medium">{f.value}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business info */}
      <div className="p-5 rounded-2xl bg-white/80 border border-purple-100/60 space-y-3">
        <h2 className="font-bold flex items-center gap-2"><CreditCard className="w-5 h-5 text-purple-600" /> Payment Details</h2>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0"><CreditCard className="w-4 h-4 text-purple-600" /></div>
          <div className="flex-1">
            <p className="text-xs text-gray-400">UPI ID</p>
            {editing ? <input value={upi} onChange={(e) => setUpi(e.target.value)} className="w-full mt-0.5 px-2 py-1 rounded-lg border border-purple-200 text-sm" /> : <p className="text-sm font-medium">{upi}</p>}
          </div>
        </div>
      </div>

      {/* Store info */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100/60">
        <h2 className="font-bold flex items-center gap-2 mb-3"><Store className="w-5 h-5 text-purple-600" /> Store Information</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><p className="text-xs text-gray-400">Store Name</p><p className="font-medium">Lakshmi's Handcrafted Collection</p></div>
          <div><p className="text-xs text-gray-400">Products</p><p className="font-medium">12 products</p></div>
          <div><p className="text-xs text-gray-400">Total Revenue</p><p className="font-medium">₹24,850</p></div>
          <div><p className="text-xs text-gray-400">Followers</p><p className="font-medium">1,240</p></div>
        </div>
      </div>
    </div>
  );
}
