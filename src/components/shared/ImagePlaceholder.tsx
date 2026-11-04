import { motion } from "framer-motion";

interface ImagePlaceholderProps {
  /** Alt text / accessible description for the placeholder */
  alt: string;
  /** Short label shown inside the placeholder box */
  caption?: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[3/4]" */
  aspect?: string;
  /** Additional className for the outer wrapper */
  className?: string;
  /** Icon variant to show */
  icon?: "camera" | "photo" | "film" | "portrait";
}

const icons = {
  camera: (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#D4AF77]"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  photo: (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#D4AF77]"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  film: (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#D4AF77]"
    >
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  ),
  portrait: (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#D4AF77]"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

/**
 * ImagePlaceholder — Renders an elegant placeholder whenever an image
 * source is empty. Never shows a broken image icon.
 * All photographs can be replaced via src/config/weddingImages.ts.
 */
export default function ImagePlaceholder({
  alt,
  caption,
  aspect = "aspect-square",
  className = "",
  icon = "camera",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden ${aspect} ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Warm gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 40%, #EDD5C5 70%, #E8C5B8 100%)",
        }}
      />

      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #D4AF77 0px,
            #D4AF77 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      {/* Gold border frame */}
      <div className="absolute inset-4 border border-[#D4AF77]/30 rounded-sm pointer-events-none" />
      <div className="absolute inset-6 border border-[#D4AF77]/15 rounded-sm pointer-events-none" />

      {/* Corner ornaments */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-4 h-4 pointer-events-none`}>
          <div
            className="w-full h-full border-[#D4AF77]/50"
            style={{
              borderTopWidth: i < 2 ? "1px" : "0",
              borderBottomWidth: i >= 2 ? "1px" : "0",
              borderLeftWidth: i % 2 === 0 ? "1px" : "0",
              borderRightWidth: i % 2 === 1 ? "1px" : "0",
            }}
          />
        </div>
      ))}

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        {/* Animated icon */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {icons[icon]}
        </motion.div>

        {/* Caption text */}
        {caption && (
          <div className="space-y-1">
            <p
              className="font-script text-[#3A211C]/60 text-sm leading-tight"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              {caption}
            </p>
            <p className="font-body text-[#3A211C]/40 text-[10px] uppercase tracking-widest">
              Photograph Coming Soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

