import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingImages } from "@/config/weddingImages";

interface Photo {
  src: string;
  caption: string;
  date: string;
  category: string;
  alt?: string;
}

const CATEGORIES = ["All", "Together", "Engagement", "Pre-wedding"];

export default function PhotoMemories() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);

  // Load photos from config (future-proof: merge config images + JSON)
  useEffect(() => {
    const configPhotos: Photo[] = weddingImages.preWedding.map((img, i) => ({
      src: img.src,
      caption: img.caption || `Ankit & Avani`,
      date: "Coming Soon",
      category: i % 3 === 0 ? "Engagement" : i % 2 === 0 ? "Pre-wedding" : "Together",
      alt: img.alt,
    }));

    fetch("/photos/photos.json")
      .then((res) => (res.ok ? res.json() : []))
      .then((jsonPhotos: Photo[]) => {
        const mapped = jsonPhotos.map((p) => ({
          ...p,
          alt: p.alt || p.caption,
        }));
        setPhotos([...configPhotos, ...mapped].slice(0, 20));
      })
      .catch(() => {
        setPhotos(configPhotos);
      });
  }, []);

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  // Slideshow auto-advance
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingSlideshow && lightboxIndex !== null) {
      interval = setInterval(() => {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlayingSlideshow, lightboxIndex, filteredPhotos.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? filteredPhotos.length - 1 : lightboxIndex - 1
      );
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const tilts = [-2, 1.5, -1, 2, -1.8, 1.2, -2.2, 1.7];

  return (
    <section
      id="memories"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#F6D6DC]/15 to-[#FFF8F0] overflow-hidden"
      aria-label="Photo Memories — Ankit & Avani"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label text-[#641E2B] tracking-[0.25em] mb-3 text-xs sm:text-sm"
          >
            Polaroids &amp; Keepsakes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A211C] mb-5"
          >
            Memories in Gold
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/60 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            Photographs of Ankit and Avani's journey together — shared moments, stolen glances, and the everyday adventures that led them here.
            <span className="block mt-2 text-[#3A211C]/40 italic text-xs">
              Photographs will be added soon. Check back after the photoshoot!
            </span>
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-body font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#3A211C] text-[#FFF8F0] shadow-sm"
                    : "bg-white/60 text-[#3A211C]/70 hover:bg-white hover:text-[#3A211C] border border-[#D4AF77]/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Polaroid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => {
            const tilt = tilts[index % tilts.length];
            return (
              <motion.div
                key={`${photo.src}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 * (index % 6) }}
                whileHover={{
                  y: -8,
                  rotate: 0,
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                style={{ rotate: `${tilt}deg` }}
                onClick={() => setLightboxIndex(index)}
                className="cursor-pointer group relative bg-white p-3.5 pb-5 rounded-xl shadow-[0_8px_25px_rgba(58,40,35,0.08)] border border-[#EBD3B5]/40 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(100,30,43,0.15)]"
              >
                {/* Metallic clip */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF77] via-[#EBC4B3] to-[#641E2B] shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/70" />
                </div>

                {/* Photo frame */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-tr from-[#EBD3B5]/40 to-[#F6D6DC]/40 mb-3">
                  {photo.src ? (
                    <img
                      src={photo.src}
                      alt={photo.alt || photo.caption}
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF77" strokeWidth="1" className="mb-2 opacity-60">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span
                        className="text-[#3A211C]/50 text-xl"
                        style={{ fontFamily: "'Pinyon Script', cursive" }}
                      >
                        {photo.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="px-1 text-center">
                  <p
                    className="text-[#3A211C] truncate leading-tight text-2xl"
                    style={{ fontFamily: "'Pinyon Script', cursive" }}
                  >
                    {photo.caption}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-[#641E2B] font-medium font-body mt-0.5">
                    Ankit & Avani · {photo.date}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3A211C]/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top controls */}
            <div
              className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs uppercase tracking-widest text-white/70 font-body">
                Photo {lightboxIndex + 1} of {filteredPhotos.length}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingSlideshow((prev) => !prev)}
                  className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs uppercase tracking-wider font-body transition-colors"
                >
                  {isPlayingSlideshow ? "❚❚ Pause" : "▶ Slideshow"}
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm transition-colors"
                  aria-label="Close lightbox"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main photo */}
            <div
              className="relative max-w-4xl max-h-[75vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white p-4 sm:p-6 pb-6 sm:pb-8 rounded-2xl shadow-2xl max-w-lg w-full text-center"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF8F0] mb-4">
                    {filteredPhotos[lightboxIndex].src ? (
                      <img
                        src={filteredPhotos[lightboxIndex].src}
                        alt={filteredPhotos[lightboxIndex].alt || filteredPhotos[lightboxIndex].caption}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFF0E6] to-[#EDD5C5]">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF77" strokeWidth="0.8" className="mb-3 opacity-50">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span
                          className="text-[#3A211C]/60 text-3xl"
                          style={{ fontFamily: "'Pinyon Script', cursive" }}
                        >
                          {filteredPhotos[lightboxIndex].caption}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-[#3A211C]/40 font-body mt-2">
                          Photograph Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  <p
                    className="text-3xl sm:text-4xl text-[#3A211C] mb-1"
                    style={{ fontFamily: "'Pinyon Script', cursive" }}
                  >
                    {filteredPhotos[lightboxIndex].caption}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#641E2B] font-medium font-body">
                    {filteredPhotos[lightboxIndex].category} · {filteredPhotos[lightboxIndex].date}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              <button
                onClick={handlePrev}
                className="absolute -left-3 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#3A211C] flex items-center justify-center text-lg transition-all"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-3 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#3A211C] flex items-center justify-center text-lg transition-all"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
