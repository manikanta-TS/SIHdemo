'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User, MapPin, Phone, Mail, Globe, CreditCard, Edit, Check, Store, BadgeCheck, Camera } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto space-y-6 text-stone-900">
      <div>
        <h1 className="text-2xl font-bold font-serif text-stone-900">Artisan Credentials &amp; Payout Setup</h1>
        <p className="text-xs text-stone-500 mt-1 font-mono">
          Verified artisan identity, direct bank settlement routing, and guild records
        </p>
      </div>

      {/* Profile Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        <div className="relative flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-stone-200 relative bg-stone-100 shadow-md">
              <Image
                src="https://images.pexels.com/photos/11538902/pexels-photo-11538902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => toast.info('Photo upload selector triggered')}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
              aria-label="Change profile photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-stone-900">{name}</h2>
              <BadgeCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-amber-800 font-mono mt-0.5 font-semibold">
              Verified Master Artisan · Craft Guild #AP-412
            </p>
            <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-amber-700" /> {location}
            </p>
          </div>
        </div>
      </div>

      {/* Profile details form */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="font-bold text-sm text-stone-900">Artisan Information</h3>
          <button
            onClick={() => {
              if (editing) {
                setEditing(false);
                toast.success('Artisan credentials updated');
              } else {
                setEditing(true);
              }
            }}
            className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors"
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
            <div key={f.label} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1 font-semibold">{f.label}</span>
              {editing ? (
                <input
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-amber-400 bg-white text-xs text-stone-900 focus:outline-none"
                />
              ) : (
                <p className="text-xs font-medium text-stone-900">{f.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Direct UPI Settlement */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Direct Bank Payout Settlement (Instant UPI)</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
            Active &amp; Verified
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold">Linked UPI Address</span>
            {editing ? (
              <input
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-emerald-400 bg-white text-xs font-mono text-emerald-900 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-mono font-bold text-emerald-900 mt-0.5">{upi}</p>
            )}
            <p className="text-[11px] text-stone-600 mt-1">100% of order payouts transfer automatically to your account upon customer delivery confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
