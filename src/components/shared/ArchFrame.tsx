import React from "react";
import { motion } from "framer-motion";

interface ArchFrameProps {
  src?: string;
  alt: string;
  className?: string;
  aspect?: string;
  offsetOutline?: boolean;
  children?: React.ReactNode;
}

export default function ArchFrame({
  src,
  alt,
  className = "",
  aspect = "aspect-[3/4]",
  offsetOutline = true,
  children,
}: ArchFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {offsetOutline && (
        <div
          className="absolute -inset-2 sm:-inset-3 border border-[#B8935A]/35 pointer-events-none rounded-t-[100px] sm:rounded-t-[140px] rounded-b-2xl"
          style={{ transform: "translate(6px, 6px)" }}
        />
      )}
      <div
        className={`relative w-full ${aspect} overflow-hidden rounded-t-[96px] sm:rounded-t-[136px] rounded-b-2xl shadow-xl bg-gradient-to-b from-[#EBD3B5]/40 via-[#F6D6DC]/30 to-[#FBF7F2]`}
      >
        {src ? (
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover select-none"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}
