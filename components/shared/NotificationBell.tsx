'use client';

import { useApp } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check } from 'lucide-react';
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
        className="relative p-2 rounded-full hover:bg-orange-50 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -10, x: 20 }}
              className="absolute right-0 mt-2 w-80 rounded-2xl border border-orange-100 bg-white shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-orange-50">
                <h3 className="font-bold text-gray-900">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-orange-600 font-medium hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-sm text-gray-400 py-8">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={cn(
                        'w-full flex items-start gap-3 p-3 text-left border-b border-gray-50 hover:bg-orange-50/50 transition-colors',
                        !n.read && 'bg-orange-50/30'
                      )}
                    >
                      <span className="text-xl mt-0.5">{iconMap[n.type] || '🔔'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />}
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
