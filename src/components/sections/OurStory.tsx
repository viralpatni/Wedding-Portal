import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import storyData from "@/data/story.json";
import ArchFrame from "@/components/shared/ArchFrame";
import PillButton from "@/components/shared/PillButton";
import { weddingImages } from "@/config/weddingImages";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export default function OurStory() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const chapter = storyData[currentChapter];
  const chapterImage = weddingImages.loveStory[currentChapter];

  return (
    <section
      id="story"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FFF8F0] overflow-hidden"
      aria-label="Our Love Story — Ankit & Avani"
    >
      {/* Decorative aura blobs */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#F6D6DC]/30 via-[#EBD3B5]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFDCC8]/30 via-[#E9DDF5]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D4AF77]"
            style={{
              left: `${15 + i * 18}%`,
              top: `${30 + (i % 2) * 30}%`,
              opacity: 0.3,
            }}
            animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label text-[#641E2B] tracking-[0.25em] mb-3 text-xs sm:text-sm"
          >
            A Journey in Six Chapters
          </motion.p>
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
            className="text-[#3A211C]/60 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            The story of Ankit and Avani — two people, one beautiful journey, and a forever that is just beginning.
          </motion.p>
        </div>

        {/* Chapter selector */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
          {storyData.map((item, index) => {
            const isActive = currentChapter === index;
            return (
              <button
                key={item.chapter}
                onClick={() => setCurrentChapter(index)}
                className={`relative px-4 py-2.5 rounded-full text-xs uppercase tracking-widest font-body font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#3A211C] text-[#FFF8F0] shadow-md scale-105"
                    : "bg-white/60 text-[#3A211C]/70 hover:bg-white hover:text-[#3A211C] border border-[#D4AF77]/20"
                }`}
              >
                <span>{item.emoji}</span>
                <span>Ch. {item.chapter}</span>
              </button>
            );
          })}
        </div>

        {/* Main editorial spread */}
        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-12 md:p-16 border border-white/80 shadow-[0_20px_50px_rgba(58,40,35,0.06)] min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.chapter}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Left: Visual Arch */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
                  {chapterImage?.src ? (
                    <ArchFrame
                      src={chapterImage.src}
                      alt={chapterImage.alt}
                      aspect="aspect-[4/5]"
                      offsetOutline
                    />
                  ) : (
                    <div className="relative">
                      {/* Gold offset outline */}
                      <div
                        className="absolute -inset-3 border border-[#D4AF77]/30 arch-frame"
                        style={{ transform: "translate(6px, 6px)" }}
                      />
                      <div
                        className="arch-frame w-full aspect-[4/5] overflow-hidden relative"
                        style={{
                          background:
                            "linear-gradient(160deg, #FFF0E6 0%, #F5DDD0 50%, #EDD5C5 100%)",
                        }}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                          <span className="text-6xl mb-3">{chapter.emoji}</span>
                          <span
                            className="text-[#3A211C]/70 text-2xl mb-2"
                            style={{ fontFamily: "'Pinyon Script', cursive" }}
                          >
                            {chapter.title}
                          </span>
                          <span className="label text-[#641E2B] text-[10px] mt-1">
                            {chapter.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Editorial Text */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#F6D6DC]/60 text-[#641E2B] text-xs uppercase tracking-widest font-semibold font-body">
                    Chapter 0{chapter.chapter}
                  </span>
                  <div className="w-6 h-px bg-[#D4AF77]/40" />
                  <span className="text-xs uppercase tracking-widest text-[#3A211C]/60 font-body">
                    {chapter.date}
                  </span>
                </div>

                <h3 className="font-display italic text-3xl sm:text-5xl lg:text-6xl text-[#3A211C] mb-6 leading-tight">
                  {chapter.title}
                </h3>

                {/* Pull quote bar */}
                <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF77] to-[#641E2B] mb-6 rounded-full" />

                <p className="font-body text-[#3A211C]/80 text-base sm:text-lg leading-relaxed mb-8">
                  "{chapter.caption}"
                </p>

                {/* Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D4AF77]/20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setCurrentChapter((prev) =>
                          prev > 0 ? prev - 1 : storyData.length - 1
                        )
                      }
                      className="w-10 h-10 rounded-full border border-[#D4AF77]/30 hover:border-[#3A211C] flex items-center justify-center text-sm text-[#3A211C] transition-colors"
                      aria-label="Previous chapter"
                    >
                      ←
                    </button>
                    <span className="font-body text-xs text-[#3A211C]/60">
                      {currentChapter + 1} of {storyData.length}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentChapter((prev) =>
                          prev < storyData.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="w-10 h-10 rounded-full border border-[#D4AF77]/30 hover:border-[#3A211C] flex items-center justify-center text-sm text-[#3A211C] transition-colors"
                      aria-label="Next chapter"
                    >
                      →
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#3A211C]/40 font-body">
                    <span className="italic">Photographs</span>
                    <span>·</span>
                    <span className="uppercase tracking-wider">Coming Soon</span>
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
