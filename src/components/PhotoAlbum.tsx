import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Layers, Maximize2, Compass } from "lucide-react";
import { weddingImages, type WeddingImage } from "@/config/weddingImages";
import { useAdmin } from "@/context/AdminContext";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function PhotoAlbum() {
  const { getSectionImages } = useAdmin();
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"carousel" | "stack">("carousel");

  const customPreWedding = getSectionImages("preWedding").map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption || "Pre-Wedding"
  }));

  const photos = customPreWedding.length > 0 ? [...customPreWedding, ...weddingImages.preWedding] : weddingImages.preWedding;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <section
      id="albums"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#F8EFE5] to-[#FFF8F0] overflow-hidden"
      aria-label="3D Pre-Wedding Photo Album"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full blur-[100px] opacity-25 bg-[#D4AF77]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-20 bg-[#641E2B]" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
            <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#641E2B]">
              Immersive 3D Experience
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
            Pre-Wedding Photo Album
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto mb-8"
          >
            A 3D perspective gallery of Ankit and Avani's pre-wedding moments. Explore via carousel rotation or stacked perspective cards.
          </motion.p>

          {/* Mode Switcher */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#D4AF77]/30 shadow-sm">
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-body uppercase tracking-wider font-medium transition-all ${
                viewMode === "carousel"
                  ? "bg-[#3A211C] text-[#FFF8F0] shadow-sm"
                  : "text-[#3A211C]/70 hover:text-[#3A211C]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>3D Carousel</span>
            </button>
            <button
              onClick={() => setViewMode("stack")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-body uppercase tracking-wider font-medium transition-all ${
                viewMode === "stack"
                  ? "bg-[#641E2B] text-white shadow-sm"
                  : "text-[#3A211C]/70 hover:text-[#3A211C]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Stack</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: 3D PHOTO CAROUSEL */}
        {viewMode === "carousel" && (
          <div className="relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center overflow-hidden py-10" style={{ perspective: "1200px" }}>
            <div className="relative w-full max-w-md h-[400px] sm:h-[460px] flex items-center justify-center">
              {photos.map((photo, index) => {
                // Calculate position relative to activeIndex
                const count = photos.length;
                let offset = (index - activeIndex + count) % count;
                if (offset > count / 2) offset -= count;

                const isCenter = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;

                // 3D positioning
                const translateX = offset * 220; // px
                const translateZ = -Math.abs(offset) * 140; // px
                const rotateY = offset * -28; // deg
                const scale = 1 - Math.abs(offset) * 0.15;
                const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.35;

                return (
                  <motion.div
                    key={photo.caption || index}
                    className="absolute w-[270px] sm:w-[320px] aspect-[3/4] cursor-pointer"
                    animate={{
                      x: translateX,
                      z: translateZ,
                      rotateY: rotateY,
                      scale: scale,
                      opacity: opacity
                    }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: 20 - Math.abs(offset)
                    }}
                    onClick={() => {
                      if (!isCenter) setActiveIndex(index);
                    }}
                    whileHover={isCenter ? { scale: 1.03, rotateY: 0 } : {}}
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-white p-3 shadow-[0_20px_50px_rgba(58,40,35,0.15)] border border-[#D4AF77]/40 flex flex-col justify-between transition-shadow group">
                      <div className="relative flex-1 rounded-xl overflow-hidden bg-[#FFF8F0] mb-3">
                        {photo.src ? (
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImagePlaceholder
                            alt="Ankit and Avani's pre-wedding photoshoot photograph."
                            caption={photo.caption}
                            subtitle="Pre-Wedding Portrait"
                            aspect="w-full h-full"
                            icon="photo"
                          />
                        )}
                      </div>

                      {/* Card Caption */}
                      <div className="text-center pb-1">
                        <p className="font-script text-2xl text-[#3A211C] leading-none mb-1" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                          {photo.caption}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-body text-[#641E2B]">
                          Ankit &amp; Avani
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 sm:left-12 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#D4AF77]/40 text-[#3A211C] shadow-lg hover:bg-white hover:border-[#D4AF77] flex items-center justify-center transition-all"
              aria-label="Previous 3D carousel photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 sm:right-12 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#D4AF77]/40 text-[#3A211C] shadow-lg hover:bg-white hover:border-[#D4AF77] flex items-center justify-center transition-all"
              aria-label="Next 3D carousel photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE 3D IMAGE STACK */}
        {viewMode === "stack" && (
          <div className="relative min-h-[460px] flex flex-col items-center justify-center py-8">
            <div className="relative w-[280px] sm:w-[320px] aspect-[3/4]">
              {photos.map((photo, i) => {
                const tilts = [-4, 3, -2, 5, -3, 2];
                const tilt = tilts[i % tilts.length];
                const isTop = i === activeIndex;
                const stackOffset = (i - activeIndex + photos.length) % photos.length;

                return (
                  <motion.div
                    key={photo.caption || i}
                    className="absolute inset-0 cursor-pointer"
                    animate={{
                      y: stackOffset * 10,
                      x: stackOffset * 6,
                      rotate: isTop ? 0 : tilt,
                      scale: 1 - stackOffset * 0.04,
                      opacity: stackOffset > 3 ? 0 : 1 - stackOffset * 0.2
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex: 10 - stackOffset }}
                    onClick={nextSlide}
                    whileHover={{ scale: 1.04, rotate: 0 }}
                  >
                    <div className="w-full h-full rounded-2xl bg-white p-4 shadow-xl border border-[#D4AF77]/40 flex flex-col justify-between">
                      <div className="relative flex-1 rounded-xl overflow-hidden bg-[#FFF8F0] mb-3">
                        {photo.src ? (
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImagePlaceholder
                            alt="Ankit and Avani's pre-wedding photoshoot photograph."
                            caption={photo.caption}
                            subtitle={`Keepsake ${i + 1} of ${photos.length}`}
                            aspect="w-full h-full"
                            icon="photo"
                          />
                        )}
                      </div>

                      <div className="text-center">
                        <p className="font-script text-2xl text-[#3A211C]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                          {photo.caption}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-[#641E2B] font-body">
                          Tap card to reveal next
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-xs text-[#3A211C]/50 font-body mt-10 uppercase tracking-widest">
              Card {activeIndex + 1} of {photos.length} · Tap stack to advance
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

