import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { loveStoryChapters, type StoryChapter } from "@/data/loveStory";
import { weddingImages } from "@/config/weddingImages";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ArchFrame from "@/components/shared/ArchFrame";

export default function LoveStory() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const chapter: StoryChapter = loveStoryChapters[currentChapter];
  const chapterConfigImg = weddingImages.loveStory[currentChapter];

  return (
    <section
      id="story"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FFF8F0] overflow-hidden"
      aria-label="Our Love Story — Ankit & Avani"
    >
      {/* Decorative blurred background aura */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#F6D6DC]/30 via-[#EBD3B5]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFDCC8]/30 via-[#E9DDF5]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
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
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A211C] mb-5"
          >
            The Chapters of Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            The story of Ankit and Avani — told through the milestones and quiet moments that forever altered their horizons.
          </motion.p>
        </div>

        {/* Chapter Horizontal Selector Bar */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
          {loveStoryChapters.map((item, index) => {
            const isActive = currentChapter === index;
            return (
              <button
                key={item.chapter}
                onClick={() => setCurrentChapter(index)}
                className={`relative px-4 py-2.5 rounded-full text-xs uppercase tracking-widest font-body font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#3A211C] text-[#FFF8F0] shadow-md scale-105"
                    : "bg-white/60 text-[#3A211C]/70 hover:bg-white hover:text-[#3A211C] border border-[#D4AF77]/30"
                }`}
              >
                <span>{item.emoji}</span>
                <span>Ch. {item.chapter}</span>
              </button>
            );
          })}
        </div>

        {/* Main Editorial Magazine Spread */}
        <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-12 md:p-16 border border-white/90 shadow-[0_20px_50px_rgba(58,40,35,0.06)] min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.chapter}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Left Column: Visual Arch with Image or Placeholder */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
                  {chapterConfigImg?.src ? (
                    <ArchFrame
                      src={chapterConfigImg.src}
                      alt={chapterConfigImg.alt || chapter.alt}
                      aspect="aspect-[4/5]"
                      offsetOutline
                    />
                  ) : (
                    <div className="relative">
                      {/* Gold offset outline */}
                      <div
                        className="absolute -inset-3 border-2 border-[#D4AF77]/35 rounded-t-full pointer-events-none"
                        style={{ transform: "translate(6px, 6px)" }}
                      />

                      <div className="relative rounded-t-full overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#FFF8F0] via-[#F9EFE4] to-[#F1DFC9] border border-[#D4AF77]/30 shadow-md">
                        <ImagePlaceholder
                          alt={chapter.alt}
                          caption={chapter.title}
                          subtitle={chapter.date}
                          aspect="w-full h-full"
                          icon="photo"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Editorial Text */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Chapter tag & date */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#F6D6DC]/60 text-[#641E2B] text-xs uppercase tracking-widest font-semibold font-body">
                    Chapter 0{chapter.chapter}
                  </span>
                  <div className="w-6 h-px bg-[#D4AF77]/40" />
                  <span className="text-xs uppercase tracking-widest text-[#3A211C]/60 font-body">
                    {chapter.date}
                  </span>
                </div>

                {/* Chapter Title */}
                <h3 className="font-display italic text-3xl sm:text-5xl lg:text-6xl text-[#3A211C] mb-6 leading-tight">
                  {chapter.title}
                </h3>

                {/* Pull Quote Decorative Line */}
                <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF77] to-[#641E2B] mb-6 rounded-full" />

                {/* Romantic Caption */}
                <p className="font-body text-[#3A211C]/80 text-base sm:text-lg leading-relaxed mb-8">
                  "{chapter.caption}"
                </p>

                {/* Navigation Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D4AF77]/20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setCurrentChapter((prev) =>
                          prev > 0 ? prev - 1 : loveStoryChapters.length - 1
                        )
                      }
                      className="w-10 h-10 rounded-full border border-[#D4AF77]/30 hover:border-[#3A211C] flex items-center justify-center text-sm text-[#3A211C] transition-colors"
                      aria-label="Previous story chapter"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="font-body text-xs text-[#3A211C]/60">
                      {currentChapter + 1} of {loveStoryChapters.length}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentChapter((prev) =>
                          prev < loveStoryChapters.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="w-10 h-10 rounded-full border border-[#D4AF77]/30 hover:border-[#3A211C] flex items-center justify-center text-sm text-[#3A211C] transition-colors"
                      aria-label="Next story chapter"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#641E2B] font-body">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="italic">Ankit &amp; Avani</span>
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

