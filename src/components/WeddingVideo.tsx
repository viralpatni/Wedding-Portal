import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Maximize2 } from "lucide-react";
import { weddingImages } from "@/config/weddingImages";
import { weddingConfig } from "@/config/weddingConfig";

export default function WeddingVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoConfig = weddingImages.weddingVideo;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="video"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#3A211C] to-[#241310] text-[#FFF8F0] overflow-hidden"
      aria-label="Cinematic Wedding Film — Ankit & Avani"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#641E2B]/30 via-[#D4AF77]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF77]" />
          <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#D4AF77]">
            Cinematic Wedding Film
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF77]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display italic text-4xl sm:text-6xl md:text-7xl text-white mb-4"
        >
          A Lifetime In Motion
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#EBD3B5]/75 font-body text-sm sm:text-base max-w-lg mx-auto mb-12"
        >
          The teaser trailer and wedding highlight reel celebrating Ankit &amp; Avani. The full film will be premiered right here.
        </motion.p>

        {/* Video Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden bg-black border-2 border-[#D4AF77]/40 shadow-[0_25px_60px_rgba(0,0,0,0.5)] group"
          role="region"
          aria-label={videoConfig.alt || "Wedding film featuring Ankit and Avani"}
        >
          {videoConfig.src ? (
            <video
              ref={videoRef}
              src={videoConfig.src}
              poster={videoConfig.poster}
              muted={isMuted}
              playsInline
              loop
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Elegant Placeholder when video source is not yet dropped in */
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#2F151B] via-[#1E0F13] to-[#120709] text-center"
              aria-label="Wedding film featuring Ankit and Avani."
            >
              {/* Filigree decorative border */}
              <div className="absolute inset-4 sm:inset-6 border border-[#D4AF77]/30 rounded-2xl pointer-events-none" />

              <div className="p-5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF77]/40 mb-4 text-[#D4AF77]">
                <Film className="w-10 h-10" />
              </div>

              <h3 className="font-script text-3xl sm:text-5xl text-white mb-2" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                Ankit &amp; Avani — Wedding Film
              </h3>

              <p className="font-body text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D4AF77] mb-2 font-semibold">
                Coming Soon Post Ceremony
              </p>

              <p className="text-xs text-[#FFF8F0]/60 max-w-md font-body">
                Cinematic highlights, heartfelt vows, and family blessings captured in 4K resolution.
              </p>
            </div>
          )}

          {/* Video Player Floating Overlay Controls (if video source present) */}
          {videoConfig.src && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-white text-xs font-body">
                <span className="font-script text-2xl text-[#D4AF77]">
                  {videoConfig.caption}
                </span>
                <span className="uppercase tracking-widest text-white/70">
                  {weddingConfig.hashtag}
                </span>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-[#D4AF77] text-[#3A211C] flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <p className="text-[11px] text-white/60 font-body uppercase tracking-wider">
                  Sound default off (user controlled)
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

