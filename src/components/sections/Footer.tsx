import { motion } from "framer-motion";
import { config } from "@/lib/config";
import HairlineDivider from "@/components/shared/HairlineDivider";
import confetti from "canvas-confetti";

export default function Footer() {
  const triggerFireworks = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#D4AF77", "#641E2B", "#F6D6DC", "#D9A6A1", "#FFDCC8"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
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

  return (
    <footer
      id="footer"
      className="relative pt-24 pb-16 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#F6D6DC]/40 to-[#FFDCC8]/50 overflow-hidden text-center"
      aria-label="Wedding Footer — Ankit & Avani"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-[#641E2B]/10 via-[#D4AF77]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating rose petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              right: `${10 + i * 20}%`,
              bottom: "-10px",
              width: "6px",
              height: "8px",
              borderRadius: "50% 0 50% 0",
              background: `rgba(${217 + i * 5}, ${166 + i * 3}, ${161 - i * 8}, 0.4)`,
            }}
            animate={{
              y: [0, "-110vh"],
              x: [0, (i % 2 === 0 ? 30 : -30)],
              rotate: [0, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Couple photo placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-28 h-28 mx-auto rounded-full mb-8 overflow-hidden border-4 border-white shadow-xl"
          style={{ background: "linear-gradient(135deg, #F6D6DC 0%, #EBD3B5 100%)" }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span
              className="text-3xl text-[#3A211C]/50"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              A&A
            </span>
          </div>
        </motion.div>

        {/* Names */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display italic text-4xl sm:text-6xl text-[#3A211C] mb-2"
        >
          {config.groom} & {config.bride}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl text-[#641E2B] mb-4"
          style={{ fontFamily: "'Pinyon Script', cursive" }}
        >
          {config.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="label text-[#3A211C]/60 tracking-[0.25em] text-xs mb-8"
        >
          26 January 2027 · {config.hashtag}
        </motion.p>

        {/* Closing message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display italic text-xl sm:text-2xl text-[#3A211C]/70 max-w-md mx-auto mb-10"
        >
          "{config.closingMessage}"
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerFireworks}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF77] via-[#EBC4B3] to-[#641E2B] text-white text-xs uppercase tracking-widest font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            ✦ Celebrate with Fireworks ✦
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToStory}
            className="px-8 py-3.5 rounded-full border border-[#D4AF77]/50 text-[#3A211C] text-xs uppercase tracking-widest font-semibold hover:bg-white/60 transition-all"
          >
            Return to Our Story
          </motion.button>
        </motion.div>

        <HairlineDivider withDiamond className="my-10" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-[#3A211C]/60">
          <p className="text-center sm:text-left">
            Crafted with boundless love by{" "}
            <span className="font-semibold text-[#641E2B]">{config.giftFrom}</span>
            {" "}for Ankit &amp; Avani.
          </p>

          <p className="text-center font-display italic text-[#3A211C]/40">
            AvNit — A Forever Story
          </p>

          <button
            onClick={scrollToTop}
            className="uppercase tracking-widest text-[#3A211C] hover:text-[#641E2B] transition-colors flex items-center gap-1 font-medium"
          >
            <span>Back to Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
