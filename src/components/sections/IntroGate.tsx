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

/* ========================================================================= */
/* KATHPUTLI PUPPET 1: ROYAL RAJASTHANI GROOM (ANKIT)                        */
/* ========================================================================= */
function RoyalGroomPuppet({ isSplitting }: { isSplitting: boolean }) {
  return (
    <div className="relative flex flex-col items-center select-none filter drop-shadow-[0_12px_25px_rgba(100,30,43,0.35)]">
      {/* Puppet Wooden Crossbar Handle & Strings */}
      <svg width="150" height="90" viewBox="0 0 150 90" className="overflow-visible">
        {/* Wooden control stick */}
        <line x1="20" y1="12" x2="130" y2="12" stroke="#B8935A" strokeWidth="5" strokeLinecap="round" />
        <circle cx="75" cy="12" r="5" fill="#641E2B" />

        {/* Golden Puppet Strings */}
        <line x1="35" y1="12" x2="45" y2="90" stroke="#D4AF77" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        <line x1="75" y1="12" x2="75" y2="90" stroke="#D4AF77" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.9" />
        <line x1="115" y1="12" x2="105" y2="90" stroke="#D4AF77" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
      </svg>

      {/* Puppet Body */}
      <motion.svg
        width="130"
        height="180"
        viewBox="0 0 130 180"
        className="overflow-visible -mt-1"
        animate={
          isSplitting
            ? { rotate: [-4, -8, -6], y: [0, -5, 0] }
            : { rotate: [-3, 3, -3], y: [0, 4, 0] }
        }
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        {/* Royal Kalgi Feather on Turban */}
        <path d="M65 8 Q60 -4 65 -12 Q70 -4 65 8" fill="#D4AF77" stroke="#641E2B" strokeWidth="1" />
        <circle cx="65" cy="-2" r="3" fill="#E11D48" />

        {/* Rajasthani Pagri / Turban (Saffron & Gold) */}
        <ellipse cx="65" cy="22" rx="26" ry="16" fill="#F59E0B" />
        <path d="M40 24 C45 10 85 10 90 24 C85 30 45 30 40 24 Z" fill="#D97706" />
        <path d="M42 20 Q65 14 88 20" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
        <path d="M45 25 Q65 19 85 25" stroke="#FDE68A" strokeWidth="2" fill="none" />
        <circle cx="65" cy="22" r="4" fill="#641E2B" stroke="#D4AF77" strokeWidth="1.5" />

        {/* Puppet Face (Wooden warm skin tone) */}
        <ellipse cx="65" cy="38" rx="17" ry="16" fill="#FDE2C8" stroke="#D4AF77" strokeWidth="1" />

        {/* Eyes & Royal Mustache */}
        <ellipse cx="58" cy="34" rx="2.5" ry="3.5" fill="#3A211C" />
        <ellipse cx="72" cy="34" rx="2.5" ry="3.5" fill="#3A211C" />
        <circle cx="59" cy="33" r="1" fill="#FFFFFF" />
        <circle cx="73" cy="33" r="1" fill="#FFFFFF" />

        {/* Royal Rajasthani Twirled Mustache */}
        <path d="M55 42 Q65 44 75 42 Q80 39 84 41 Q74 47 65 45 Q56 47 46 41 Q50 39 55 42 Z" fill="#3A211C" />

        {/* Auspicious Tilak */}
        <path d="M65 27 L65 32" stroke="#641E2B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="65" cy="33" r="1" fill="#F59E0B" />

        {/* Pearl Mala / Necklace */}
        <path d="M54 53 Q65 62 76 53" stroke="#F8FAFC" strokeWidth="2.5" strokeDasharray="3 3" fill="none" />

        {/* Royal Burgundy Sherwani Jacket */}
        <path d="M48 52 L82 52 L86 110 L44 110 Z" fill="#641E2B" stroke="#D4AF77" strokeWidth="1.5" />
        {/* Golden Buttons & Zari Placket */}
        <line x1="65" y1="52" x2="65" y2="110" stroke="#D4AF77" strokeWidth="2" />
        <circle cx="65" cy="62" r="1.5" fill="#FDE68A" />
        <circle cx="65" cy="74" r="1.5" fill="#FDE68A" />
        <circle cx="65" cy="86" r="1.5" fill="#FDE68A" />
        <circle cx="65" cy="98" r="1.5" fill="#FDE68A" />

        {/* Golden Kamarbandh / Waistband */}
        <rect x="47" y="80" width="36" height="6" fill="#D4AF77" rx="2" />

        {/* Left Arm (Reaching towards curtain seam) */}
        <motion.path
          d={isSplitting ? "M48 56 Q30 70 38 90" : "M48 56 Q32 75 44 88"}
          stroke="#641E2B"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Arm (Pulling right string/curtain) */}
        <motion.path
          d={isSplitting ? "M82 56 Q106 60 115 82" : "M82 56 Q98 75 88 88"}
          stroke="#641E2B"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Hands with wooden joint beads */}
        <circle cx={isSplitting ? "115" : "88"} cy={isSplitting ? "82" : "88"} r="4" fill="#FDE2C8" />
        <circle cx={isSplitting ? "38" : "44"} cy={isSplitting ? "90" : "88"} r="4" fill="#FDE2C8" />

        {/* Churidar / Trousers */}
        <path d="M52 110 L52 145 L58 145 L62 110 Z" fill="#FEF3C7" />
        <path d="M78 110 L78 145 L72 145 L68 110 Z" fill="#FEF3C7" />

        {/* Traditional Royal Juttis / Shoes */}
        <path d="M48 145 Q55 142 62 145 Q64 149 50 149 Z" fill="#641E2B" stroke="#D4AF77" strokeWidth="1" />
        <path d="M68 145 Q75 142 82 145 Q80 149 66 149 Z" fill="#641E2B" stroke="#D4AF77" strokeWidth="1" />
      </motion.svg>

      {/* Puppet Label */}
      <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#641E2B] text-[#D4AF77] text-[10px] uppercase font-bold tracking-widest border border-[#D4AF77]/60 shadow-sm">
        Ankit (Groom)
      </span>
    </div>
  );
}

/* ========================================================================= */
/* KATHPUTLI PUPPET 2: ROYAL BRIDAL QUEEN (AVANI)                            */
/* ========================================================================= */
function RoyalBridePuppet({ isSplitting }: { isSplitting: boolean }) {
  return (
    <div className="relative flex flex-col items-center select-none filter drop-shadow-[0_12px_25px_rgba(100,30,43,0.35)]">
      {/* Puppet Wooden Crossbar Handle & Strings */}
      <svg width="150" height="90" viewBox="0 0 150 90" className="overflow-visible">
        <line x1="20" y1="12" x2="130" y2="12" stroke="#B8935A" strokeWidth="5" strokeLinecap="round" />
        <circle cx="75" cy="12" r="5" fill="#641E2B" />

        <line x1="35" y1="12" x2="45" y2="90" stroke="#D4AF77" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        <line x1="75" y1="12" x2="75" y2="90" stroke="#D4AF77" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.9" />
        <line x1="115" y1="12" x2="105" y2="90" stroke="#D4AF77" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
      </svg>

      {/* Puppet Body */}
      <motion.svg
        width="130"
        height="180"
        viewBox="0 0 130 180"
        className="overflow-visible -mt-1"
        animate={
          isSplitting
            ? { rotate: [4, 8, 6], y: [0, -5, 0] }
            : { rotate: [3, -3, 3], y: [0, 4, 0] }
        }
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        {/* Bridal Odhani / Chunari Draped Over Head */}
        <path
          d="M38 35 C38 12 92 12 92 35 C95 65 98 120 92 145 C80 145 50 145 38 145 C32 120 35 65 38 35 Z"
          fill="#8A2839"
          stroke="#D4AF77"
          strokeWidth="1.5"
          opacity="0.95"
        />
        {/* Golden Gota Patti Border on Odhani */}
        <path d="M40 32 Q65 18 90 32" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
        <circle cx="65" cy="20" r="3" fill="#D4AF77" />

        {/* Bride Face */}
        <ellipse cx="65" cy="40" rx="16" ry="15" fill="#FDE2C8" stroke="#D4AF77" strokeWidth="1" />

        {/* Sparkling Maang Tikka */}
        <line x1="65" y1="26" x2="65" y2="33" stroke="#D4AF77" strokeWidth="1.5" />
        <circle cx="65" cy="33" r="2.5" fill="#E11D48" stroke="#D4AF77" strokeWidth="1" />

        {/* Big Bridal Eyes */}
        <ellipse cx="58" cy="38" rx="3" ry="3" fill="#3A211C" />
        <ellipse cx="72" cy="38" rx="3" ry="3" fill="#3A211C" />
        <circle cx="59" cy="37" r="1" fill="#FFFFFF" />
        <circle cx="73" cy="37" r="1" fill="#FFFFFF" />

        {/* Bridal Bindi & Sweet Smile */}
        <circle cx="65" cy="36" r="1.2" fill="#E11D48" />
        <path d="M60 45 Q65 48 70 45" stroke="#E11D48" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Royal Rajasthani Nath (Nose Ring with chain) */}
        <circle cx="60" cy="42" r="2.5" stroke="#D4AF77" strokeWidth="1" fill="none" />
        <path d="M60 42 Q52 38 48 38" stroke="#D4AF77" strokeWidth="0.8" fill="none" />

        {/* Bridal Jhumkas */}
        <polygon points="46,42 43,48 49,48" fill="#D4AF77" />
        <polygon points="84,42 81,48 87,48" fill="#D4AF77" />

        {/* Choli (Blouse) */}
        <path d="M50 55 L80 55 L82 75 L48 75 Z" fill="#641E2B" stroke="#D4AF77" strokeWidth="1.5" />
        <path d="M56 55 Q65 62 74 55" stroke="#D4AF77" strokeWidth="1.5" fill="none" />

        {/* Flared Embroidered Bridal Lehenga Skirt */}
        <path
          d="M48 75 L82 75 L98 145 C80 152 50 152 32 145 Z"
          fill="url(#lehengaGrad)"
          stroke="#D4AF77"
          strokeWidth="2"
        />

        {/* Lehenga Gradient */}
        <defs>
          <linearGradient id="lehengaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="50%" stopColor="#641E2B" />
            <stop offset="100%" stopColor="#831843" />
          </linearGradient>
        </defs>

        {/* Golden Zari Patterns on Skirt */}
        <path d="M36 135 Q65 142 94 135" stroke="#FDE68A" strokeWidth="3" fill="none" />
        <path d="M40 125 Q65 132 90 125" stroke="#FDE68A" strokeWidth="2" fill="none" />
        <path d="M44 110 Q65 116 86 110" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

        {/* Left Arm (Pulling curtain left) */}
        <motion.path
          d={isSplitting ? "M48 58 Q24 62 15 82" : "M48 58 Q34 76 44 88"}
          stroke="#641E2B"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Arm (Reaching right) */}
        <motion.path
          d={isSplitting ? "M82 58 Q100 70 92 90" : "M82 58 Q96 76 86 88"}
          stroke="#641E2B"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Red Chooda Bangles on Hands */}
        <circle cx={isSplitting ? "15" : "44"} cy={isSplitting ? "82" : "88"} r="4" fill="#E11D48" stroke="#D4AF77" strokeWidth="1.5" />
        <circle cx={isSplitting ? "92" : "86"} cy={isSplitting ? "90" : "88"} r="4" fill="#E11D48" stroke="#D4AF77" strokeWidth="1.5" />
      </motion.svg>

      {/* Puppet Label */}
      <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#641E2B] text-[#D4AF77] text-[10px] uppercase font-bold tracking-widest border border-[#D4AF77]/60 shadow-sm">
        Avani (Bride)
      </span>
    </div>
  );
}

/* ========================================================================= */
/* MAIN INTRO GATE: 3D BLUSH PINK FLORAL ENVELOPE (VIDEO 1) + PUPPET SPLIT    */
/* ========================================================================= */
export default function IntroGate({ onBegin, audioRef, onGyroscopeEnabled }: IntroGateProps) {
  // Animation stages:
  // idle -> envelope_opening -> card_revealed -> puppets_pop -> splitting -> finished
  const [stage, setStage] = useState<"idle" | "envelope_opening" | "card_revealed" | "puppets_pop" | "splitting" | "finished">("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Realistic Falling Rose Petals & Golden Stardust Canvas
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

    const PETAL_COLORS = ["#641E2B", "#8A2839", "#B76E79", "#D9A6A1", "#C74D60", "#F4DDE3", "#E89CA8"];
    const STARDUST_COLORS = ["#D4AF77", "#F0D19E", "#FFE6B8", "#FFFDF8", "#E6BA75"];

    const isMobile = width < 768;
    const petalsCount = isMobile ? 18 : 32;
    const sparklesCount = isMobile ? 22 : 40;

    const petals: Petal[] = Array.from({ length: petalsCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: 13 + Math.random() * 15,
      speedY: 0.9 + Math.random() * 1.6,
      speedX: (Math.random() - 0.5) * 1.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2.0,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.03,
      opacity: 0.55 + Math.random() * 0.4,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));

    const sparkles: SparkleParticle[] = Array.from({ length: sparklesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.2 + Math.random() * 2.5,
      speedY: -(0.3 + Math.random() * 0.6),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.8,
      maxOpacity: 0.4 + Math.random() * 0.5,
      fadeSpeed: 0.01 + Math.random() * 0.02,
      color: STARDUST_COLORS[Math.floor(Math.random() * STARDUST_COLORS.length)],
    }));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      const scaleX = Math.cos(p.flip);
      ctx.scale(scaleX, 1);

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.75, -p.size * 0.6, p.size * 0.85, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.85, p.size * 0.5, -p.size * 0.75, -p.size * 0.6, 0, -p.size);

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

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.6;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

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
    };
  }, []);

  // Handle Envelope Opening sequence inspired by Video 1 + Puppet Split Transition
  async function handleOpenEnvelope() {
    if (stage !== "idle") return;

    // STEP 1: Envelope flap opens & wax seal breaks
    setStage("envelope_opening");

    // Celebratory Rose Petal Confetti
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.55 },
      colors: ["#641E2B", "#D4AF77", "#D9A6A1", "#F4DDE3", "#F59E0B"],
      scalar: 1.1
    });

    // Unlock audio smoothly
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {});
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol = Math.min(0.5, vol + 0.04);
        if (audioRef.current) audioRef.current.volume = vol;
        if (vol >= 0.5) clearInterval(fadeIn);
      }, 80);
    }

    // iOS gyroscope permission
    const gyroGranted = await requestGyroscopePermission();
    if (gyroGranted) onGyroscopeEnabled();

    // STEP 2: Royal card slides out of envelope
    setTimeout(() => {
      setStage("card_revealed");
    }, 450);

    // STEP 3: Puppets drop down to grab curtains
    setTimeout(() => {
      setStage("puppets_pop");
    }, 950);

    // STEP 4: Puppets pull the split curtains open!
    setTimeout(() => {
      setStage("splitting");
    }, 1400);

    // STEP 5: Split completes and unveils the landing page
    setTimeout(() => {
      setStage("finished");
      onBegin();
    }, 2500);
  }

  const handleDirectEnter = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setStage("finished");
    onBegin();
  };

  if (stage === "finished") return null;

  const isFlapOpen = stage !== "idle";
  const isCardOut = stage === "card_revealed" || stage === "puppets_pop" || stage === "splitting";
  const isSplitting = stage === "splitting";
  const hasPuppetsDropped = stage === "puppets_pop" || stage === "splitting";


  return (
    <div className="fixed inset-0 overflow-hidden select-none pointer-events-auto" style={{ zIndex: 9999 }}>

      {/* ================================================================== */}
      {/* LAYER 0: CINEMATIC VIDEO BACKGROUND                                 */}
      {/* ================================================================== */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/videos/wedding_invitation.mp4"
          className="w-full h-full object-cover scale-110"
          style={{ filter: "brightness(0.78) saturate(1.2) contrast(1.05)" }}
        />
        {/* Dark romantic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,8,16,0.60) 0%, rgba(28,5,10,0.28) 45%, rgba(45,8,16,0.68) 100%)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(18,4,8,0.70) 100%)",
          }}
        />
      </div>

      {/* Top-Right Quick Skip */}
      <button
        onClick={handleDirectEnter}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-[#D4AF77]/70 text-[#FFF8F0] text-xs font-body font-semibold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
        style={{ zIndex: 60, background: "rgba(55,12,20,0.78)" }}
        aria-label="Skip introduction and enter website directly"
      >
        <span>Enter Website</span>
        <span className="text-[#D4AF77] font-serif">→</span>
      </button>

      {/* Falling Petals & Stardust Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
      />

      {/* Central Seam Golden Burst during curtain split */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ zIndex: 25 }}
        initial={{ opacity: 0 }}
        animate={isSplitting ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.0 }}
      >
        <div className="w-16 h-full bg-gradient-to-r from-transparent via-[#FFF8E7] to-transparent shadow-[0_0_140px_rgba(212,175,119,1)]" />
      </motion.div>

      {/* =================================================================== */}
      {/* LEFT SPLIT CURTAIN — dark cinematic velvet drape                   */}
      {/* =================================================================== */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(52,12,20,0.90) 0%, rgba(40,8,16,0.93) 50%, rgba(58,16,24,0.90) 100%)",
          borderRight: "2.5px solid rgba(212,175,119,0.75)",
          zIndex: 20,
        }}
        initial={{ x: 0 }}
        animate={isSplitting ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Damask pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5Z M5 30 Q15 25 25 30 Q15 35 5 30Z M30 55 Q35 45 30 35 Q25 45 30 55Z M55 30 Q45 25 35 30 Q45 35 55 30Z' fill='%23D4AF77'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Left Gold Trim Seam with glow */}
        <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-gradient-to-b from-[#D4AF77] via-[#F0D19E] to-[#B8935A] shadow-[0_0_16px_rgba(212,175,119,0.9)]" />

        {/* GROOM PUPPET (Ankit) — drops from top on puppets_pop */}
        <motion.div
          className="absolute top-2 sm:top-4 right-2 sm:right-6"
          style={{ zIndex: 40 }}
          initial={{ y: -300, opacity: 0 }}
          animate={
            hasPuppetsDropped
              ? isSplitting
                ? { y: 0, opacity: 1, x: -18 }
                : { y: 0, opacity: 1, x: 0 }
              : { y: -300, opacity: 0 }
          }
          transition={
            hasPuppetsDropped
              ? { type: "spring", stiffness: 155, damping: 17, mass: 0.9 }
              : { duration: 0 }
          }
        >
          <RoyalGroomPuppet isSplitting={isSplitting} />
        </motion.div>
      </motion.div>

      {/* =================================================================== */}
      {/* RIGHT SPLIT CURTAIN — dark cinematic velvet drape                  */}
      {/* =================================================================== */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(225deg, rgba(52,12,20,0.90) 0%, rgba(40,8,16,0.93) 50%, rgba(58,16,24,0.90) 100%)",
          borderLeft: "2.5px solid rgba(212,175,119,0.75)",
          zIndex: 20,
        }}
        initial={{ x: 0 }}
        animate={isSplitting ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5Z M5 30 Q15 25 25 30 Q15 35 5 30Z M30 55 Q35 45 30 35 Q25 45 30 55Z M55 30 Q45 25 35 30 Q45 35 55 30Z' fill='%23D4AF77'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Right Gold Trim Seam */}
        <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#D4AF77] via-[#F0D19E] to-[#B8935A] shadow-[0_0_16px_rgba(212,175,119,0.9)]" />

        {/* BRIDE PUPPET (Avani) — drops from top on puppets_pop */}
        <motion.div
          className="absolute top-2 sm:top-4 left-2 sm:left-6"
          style={{ zIndex: 40 }}
          initial={{ y: -300, opacity: 0 }}
          animate={
            hasPuppetsDropped
              ? isSplitting
                ? { y: 0, opacity: 1, x: 18 }
                : { y: 0, opacity: 1, x: 0 }
              : { y: -300, opacity: 0 }
          }
          transition={
            hasPuppetsDropped
              ? { type: "spring", stiffness: 155, damping: 17, mass: 0.9 }
              : { duration: 0 }
          }
        >
          <RoyalBridePuppet isSplitting={isSplitting} />
        </motion.div>
      </motion.div>

      {/* =================================================================== */}
      {/* CENTER ENVELOPE OVERLAY — above all curtains at zIndex 45           */}
      {/* =================================================================== */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-auto"
        style={{ zIndex: 45 }}
        animate={
          isSplitting
            ? { opacity: 0, scale: 0.84, y: 40 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        {/* You Are Cordially Invited badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-4 px-5 py-1.5 rounded-full border border-[#D4AF77]/65"
          style={{ background: "rgba(55,12,20,0.75)", backdropFilter: "blur(10px)" }}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
          <p className="text-[11px] sm:text-xs tracking-[0.3em] font-semibold uppercase text-[#FFF8F0]">
            You Are Cordially Invited
          </p>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
        </motion.div>

        {/* =============================================================== */}
        {/* 3D FLORAL ENVELOPE                                              */}
        {/* =============================================================== */}
        <motion.div
          className="relative w-[285px] sm:w-[345px] md:w-[390px] aspect-[3/4.2] cursor-pointer select-none"
          style={{ perspective: "1400px" }}
          onClick={handleOpenEnvelope}
          role="button"
          tabIndex={0}
          aria-label="Tap to open the Ankit & Avani wedding invitation envelope"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpenEnvelope();
          }}
          whileHover={{ scale: 1.025, y: -5 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {/* Dramatic glow */}
          <div
            className="absolute -inset-8 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 90%, rgba(212,175,119,0.5) 0%, rgba(100,30,43,0.2) 60%, transparent 85%)",
              filter: "blur(20px)",
            }}
          />

          {/* Envelope shell */}
          <div
            className="relative w-full h-full rounded-2xl overflow-visible border border-[#D4AF77]/80"
            style={{
              background: "linear-gradient(150deg, #FFF9F5 0%, #FBEBE8 45%, #F4DDE3 100%)",
              boxShadow:
                "0 35px_90px rgba(55,10,20,0.60), 0 6px 25px rgba(212,175,119,0.35), inset 0 1px 0 rgba(255,255,255,0.85)",
            }}
          >
            {/* Embossed double border */}
            <div className="absolute inset-2 sm:inset-3 border border-[#D4AF77]/45 rounded-xl pointer-events-none" />
            <div className="absolute inset-[14px] sm:inset-[18px] border border-dashed border-[#B8935A]/30 rounded-lg pointer-events-none" />

            {/* Corner florals */}
            <svg className="absolute top-3 left-3 w-10 h-10 pointer-events-none opacity-70" viewBox="0 0 100 100">
              <path d="M10 10 Q35 15 50 40 Q30 35 25 60 Q20 30 10 10 Z" fill="#D4AF77" opacity="0.6" />
              <circle cx="28" cy="28" r="4" fill="#C58C85" />
              <circle cx="42" cy="38" r="3" fill="#D4AF77" />
            </svg>
            <svg className="absolute top-3 right-3 w-10 h-10 pointer-events-none opacity-70 -scale-x-100" viewBox="0 0 100 100">
              <path d="M10 10 Q35 15 50 40 Q30 35 25 60 Q20 30 10 10 Z" fill="#D4AF77" opacity="0.6" />
              <circle cx="28" cy="28" r="4" fill="#C58C85" />
              <circle cx="42" cy="38" r="3" fill="#D4AF77" />
            </svg>
            <svg className="absolute bottom-3 left-3 w-10 h-10 pointer-events-none opacity-70 scale-y-[-1]" viewBox="0 0 100 100">
              <path d="M10 10 Q35 15 50 40 Q30 35 25 60 Q20 30 10 10 Z" fill="#D4AF77" opacity="0.5" />
              <circle cx="28" cy="28" r="3" fill="#C58C85" />
            </svg>
            <svg className="absolute bottom-3 right-3 w-10 h-10 pointer-events-none opacity-70 scale-[-1]" viewBox="0 0 100 100">
              <path d="M10 10 Q35 15 50 40 Q30 35 25 60 Q20 30 10 10 Z" fill="#D4AF77" opacity="0.5" />
              <circle cx="28" cy="28" r="3" fill="#C58C85" />
            </svg>

            {/* Header */}
            <div className="relative pt-6 sm:pt-7 text-center pointer-events-none" style={{ zIndex: 10 }}>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#641E2B]/80 font-semibold mb-1">
                An Invitation For
              </p>
              <h3 className="font-script text-2xl sm:text-3xl text-[#641E2B] drop-shadow-sm" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                You &amp; Family
              </h3>
            </div>

            {/* Inner invitation card */}
            <motion.div
              className="absolute inset-x-3 sm:inset-x-4 top-[52px] sm:top-[58px] bottom-4 rounded-xl shadow-lg overflow-hidden border border-[#D4AF77]/80 flex flex-col justify-between p-4 sm:p-5 text-center"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F3 60%, #FBF0EB 100%)",
                zIndex: 15,
              }}
              initial={{ y: 0, opacity: 0.85 }}
              animate={
                isCardOut
                  ? { y: -88, opacity: 1, scale: 1.04 }
                  : { y: 0, opacity: 0.85, scale: 1 }
              }
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-1.5 border border-[#D4AF77]/50 rounded-lg pointer-events-none" />

              <div className="relative pt-1 flex flex-col items-center">
                <motion.div
                  className="w-11 h-11 rounded-full border-2 border-[#D4AF77] flex items-center justify-center bg-[#FFF8F0] shadow-md mb-1.5"
                  animate={{ rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-script text-lg text-[#641E2B]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                    AvNit
                  </span>
                </motion.div>
                <p className="text-[8px] uppercase tracking-[0.3em] text-[#3A211C]/70 font-semibold">
                  Together With Their Families
                </p>
              </div>

              <div className="relative py-1">
                <h2 className="font-script text-3xl sm:text-4xl md:text-[2.8rem] text-[#641E2B] leading-none" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                  Ankit &amp; Avani
                </h2>
                <div className="flex items-center justify-center gap-2 my-1.5">
                  <span className="h-px w-6 bg-[#D4AF77]" />
                  <Heart className="w-2.5 h-2.5 text-[#C58C85] fill-[#C58C85]" />
                  <span className="text-[8px] uppercase tracking-[0.22em] text-[#D4AF77] font-semibold">Are Getting Married</span>
                  <Heart className="w-2.5 h-2.5 text-[#C58C85] fill-[#C58C85]" />
                  <span className="h-px w-6 bg-[#D4AF77]" />
                </div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-body font-bold text-[#3A211C]">
                  26 January 2027
                </p>
              </div>

              <div className="relative pb-1">
                <p className="font-script text-sm sm:text-base text-[#641E2B]/85 italic mb-2" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                  "Two Hearts, One Beautiful Forever"
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#641E2B] text-[#D4AF77] text-[8px] uppercase font-bold tracking-widest shadow-sm">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Unfolding The Grand Celebration</span>
                </div>
              </div>
            </motion.div>

            {/* Envelope folds */}
            <div
              className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none"
              style={{
                clipPath: "polygon(0 100%, 100% 100%, 50% 32%)",
                background: "linear-gradient(180deg, #F9E5EA 0%, #F4DDE3 60%, #EBD0D7 100%)",
                filter: "drop-shadow(0 -4px 10px rgba(100,30,43,0.12))",
                borderTop: "1px solid rgba(212,175,119,0.5)",
                zIndex: 20,
              }}
            />
            <div
              className="absolute top-0 bottom-0 left-0 w-1/2 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                background: "linear-gradient(135deg, #FDECEF 0%, #F7D8DE 70%, #EBD0D7 100%)",
                opacity: 0.95,
                zIndex: 20,
              }}
            />
            <div
              className="absolute top-0 bottom-0 right-0 w-1/2 pointer-events-none"
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                background: "linear-gradient(225deg, #FDECEF 0%, #F7D8DE 70%, #EBD0D7 100%)",
                opacity: 0.95,
                zIndex: 20,
              }}
            />

            {/* Top triangular flap */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[56%] origin-top pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #FFF9F5 0%, #FBECEF 50%, #F5D3DB 100%)",
                borderBottom: "1.5px solid #D4AF77",
                transformStyle: "preserve-3d",
                zIndex: isFlapOpen ? 5 : 25,
              }}
              animate={
                isFlapOpen
                  ? { rotateX: -180, opacity: 0.2 }
                  : { rotateX: 0, opacity: 1 }
              }
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(circle at 50% 100%, #D4AF77 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />
            </motion.div>

            {/* Wax Seal */}
            <motion.div
              className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer pointer-events-auto"
              style={{ zIndex: 30 }}
              animate={
                isFlapOpen
                  ? { scale: [1, 1.3, 0], opacity: [1, 1, 0], rotate: 45 }
                  : { scale: [1, 1.06, 1], y: [0, -4, 0] }
              }
              transition={
                isFlapOpen
                  ? { duration: 0.55, ease: "easeOut" }
                  : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }
              whileHover={{ scale: 1.14 }}
              whileTap={{ scale: 0.92 }}
            >
              <div className="absolute -inset-4 rounded-full bg-[#D4AF77]/35 blur-xl pointer-events-none" />
              <div
                className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center border-2 border-[#FFE2A4]"
                style={{
                  background: "radial-gradient(circle at 32% 28%, #F5CEBC 0%, #D4AF77 40%, #B8935A 75%, #641E2B 100%)",
                  boxShadow: "0 8px 25px rgba(100,30,43,0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
                }}
              >
                <div className="absolute inset-2 rounded-full border border-dashed border-[#FFFDF8]/60 pointer-events-none" />
                <div className="text-center select-none">
                  <span
                    className="font-script text-xl sm:text-2xl text-[#3A141A] font-bold"
                    style={{ fontFamily: "'Pinyon Script', cursive", textShadow: "0 1px 2px rgba(255,255,255,0.5)" }}
                  >
                    AvNit
                  </span>
                  <div className="text-[6px] sm:text-[7px] uppercase tracking-[0.2em] font-bold text-[#3A141A]/90">
                    Forever
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* TAP TO OPEN INVITATION CTA */}
        <motion.button
          className="mt-5 relative px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-white font-body text-xs font-semibold uppercase tracking-[0.25em] overflow-hidden group border border-[#D4AF77]/70 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #B8935A 0%, #641E2B 55%, #4A121D 100%)",
            boxShadow: "0 14px 38px rgba(100,30,43,0.55), 0 0 0 1px rgba(212,175,119,0.2)",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(100,30,43,0.65)" }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpenEnvelope}
          disabled={stage !== "idle"}
          aria-label="Tap to open the wedding envelope"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
          <span className="relative flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
            <span>
              {stage === "envelope_opening"
                ? "Opening Royal Seal..."
                : stage === "card_revealed"
                ? "Revealing Our Invitation..."
                : stage === "puppets_pop" || stage === "splitting"
                ? "Unfolding Our Story..."
                : "✦ Tap To Open Invitation ✦"}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
          </span>
        </motion.button>

        {/* Patni Family Signature */}
        <motion.p
          className="mt-4 text-[#FFF8F0]/45 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-body font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
        >
          A Wedding Gift Crafted With Love · Patni Family
        </motion.p>
      </motion.div>
    </div>
  );
}
