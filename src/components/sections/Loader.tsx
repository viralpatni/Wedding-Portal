import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

interface LoaderProps {
  isVisible: boolean;
  progress?: number; // 0–100
}

/**
 * Full-screen loader: two rose-gold hearts slowly interlock,
 * then a curtain-style reveal upward.
 */
export default function Loader({ isVisible, progress = 0 }: LoaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #FBF7F2 0%, #F6D6DC 50%, #FFDCC8 100%)",
          }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Interlocked hearts SVG animation */}
          <motion.div
            className="relative w-40 h-40 mb-10"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EBC4B3" />
                  <stop offset="50%" stopColor="#D9A38F" />
                  <stop offset="100%" stopColor="#B76E79" />
                </linearGradient>
                <linearGradient id="rg2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#B76E79" />
                  <stop offset="50%" stopColor="#D9A38F" />
                  <stop offset="100%" stopColor="#EBC4B3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Heart 1 */}
              <motion.path
                d="M55 55 C55 40 35 35 35 52 C35 65 55 80 55 80 C55 80 75 65 75 52 C75 35 55 40 55 55Z"
                fill="none"
                stroke="url(#rg1)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              />

              {/* Heart 2 — offset to interlock */}
              <motion.path
                d="M105 80 C105 65 85 60 85 77 C85 90 105 105 105 105 C105 105 125 90 125 77 C125 60 105 65 105 80Z"
                fill="none"
                stroke="url(#rg2)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
              />

              {/* Connecting sparkle dots */}
              {[0, 0.5, 1].map((delay, i) => (
                <motion.circle
                  key={i}
                  cx={80 + (i - 1) * 12}
                  cy={82}
                  r={2}
                  fill="#B8935A"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: delay + 1.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>

            {/* Rotating shimmer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-rose-gold/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="font-body text-espresso/70 text-sm tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Preparing something beautiful…
          </motion.p>

          {/* Progress bar */}
          {progress > 0 && (
            <motion.div
              className="mt-6 w-48 h-px bg-champagne/40 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-rose-gold to-rose-dark rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          )}

          {/* Bottom script names */}
          <motion.p
            className="absolute bottom-12 script-name text-4xl text-rose-dark/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            {weddingConfig.groomName} &amp; {weddingConfig.brideName}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
