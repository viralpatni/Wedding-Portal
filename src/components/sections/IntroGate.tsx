import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { requestGyroscopePermission } from "@/hooks/useGyroscope";
import { config } from "@/lib/config";

interface IntroGateProps {
  onBegin: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onGyroscopeEnabled: () => void;
}

/**
 * Intro Gate — Full-screen cinematic entry for AvNit: A Forever Story
 * Single "Tap to begin" unlocks: audio + iOS gyroscope + dismisses gate.
 */
export default function IntroGate({ onBegin, audioRef, onGyroscopeEnabled }: IntroGateProps) {
  const [isPressing, setIsPressing] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  async function handleBegin() {
    if (isPressing) return;
    setIsPressing(true);

    // 1. Unlock audio
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {});
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol = Math.min(0.5, vol + 0.02);
        if (audioRef.current) audioRef.current.volume = vol;
        if (vol >= 0.5) clearInterval(fadeIn);
      }, 100);
    }

    // 2. iOS gyroscope permission
    const gyroGranted = await requestGyroscopePermission();
    if (gyroGranted) onGyroscopeEnabled();

    // 3. Animate out
    setIsAnimatingOut(true);
    setTimeout(onBegin, 1000);
  }

  return (
    <AnimatePresence>
      {!isAnimatingOut ? (
        <motion.div
          className="fixed inset-0 z-[9990] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #FFF8F0 0%, #F6D6DC 45%, #FFDCC8 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Bokeh orbs */}
          {[
            { w: 320, h: 320, l: "8%", t: "15%", c: "#F6D6DC" },
            { w: 220, h: 220, l: "72%", t: "58%", c: "#FFDCC8" },
            { w: 180, h: 180, l: "48%", t: "5%", c: "#D4AF77" },
            { w: 150, h: 150, l: "20%", t: "70%", c: "#D9A6A1" },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: orb.w,
                height: orb.h,
                left: orb.l,
                top: orb.t,
                background: `radial-gradient(circle, ${orb.c}60 0%, transparent 70%)`,
                filter: "blur(40px)",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Interlocked hearts SVG */}
          <motion.div
            className="relative w-56 h-56 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <defs>
                  <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EBC4B3" />
                    <stop offset="100%" stopColor="#641E2B" />
                  </linearGradient>
                  <linearGradient id="hg2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#641E2B" />
                    <stop offset="100%" stopColor="#D4AF77" />
                  </linearGradient>
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Ankit's heart */}
                <path
                  d="M70 80 C70 60 45 55 45 75 C45 92 70 110 70 110 C70 110 95 92 95 75 C95 55 70 60 70 80Z"
                  fill="none"
                  stroke="url(#hg1)"
                  strokeWidth="4"
                  filter="url(#glow2)"
                />
                {/* Avani's heart — interlocked */}
                <path
                  d="M130 95 C130 75 105 70 105 90 C105 107 130 125 130 125 C130 125 155 107 155 90 C155 70 130 75 130 95Z"
                  fill="none"
                  stroke="url(#hg2)"
                  strokeWidth="4"
                  filter="url(#glow2)"
                />
                <path
                  d="M70 80 C70 60 45 55 45 75 C45 92 70 110 70 110 C70 110 95 92 95 75 C95 55 70 60 70 80Z"
                  fill="url(#hg1)"
                  opacity="0.12"
                />
                <path
                  d="M130 95 C130 75 105 70 105 90 C105 107 130 125 130 125 C130 125 155 107 155 90 C155 70 130 75 130 95Z"
                  fill="url(#hg2)"
                  opacity="0.12"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Website name */}
          <motion.p
            className="label text-[#3A211C]/50 tracking-[0.3em] mb-2 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            AvNit — A Forever Story
          </motion.p>

          {/* Couple names */}
          <motion.h1
            className="text-6xl md:text-7xl text-[#641E2B] mb-2"
            style={{ fontFamily: "'Pinyon Script', cursive" }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {config.groom} & {config.bride}
          </motion.h1>

          <motion.p
            className="label text-[#3A211C]/60 mb-3 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            are getting married · 26 January 2027
          </motion.p>

          <motion.p
            className="font-display italic text-[#3A211C]/50 text-lg mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            "{config.tagline}"
          </motion.p>

          {/* CTA */}
          <motion.button
            className="pill-btn-gold text-white relative overflow-hidden group"
            style={{
              background:
                "linear-gradient(120deg, #D4AF77, #641E2B 50%, #D4AF77)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleBegin}
            disabled={isPressing}
            aria-label="Tap to begin the AvNit wedding experience"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative">
              {isPressing ? "Opening…" : "✦ Enter Our Story ✦"}
            </span>
          </motion.button>

          {/* Gift credit */}
          <motion.p
            className="absolute bottom-8 text-[#3A211C]/40 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            A wedding gift crafted with love
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-[9990] bg-[#FFF8F0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
}
