import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX, Sparkles, Clock, Calendar } from "lucide-react";
import HeartsScene from "@/components/3d/HeartsScene";
import { useGyroscope } from "@/hooks/useGyroscope";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { useCountdown } from "@/hooks/useCountdown";
import { weddingConfig } from "@/config/weddingConfig";
import { weddingImages } from "@/config/weddingImages";
import { useAdmin } from "@/context/AdminContext";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/ImagePlaceholder";

interface HeroSectionProps {
  isPlayingMusic?: boolean;
  onToggleMusic?: () => void;
  gyroscopeEnabled?: boolean;
}

export default function HeroSection({
  isPlayingMusic,
  onToggleMusic,
  gyroscopeEnabled = false
}: HeroSectionProps) {
  const { getPrimarySectionImage } = useAdmin();
  const { t, language } = useLanguage();
  const quality = useAdaptiveQuality();
  const tilt = useGyroscope(gyroscopeEnabled);
  const timeLeft = useCountdown();
  const heroSrc = getPrimarySectionImage("hero", weddingImages.hero.src);
  const heroImg = {
    ...weddingImages.hero,
    src: heroSrc
  };

  const scrollToStory = () => {
    document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToInvitation = () => {
    document.querySelector("#invitation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FFF8F0]"
      aria-label="Ankit & Avani — A Cinematic 3D Wedding Experience"
    >
      {/* Cinematic animated atmospheric backdrop (optimized pre-softened radial gradients - zero blur overhead) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial glow orbs in Burgundy, Champagne Gold, and Rose */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.55, 0.35]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, #F6D6DC65 0%, #D9A6A125 45%, transparent 70%)",
            transform: "translateZ(0)",
            willChange: "transform, opacity"
          }}
        />
        <motion.div
          animate={{
            scale: [1.08, 0.95, 1.08],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-32 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #D4AF7755 0%, #EBD3B520 50%, transparent 70%)",
            transform: "translateZ(0)",
            willChange: "transform, opacity"
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[300px] sm:w-[500px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #641E2B40 0%, transparent 70%)" }}
        />
      </div>

      {/* Floating golden sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              background: i % 2 === 0 ? "#D4AF77" : "#D9A6A1",
              top: `${(i * 19) % 100}%`,
              left: `${(i * 29) % 100}%`,
              opacity: 0.3 + (i % 5) * 0.1,
              transform: "translateZ(0)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: 4 + (i % 4) * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Indian Palace Arches & Temple Silhouette Backdrop Artwork */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-[0.08] select-none z-0">
        <svg viewBox="0 0 1440 280" className="w-full h-auto text-[#641E2B]" fill="currentColor">
          {/* Palace Domes, Chhatris, Minarets & Arches */}
          <path d="M0 280 L0 180 Q60 160 120 180 Q180 140 240 180 Q300 130 360 180 L360 110 Q390 80 420 110 L420 180 Q480 150 540 180 Q600 120 660 180 Q720 70 780 180 Q840 120 900 180 Q960 150 1020 180 L1020 110 Q1050 80 1080 110 L1080 180 Q1140 130 1200 180 Q1260 140 1320 180 Q1380 160 1440 180 L1440 280 Z" />
          {/* Central Mandap Arch */}
          <path d="M680 180 C680 120 760 120 760 180 Z" fill="#D4AF77" opacity="0.5" />
        </svg>
      </div>

      {/* Hanging Golden Temple Bells & Floral Toran Garland at Top */}
      <div className="absolute top-0 inset-x-0 pointer-events-none z-10 flex justify-between px-8 sm:px-24">
        {[0.1, 0.4, 0.7, 0.9].map((pos, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center origin-top"
            animate={{ rotate: [-2.5, 2.5, -2.5] }}
            transition={{
              duration: 3 + idx * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.4
            }}
          >
            {/* Hanging String */}
            <div className="w-px h-10 sm:h-16 bg-gradient-to-b from-[#D4AF77] to-[#B8935A]" />
            {/* Lotus Bead */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48] border border-[#D4AF77]" />
            {/* Brass Bell (Ghanti) */}
            <svg width="20" height="22" viewBox="0 0 20 22" className="text-[#D4AF77] drop-shadow-sm">
              <path d="M10 2 C7 2 6 7 4 13 L16 13 C14 7 13 2 10 2 Z" fill="#D4AF77" stroke="#9A7030" strokeWidth="1" />
              <rect x="3" y="13" width="14" height="3" rx="1.5" fill="#B8935A" />
              <circle cx="10" cy="18" r="2" fill="#641E2B" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Optional top-right audio pill */}
      {onToggleMusic && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={onToggleMusic}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#D4AF77]/30 text-xs text-[#3A211C] shadow-sm hover:border-[#D4AF77] transition-all"
          aria-label={isPlayingMusic ? "Mute romantic music" : "Play romantic music"}
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#641E2B] animate-pulse" />
              <span className="font-body text-[11px] font-medium tracking-wider">{t("musicOn")}</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#3A211C]/60" />
              <span className="font-body text-[11px] tracking-wider text-[#3A211C]/70">{t("musicOff")}</span>
            </>
          )}
        </motion.button>
      )}

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-14 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Typography side */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
            {/* Super-title / Website Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 mb-3 sm:mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF77]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-body font-semibold text-[#641E2B]">
                {t("websiteName")}
              </span>
            </motion.div>

            {/* Main Headline — Couple Names (Responsive across mobile, tablet & desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 sm:mb-4"
            >
              <h1 className="font-display italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#3A211C] leading-[0.95] tracking-tight">
                {t("groomName")}
                <span className="block my-0.5 sm:my-1 text-3xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF77] via-[#D9A6A1] to-[#641E2B] font-script" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                  &amp;
                </span>
                {t("brideName")}
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-script text-xl sm:text-3xl lg:text-4xl text-[#641E2B] mb-4 sm:mb-5"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              "{t("tagline")}"
            </motion.p>

            {/* Gold Hairline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-gradient-to-r from-[#D4AF77] via-[#EBD3B5] to-transparent max-w-sm mx-auto lg:mx-0 mb-5 sm:mb-6"
            />

            {/* Wedding Date Card Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="inline-flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-5"
            >
              <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#D4AF77]/40 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#641E2B] animate-ping" />
                <span className="font-body font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#3A211C]">
                  {t("weddingDate")}
                </span>
                <span className="text-[#D4AF77] font-serif">✦</span>
                <span className="font-body text-[11px] sm:text-xs text-[#641E2B] uppercase tracking-wider">
                  {t("weddingLocationIST")}
                </span>
              </div>
            </motion.div>

            {/* Live Countdown Timer (Days, Hours, Minutes, Seconds) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-[320px] sm:max-w-sm mx-auto lg:mx-0">
                {[
                  { label: t("days"), val: timeLeft.days },
                  { label: t("hours"), val: timeLeft.hours },
                  { label: t("minutes"), val: timeLeft.minutes },
                  { label: t("seconds"), val: timeLeft.seconds }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-white/75 backdrop-blur-md border border-[#D4AF77]/40 shadow-sm hover:border-[#D4AF77] transition-all"
                  >
                    <span className="font-display text-lg sm:text-2xl font-bold text-[#641E2B] leading-none">
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#3A211C]/65 font-semibold mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons (Full width on small phones, inline on larger screens) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <button
                onClick={scrollToStory}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#3A211C] text-[#FFF8F0] font-body font-medium text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#641E2B] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>{t("enterStory")}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              <button
                onClick={scrollToInvitation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/80 border border-[#D4AF77]/50 text-[#3A211C] font-body font-medium text-xs uppercase tracking-[0.2em] shadow-sm hover:border-[#D4AF77] hover:bg-white transition-all duration-300"
              >
                {t("openInvitation")}
              </button>
            </motion.div>
          </div>

          {/* Portrait & 3D Hearts side */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 relative">
            {/* Couple Romantic Sculpted Cameo Frame (Responsive max-width) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[250px] sm:w-[310px] md:w-[350px]"
            >
              {/* Luminous Romantic Aura Glow */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-[140px_140px_100px_100px] bg-gradient-to-tr from-[#641E2B]/20 via-[#D4AF77]/25 to-[#D9A6A1]/30 blur-xl pointer-events-none" />

              {/* Outer Ornate Filigree Frame with Gold Beading */}
              <div
                className="absolute -inset-2.5 sm:-inset-3.5 border-2 border-dashed border-[#D4AF77]/60 rounded-[135px_135px_95px_95px] sm:rounded-[150px_150px_110px_110px] pointer-events-none"
                style={{ transform: "rotate(-0.5deg)" }}
              />
              <div
                className="absolute -inset-1 sm:-inset-1.5 border border-[#641E2B]/30 rounded-[130px_130px_90px_90px] sm:rounded-[145px_145px_105px_105px] pointer-events-none"
              />

              {/* Romantic Filigree Corner Medallions */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#D4AF77] via-[#FFF8F0] to-[#D4AF77] text-[#641E2B] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border border-[#D4AF77] shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <span>✦</span>
                <span className="font-script text-sm sm:text-base normal-case tracking-normal">AvNit Forever</span>
                <span>✦</span>
              </div>

              {/* Main Portrait Frame with Romantic Curvature */}
              <div className="relative rounded-[125px_125px_85px_85px] sm:rounded-[140px_140px_100px_100px] overflow-hidden aspect-[3/4] bg-gradient-to-b from-[#FFFDFB] via-[#F6D6DC]/30 to-[#EBD3B5]/40 shadow-[0_20px_50px_rgba(100,30,43,0.2)] border-2 border-[#D4AF77]">
                {heroImg.src ? (
                  <img
                    src={heroImg.src}
                    alt={heroImg.alt}
                    loading="eager"
                    className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <ImagePlaceholder
                    alt="Ankit and Avani standing together in a beautiful romantic couple portrait."
                    caption="Ankit & Avani"
                    subtitle="Couple Portrait"
                    aspect="w-full h-full"
                    icon="portrait"
                  />
                )}

                {/* Subtle romantic vignette & soft light wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A211C]/35 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-center bg-gradient-to-t from-[#241310]/80 via-[#241310]/40 to-transparent">
                  <p className="font-script text-xl sm:text-2xl text-white drop-shadow-sm" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                    Ankit &amp; Avani
                  </p>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#D4AF77] font-semibold">
                    Two Hearts · One Forever
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 3D Interlocking Hearts Scene (Optimized Three.js WebGL canvas - zero remote HDR stall) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -top-4 -right-2 sm:-top-8 sm:right-0 w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 pointer-events-none"
              style={{ zIndex: 12 }}
            >
              <Canvas
                dpr={quality.dpr}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                camera={{ position: [0, 0, 4], fov: 48 }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={1.1} color="#FFF5EA" />
                <directionalLight position={[3, 5, 3]} intensity={2.0} color="#FFE8D6" />
                <directionalLight position={[-3, 1, -2]} intensity={0.9} color="#F6D6DC" />
                <pointLight position={[0, 2, 2]} intensity={1.2} color="#D4AF77" />
                <Suspense fallback={null}>
                  <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
                    <HeartsScene tiltX={tilt.x} tiltY={tilt.y} scale={0.88} />
                  </Float>
                </Suspense>
              </Canvas>
            </motion.div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-1.5 mt-8 sm:mt-10 cursor-pointer select-none"
          onClick={scrollToStory}
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#3A211C]/60 font-body font-semibold">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#D4AF77]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom subtle divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent" />
    </section>
  );
}

