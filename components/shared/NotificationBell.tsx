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
        className="relative p-2 rounded-xl bg-white border border-stone-200/90 hover:bg-[#FAF7F2] text-stone-700 hover:text-stone-900 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
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
              className="absolute right-0 mt-2 w-84 sm:w-96 rounded-2xl border border-stone-200 bg-[#FAF7F2]/95 backdrop-blur-2xl shadow-xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-stone-200/80 bg-white">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-stone-900 text-sm">Updates &amp; Insights</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-amber-700 hover:text-amber-800 font-medium transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 hover:bg-stone-100 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
                    aria-label="Close notification panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto divide-y divide-stone-200/60 bg-white">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-stone-400 text-sm">
                    No active notifications.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={cn(
                        'w-full flex items-start gap-3.5 p-3.5 text-left hover:bg-amber-50/40 transition-colors',
                        !n.read && 'bg-amber-50/60'
                      )}
                    >
                      <span className="text-lg mt-0.5 select-none">{iconMap[n.type] || '🔔'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-semibold text-stone-900 truncate">{n.title}</p>
                          <span className="text-[10px] text-stone-400 font-mono shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0 shadow-sm" />
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
