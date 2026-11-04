import React from "react";
import { motion } from "framer-motion";
import { Camera, Image as ImageIcon, Film, User } from "lucide-react";

export interface ImagePlaceholderProps {
  /** Descriptive alt text for screen readers */
  alt: string;
  /** Visible label or title displayed in placeholder */
  caption?: string;
  /** Subtitle or category */
  subtitle?: string;
  /** Aspect ratio CSS or Tailwind class (e.g. 'aspect-[3/4]', 'aspect-video') */
  aspect?: string;
  /** Custom extra styling */
  className?: string;
  /** Icon representation */
  icon?: "camera" | "photo" | "film" | "portrait";
  /** Optional click handler (e.g. for lightbox triggers) */
  onClick?: () => void;
}

export default function ImagePlaceholder({
  alt,
  caption = "Ankit & Avani",
  subtitle = "Photograph Coming Soon",
  aspect = "aspect-[4/5]",
  className = "",
  icon = "camera",
  onClick
}: ImagePlaceholderProps) {
  const renderIcon = () => {
    const iconClass = "w-8 h-8 text-[#D4AF77] stroke-[1.25]";
    switch (icon) {
      case "photo":
        return <ImageIcon className={iconClass} />;
      case "film":
        return <Film className={iconClass} />;
      case "portrait":
        return <User className={iconClass} />;
      case "camera":
      default:
        return <Camera className={iconClass} />;
    }
  };

  return (
    <div
      onClick={onClick}
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden rounded-2xl border border-[#D4AF77]/30 bg-gradient-to-br from-[#FFF8F0] via-[#F9EFE4] to-[#F1DFC9] shadow-sm flex flex-col items-center justify-center p-6 text-center select-none group transition-all duration-500 hover:border-[#D4AF77] hover:shadow-[0_12px_30px_rgba(212,175,119,0.18)] ${aspect} ${className}`}
    >
      {/* Delicate Indian ornamental filigree background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#641E2B 1px, transparent 1px), radial-gradient(#D4AF77 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px"
        }}
      />

      {/* Elegant double-line golden border inset */}
      <div className="absolute inset-3 border border-[#D4AF77]/25 rounded-xl pointer-events-none transition-all duration-500 group-hover:border-[#D4AF77]/50" />
      <div className="absolute inset-4 border border-[#D4AF77]/15 rounded-lg pointer-events-none" />

      {/* Four corner golden brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#D4AF77]/70 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#D4AF77]/70 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#D4AF77]/70 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#D4AF77]/70 pointer-events-none" />

      {/* Floating icon animation */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 p-3 rounded-full bg-white/70 backdrop-blur-sm border border-[#D4AF77]/40 shadow-sm mb-3 group-hover:scale-105 transition-transform"
      >
        {renderIcon()}
      </motion.div>

      {/* Text block */}
      <div className="relative z-10 max-w-[85%]">
        <h4
          className="text-xl sm:text-2xl text-[#3A211C] font-script leading-tight mb-1"
          style={{ fontFamily: "'Pinyon Script', cursive" }}
        >
          {caption}
        </h4>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-body font-medium text-[#641E2B]/80">
          {subtitle}
        </p>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
    </div>
  );
}

