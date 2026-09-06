'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VoiceButton({
  onTranscribe,
  className,
}: {
  onTranscribe?: (text: string) => void;
  className?: string;
}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleClick = () => {
    if (listening) return;
    setListening(true);
    setTranscript('');
    setTimeout(() => {
      setListening(false);
      const text = 'This bag is made from cotton and takes two days to make. It is hand-painted using natural dyes.';
      setTranscript(text);
      onTranscribe?.(text);
    }, 3000);
  };

  return (
    <div className={cn('flex flex-col items-start gap-2', className)}>
      <button
        onClick={handleClick}
        disabled={listening}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all',
          listening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
        )}
      >
        {listening ? (
          <>
            <Square className="w-4 h-4" />
            Listening...
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" />
            Speak Instead
          </>
        )}
      </button>
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full bg-purple-500"
                animate={{ height: [8, 24, 8] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        )}
        {transcript && !listening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-600 bg-purple-50 rounded-lg px-3 py-2 border border-purple-100"
          >
            <span className="font-medium text-purple-700">Transcribed: </span>
            {transcript}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
