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
import ImagePlaceholder from "@/components/ImagePlaceholder";
import confetti from "canvas-confetti";

export default function LoveStory() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlayingAutoStory, setIsPlayingAutoStory] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const chapter: StoryChapter = loveStoryChapters[currentChapter];
  const chapterConfigImg = weddingImages.loveStory[currentChapter];

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
      {/* Decorative blurred background aura */}
      <div className="absolute top-1/4 -right-40 w-[550px] h-[550px] bg-gradient-to-bl from-[#F6D6DC]/35 via-[#EBD3B5]/25 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[550px] h-[550px] bg-gradient-to-tr from-[#FFDCC8]/35 via-[#E9DDF5]/25 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
            <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#641E2B]">
              A Journey In Six Chapters
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
            The Chapters of Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto mb-8"
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
                  <span>Pause Story Slideshow</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#641E2B] fill-current" />
                  <span>Auto-Play Story Reel</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE GOLDEN TIMELINE SLIDER & SCROLLBAR TRACK       */}
        {/* ========================================================= */}
        <div className="relative max-w-3xl mx-auto mb-12 px-4">
          {/* Scrollbar Track Base */}
          <div className="relative h-2 bg-[#EBD3B5]/40 rounded-full overflow-visible">
            {/* Animated Gold Progress Fill */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#D4AF77] via-[#B8935A] to-[#641E2B] rounded-full shadow-[0_0_12px_rgba(212,175,119,0.5)]"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />

            {/* Draggable / Clickable Golden Heart Slider Knob */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-gradient-to-tr from-[#641E2B] via-[#8B2635] to-[#D4AF77] border-2 border-white shadow-[0_4px_15px_rgba(100,30,43,0.4)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-115 transition-transform"
              animate={{ left: `${progressPercent}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Heart className="w-3.5 h-3.5 text-white fill-current animate-pulse" />
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
                  className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isActive
                        ? "bg-[#641E2B] text-white shadow-[0_0_12px_rgba(100,30,43,0.5)] scale-110 ring-2 ring-[#D4AF77]"
                        : isPassed
                        ? "bg-[#D4AF77] text-[#3A211C]"
                        : "bg-white text-[#3A211C]/50 border border-[#D4AF77]/40"
                    }`}
                  >
                    0{item.chapter}
                  </div>
                  <span
                    className={`hidden sm:block text-[10px] uppercase tracking-wider font-semibold mt-1 transition-colors ${
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
        <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-12 md:p-16 border-2 border-[#D4AF77]/30 shadow-[0_25px_60px_rgba(58,33,28,0.08)] min-h-[520px] flex flex-col justify-center overflow-hidden">
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
                x: slideDirection > 0 ? 100 : -100,
                rotateY: slideDirection > 0 ? 12 : -12,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 0,
                scale: 1,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }}
              exit={{
                opacity: 0,
                x: slideDirection < 0 ? 100 : -100,
                rotateY: slideDirection < 0 ? 12 : -12,
                scale: 0.95,
                transition: { duration: 0.4 }
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* ===================================================== */}
              {/* LEFT COLUMN: SCULPTED ROYAL MUGHAL JHAROKHA FRAME     */}
              {/* ===================================================== */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
                  {/* Outer Breathing Gold Glow */}
                  <div className="absolute -inset-4 rounded-[160px_160px_40px_40px] bg-gradient-to-tr from-[#641E2B]/15 via-[#D4AF77]/25 to-[#F6D6DC]/30 blur-xl pointer-events-none" />

                  {/* Outer Ornate Filigree Outline with Scalloped Top */}
                  <div
                    className="absolute -inset-3 border-2 border-[#D4AF77]/50 rounded-[160px_160px_35px_35px] pointer-events-none shadow-sm"
                    style={{ transform: "rotate(-0.8deg)" }}
                  />

                  {/* Scalloped Arch Top Royal Crest Motif */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF77] via-[#FFF8F0] to-[#D4AF77] text-[#641E2B] text-[10px] font-bold uppercase tracking-widest border border-[#D4AF77] shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <span>🪔</span>
                    <span>{chapter.emoji} Chapter 0{chapter.chapter}</span>
                    <span>🪔</span>
                  </div>

                  {/* Main Jharokha Image Container */}
                  <div className="relative rounded-[150px_150px_30px_30px] overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#FFFDFB] via-[#FDF7F1] to-[#F8EFE5] border-2 border-[#D4AF77] shadow-[0_20px_50px_rgba(100,30,43,0.18)]">
                    {chapterConfigImg?.src ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={chapterConfigImg.src}
                          alt={chapterConfigImg.alt || chapter.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Romantic Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#241310]/75 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 inset-x-0 text-center px-4">
                          <p className="font-script text-2xl text-white drop-shadow-sm" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                            {chapter.title}
                          </p>
                          <p className="text-[10px] uppercase tracking-widest text-[#D4AF77] font-semibold">
                            {chapter.date}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full p-4 flex flex-col items-center justify-center text-center">
                        <ImagePlaceholder
                          alt={chapter.alt}
                          caption={chapter.title}
                          subtitle={chapter.date}
                          aspect="w-full h-full"
                          icon="photo"
                        />
                      </div>
                    )}
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
