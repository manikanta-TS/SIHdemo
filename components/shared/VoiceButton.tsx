'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
    toast.info('Listening to dialect speech input...');
    setTimeout(() => {
      setListening(false);
      const text = 'This bag is hand-loomed from organic Andhra cotton and painted with natural madder and myrobalan dye.';
      setTranscript(text);
      onTranscribe?.(text);
      toast.success('Speech transcribed to catalog attributes');
    }, 2800);
  };

  return (
    <div className={cn('flex flex-col items-start gap-2.5', className)}>
      <button
        onClick={handleClick}
        disabled={listening}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs transition-all',
          listening
            ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse'
            : 'bg-white/[0.05] border border-white/10 hover:border-amber-500/30 text-zinc-300 hover:text-white'
        )}
      >
        {listening ? (
          <>
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Transcribing Speech...</span>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-amber-400" />
            <span>Voice Input (Indic Speech)</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 h-6 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08]"
          >
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-amber-400"
                animate={{ height: [6, 18, 6] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
            <span className="text-[10px] text-zinc-400 font-mono ml-2">Sampling audio...</span>
          </motion.div>
        )}

        {transcript && !listening && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-zinc-300 bg-white/[0.03] rounded-xl p-3 border border-white/10 flex items-start gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-300">Transcribed Voice: </span>
              <span>"{transcript}"</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
