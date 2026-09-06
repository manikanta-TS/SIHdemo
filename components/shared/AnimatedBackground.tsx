'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground({ variant = 'default' }: { variant?: 'default' | 'buyer' | 'seller' }) {
  const blobs =
    variant === 'buyer'
      ? [
          { color: 'rgba(255, 140, 50, 0.18)', size: 500, x: '5%', y: '10%' },
          { color: 'rgba(230, 57, 137, 0.15)', size: 400, x: '70%', y: '15%' },
          { color: 'rgba(20, 184, 166, 0.12)', size: 450, x: '60%', y: '70%' },
          { color: 'rgba(245, 158, 11, 0.10)', size: 350, x: '10%', y: '75%' },
        ]
      : variant === 'seller'
      ? [
          { color: 'rgba(168, 85, 247, 0.18)', size: 500, x: '5%', y: '10%' },
          { color: 'rgba(236, 72, 153, 0.15)', size: 400, x: '70%', y: '15%' },
          { color: 'rgba(59, 130, 246, 0.12)', size: 450, x: '60%', y: '70%' },
          { color: 'rgba(245, 158, 11, 0.10)', size: 350, x: '10%', y: '75%' },
        ]
      : [
          { color: 'rgba(255, 140, 50, 0.15)', size: 550, x: '0%', y: '5%' },
          { color: 'rgba(230, 57, 137, 0.13)', size: 450, x: '65%', y: '10%' },
          { color: 'rgba(20, 184, 166, 0.10)', size: 500, x: '55%', y: '65%' },
          { color: 'rgba(168, 85, 247, 0.10)', size: 380, x: '5%', y: '70%' },
        ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-white/30 to-pink-50/40" />
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Cpath d='M30 30c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm10 0c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
