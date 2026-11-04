import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "default" | "strong" | "tinted";
  className?: string;
  glow?: boolean;
}

export default function GlassCard({
  children,
  variant = "default",
  className = "",
  glow = false,
  ...props
}: GlassCardProps) {
  const baseVariant =
    variant === "strong"
      ? "bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_8px_32px_0_rgba(183,110,121,0.08)]"
      : variant === "tinted"
      ? "bg-[#F6D6DC]/30 backdrop-blur-md border border-[#F6D6DC]/60 shadow-[0_8px_32px_0_rgba(217,163,143,0.12)]"
      : "bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(58,40,35,0.05)]";

  return (
    <motion.div
      className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 ${baseVariant} ${className}`}
      {...props}
    >
      {glow && (
        <div
          className="absolute -inset-0.5 rounded-3xl opacity-30 blur-xl pointer-events-none -z-10"
          style={{
            background: "linear-gradient(135deg, #D9A38F, #F6D6DC, #EBD3B5)",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
