import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, Play, Pause, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
  galleryCategories,
  initialGalleryItems,
  type GalleryCategory,
  type GalleryItem
} from "@/data/gallery";
import { useAdmin } from "@/context/AdminContext";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function WeddingGallery() {
  const { customImages } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Map customImages to GalleryItem
  const customGalleryItems: GalleryItem[] = customImages.map((img) => {
    let cat: GalleryCategory = "Engagement";
    if (img.section === "haldi") cat = "Haldi";
    else if (img.section === "mehendi") cat = "Mehendi";
    else if (img.section === "sangeet") cat = "Sangeet";
    else if (img.section === "wedding") cat = "Wedding";
    else if (img.section === "reception") cat = "Reception";
    else if (img.section === "personalMessage") cat = "Family Moments";
    else if (img.section === "preWedding" || img.section === "hero" || img.section === "closing" || img.section === "gallery") cat = "Pre-Wedding";

    return {
      id: img.id,
      category: cat,
      title: img.caption || `${cat} Celebration`,
      caption: img.caption || `${cat} Moment`,
      src: img.src,
      alt: img.alt,
      aspectRatio: "landscape"
    };
  });

  const allGalleryItems = [...customGalleryItems, ...initialGalleryItems];

  const filteredItems = selectedCategory === "All"
    ? allGalleryItems
    : allGalleryItems.filter((item) => item.category === selectedCategory);

  // Slideshow auto-advance
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingSlideshow && lightboxIndex !== null) {
      interval = setInterval(() => {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : 0
        );
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlayingSlideshow, lightboxIndex, filteredItems.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1
      );
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <section
      id="gallery"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FFF8F0] overflow-hidden"
      aria-label="Wedding Photo Gallery — Ankit & Avani"
    >
      <div className="max-w-7xl mx-auto">
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
              Royal Keepsakes
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
            Wedding Photo Gallery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto mb-10"
          >
            Curated memories across every ceremony. Filter by occasion, inspect in high-resolution lightbox, or enjoy the automated slideshow.
          </motion.p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
            {galleryCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-body font-medium transition-all ${
                    isActive
                      ? "bg-[#3A211C] text-[#FFF8F0] shadow-md scale-105"
                      : "bg-white/70 text-[#3A211C]/70 hover:bg-white hover:text-[#3A211C] border border-[#D4AF77]/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
        >
          {filteredItems.map((item, index) => {
            const aspectClass =
              item.aspectRatio === "portrait"
                ? "aspect-[3/4]"
                : item.aspectRatio === "landscape"
                ? "aspect-[4/3]"
                : "aspect-square";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(index)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden bg-white p-3 shadow-md border border-[#D4AF77]/30 cursor-pointer group hover:shadow-xl hover:border-[#D4AF77] transition-all"
              >
                {/* Photo or Placeholder */}
                <div className={`relative w-full rounded-xl overflow-hidden ${aspectClass} bg-[#FFF8F0]`}>
                  {item.src ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <ImagePlaceholder
                      alt={item.alt}
                      caption={item.title}
                      subtitle={item.category}
                      aspect="w-full h-full"
                      icon="photo"
                    />
                  )}

                  {/* Hover Overlay with Eye Icon */}
                  <div className="absolute inset-0 bg-[#3A211C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/90 text-[#3A211C] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-5 h-5 text-[#641E2B]" />
                    </div>
                  </div>
                </div>

                {/* Card Title & Category Tag */}
                <div className="px-2 pt-3 pb-1 text-center">
                  <h4 className="font-script text-2xl text-[#3A211C] leading-tight" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                    {item.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#641E2B] font-body font-semibold">
                    {item.category}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3A211C]/92 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Toolbar */}
            <div
              className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs uppercase tracking-widest text-white/80 font-body">
                {filteredItems[lightboxIndex].category} · Photo {lightboxIndex + 1} of {filteredItems.length}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingSlideshow((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs uppercase tracking-wider font-body transition-colors"
                >
                  {isPlayingSlideshow ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingSlideshow ? "Pause" : "Slideshow"}</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Stage */}
            <div
              className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-2xl max-w-lg w-full text-center"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF8F0] mb-4">
                    {filteredItems[lightboxIndex].src ? (
                      <img
                        src={filteredItems[lightboxIndex].src}
                        alt={filteredItems[lightboxIndex].alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImagePlaceholder
                        alt={filteredItems[lightboxIndex].alt}
                        caption={filteredItems[lightboxIndex].title}
                        subtitle={filteredItems[lightboxIndex].category}
                        aspect="w-full h-full"
                        icon="photo"
                      />
                    )}
                  </div>

                  <p className="font-script text-3xl sm:text-4xl text-[#3A211C] mb-1" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                    {filteredItems[lightboxIndex].title}
                  </p>
                  <p className="font-body text-xs text-[#3A211C]/70 mb-2">
                    {filteredItems[lightboxIndex].caption}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-[#641E2B] font-semibold font-body">
                    {filteredItems[lightboxIndex].category}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Controls */}
              <button
                onClick={handlePrev}
                className="absolute -left-3 sm:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#3A211C] flex items-center justify-center transition-all shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute -right-3 sm:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#3A211C] flex items-center justify-center transition-all shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

