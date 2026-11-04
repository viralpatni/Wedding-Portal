import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import HeartsScene from "@/components/3d/HeartsScene";
import { useGyroscope } from "@/hooks/useGyroscope";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { config } from "@/lib/config";
import { weddingImages } from "@/config/weddingImages";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

interface HeroProps {
  guestName?: string;
  gyroscopeEnabled: boolean;
}

/**
 * HERO SECTION — AvNit: A Forever Story
 * Full-bleed cinematic background with 3D hearts, couple portrait & editorial type.
 */
export default function Hero({ guestName, gyroscopeEnabled }: HeroProps) {
  const quality = useAdaptiveQuality();
  const tilt = useGyroscope(gyroscopeEnabled);
  const heroImg = weddingImages.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% -10%, #F6D6DC 0%, #FFF8F0 55%, #FFDCC8 100%)",
      }}
      aria-label="Hero section — Ankit & Avani Wedding"
    >
      {/* Background mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #E9DDF5 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #FFDCC8 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #D4AF77 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Floating rose petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: "-20px",
              width: "8px",
              height: "10px",
              borderRadius: "50% 0 50% 0",
              background: `rgba(${209 + i * 3}, ${166 + i * 4}, ${161 - i * 5}, 0.5)`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, (i % 2 === 0 ? 40 : -40)],
              rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
              opacity: [0, 0.7, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Gold hairline top */}
      <div className="absolute top-0 left-0 right-0 h-px hairline" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">

          {/* LEFT — Typography block */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Guest greeting */}
            {guestName && (
              <motion.p
                className="label text-rose-dark mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Dear {guestName},
              </motion.p>
            )}

            <motion.p
              className="label text-espresso/50 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              AvNit — A Forever Story
            </motion.p>

            {/* Main headline */}
            <motion.h1
              className="headline-xl mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {config.groom}
              <br />
              <span className="text-rose-gradient italic">&</span>
              <br />
              {config.bride}
            </motion.h1>

            {/* Script names */}
            <motion.p
              className="script-name text-4xl md:text-5xl text-rose-dark mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              aria-label="Couple names in decorative script"
            >
              {config.groom} weds {config.bride}
            </motion.p>

            {/* Hairline divider */}
            <motion.div
              className="hairline mb-5 max-w-xs"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Tagline */}
            <motion.p
              className="font-display italic text-xl text-espresso/60 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.8 }}
            >
              "{config.tagline}"
            </motion.p>

            {/* Date */}
            <motion.p
              className="label text-espresso/60 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              26 January 2027 &nbsp;·&nbsp; Republic Day
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a
                href="#story"
                className="pill-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Enter Our Story
              </a>
              <a
                href="#invitation"
                className="pill-btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#invitation")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Invitation
              </a>
            </motion.div>
          </div>

          {/* RIGHT — 3D hearts + arch photo */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            {/* Arch-framed portrait */}
            <motion.div
              className="relative w-[280px] md:w-[320px] lg:w-[360px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Gold offset outline */}
              <div
                className="absolute -inset-3 border border-gold-line/40 arch-frame"
                style={{ transform: "translate(8px, 8px)" }}
              />

              {/* Photo / placeholder */}
              <div
                className="arch-frame w-full aspect-[3/4] overflow-hidden relative"
                style={{
                  background: "linear-gradient(180deg, #EBD3B5 0%, #F6D6DC 100%)",
                }}
              >
                {heroImg.src ? (
                  <img
                    src={heroImg.src}
                    alt={heroImg.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    {/* Decorative SVG */}
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      className="mb-4 opacity-40"
                    >
                      <path
                        d="M24 44C24 44 4 30 4 18C4 11 9 6 16 6C20 6 23 8 24 10C25 8 28 6 32 6C39 6 44 11 44 18C44 30 24 44 24 44Z"
                        stroke="#641E2B"
                        strokeWidth="1.5"
                        fill="rgba(100,30,43,0.08)"
                      />
                    </svg>
                    <p
                      className="text-[#3A211C]/50 mb-1"
                      style={{
                        fontFamily: "'Pinyon Script', cursive",
                        fontSize: "1.6rem",
                      }}
                    >
                      Ankit & Avani
                    </p>
                    <p className="text-[#3A211C]/35 text-[10px] uppercase tracking-widest font-body">
                      Couple Portrait
                    </p>
                  </div>
                )}

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#3A211C]/10 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* 3D Hearts — own small canvas */}
            <motion.div
              className="absolute -top-8 -right-4 md:right-0 w-48 h-48 md:w-64 md:h-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{ zIndex: 5 }}
            >
              <Canvas
                dpr={quality.dpr}
                gl={{ alpha: true, antialias: true }}
                camera={{ position: [0, 0, 4], fov: 50 }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.8} color="#FFF5EA" />
                <directionalLight position={[3, 5, 3]} intensity={1.5} color="#FFE8D6" />
                <directionalLight position={[-3, 1, -2]} intensity={0.4} color="#F6D6DC" />
                <Suspense fallback={null}>
                  <Environment preset="studio" />
                  <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
                    <HeartsScene
                      tiltX={tilt.x}
                      tiltY={tilt.y}
                      scale={0.9}
                    />
                  </Float>
                </Suspense>
              </Canvas>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center mt-8 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          aria-label="Scroll down"
        >
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-rose-gold to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M8 14C8 14 2 9 2 6C2 3.8 4 2 6 2C7 2 7.8 2.5 8 3C8.2 2.5 9 2 10 2C12 2 14 3.8 14 6C14 9 8 14 8 14Z"
              fill="#D9A38F"
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Gold hairline bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px hairline" />
    </section>
  );
}
