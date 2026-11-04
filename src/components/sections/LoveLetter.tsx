import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import HairlineDivider from "@/components/shared/HairlineDivider";
import confetti from "canvas-confetti";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D4AF77", "#641E2B", "#F6D6DC", "#D9A6A1"],
      });
    }
  };

  // Check if a custom personal message has been set
  const hasPersonalMessage = Boolean(config.personalMessage);

  return (
    <section
      id="letter"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#F6D6DC]/10 to-[#FFF8F0] overflow-hidden"
      aria-label="A Personal Message — A Little Something From Your Family"
    >
      {/* Background accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: "radial-gradient(ellipse, #F6D6DC 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label text-[#641E2B] tracking-[0.25em] mb-3 text-xs sm:text-sm"
          >
            A Heartfelt Gift
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A211C] mb-4"
          >
            To Ankit & Avani
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/60 font-body text-sm sm:text-base max-w-lg mx-auto"
          >
            A little something from your family. A letter sealed with love, written from the heart. Break the seal to read.
          </motion.p>
        </div>

        {/* Parchment Letter Container */}
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            className="relative bg-gradient-to-b from-[#FFFDFB] via-[#FDF8F3] to-[#FBF3EA] rounded-3xl p-8 sm:p-14 border-2 border-[#D4AF77]/30 shadow-[0_20px_60px_rgba(58,40,35,0.08)] overflow-hidden"
            layout
          >
            {/* Parchment inner border */}
            <div className="absolute inset-3 border border-[#D4AF77]/20 rounded-2xl pointer-events-none" />
            <div className="absolute inset-5 border border-[#D4AF77]/08 rounded-xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isOpen ? (
                /* SEALED STATE */
                <motion.div
                  key="sealed"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  {/* Wax Seal */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenLetter}
                    className="relative group mb-6 cursor-pointer"
                    aria-label="Click to break wax seal and read personal message"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#641E2B] via-[#641E2B]/80 to-[#D4AF77] shadow-[0_8px_30px_rgba(100,30,43,0.4)] flex items-center justify-center border-4 border-[#FDF8F3]">
                      <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
                        <span
                          className="text-3xl text-white"
                          style={{ fontFamily: "'Pinyon Script', cursive" }}
                        >
                          A
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-white/90 border border-[#D4AF77]/30 text-[10px] uppercase tracking-widest text-[#3A211C] shadow-sm">
                      Tap to break seal
                    </div>
                  </motion.button>

                  <p className="font-display italic text-2xl text-[#3A211C] mb-2">
                    Sealed with Love
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#641E2B] font-medium font-body">
                    A Little Something From Your Family · 2027
                  </p>
                </motion.div>
              ) : (
                /* OPEN STATE */
                <motion.div
                  key="open"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="prose prose-stone max-w-none"
                >
                  {/* Broken Seal Header */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D4AF77]/20">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#641E2B]/20 text-[#641E2B] flex items-center justify-center text-xs">
                        ✓
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-[#641E2B] font-medium font-body">
                        Seal Opened
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#3A211C]/50 font-body">
                      26 January 2027
                    </span>
                  </div>

                  {/* Letter Body */}
                  <h3 className="font-display italic text-3xl sm:text-4xl text-[#3A211C] mb-6">
                    My Dearest Ankit & Avani,
                  </h3>

                  {hasPersonalMessage ? (
                    <p className="font-body text-sm sm:text-base text-[#3A211C]/80 leading-relaxed mb-4 whitespace-pre-line">
                      {config.personalMessage}
                    </p>
                  ) : (
                    <>
                      <p className="font-body text-sm sm:text-base text-[#3A211C]/80 leading-relaxed mb-4">
                        Ankit, watching you grow into the wonderful person you are today has been one of the greatest joys of our lives. The love and warmth you carry in your heart is truly remarkable — and in Avani, I see someone who truly deserves every bit of that love in return.
                      </p>
                      <p className="font-body text-sm sm:text-base text-[#3A211C]/80 leading-relaxed mb-4">
                        Avani, from the moment you came into our lives, our family became richer in every way. You are not just Ankit's partner — you are a blessing to all of us, and our home is so much warmer because of your presence.
                      </p>
                      <p className="font-body text-sm sm:text-base text-[#3A211C]/80 leading-relaxed mb-6">
                        May your journey together be filled with laughter that echoes through the years, a love that only grows deeper with every season, and a home that is always full of warmth, joy, and each other.
                      </p>
                    </>
                  )}

                  <HairlineDivider className="my-6" />

                  {/* Sign-off */}
                  <div className="text-right pt-2">
                    <p className="font-body text-xs text-[#3A211C]/60 uppercase tracking-widest mb-1">
                      With endless love & pride,
                    </p>
                    <p
                      className="text-4xl sm:text-5xl text-[#641E2B]"
                      style={{ fontFamily: "'Pinyon Script', cursive" }}
                    >
                      {config.giftFrom}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-[#3A211C]/40 font-body mt-1">
                      Always & Forever
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
