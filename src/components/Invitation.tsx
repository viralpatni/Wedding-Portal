import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
  Download,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { useAdmin } from "@/context/AdminContext";
import PillButton from "@/components/shared/PillButton";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 250 : -250,
    opacity: 0,
    scale: 0.96
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.35 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 250 : -250,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 }
    }
  })
};

export default function Invitation() {
  const { invitationPages, invitationConfig } = useAdmin();

  // Envelope interactive sequence state:
  // 0: Closed envelope (appears)
  // 1: Flap opening
  // 2: Card emerging
  // 3: Full card reading view
  const [envelopeStage, setEnvelopeStage] = useState<0 | 1 | 2 | 3>(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const printableCardRef = useRef<HTMLDivElement>(null);

  const totalPages = invitationPages.length;
  const currentPage = invitationPages[pageIndex] || invitationPages[0];

  const handleOpenEnvelope = () => {
    if (envelopeStage !== 0) return;

    // Step 1: Flap opens
    setEnvelopeStage(1);

    // Step 2: Card emerges
    setTimeout(() => {
      setEnvelopeStage(2);
    }, 600);

    // Step 3: Card is fully open for reading
    setTimeout(() => {
      setEnvelopeStage(3);
      confetti({
        particleCount: 40,
        spread: 65,
        origin: { y: 0.55 },
        colors: ["#D4AF77", "#641E2B", "#D9A6A1", "#F6D6DC", "#FFF8F0"]
      });
    }, 1300);
  };

  const handleCloseEnvelope = () => {
    setEnvelopeStage(0);
    setPageIndex(0);
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setSlideDirection(-1);
      setPageIndex((p) => p - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setSlideDirection(1);
      setPageIndex((p) => p + 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async (format: "png" | "pdf") => {
    if (!printableCardRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(printableCardRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: 2.5
      });

      if (format === "png") {
        const link = document.createElement("a");
        link.download = `Ankit-and-Avani-Wedding-Invitation-Page-${pageIndex + 1}.png`;
        link.href = dataUrl;
        link.click();
      } else {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [480, 680]
        });
        pdf.addImage(dataUrl, "PNG", 0, 0, 480, 680);
        pdf.save(`Ankit-and-Avani-Wedding-Invitation-Page-${pageIndex + 1}.pdf`);
      }
    } catch (err) {
      console.error("Failed to export invitation:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `✨ With immense joy and love, we invite you to celebrate the wedding of ${invitationConfig.groomName} & ${invitationConfig.brideName}! 💍\n\n🗓️ Date: 26th January 2027\n\nView the full interactive invitation here:\n${window.location.origin}#invitation\n\n${invitationConfig.hashtag}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <section
      id="invitation"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FFF8F0] overflow-hidden"
      aria-label="Interactive 3D Wedding Invitation"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-3xl opacity-25 bg-[#D4AF77]" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 bg-[#641E2B]" />

      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
            <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#641E2B]">
              The Sacred Invitation
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A211C] mb-4"
          >
            Royal Wedding Card
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            Tap the golden royal seal to break the envelope and unveil the sacred ceremony details.
          </motion.p>
        </div>

        {/* 3D Envelope & Unfolding Sequence Container */}
        <div className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center mb-12">
          {/* STAGE 0, 1, 2: Interactive 3D Envelope */}
          {envelopeStage < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] cursor-pointer group"
              onClick={handleOpenEnvelope}
              role="button"
              tabIndex={0}
              aria-label="Click to open wedding invitation envelope"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOpenEnvelope();
                }
              }}
            >
              {/* Envelope Body */}
              <div
                className="relative w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(58,33,28,0.22)] overflow-hidden flex flex-col justify-between p-6 sm:p-8"
                style={{
                  background: "linear-gradient(135deg, #641E2B 0%, #4E1420 50%, #3A0F17 100%)",
                  border: "2px solid #D4AF77"
                }}
              >
                {/* Gold filigree corners */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF77]/60 pointer-events-none" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF77]/60 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF77]/60 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF77]/60 pointer-events-none" />

                {/* Animated Top Flap (Flips open on click) */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/2 origin-top pointer-events-none"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #7A2434 0%, #641E2B 100%)",
                    borderBottom: "1px solid #D4AF77"
                  }}
                  animate={
                    envelopeStage >= 1
                      ? { rotateX: 180, zIndex: 0, opacity: 0.3 }
                      : { rotateX: 0, zIndex: 20, opacity: 1 }
                  }
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Card emerging from envelope */}
                {envelopeStage >= 2 && (
                  <motion.div
                    initial={{ y: 0, scale: 0.9, opacity: 0.8 }}
                    animate={{ y: -70, scale: 0.98, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-6 top-6 h-5/6 rounded-xl bg-[#FFFDFB] border border-[#D4AF77] shadow-2xl z-10 p-6 flex flex-col items-center justify-center text-center"
                  >
                    <p className="font-display italic text-lg text-[#641E2B] mb-1">
                      {currentPage?.title || "॥ ॐ श्री गणेशाय नमः ॥"}
                    </p>
                    <h4 className="font-display italic text-2xl text-[#3A211C]">
                      {invitationConfig.groomName} &amp; {invitationConfig.brideName}
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-[#D4AF77] mt-2">
                      Unfolding Sacred Invitation...
                    </p>
                  </motion.div>
                )}

                {/* Wax Seal with Gold Ribbon on Front Flap */}
                <div className="relative z-30 mx-auto my-auto flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF77] via-[#EBD3B5] to-[#B8935A] shadow-[0_4px_20px_rgba(212,175,119,0.5)] border-2 border-white flex items-center justify-center"
                  >
                    <span className="font-script text-2xl text-[#641E2B] font-bold" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                      AvNit
                    </span>
                  </motion.div>

                  <span className="mt-3 px-3.5 py-1 rounded-full bg-[#3A0F17]/90 text-[10px] uppercase tracking-[0.2em] font-body text-[#D4AF77] border border-[#D4AF77]/40 shadow-sm font-semibold">
                    Tap to Open Envelope
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: Full Open Invitation Card with Interactive Multi-Page Slider */}
          <AnimatePresence>
            {envelopeStage === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-lg"
              >
                {/* Close Button at top corner */}
                <button
                  onClick={handleCloseEnvelope}
                  className="absolute -top-4 -right-4 z-40 w-9 h-9 rounded-full bg-[#3A211C] text-white flex items-center justify-center shadow-lg hover:bg-[#641E2B] transition-colors cursor-pointer"
                  aria-label="Close invitation and re-seal envelope"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Multi-Page Slider Navigation Header (if > 1 page) */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mb-3 px-2 text-xs font-body">
                    <span className="px-3 py-1 rounded-full bg-[#641E2B]/10 text-[#641E2B] font-semibold uppercase tracking-wider text-[11px]">
                      Ceremony Card {pageIndex + 1} of {totalPages}
                    </span>

                    {/* Left / Right Slider Arrows */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handlePrevPage}
                        disabled={pageIndex === 0}
                        className="p-1.5 rounded-full bg-white border border-[#D4AF77]/50 text-[#3A211C] hover:bg-[#D4AF77]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                        aria-label="Previous invitation page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex gap-1 px-1">
                        {invitationPages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSlideDirection(i > pageIndex ? 1 : -1);
                              setPageIndex(i);
                            }}
                            className={`h-2 rounded-full transition-all ${
                              pageIndex === i
                                ? "bg-[#641E2B] w-5"
                                : "bg-[#D4AF77]/40 w-2 hover:bg-[#D4AF77]"
                            }`}
                            aria-label={`Go to page ${i + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={handleNextPage}
                        disabled={pageIndex === totalPages - 1}
                        className="p-1.5 rounded-full bg-white border border-[#D4AF77]/50 text-[#3A211C] hover:bg-[#D4AF77]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                        aria-label="Next invitation page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Slider Animated Card Container */}
                <div className="relative overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(100,30,43,0.18)]">
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={currentPage?.id || pageIndex}
                      custom={slideDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      ref={printableCardRef}
                      className="relative rounded-3xl p-8 sm:p-12 text-center border-2 border-[#D4AF77]"
                      style={{
                        background: "linear-gradient(145deg, #FFFDFB 0%, #FDF7F1 50%, #F8EFE5 100%)"
                      }}
                    >
                      {/* Ornate Gold Frame Inset */}
                      <div className="absolute inset-3 border border-[#D4AF77]/35 rounded-2xl pointer-events-none" />
                      <div className="absolute inset-5 border border-[#D4AF77]/15 rounded-xl pointer-events-none" />

                      {/* Auspicious Invocation / Page Title */}
                      <div className="pt-2 mb-4">
                        <p className="font-display italic text-xl sm:text-2xl text-[#641E2B] mb-1">
                          {currentPage?.title || "॥ ॐ श्री गणेशाय नमः ॥"}
                        </p>
                        <p className="label text-[#D4AF77] text-[9px] sm:text-[10px] tracking-[0.3em]">
                          {currentPage?.subtitle || "With The Blessings of Elders & The Patni Family"}
                        </p>
                      </div>

                      {/* Main Invitation Wording */}
                      <div className="my-5">
                        <p className="font-body text-xs sm:text-sm text-[#3A211C]/80 uppercase tracking-widest leading-relaxed mb-4 max-w-md mx-auto">
                          {currentPage?.introMessage || invitationConfig.invitationMessage}
                        </p>

                        <h3 className="font-display italic text-4xl sm:text-5xl text-[#3A211C] leading-none mb-2">
                          {invitationConfig.groomName}
                        </h3>
                        <p
                          className="text-3xl sm:text-4xl text-[#641E2B] my-1"
                          style={{ fontFamily: "'Pinyon Script', cursive" }}
                        >
                          &amp;
                        </p>
                        <h3 className="font-display italic text-4xl sm:text-5xl text-[#3A211C] leading-none mb-5">
                          {invitationConfig.brideName}
                        </h3>

                        <div className="w-28 h-px bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent mx-auto mb-4" />

                        <p className="font-body text-xs sm:text-sm text-[#3A211C]/70 uppercase tracking-[0.2em] mb-1">
                          To Celebrate Their Sacred Wedding Vows
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-2 py-4 border-y border-[#D4AF77]/20 my-5 text-xs sm:text-sm font-body text-[#3A211C]">
                        <p className="font-display italic text-2xl text-[#3A211C]">
                          {currentPage?.eventDate || "Tuesday, 26 January 2027"}
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-[#641E2B] font-semibold">
                          Time: {currentPage?.time || invitationConfig.weddingTime || "Details Coming Soon"}
                        </p>
                        <p className="text-[#3A211C]/80 font-medium">
                          Venue: {currentPage?.venue || invitationConfig.venue || "The Royal Grand Heritage Palace"}
                        </p>
                        <p className="text-[#3A211C]/60 text-xs">
                          {currentPage?.address || invitationConfig.address || "Jaipur, Rajasthan"}
                        </p>
                        {currentPage?.dressCode && (
                          <p className="text-[#641E2B] text-[11px] uppercase tracking-wider font-semibold pt-1">
                            Dress Code: {currentPage.dressCode}
                          </p>
                        )}
                        {currentPage?.customNote && (
                          <p className="text-[#3A211C]/60 text-[11px] italic">
                            {currentPage.customNote}
                          </p>
                        )}
                      </div>

                      {/* Closing couple blessing */}
                      <div className="pt-2">
                        <p className="font-script text-2xl sm:text-3xl text-[#641E2B]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                          "{invitationConfig.tagline}"
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#3A211C]/50 mt-1 font-body">
                          {invitationConfig.hashtag}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls: Print, PNG Download, PDF Save, WhatsApp */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PillButton
            variant="gold"
            onClick={() => handleDownload("png")}
            disabled={isDownloading}
            icon={<Download className="w-4 h-4" />}
          >
            {isDownloading ? "Preparing Card..." : "Download Card (PNG)"}
          </PillButton>

          <PillButton
            variant="ghost"
            onClick={() => handleDownload("pdf")}
            disabled={isDownloading}
            icon={<Download className="w-4 h-4" />}
          >
            Save as PDF
          </PillButton>

          <PillButton
            variant="ghost"
            onClick={handlePrint}
            icon={<Printer className="w-4 h-4" />}
          >
            Print Card
          </PillButton>

          <PillButton
            variant="primary"
            onClick={handleWhatsAppShare}
            icon={<Share2 className="w-4 h-4" />}
          >
            Share on WhatsApp
          </PillButton>
        </div>
      </div>
    </section>
  );
}
