import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowUp } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { weddingImages } from "@/config/weddingImages";
import HairlineDivider from "@/components/shared/HairlineDivider";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import confetti from "canvas-confetti";

export default function ClosingSection() {
  const triggerFireworks = () => {
    const count = 220;
    const defaults = {
      origin: { y: 0.65 },
      colors: ["#D4AF77", "#641E2B", "#F6D6DC", "#D9A6A1", "#FFDCC8"]
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToStory = () => {
    document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
  };

  const closingImg = weddingImages.closing;

  return (
    <footer
      id="closing"
      className="relative pt-28 pb-16 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#F9EFE4] to-[#F1DFC9] overflow-hidden text-center"
      aria-label="Final Closing Experience — Ankit & Avani"
    >
      {/* Background warm glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-t from-[#641E2B]/15 via-[#D4AF77]/10 to-transparent rounded-full blur-[110px] pointer-events-none" />

      {/* Floating flower petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: "10px",
              height: "14px",
              borderRadius: "60% 0 60% 0",
              background: i % 2 === 0 ? "rgba(217, 166, 161, 0.45)" : "rgba(212, 175, 119, 0.35)",
              left: `${12 + i * 15}%`,
              bottom: "-20px"
            }}
            animate={{
              y: [0, -600],
              x: [0, i % 2 === 0 ? 40 : -40],
              rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Couple photograph placeholder / frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full mb-8 overflow-hidden border-4 border-white shadow-2xl relative"
        >
          {closingImg.src ? (
            <img
              src={closingImg.src}
              alt={closingImg.alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePlaceholder
              alt={closingImg.alt}
              caption="Ankit & Avani"
              subtitle="Together Always"
              aspect="w-full h-full"
              icon="portrait"
            />
          )}
        </motion.div>

        {/* Monogram Seal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF77]" />
          <span className="text-xs uppercase tracking-[0.3em] font-body font-semibold text-[#641E2B]">
            {weddingConfig.websiteName}
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF77]" />
        </motion.div>

        {/* Prominent Names */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-[#3A211C] mb-3"
        >
          {weddingConfig.groomName} &amp; {weddingConfig.brideName}
        </motion.h2>

        {/* Date Display */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-[#641E2B] font-semibold mb-6"
        >
          26 JANUARY 2027 · {weddingConfig.hashtag}
        </motion.p>

        {/* Required Closing Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-[#3A211C]/85 max-w-xl mx-auto mb-10 leading-snug"
        >
          "{weddingConfig.closingMessage}"
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerFireworks}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF77] via-[#D9A6A1] to-[#641E2B] text-white text-xs uppercase tracking-[0.2em] font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            ✦ Celebrate With Fireworks ✦
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToStory}
            className="px-8 py-4 rounded-full bg-white/90 border border-[#D4AF77]/50 text-[#3A211C] text-xs uppercase tracking-[0.2em] font-semibold shadow-sm hover:bg-white transition-all"
          >
            Return to Our Story
          </motion.button>
        </motion.div>

        <HairlineDivider withDiamond className="my-10" />

        {/* Footer Credit & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-[#3A211C]/60 pt-2">
          <p className="text-center sm:text-left">
            Crafted with boundless love as a personal wedding gift for{" "}
            <span className="font-semibold text-[#641E2B]">
              {weddingConfig.groomName} &amp; {weddingConfig.brideName}
            </span>.
          </p>

          <p className="font-script text-2xl text-[#641E2B]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            AvNit — A Forever Story
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 uppercase tracking-widest text-[#3A211C] hover:text-[#641E2B] font-semibold transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

