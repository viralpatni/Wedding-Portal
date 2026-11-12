import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Heart,
  Play,
  Pause,
  Compass,
  Star
} from "lucide-react";
import { loveStoryChapters, type StoryChapter } from "@/data/loveStory";
import { weddingImages } from "@/config/weddingImages";
import { useAdmin } from "@/context/AdminContext";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

export default function LoveStory() {
  const { t } = useLanguage();
  const { getSectionImages } = useAdmin();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlayingAutoStory, setIsPlayingAutoStory] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const chapter: StoryChapter = loveStoryChapters[currentChapter];
  const adminStoryImages = getSectionImages("loveStory");
  const fallbackImages = [
    "/images/engagement/DSC08106 (1).JPG",
    "/images/engagement/DSC08259.JPG",
    "/images/engagement/DSC08281.JPG",
    "/images/hero/DSC08259.JPG",
    "/images/engagement/DSC08281.JPG",
    "/images/engagement/DSC08106 (1).JPG"
  ];
  const activeImageSrc = adminStoryImages[currentChapter]?.src || weddingImages.loveStory[currentChapter]?.src || fallbackImages[currentChapter] || fallbackImages[0];

  // Auto-play slideshow timer (5 seconds per chapter)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlayingAutoStory) {
      timer = setInterval(() => {
        setSlideDirection(1);
        setCurrentChapter((prev) => (prev + 1) % loveStoryChapters.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlayingAutoStory]);

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentChapter((prev) => (prev < loveStoryChapters.length - 1 ? prev + 1 : 0));
    confetti({ particleCount: 15, spread: 45, origin: { y: 0.6 } });
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    setCurrentChapter((prev) => (prev > 0 ? prev - 1 : loveStoryChapters.length - 1));
  };

  const handleSelectChapter = (index: number) => {
    setSlideDirection(index > currentChapter ? 1 : -1);
    setCurrentChapter(index);
    confetti({ particleCount: 15, spread: 40, origin: { y: 0.6 } });
  };

  // Slider progress percentage
  const progressPercent = (currentChapter / (loveStoryChapters.length - 1)) * 100;

  return (
    <section
      id="story"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#FDF5EB] to-[#FFF8F0] overflow-hidden"
      aria-label="Our Love Story — Ankit & Avani"
    >
      {/* Decorative background aura (zero blur overhead) */}
      <div className="absolute top-1/4 -right-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-bl from-[#F6D6DC]/40 via-[#EBD3B5]/25 to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-[#FFDCC8]/40 via-[#E9DDF5]/25 to-transparent rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
            <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#641E2B]">
              {t("storyPre")}
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
            {t("storyTitle")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8"
          >
            The story of Ankit and Avani — told through the milestones and quiet moments that forever altered their horizons.
          </motion.p>

          {/* Interactive Auto-play Cinema Reel Button */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsPlayingAutoStory(!isPlayingAutoStory)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#D4AF77]/50 text-xs font-semibold uppercase tracking-wider text-[#3A211C] hover:bg-white shadow-sm transition-all"
            >
              {isPlayingAutoStory ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#641E2B]" />
                  <span>{t("pauseStory")}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#641E2B] fill-current" />
                  <span>{t("autoPlayStory")}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE GOLDEN TIMELINE SLIDER & SCROLLBAR TRACK       */}
        {/* ========================================================= */}
        <div className="relative max-w-3xl mx-auto mb-10 sm:mb-14 px-2 sm:px-4">
          {/* Scrollbar Track Base with Glow */}
          <div
            className="relative h-3 bg-[#EBD3B5]/40 rounded-full overflow-visible cursor-pointer shadow-inner border border-[#D4AF77]/30"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              const targetIdx = Math.round(ratio * (loveStoryChapters.length - 1));
              handleSelectChapter(targetIdx);
            }}
          >
            {/* Shimmer sweep animation over track */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full pointer-events-none"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Animated Gold-to-Burgundy Progress Fill */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#D4AF77] via-[#B8935A] to-[#641E2B] rounded-full shadow-[0_0_15px_rgba(212,175,119,0.7)]"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Concentric Pulsing Radar Rings on Active Knob */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 pointer-events-none"
              animate={{ left: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {[0, 0.8].map((delay, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#641E2B]/50"
                  style={{ width: 28, height: 28 }}
                  animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay }}
                />
              ))}
            </motion.div>

            {/* Draggable / Clickable Golden Heart Slider Knob */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-full bg-gradient-to-tr from-[#641E2B] via-[#8B2635] to-[#D4AF77] border-2 border-white shadow-[0_6px_20px_rgba(100,30,43,0.5)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
              animate={{ left: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Heart className="w-4 h-4 text-white fill-current animate-pulse" />
            </motion.div>
          </div>

          {/* 6 Chapter Milestone Dots along the Slider */}
          <div className="flex justify-between items-center mt-3 relative z-10">
            {loveStoryChapters.map((item, index) => {
              const isActive = currentChapter === index;
              const isPassed = currentChapter >= index;
              return (
                <button
                  key={item.chapter}
                  onClick={() => handleSelectChapter(index)}
                  className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-110 p-1"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isActive
                        ? "bg-[#641E2B] text-white shadow-[0_0_15px_rgba(100,30,43,0.6)] scale-110 ring-2 ring-[#D4AF77]"
                        : isPassed
                        ? "bg-[#D4AF77] text-[#3A211C] font-semibold"
                        : "bg-white text-[#3A211C]/50 border border-[#D4AF77]/40 shadow-sm"
                    }`}
                  >
                    0{item.chapter}
                  </div>
                  <span
                    className={`hidden sm:block text-[10px] uppercase tracking-wider font-semibold mt-1.5 transition-colors ${
                      isActive ? "text-[#641E2B]" : "text-[#3A211C]/50 group-hover:text-[#3A211C]"
                    }`}
                  >
                    {item.emoji} {item.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN CINEMATIC STORY CARD SPREAD                          */}
        {/* ========================================================= */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-10 md:p-14 border-2 border-[#D4AF77]/30 shadow-[0_25px_60px_rgba(58,33,28,0.08)] min-h-[480px] flex flex-col justify-center overflow-hidden">
          {/* Subtle gold filigree corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF77]/40 pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#D4AF77]/40 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#D4AF77]/40 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF77]/40 pointer-events-none" />

          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={chapter.chapter}
              custom={slideDirection}
              initial={{
                opacity: 0,
                x: slideDirection > 0 ? 80 : -80,
                scale: 0.96
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }}
              exit={{
                opacity: 0,
                x: slideDirection < 0 ? 80 : -80,
                scale: 0.96,
                transition: { duration: 0.35 }
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* ===================================================== */}
              {/* LEFT COLUMN: ROMANTIC SCULPTED CAMEO HEART FRAME      */}
              {/* ===================================================== */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[270px] sm:max-w-[340px]">
                  {/* Outer Breathing Gold & Rose Glow */}
                  <div className="absolute -inset-4 rounded-[140px_60px_140px_60px] bg-gradient-to-tr from-[#641E2B]/20 via-[#D4AF77]/30 to-[#F6D6DC]/40 blur-xl pointer-events-none" />

                  {/* Outer Ornate Filigree Beaded Border with Romantic Tilt */}
                  <div
                    className="absolute -inset-2.5 sm:-inset-3 border-2 border-dashed border-[#D4AF77]/60 rounded-[140px_60px_140px_60px] pointer-events-none shadow-sm"
                    style={{ transform: "rotate(-1deg)" }}
                  />

                  {/* Scalloped Arch Top Royal Crest Motif with Heart */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-gradient-to-r from-[#D4AF77] via-[#FFF8F0] to-[#D4AF77] text-[#641E2B] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border border-[#D4AF77] shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Heart className="w-2.5 h-2.5 fill-current text-[#641E2B]" />
                    <span>{chapter.emoji} Chapter 0{chapter.chapter}</span>
                    <Heart className="w-2.5 h-2.5 fill-current text-[#641E2B]" />
                  </div>

                  {/* Main Romantic Sculpted Image Container */}
                  <div className="relative rounded-[135px_55px_135px_55px] overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#FFFDFB] via-[#FDF7F1] to-[#F8EFE5] border-2 border-[#D4AF77] shadow-[0_20px_50px_rgba(100,30,43,0.22)]">
                    <div className="relative w-full h-full group">
                      <img
                        src={activeImageSrc}
                        alt={chapter.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/engagement/DSC08259.JPG";
                        }}
                      />
                      {/* Romantic Ambient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#241310]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 inset-x-0 text-center px-4">
                        <p className="font-script text-2xl sm:text-3xl text-white drop-shadow-md" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                          {chapter.title}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-[#D4AF77] font-semibold mt-0.5">
                          {chapter.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===================================================== */}
              {/* RIGHT COLUMN: EDITORIAL ROMANTIC STORY SPREAD         */}
              {/* ===================================================== */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Chapter tag & date */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#641E2B]/10 text-[#641E2B] text-xs uppercase tracking-widest font-semibold font-body border border-[#641E2B]/20">
                    Chapter 0{chapter.chapter} · {chapter.emoji}
                  </span>
                  <div className="w-8 h-px bg-[#D4AF77]/50" />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF77] font-semibold font-body">
                    {chapter.date}
                  </span>
                </div>

                {/* Chapter Title */}
                <h3 className="font-display italic text-3xl sm:text-5xl lg:text-6xl text-[#3A211C] mb-5 leading-tight">
                  {chapter.title}
                </h3>

                {/* Pull Quote Decorative Line */}
                <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF77] via-[#D9A6A1] to-[#641E2B] mb-6 rounded-full" />

                {/* Romantic Caption */}
                <p className="font-body text-[#3A211C]/85 text-base sm:text-lg leading-relaxed mb-8 italic">
                  "{chapter.caption}"
                </p>

                {/* Navigation Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#D4AF77]/25">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full border border-[#D4AF77]/50 hover:bg-[#D4AF77]/20 flex items-center justify-center text-sm text-[#3A211C] transition-all cursor-pointer shadow-sm"
                      aria-label="Previous story chapter"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="font-body text-xs font-semibold text-[#641E2B]">
                      0{currentChapter + 1} / 0{loveStoryChapters.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full border border-[#D4AF77]/50 hover:bg-[#D4AF77]/20 flex items-center justify-center text-sm text-[#3A211C] transition-all cursor-pointer shadow-sm"
                      aria-label="Next story chapter"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#641E2B] font-body">
                    <Heart className="w-3.5 h-3.5 fill-current text-[#641E2B]" />
                    <span className="italic font-medium">Ankit &amp; Avani · Forever Story</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
