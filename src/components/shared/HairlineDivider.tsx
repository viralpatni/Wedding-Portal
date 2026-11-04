import React from "react";

interface HairlineDividerProps {
  className?: string;
  withDiamond?: boolean;
}

export default function HairlineDivider({
  className = "",
  withDiamond = false,
}: HairlineDividerProps) {
  return (
    <div className={`relative flex items-center justify-center my-8 ${className}`}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B8935A]/40 to-transparent" />
      {withDiamond && (
        <div className="absolute px-3 bg-[#FBF7F2] text-[#B76E79]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0L12 6L6 12L0 6Z" />
          </svg>
        </div>
      )}
    </div>
  );
}
