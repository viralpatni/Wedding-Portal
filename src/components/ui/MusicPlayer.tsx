import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  onToggle: () => void;
}

/**
 * Floating music button with animated waveform bars.
 * Positioned bottom-right, glass pill style.
 */
export default function MusicPlayer({ audioRef, isPlaying, onToggle }: MusicPlayerProps) {
  const [expanded, setExpanded] = useState(false);

  const bars = [1, 1.6, 0.8, 1.4, 0.9, 1.2, 0.7];

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <div className="glass-card px-4 py-3 flex items-center gap-3">
        {/* Waveform bars */}
        <div className="flex items-center gap-[3px] h-5" aria-hidden="true">
          {bars.map((height, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-rose-gold"
              animate={
                isPlaying
                  ? {
                      height: ["4px", `${height * 14}px`, "4px"],
                    }
                  : { height: "4px" }
              }
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
              style={{ height: "4px" }}
            />
          ))}
        </div>

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-full bg-espresso/10 hover:bg-espresso/20 flex items-center justify-center transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#3A2823">
              <rect x="1" y="1" width="4" height="10" rx="1"/>
              <rect x="7" y="1" width="4" height="10" rx="1"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#3A2823">
              <path d="M2 1L11 6L2 11V1Z"/>
            </svg>
          )}
        </button>

        {/* Track name */}
        <AnimatePresence>
          {isPlaying && (
            <motion.span
              className="label text-espresso/60 text-[10px] max-w-[80px] truncate hidden sm:block"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
            >
              ♪ Our Song
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
