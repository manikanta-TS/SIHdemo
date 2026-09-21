'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground({ variant = 'default' }: { variant?: 'default' | 'buyer' | 'seller' }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#FAF7F2]">
      {/* Subtle Indian Craft Weaving & Block-Print Texture */}
      <div className="absolute inset-0 pattern-weaving opacity-40" />

      {/* Ambient Halos - Buyer: Warm Marigold, Lotus Pink & Peacock Teal; Seller: Terracotta, Warm Gold & Tulsi */}
      <motion.div
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[520px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            variant === 'seller'
              ? 'radial-gradient(circle, rgba(200, 104, 67, 0.12) 0%, rgba(232, 130, 25, 0.06) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(232, 130, 25, 0.11) 0%, rgba(194, 53, 103, 0.05) 50%, transparent 80%)',
        }}
      />

      <div
        className="absolute bottom-[-10%] right-[-5%] w-[540px] h-[540px] rounded-full blur-[150px] pointer-events-none opacity-40"
        style={{
          background:
            variant === 'seller'
              ? 'radial-gradient(circle, rgba(42, 100, 55, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(20, 122, 131, 0.08) 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute top-[35%] left-[-10%] w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none opacity-30"
        style={{
          background:
            variant === 'seller'
              ? 'radial-gradient(circle, rgba(184, 93, 54, 0.07) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(242, 92, 25, 0.07) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
