import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface PillButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "gold" | "ghost";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function PillButton({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}: PillButtonProps) {
  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "bg-[#3A2823] text-[#FBF7F2] hover:bg-[#3A2823]/90 shadow-[0_4px_24px_rgba(58,40,35,0.2)]";
  } else if (variant === "gold") {
    variantClasses =
      "text-white bg-gradient-to-r from-[#D9A38F] via-[#EBC4B3] to-[#B76E79] shadow-[0_4px_24px_rgba(184,147,90,0.3)] hover:brightness-105";
  } else {
    variantClasses =
      "border border-[#B8935A]/50 text-[#3A2823] hover:border-[#B8935A] hover:bg-[#EBD3B5]/20";
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition-all duration-300 ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
