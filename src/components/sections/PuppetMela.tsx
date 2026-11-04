import { useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import PillButton from "@/components/shared/PillButton";
import { config } from "@/lib/config";

export default function PuppetMela() {
  const [danceState, setDanceState] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Procedural Web Audio Synthesizer for Authentic Indian Dhol Drum Beats
  const playDholSound = (type: "bass" | "treble" | "flourish") => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;

      if (type === "bass") {
        // Low warm dhol drum fundamental
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "treble") {
        // Sharp metallic rim / wood tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else {
        // Fast festive flourish
        for (let i = 0; i < 3; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(140 + i * 40, now + i * 0.08);
          osc.frequency.exponentialRampToValueAtTime(60, now + i * 0.08 + 0.15);
          gain.gain.setValueAtTime(0.5, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.2);
        }
      }
    } catch {
      // AudioContext not supported
    }

    setDanceState((prev) => prev + 1);

    // Auspicious Marigold & Rose gold confetti burst
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#F9E07A", "#FFDCC8", "#D9A38F", "#B76E79", "#EBD3B5"],
    });
  };

  return (
    <section
      id="mela"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FBF7F2] overflow-hidden"
      aria-label="Puppet Mela Celebration"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="label text-[#B76E79] tracking-[0.25em] mb-3 text-xs sm:text-sm"
        >
          Folk Traditions &amp; Joy
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A2823] mb-4"
        >
          The Royal Puppet Mela
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#3A2823]/60 font-body text-sm sm:text-base max-w-xl mx-auto mb-14"
        >
          A joyful celebration of traditional Indian wedding folklore. Tap the Dhol drum beats to make {config.groom} &amp; {config.bride} dance with marigold confetti!
        </motion.p>

        {/* Interactive Puppet Stage */}
        <div className="relative max-w-2xl mx-auto bg-gradient-to-b from-[#F6D6DC]/30 via-white/80 to-[#FFDCC8]/30 rounded-3xl p-8 sm:p-12 border border-[#B8935A]/30 shadow-xl overflow-hidden mb-12">
          {/* Stage Toran / Garland Garland Banner */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="text-xl sm:text-2xl animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                🏵️
              </span>
            ))}
          </div>

          {/* Dancing Puppets Row */}
          <div className="flex items-center justify-around gap-6 py-6">
            {/* Groom Puppet */}
            <motion.div
              animate={{
                y: [0, -14, 0],
                rotate: danceState % 2 === 0 ? [-3, 4, -3] : [4, -3, 4],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => playDholSound("bass")}
            >
              {/* Puppet String */}
              <div className="w-px h-12 bg-[#B8935A]/40 mb-1" />
              {/* Turban & Face */}
              <div className="w-20 h-20 rounded-full bg-[#EBD3B5] border-2 border-[#D9A38F] shadow-md flex flex-col items-center justify-center relative">
                {/* Royal Safa / Turban */}
                <div className="absolute -top-4 w-22 h-8 rounded-full bg-gradient-to-r from-[#D9A38F] to-[#B76E79] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  👑
                </div>
                <span className="text-2xl mt-1">🤵</span>
              </div>
              <p className="script-name text-2xl text-[#3A2823] mt-2">{config.groom}</p>
              <span className="label text-[10px] text-[#B76E79]">The Groom</span>
            </motion.div>

            {/* Center Dhol Drum Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playDholSound("flourish")}
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#D9A38F] via-[#FFDCC8] to-[#B76E79] shadow-lg border-2 border-white flex flex-col items-center justify-center text-white cursor-pointer group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                🥁
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold mt-1 text-[#3A2823]">
                Hit Beat
              </span>
            </motion.div>

            {/* Bride Puppet */}
            <motion.div
              animate={{
                y: [0, -14, 0],
                rotate: danceState % 2 === 0 ? [3, -4, 3] : [-4, 3, -4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => playDholSound("treble")}
            >
              <div className="w-px h-12 bg-[#B8935A]/40 mb-1" />
              <div className="w-20 h-20 rounded-full bg-[#EBD3B5] border-2 border-[#B76E79] shadow-md flex flex-col items-center justify-center relative">
                <div className="absolute -top-4 w-22 h-8 rounded-full bg-gradient-to-r from-[#B76E79] to-[#F6D6DC] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  🌸
                </div>
                <span className="text-2xl mt-1">👰</span>
              </div>
              <p className="script-name text-2xl text-[#3A2823] mt-2">{config.bride}</p>
              <span className="label text-[10px] text-[#B76E79]">The Bride</span>
            </motion.div>
          </div>

          {/* Beat Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-6 border-t border-[#B8935A]/20">
            <button
              onClick={() => playDholSound("bass")}
              className="px-4 py-2 rounded-full bg-white/80 border border-[#B8935A]/30 text-xs font-body font-medium uppercase tracking-wider text-[#3A2823] hover:bg-[#3A2823] hover:text-[#FBF7F2] transition-colors"
            >
              🥁 Bass Beat (Dha!)
            </button>
            <button
              onClick={() => playDholSound("treble")}
              className="px-4 py-2 rounded-full bg-white/80 border border-[#B8935A]/30 text-xs font-body font-medium uppercase tracking-wider text-[#3A2823] hover:bg-[#3A2823] hover:text-[#FBF7F2] transition-colors"
            >
              🥢 Rim Tap (Na!)
            </button>
            <button
              onClick={() => playDholSound("flourish")}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D9A38F] to-[#B76E79] text-white text-xs font-body font-medium uppercase tracking-wider hover:brightness-105 transition-all shadow-sm"
            >
              ✨ Full Dhol Roll &amp; Confetti
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
