import React from "react";
import { motion } from "framer-motion";

interface ReduceMotionToggleProps {
  reduceMotion: boolean;
  onToggle: () => void;
}

export default function ReduceMotionToggle({
  reduceMotion,
  onToggle,
}: ReduceMotionToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 left-6 z-50 glass-card px-3.5 py-2.5 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest text-[#3A2823]/70 hover:text-[#3A2823] transition-colors"
      title={reduceMotion ? "Enable animations" : "Reduce motion for sensitivity"}
      aria-label="Toggle reduced motion"
    >
      <span className="text-sm">{reduceMotion ? "⚡" : "🌿"}</span>
      <span className="hidden sm:inline font-body text-[11px]">
        {reduceMotion ? "Motion: Off" : "Gentle Motion"}
      </span>
    </button>
  );
}
