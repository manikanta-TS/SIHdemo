'use client';

import { useApp } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function NotificationBell() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();
  const [open, setOpen] = useState(false);

  const iconMap: Record<string, string> = {
    order: '🛍️',
    product: '📦',
    views: '👀',
    price: '💰',
    trend: '📈',
    delivery: '🚚',
    collection: '🎨',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-84 sm:w-96 rounded-2xl border border-white/10 bg-[#10121A]/95 backdrop-blur-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">System Telemetry</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto divide-y divide-white/[0.05]">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-zinc-500 text-sm">
                    No active notifications.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={cn(
                        'w-full flex items-start gap-3.5 p-3.5 text-left hover:bg-white/[0.04] transition-colors',
                        !n.read && 'bg-amber-500/[0.04]'
                      )}
                    >
                      <span className="text-lg mt-0.5 select-none">{iconMap[n.type] || '🔔'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-semibold text-white truncate">{n.title}</p>
                          <span className="text-[10px] text-zinc-500 font-mono shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_#f59e0b]" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
