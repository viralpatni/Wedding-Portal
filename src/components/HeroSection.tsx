import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX, Sparkles } from "lucide-react";
import HeartsScene from "@/components/3d/HeartsScene";
import { useGyroscope } from "@/hooks/useGyroscope";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { weddingConfig } from "@/config/weddingConfig";
import { weddingImages } from "@/config/weddingImages";
import { useAdmin } from "@/context/AdminContext";
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
  const quality = useAdaptiveQuality();
  const tilt = useGyroscope(gyroscopeEnabled);
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
      {/* Cinematic animated atmospheric backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial glow orbs in Burgundy, Champagne Gold, and Rose */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.5, 0.35]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, #F6D6DC 0%, #D9A6A1 50%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, #D4AF77 0%, #EBD3B5 60%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full blur-[110px] opacity-20"
          style={{ background: "radial-gradient(circle, #641E2B 0%, transparent 70%)" }}
        />
      </div>

      {/* Floating golden sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              background: i % 2 === 0 ? "#D4AF77" : "#D9A6A1",
              top: `${(i * 19) % 100}%`,
              left: `${(i * 29) % 100}%`,
              opacity: 0.3 + (i % 5) * 0.1
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.4, 0.8]
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

      {/* Top delicate hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/40 to-transparent" />

      {/* Optional top-right audio pill */}
      {onToggleMusic && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={onToggleMusic}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#D4AF77]/30 text-xs text-[#3A211C] shadow-sm hover:border-[#D4AF77] transition-all"
          aria-label={isPlayingMusic ? "Mute romantic music" : "Play romantic music"}
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#641E2B] animate-pulse" />
              <span className="font-body text-[11px] font-medium tracking-wider">Music ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#3A211C]/60" />
              <span className="font-body text-[11px] tracking-wider text-[#3A211C]/70">Music OFF</span>
            </>
          )}
        </motion.button>
      )}

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Typography side */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
            {/* Super-title / Website Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF77]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-body font-semibold text-[#641E2B]">
                {weddingConfig.websiteName}
              </span>
            </motion.div>

            {/* Main Headline — Couple Names */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4"
            >
              <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-[#3A211C] leading-[0.92] tracking-tight">
                {weddingConfig.groomName}
                <span className="block my-1 text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF77] via-[#D9A6A1] to-[#641E2B] font-script" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                  &amp;
                </span>
                {weddingConfig.brideName}
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-script text-2xl sm:text-3xl lg:text-4xl text-[#641E2B] mb-5"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              "{weddingConfig.tagline}"
            </motion.p>

            {/* Gold Hairline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-gradient-to-r from-[#D4AF77] via-[#EBD3B5] to-transparent max-w-sm mx-auto lg:mx-0 mb-6"
            />

            {/* Wedding Date Card Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="inline-flex items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <div className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#D4AF77]/40 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#641E2B] animate-ping" />
                <span className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#3A211C]">
                  26 JANUARY 2027
                </span>
                <span className="text-[#D4AF77] font-serif">✦</span>
                <span className="font-body text-xs text-[#641E2B] uppercase tracking-wider">
                  India (IST)
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={scrollToStory}
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#3A211C] text-[#FFF8F0] font-body font-medium text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#641E2B] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Enter Our Story</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              <button
                onClick={scrollToInvitation}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/80 border border-[#D4AF77]/50 text-[#3A211C] font-body font-medium text-xs uppercase tracking-[0.2em] shadow-sm hover:border-[#D4AF77] hover:bg-white transition-all duration-300"
              >
                Open Invitation
              </button>
            </motion.div>
          </div>

          {/* Portrait & 3D Hearts side */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 relative">
            {/* Couple portrait arch container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[280px] sm:w-[320px] md:w-[350px]"
            >
              {/* Outer offset gold arch outline */}
              <div
                className="absolute -inset-3.5 border-2 border-[#D4AF77]/40 rounded-t-full pointer-events-none"
                style={{ transform: "translate(8px, 8px)" }}
              />

              {/* Main portrait frame */}
              <div className="relative rounded-t-full overflow-hidden aspect-[3/4] bg-gradient-to-b from-[#FFFDFB] via-[#F6D6DC]/30 to-[#EBD3B5]/40 shadow-[0_20px_50px_rgba(100,30,43,0.12)] border border-[#D4AF77]/30">
                {heroImg.src ? (
                  <img
                    src={heroImg.src}
                    alt={heroImg.alt}
                    className="w-full h-full object-cover select-none"
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

                {/* Subtle vignette layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A211C]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* 3D Interlocking Hearts Scene (Three.js WebGL canvas) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -top-8 -right-4 sm:right-0 w-44 h-44 sm:w-56 sm:h-56 pointer-events-none"
              style={{ zIndex: 12 }}
            >
              <Canvas
                dpr={quality.dpr}
                gl={{ alpha: true, antialias: true }}
                camera={{ position: [0, 0, 4], fov: 48 }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.9} color="#FFF5EA" />
                <directionalLight position={[3, 5, 3]} intensity={1.6} color="#FFE8D6" />
                <directionalLight position={[-3, 1, -2]} intensity={0.5} color="#F6D6DC" />
                <Suspense fallback={null}>
                  <Environment preset="studio" />
                  <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
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
          className="flex flex-col items-center justify-center gap-1.5 mt-8 cursor-pointer select-none"
          onClick={scrollToStory}
          aria-label="Scroll to discover our wedding story"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-body text-[#3A211C]/50">
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

