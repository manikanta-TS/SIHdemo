'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground({ variant = 'default' }: { variant?: 'default' | 'buyer' | 'seller' }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#08090D]">
      {/* Subtle tech grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glowing radial spots */}
      <motion.div
        animate={{
          opacity: [0.12, 0.2, 0.12],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            variant === 'seller'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(217, 119, 6, 0.1) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(234, 88, 12, 0.08) 50%, transparent 100%)',
        }}
      />

      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background:
            variant === 'seller'
              ? 'radial-gradient(circle, #6366f1 0%, transparent 70%)'
              : 'radial-gradient(circle, #10b981 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute top-[40%] left-[-10%] w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #d97706 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
