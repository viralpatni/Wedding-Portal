import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/config";
import PillButton from "@/components/shared/PillButton";
import HairlineDivider from "@/components/shared/HairlineDivider";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";

export default function ECard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#D4AF77", "#641E2B", "#F6D6DC", "#D9A6A1"],
    });
  };

  const handleDownload = async (format: "png" | "pdf") => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2,
      });

      if (format === "png") {
        const link = document.createElement("a");
        link.download = `${config.groom}-${config.bride}-Wedding-Invitation.png`;
        link.href = dataUrl;
        link.click();
      } else {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [480, 680],
        });
        pdf.addImage(dataUrl, "PNG", 0, 0, 480, 680);
        pdf.save(`${config.groom}-${config.bride}-Wedding-Invitation.pdf`);
      }
    } catch (err) {
      console.error("Failed to export invitation:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `✨ You're cordially invited to the wedding celebration of ${config.groom} & ${config.bride}! 💍\n\n🗓️ Date: 26th January 2027\n📍 Save the date!\n\nView the full interactive wedding experience here: ${window.location.origin}\n\n${config.hashtag}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <section
      id="invitation"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FFF8F0] overflow-hidden"
      aria-label="Digital Wedding Invitation — Ankit & Avani"
    >
      {/* Decorative background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #D9A6A1 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #D4AF77 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="label text-[#641E2B] tracking-[0.25em] mb-3 text-xs sm:text-sm"
        >
          Royal Keepsake
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A211C] mb-4"
        >
          Your Digital Invitation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#3A211C]/60 font-body text-sm sm:text-base max-w-lg mx-auto mb-14"
        >
          Tap the invitation card to flip and view the sacred blessing, or download a high-resolution copy as your keepsake.
        </motion.p>

        {/* 3D Flip Card */}
        <div className="perspective-[1400px] flex justify-center mb-12">
          <motion.div
            ref={cardRef}
            onClick={handleCardClick}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] aspect-[1/1.42] cursor-pointer preserve-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* FRONT */}
            <div
              className={`absolute inset-0 rounded-[32px] p-8 sm:p-10 flex flex-col items-center justify-between border-2 border-[#D4AF77]/50 shadow-[0_20px_50px_rgba(100,30,43,0.15)] backface-hidden ${
                isFlipped ? "pointer-events-none" : ""
              }`}
              style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(145deg, #FFFDFB 0%, #FDF6F0 50%, #F7EAE1 100%)",
              }}
            >
              <div className="absolute inset-3 border border-[#D4AF77]/30 rounded-[24px] pointer-events-none" />
              <div className="absolute inset-5 border border-[#D4AF77]/10 rounded-[20px] pointer-events-none" />

              {/* Top monogram */}
              <div className="pt-2 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#D4AF77] via-[#EBC4B3] to-[#641E2B] shadow-md flex items-center justify-center text-white mb-3">
                  <span
                    className="text-3xl text-white"
                    style={{ fontFamily: "'Pinyon Script', cursive" }}
                  >
                    A&A
                  </span>
                </div>
                <p className="label text-[#641E2B] tracking-[0.3em] text-[10px]">
                  With The Blessings of Elders
                </p>
              </div>

              {/* Center content */}
              <div className="text-center my-auto">
                <p className="font-body text-xs text-[#3A211C]/60 uppercase tracking-widest mb-4">
                  {config.invitationMessage}
                </p>

                <h3 className="font-display italic text-4xl sm:text-5xl text-[#3A211C] leading-none mb-2">
                  {config.groom}
                </h3>
                <p
                  className="text-3xl text-[#641E2B] my-1"
                  style={{ fontFamily: "'Pinyon Script', cursive" }}
                >
                  &
                </p>
                <h3 className="font-display italic text-4xl sm:text-5xl text-[#3A211C] leading-none mb-4">
                  {config.bride}
                </h3>

                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent mx-auto mb-4" />

                <p className="font-body text-xs text-[#3A211C]/70 uppercase tracking-widest">
                  At Their Wedding Ceremony
                </p>
              </div>

              {/* Bottom date */}
              <div className="text-center pb-2">
                <p className="font-display italic text-xl text-[#3A211C] mb-1">
                  Tuesday, 26 January 2027
                </p>
                <p className="text-[11px] uppercase tracking-widest text-[#641E2B] font-medium font-body mb-3">
                  India
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 border border-[#D4AF77]/30 text-[10px] text-[#3A211C]/70 uppercase tracking-widest">
                  <span>↻</span>
                  <span>Tap to flip card</span>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div
              className={`absolute inset-0 rounded-[32px] p-8 sm:p-10 flex flex-col items-center justify-between border-2 border-[#D4AF77]/50 shadow-[0_20px_50px_rgba(100,30,43,0.15)] backface-hidden ${
                !isFlipped ? "pointer-events-none" : ""
              }`}
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(145deg, #FFF8F0 0%, #F6D6DC 55%, #FFDCC8 100%)",
              }}
            >
              <div className="absolute inset-3 border border-[#D4AF77]/30 rounded-[24px] pointer-events-none" />

              {/* Auspicious header */}
              <div className="pt-2 text-center">
                <p className="font-display italic text-lg sm:text-xl text-[#641E2B] mb-1">
                  ॥ ॐ श्री गणेशाय नमः ॥
                </p>
                <p className="font-body text-[11px] text-[#3A211C]/70 italic leading-relaxed max-w-xs mx-auto">
                  "May the divine blessings of the universe grace this sacred union with eternal love, peace, and happiness."
                </p>
              </div>

              {/* Central message */}
              <div className="my-auto text-center px-2">
                <p
                  className="text-3xl sm:text-4xl text-[#3A211C] mb-3"
                  style={{ fontFamily: "'Pinyon Script', cursive" }}
                >
                  Two Hearts, One Forever
                </p>
                <p className="font-body text-xs text-[#3A211C]/80 leading-relaxed mb-4">
                  We invite you to share our joy, dance to our rhythms, and shower your warmest blessings upon Ankit and Avani as their forever unfolds.
                </p>
                <div className="w-16 h-px bg-[#D4AF77]/50 mx-auto mb-3" />
                <p className="label text-[#641E2B] text-[10px]">
                  {config.tagline}
                </p>
              </div>

              {/* Footer */}
              <div className="text-center pb-2">
                <p className="label text-[#3A211C]/60 text-[10px] mb-1">
                  Share the love
                </p>
                <p className="font-body font-semibold text-xs text-[#3A211C] tracking-widest mb-3">
                  {config.hashtag}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 border border-[#D4AF77]/30 text-[10px] text-[#3A211C]/70 uppercase tracking-widest">
                  <span>↻</span>
                  <span>Tap to flip front</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PillButton
            variant="gold"
            onClick={() => handleDownload("png")}
            disabled={isDownloading}
            icon="⬇"
          >
            {isDownloading ? "Generating…" : "Download Card (PNG)"}
          </PillButton>

          <PillButton
            variant="ghost"
            onClick={() => handleDownload("pdf")}
            disabled={isDownloading}
            icon="📄"
          >
            Save as PDF
          </PillButton>

          <PillButton variant="primary" onClick={handleWhatsAppShare} icon="💬">
            Share on WhatsApp
          </PillButton>
        </div>
      </div>
    </section>
  );
}
