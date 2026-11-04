import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { weddingImages } from "@/config/weddingImages";
import { useAdmin } from "@/context/AdminContext";
import HairlineDivider from "@/components/shared/HairlineDivider";
import confetti from "canvas-confetti";

export default function PersonalMessage() {
  const [isBroken, setIsBroken] = useState(false);

  const handleBreakSeal = () => {
    if (!isBroken) {
      setIsBroken(true);
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D4AF77", "#641E2B", "#F6D6DC", "#D9A6A1"]
      });
    }
  };

  const { getPrimarySectionImage } = useAdmin();
  const hasCustomMessage = Boolean(weddingConfig.personalMessage);
  const customBg = getPrimarySectionImage("personalMessage", weddingImages.personalMessage.src);
  const bgImg = {
    ...weddingImages.personalMessage,
    src: customBg
  };

  return (
    <section
      id="message"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#241310] via-[#3A211C] to-[#FFF8F0] overflow-hidden"
      aria-label="A Little Something From Patni Family"
    >
      {/* Background photographic overlay / warm aura */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {bgImg.src ? (
          <img
            src={bgImg.src}
            alt={bgImg.alt}
            className="w-full h-full object-cover filter blur-sm"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, #641E2B 0%, #241310 80%)"
            }}
          />
        )}
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
            <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#D4AF77]">
              From Those Who Love You Most
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-white mb-4"
          >
            A Little Something From Patni Family
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#EBD3B5]/75 font-body text-sm sm:text-base max-w-lg mx-auto"
          >
            A letter written with deepest pride and love for Ankit &amp; Avani. Tap the royal seal to open.
          </motion.p>
        </div>

        {/* Parchment Letter Container */}
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            className="relative bg-gradient-to-b from-[#FFFDFB] via-[#FDF8F3] to-[#FBF3EA] rounded-3xl p-8 sm:p-14 border-2 border-[#D4AF77]/40 shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden"
            layout
          >
            {/* Parchment gold frame insets */}
            <div className="absolute inset-3 border border-[#D4AF77]/25 rounded-2xl pointer-events-none" />
            <div className="absolute inset-5 border border-[#D4AF77]/10 rounded-xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isBroken ? (
                /* SEALED STATE */
                <motion.div
                  key="sealed"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center justify-center text-center select-none"
                >
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBreakSeal}
                    className="relative group mb-6 cursor-pointer"
                    aria-label="Click to break wax seal and read family message"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#641E2B] via-[#4E1420] to-[#D4AF77] shadow-[0_8px_30px_rgba(100,30,43,0.5)] flex items-center justify-center border-4 border-[#FDF8F3]">
                      <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
                        <span className="font-script text-3xl text-white font-bold" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                          A&amp;A
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-white border border-[#D4AF77]/40 text-[10px] uppercase tracking-widest text-[#3A211C] shadow-sm font-semibold">
                      Tap to Break Seal
                    </div>
                  </motion.button>

                  <p className="font-display italic text-2xl text-[#3A211C] mb-1">
                    Sealed with Blessing &amp; Pride
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#641E2B] font-medium font-body">
                    For Ankit &amp; Avani · 2027
                  </p>
                </motion.div>
              ) : (
                /* REVEALED MESSAGE STATE */
                <motion.div
                  key="open"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-left"
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#D4AF77]/20 text-xs font-body">
                    <span className="px-3 py-1 rounded-full bg-[#641E2B]/10 text-[#641E2B] font-semibold uppercase tracking-wider text-[11px]">
                      Seal Opened with Love
                    </span>
                    <span className="text-[#3A211C]/50 uppercase tracking-widest">
                      26 January 2027
                    </span>
                  </div>

                  {/* Salutation */}
                  <h3 className="font-display italic text-3xl sm:text-4xl text-[#3A211C] mb-6">
                    Our Dearest Ankit &amp; Avani,
                  </h3>

                  {/* Body Text (Editable via weddingConfig.personalMessage) */}
                  {hasCustomMessage ? (
                    <p className="font-body text-sm sm:text-base text-[#3A211C]/85 leading-relaxed mb-6 whitespace-pre-line">
                      {weddingConfig.personalMessage}
                    </p>
                  ) : (
                    <div className="space-y-4 font-body text-sm sm:text-base text-[#3A211C]/85 leading-relaxed mb-8">
                      <p>
                        Ankit, seeing you take this sacred step with Avani fills our hearts with pride beyond measure. You have always carried strength, kindness, and deep loyalty — and in Avani, you have found someone whose heart mirrors your own so beautifully.
                      </p>
                      <p>
                        Avani, the moment you joined our lives, our family became complete in a way we never knew we were waiting for. You bring warmth, wisdom, and laughter wherever you go, and we could not be happier to call you our own.
                      </p>
                      <p>
                        May your journey together be blessed with endless shared laughter, quiet evenings filled with peace, unshakeable faith in one another, and a love that deepens with every tomorrow.
                      </p>
                    </div>
                  )}

                  <HairlineDivider className="my-6" />

                  {/* Sign-off */}
                  <div className="text-right pt-2">
                    <p className="font-body text-xs text-[#3A211C]/60 uppercase tracking-widest mb-1">
                      With eternal love, prayers, &amp; blessings,
                    </p>
                    <p className="font-script text-4xl sm:text-5xl text-[#641E2B]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                      {weddingConfig.giftFrom}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-[#3A211C]/40 font-body mt-1">
                      Always &amp; Forever
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

