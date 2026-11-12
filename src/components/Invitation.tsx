import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
  Download,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass
} from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { useAdmin } from "@/context/AdminContext";
import PillButton from "@/components/shared/PillButton";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, language } = useLanguage();

  // Envelope interactive sequence state:
  // Default to 3 (Open Royal Arched Card View as in Reference Video 2)
  // Can be toggled to 0 (Sealed Envelope) and reopened
  const [envelopeStage, setEnvelopeStage] = useState<0 | 1 | 2 | 3>(3);
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

      {/* =================================================================== */}
      {/* ILLUSTRATED INDIAN TEMPLE / PALACE BACKDROP (REFERENCE VIDEO 2)      */}
      {/* =================================================================== */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Top Decorative Toran: Hanging Brass Temple Bells & Flower Garlands */}
        <div className="absolute top-0 inset-x-0 z-10 flex justify-between px-4 sm:px-16 pointer-events-none">
          {[0.05, 0.25, 0.5, 0.75, 0.95].map((pos, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center origin-top"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{
                duration: 3.2 + idx * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.3
              }}
            >
              {/* Golden hanging thread */}
              <div className="w-px h-12 sm:h-20 bg-gradient-to-b from-[#D4AF77] to-[#B8935A]" />
              {/* Marigold / Lotus Bud Bead */}
              <div className="w-3 h-3 rounded-full bg-[#F59E0B] border border-[#D4AF77] shadow-sm" />
              {/* Traditional Temple Ghanti (Bell) */}
              <svg width="24" height="26" viewBox="0 0 24 26" className="text-[#D4AF77] drop-shadow-md">
                <path d="M12 2 C8 2 7 8 5 15 L19 15 C17 8 16 2 12 2 Z" fill="#D4AF77" stroke="#9A7030" strokeWidth="1" />
                <rect x="4" y="15" width="16" height="3" rx="1.5" fill="#B8935A" />
                <circle cx="12" cy="21" r="2.5" fill="#641E2B" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Illustrated Temple Sanctum & Grand Staircase Silhouette in Golden Tones */}
        <div className="absolute inset-x-0 bottom-0 h-[480px] opacity-[0.14]">
          <svg viewBox="0 0 1440 600" className="w-full h-full text-[#641E2B]" fill="currentColor" preserveAspectRatio="none">
            {/* Distant Royal Mountain Silhouettes */}
            <path d="M0 450 Q360 300 720 400 Q1080 320 1440 450 L1440 600 L0 600 Z" opacity="0.3" fill="#B8935A" />
            {/* Grand Indian Temple with Tiered Shikhara & Fluttering Flag */}
            <path d="M720 40 L700 120 L660 180 L640 320 L800 320 L780 180 L740 120 Z" fill="#D4AF77" opacity="0.5" />
            <line x1="720" y1="40" x2="720" y2="10" stroke="#641E2B" strokeWidth="3" />
            {/* Saffron Flag (Dhwaja) */}
            <polygon points="720,10 755,20 720,30" fill="#EA580C" />
            {/* Side Temple Mandapa Domes */}
            <ellipse cx="560" cy="280" rx="90" ry="60" fill="#D4AF77" opacity="0.4" />
            <ellipse cx="880" cy="280" rx="90" ry="60" fill="#D4AF77" opacity="0.4" />
            {/* Grand Marble Staircase leading to Temple */}
            <path d="M500 480 L940 480 L980 600 L460 600 Z" fill="#FFFDF8" opacity="0.6" stroke="#D4AF77" strokeWidth="2" />
            {/* Stair Steps */}
            <line x1="490" y1="510" x2="950" y2="510" stroke="#D4AF77" strokeWidth="1.5" />
            <line x1="480" y1="540" x2="960" y2="540" stroke="#D4AF77" strokeWidth="1.5" />
            <line x1="470" y1="570" x2="970" y2="570" stroke="#D4AF77" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Left Side Peacock on Stone Pedestal */}
        <div className="hidden lg:block absolute bottom-12 left-8 xl:left-20 w-36 h-48 opacity-75">
          <svg viewBox="0 0 120 160" className="w-full h-full">
            {/* Stone Urn Pedestal */}
            <rect x="35" y="100" width="50" height="50" rx="4" fill="#EBD3B5" stroke="#D4AF77" strokeWidth="1.5" />
            <path d="M40 100 Q60 85 80 100" fill="#F59E0B" />
            {/* Peacock Body & Tail */}
            <path d="M60 40 C70 30 85 45 75 70 C70 85 65 95 60 100 C55 95 50 85 55 70 Z" fill="#0284C7" />
            <circle cx="68" cy="35" r="7" fill="#0369A1" />
            <circle cx="70" cy="33" r="1.5" fill="#FFFFFF" />
            <path d="M74 36 L84 38 L74 41 Z" fill="#D97706" />
            {/* Crest on head */}
            <path d="M68 28 Q72 20 75 18 M68 28 Q68 18 68 16 M68 28 Q64 20 62 18" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
            {/* Feathers with Mor-Pankh eye pattern */}
            <ellipse cx="50" cy="80" rx="14" ry="24" fill="#059669" opacity="0.8" transform="rotate(-20 50 80)" />
            <circle cx="48" cy="78" r="4" fill="#0284C7" />
            <circle cx="48" cy="78" r="2" fill="#F59E0B" />
          </svg>
        </div>

        {/* Right Side Peacock on Stone Pedestal */}
        <div className="hidden lg:block absolute bottom-12 right-8 xl:right-20 w-36 h-48 opacity-75 -scale-x-100">
          <svg viewBox="0 0 120 160" className="w-full h-full">
            <rect x="35" y="100" width="50" height="50" rx="4" fill="#EBD3B5" stroke="#D4AF77" strokeWidth="1.5" />
            <path d="M40 100 Q60 85 80 100" fill="#F59E0B" />
            <path d="M60 40 C70 30 85 45 75 70 C70 85 65 95 60 100 C55 95 50 85 55 70 Z" fill="#0284C7" />
            <circle cx="68" cy="35" r="7" fill="#0369A1" />
            <circle cx="70" cy="33" r="1.5" fill="#FFFFFF" />
            <path d="M74 36 L84 38 L74 41 Z" fill="#D97706" />
            <path d="M68 28 Q72 20 75 18 M68 28 Q68 18 68 16 M68 28 Q64 20 62 18" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="50" cy="80" rx="14" ry="24" fill="#059669" opacity="0.8" transform="rotate(-20 50 80)" />
            <circle cx="48" cy="78" r="4" fill="#0284C7" />
            <circle cx="48" cy="78" r="2" fill="#F59E0B" />
          </svg>
        </div>
      </div>

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
            {t("invitationSubtitle")}
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
              className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[4/3] cursor-pointer group px-2 sm:px-0"
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
                    className="absolute inset-x-4 sm:inset-x-6 top-6 h-5/6 rounded-xl bg-[#FFFDFB] border border-[#D4AF77] shadow-2xl z-10 p-4 sm:p-6 flex flex-col items-center justify-center text-center"
                  >
                    <p className="font-display italic text-base sm:text-lg text-[#641E2B] mb-1">
                      {currentPage?.title || "॥ ॐ श्री गणेशाय नमः ॥"}
                    </p>
                    <h4 className="font-display italic text-xl sm:text-2xl text-[#3A211C]">
                      {invitationConfig.groomName} &amp; {invitationConfig.brideName}
                    </h4>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D4AF77] mt-2">
                      {t("unfoldingCard")}
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
                    {t("tapToOpen")}
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
                className="relative w-full max-w-lg px-2 sm:px-0"
              >
                {/* Close Button at top corner */}
                <button
                  onClick={handleCloseEnvelope}
                  className="absolute -top-3 right-1 sm:-top-4 sm:-right-4 z-40 w-9 h-9 rounded-full bg-[#3A211C] text-white flex items-center justify-center shadow-lg hover:bg-[#641E2B] transition-colors cursor-pointer"
                  aria-label="Close invitation and re-seal envelope"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Multi-Page Slider Navigation Header (if > 1 page) */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2 text-xs font-body">
                    <span className="px-3 py-1 rounded-full bg-[#641E2B]/10 text-[#641E2B] font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
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
                <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[200px] rounded-b-3xl shadow-[0_25px_60px_rgba(100,30,43,0.18)]">
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={currentPage?.id || pageIndex}
                      custom={slideDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      ref={printableCardRef}
                      className="relative rounded-t-[140px] sm:rounded-t-[200px] rounded-b-3xl p-6 sm:p-10 md:p-12 text-center border-2 border-[#D4AF77]"
                      style={{
                        background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F3 40%, #FDF4EC 100%)"
                      }}
                    >
                      {/* Ornate Gold Frame Inset */}
                      <div className="absolute inset-2 sm:inset-3 border border-[#D4AF77]/40 rounded-t-[132px] sm:rounded-t-[192px] rounded-b-2xl pointer-events-none" />
                      <div className="absolute inset-3.5 sm:inset-5 border border-dashed border-[#D4AF77]/25 rounded-t-[125px] sm:rounded-t-[185px] rounded-b-xl pointer-events-none" />

                      {/* Sacred Lord Ganesha Icon & Sanskrit Shloka from Video 2 */}
                      <div className="pt-4 sm:pt-6 mb-3 flex flex-col items-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#FFFDF8] to-[#F5E6CC] border border-[#D4AF77] shadow-sm flex items-center justify-center p-2 mb-2">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-[#B8935A]">
                            <circle cx="50" cy="50" r="46" fill="none" stroke="#D4AF77" strokeWidth="2" strokeDasharray="3 3" />
                            <polygon points="50,15 42,28 58,28" fill="#D4AF77" stroke="#641E2B" strokeWidth="1" />
                            <ellipse cx="32" cy="42" rx="10" ry="14" fill="#EBD3B5" stroke="#D4AF77" strokeWidth="1.5" />
                            <ellipse cx="68" cy="42" rx="10" ry="14" fill="#EBD3B5" stroke="#D4AF77" strokeWidth="1.5" />
                            <ellipse cx="50" cy="45" rx="14" ry="15" fill="#FFF8F0" stroke="#D4AF77" strokeWidth="1.5" />
                            <path d="M50 48 Q50 72 58 74 Q63 74 62 68 Q58 68 56 52" fill="#D4AF77" stroke="#641E2B" strokeWidth="1" />
                            <path d="M50 32 L50 42 M46 36 Q50 40 54 36" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" fill="none" />
                            <circle cx="50" cy="38" r="1.5" fill="#F59E0B" />
                            <circle cx="65" cy="65" r="4" fill="#F59E0B" stroke="#D4AF77" strokeWidth="1" />
                          </svg>
                        </div>

                        <p className="font-display italic text-base sm:text-lg text-[#641E2B] font-semibold tracking-wide">
                          ॥ श्री गणेशाय नमः ॥
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#B8935A] font-serif tracking-wider italic mt-0.5 max-w-sm px-2">
                          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                        </p>
                      </div>

                      {/* Auspicious Invocation / Page Title */}
                      <div className="mb-3">
                        <p className="font-display italic text-xl sm:text-2xl text-[#641E2B] mb-0.5">
                          {currentPage?.title || "॥ ॐ श्री गणेशाय नमः ॥"}
                        </p>
                        <p className="label text-[#D4AF77] text-[9px] sm:text-[10px] tracking-[0.3em]">
                          {currentPage?.subtitle || "With The Blessings of Elders & The Patni Family"}
                        </p>
                      </div>

                      {/* Main Invitation Wording & Family Blessing */}
                      <div className="my-4">
                        <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#641E2B] font-bold mb-1.5">
                          Smt. &amp; Shri Patni
                        </p>
                        <p className="font-body text-xs sm:text-sm text-[#3A211C]/80 uppercase tracking-widest leading-relaxed mb-4 max-w-md mx-auto">
                          {currentPage?.introMessage || "With joy and the blessings of our elders, we invite you to celebrate the wedding ceremonies of their beloved"}
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
                          {t("sacredVows")}
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

                        {/* Venue Directions on Geoapify Map button */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => window.open("/venue-directions", "_blank")}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF77] via-[#B8935A] to-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5 text-[#FFF8F0]" />
                            <span>{language === "hi" ? "विवाह स्थल मार्ग एवं दिशा-निर्देश (मानचित्र)" : "Venue Directions on Map ✦"}</span>
                          </button>
                        </div>
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

        {/* Action Controls: Venue Directions, Print, PNG Download, PDF Save, WhatsApp */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PillButton
            variant="gold"
            onClick={() => window.open("/venue-directions", "_blank")}
            icon={<Compass className="w-4 h-4 text-[#FFF8F0]" />}
          >
            {language === "hi" ? "विवाह स्थल मार्ग (मानचित्र)" : "Venue Directions ✦"}
          </PillButton>

          <PillButton
            variant="primary"
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
