import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { requestGyroscopePermission } from "@/hooks/useGyroscope";
import { config } from "@/lib/config";
import confetti from "canvas-confetti";

interface IntroGateProps {
  onBegin: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onGyroscopeEnabled: () => void;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  color: string;
}

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
  color: string;
}

/**
 * Romantic Intro Gate — Ultra-romantic, atmospheric entry for AvNit: A Forever Story.
 * Features:
 * - Fluid falling rose petals (3D sway & realistic petal curve)
 * - Shimmering upward-drifting golden stardust particles
 * - Gentle concentric heartbeat ripple rings radiating from interlocked hearts
 * - Luminous sacred rose-gold breathing aura
 * - Cursor sparkle interaction
 * - Rose petal & gold confetti burst on entry
 */
export default function IntroGate({ onBegin, audioRef, onGyroscopeEnabled }: IntroGateProps) {
  const [isPressing, setIsPressing] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Realistic Falling Rose Petals & Golden Stardust Canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Rose petal colors: Velvet Burgundy, Rose Blush, Peach Blossom, Warm Rose
    const PETAL_COLORS = ["#641E2B", "#8A2839", "#B76E79", "#D9A6A1", "#C74D60", "#E89CA8"];
    // Stardust colors: Champagne Gold, Warm Amber, Soft Ivory
    const STARDUST_COLORS = ["#D4AF77", "#F0D19E", "#FFE6B8", "#FFFDF8", "#E6BA75"];

    const petals: Petal[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: 14 + Math.random() * 16,
      speedY: 1.0 + Math.random() * 1.8,
      speedX: (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2.2,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.03,
      opacity: 0.55 + Math.random() * 0.4,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));

    const sparkles: SparkleParticle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.2 + Math.random() * 2.8,
      speedY: -(0.3 + Math.random() * 0.7),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.8,
      maxOpacity: 0.4 + Math.random() * 0.5,
      fadeSpeed: 0.01 + Math.random() * 0.02,
      color: STARDUST_COLORS[Math.floor(Math.random() * STARDUST_COLORS.length)],
    }));

    // Mouse interaction drift
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Draw single organic rose petal
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      const scaleX = Math.cos(p.flip);
      ctx.scale(scaleX, 1);

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      // Gentle curve of a rose petal
      ctx.bezierCurveTo(p.size * 0.75, -p.size * 0.6, p.size * 0.85, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.85, p.size * 0.5, -p.size * 0.75, -p.size * 0.6, 0, -p.size);

      // Gradient shading on the petal for 3D realism
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.8, p.color);
      grad.addColorStop(1, "#3A0F17");

      ctx.fillStyle = grad;
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = "rgba(100, 30, 43, 0.25)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Golden Stardust
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity += s.fadeSpeed;

        if (s.opacity > s.maxOpacity || s.opacity < 0.1) {
          s.fadeSpeed = -s.fadeSpeed;
        }

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.opacity));
        ctx.shadowColor = "#D4AF77";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      // Render Rose Petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.6;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Subtle mouse repulsion/drift
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 3;
        }

        // Recycle petal when falling off screen
        if (p.y > height + 40) {
          p.y = -30 - Math.random() * 40;
          p.x = Math.random() * width;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  async function handleBegin() {
    if (isPressing) return;
    setIsPressing(true);

    // Celebratory Rose Petal & Gold Confetti Burst
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#641E2B", "#D4AF77", "#D9A6A1", "#F6D6DC", "#FFF8F0"],
      shapes: ["circle"],
      scalar: 1.2,
    });

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
              "linear-gradient(135deg, #FFF9F3 0%, #FBEBE8 35%, #F7D8DE 70%, #F5CEBC 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Falling Rose Petals & Golden Stardust Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Luminous Romantic Radial Orbs */}
          {[
            { w: 420, h: 420, l: "12%", t: "10%", c: "#F7D8DE" },
            { w: 350, h: 350, l: "65%", t: "55%", c: "#F5CEBC" },
            { w: 260, h: 260, l: "50%", t: "2%", c: "#D4AF77" },
            { w: 220, h: 220, l: "22%", t: "68%", c: "#D9A6A1" },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: orb.w,
                height: orb.h,
                left: orb.l,
                top: orb.t,
                background: `radial-gradient(circle, ${orb.c}70 0%, transparent 70%)`,
                filter: "blur(50px)",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.45, 0.8, 0.45],
              }}
              transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Glowing Sacred Heart Aura Behind Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none">
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(212, 175, 119, 0.35) 0%, rgba(217, 166, 161, 0.2) 40%, transparent 70%)",
                filter: "blur(35px)",
              }}
              animate={{
                scale: [0.95, 1.25, 0.95],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Concentric Heartbeat Ripple Rings */}
          <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[0, 1.5, 3].map((delay, idx) => (
              <motion.div
                key={idx}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF77]/35"
                style={{ width: 140, height: 140 }}
                animate={{
                  scale: [0.8, 2.5],
                  opacity: [0.65, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay,
                }}
              />
            ))}
          </div>

          {/* Main Content Container */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-2xl">
            {/* Interlocked hearts with rhythmic love pulse */}
            <motion.div
              className="relative w-48 h-48 sm:w-56 sm:h-56 mb-4 cursor-pointer"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08 }}
            >
              {/* Soft Heartbeat breathing */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1, 1.03, 1],
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_8px_20px_rgba(100,30,43,0.25)]" fill="none">
                  <defs>
                    <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F2D2BD" />
                      <stop offset="50%" stopColor="#D4AF77" />
                      <stop offset="100%" stopColor="#641E2B" />
                    </linearGradient>
                    <linearGradient id="hg2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#641E2B" />
                      <stop offset="50%" stopColor="#B76E79" />
                      <stop offset="100%" stopColor="#D4AF77" />
                    </linearGradient>
                    <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Ankit's heart */}
                  <path
                    d="M70 80 C70 60 45 55 45 75 C45 92 70 110 70 110 C70 110 95 92 95 75 C95 55 70 60 70 80Z"
                    fill="url(#hg1)"
                    fillOpacity="0.18"
                    stroke="url(#hg1)"
                    strokeWidth="4"
                    filter="url(#glow2)"
                  />
                  {/* Avani's heart — interlocked with love */}
                  <path
                    d="M130 95 C130 75 105 70 105 90 C105 107 130 125 130 125 C130 125 155 107 155 90 C155 70 130 75 130 95Z"
                    fill="url(#hg2)"
                    fillOpacity="0.18"
                    stroke="url(#hg2)"
                    strokeWidth="4"
                    filter="url(#glow2)"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Subtitle Monogram Label */}
            <motion.div
              className="inline-flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
              <p className="label text-[#3A211C]/60 tracking-[0.3em] text-xs font-semibold uppercase">
                AvNit — A Forever Story
              </p>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
            </motion.div>

            {/* Couple names in royal calligraphy */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl text-[#641E2B] mb-2 font-script"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 1 }}
            >
              {config.groom} &amp; {config.bride}
            </motion.h1>

            {/* Wedding Date */}
            <motion.p
              className="label text-[#3A211C]/75 mb-3 text-xs tracking-[0.2em] uppercase font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              are getting married · 26 January 2027
            </motion.p>

            {/* Romantic Tagline */}
            <motion.p
              className="font-display italic text-[#3A211C]/75 text-lg sm:text-xl mb-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              "{config.tagline}"
            </motion.p>

            {/* Enter Our Story Button */}
            <motion.button
              className="relative px-9 py-3.5 rounded-full text-white font-body text-xs font-semibold uppercase tracking-[0.25em] shadow-[0_12px_35px_rgba(100,30,43,0.35)] overflow-hidden group border border-[#D4AF77]/60 cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, #B8935A 0%, #641E2B 50%, #4A121D 100%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(100,30,43,0.45)" }}
              whileTap={{ scale: 0.96 }}
              onClick={handleBegin}
              disabled={isPressing}
              aria-label="Tap to begin the AvNit wedding experience"
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
              <span className="relative flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
                <span>{isPressing ? "Opening Sacred Story…" : "✦ Enter Our Story ✦"}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
              </span>
            </motion.button>
          </div>

          {/* Gift credit at bottom */}
          <motion.p
            className="absolute bottom-6 text-[#3A211C]/45 text-[11px] tracking-[0.25em] uppercase font-body font-medium z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            A wedding gift crafted with love · Patni Family
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
