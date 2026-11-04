import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Ambient layer: floating rose petals, bokeh orbs, sparkles.
 * Very subtle — fixed, pointer-events-none, z-index above canvas but below content.
 */
export default function AmbientLayer({ reduceMotion }: { reduceMotion: boolean }) {
  if (reduceMotion) return null;

  const PETALS = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + (i * 7.5) % 90}%`,
    delay: `${(i * 0.8) % 6}s`,
    duration: `${6 + (i % 4)}s`,
    size: 8 + (i % 5) * 2,
  }));

  const BOKEH = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${10 + i * 15}%`,
    top: `${15 + (i % 3) * 25}%`,
    size: 80 + i * 40,
    color: ["#F6D6DC", "#FFDCC8", "#E9DDF5", "#EBD3B5"][i % 4],
    delay: i * 0.8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {/* Bokeh orbs */}
      {BOKEH.map((orb) => (
        <motion.div
          key={`bokeh-${orb.id}`}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}50 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 5 + orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Rose petals */}
      {PETALS.map((petal) => (
        <motion.div
          key={`petal-${petal.id}`}
          className="absolute"
          style={{
            left: petal.left,
            top: "-20px",
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, 20, -10, 15, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: parseFloat(petal.duration),
            repeat: Infinity,
            delay: parseFloat(petal.delay),
            ease: "linear",
          }}
        >
          {/* SVG petal */}
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 20 28"
            fill="none"
          >
            <ellipse
              cx="10"
              cy="14"
              rx="8"
              ry="13"
              fill="#F6D6DC"
              fillOpacity="0.7"
              transform="rotate(-15 10 14)"
            />
          </svg>
        </motion.div>
      ))}

      {/* Sparkles */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${12 + i * 11}%`,
            top: `${20 + (i % 5) * 15}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8">
            <path
              d="M4 0L4.5 3.5L8 4L4.5 4.5L4 8L3.5 4.5L0 4L3.5 3.5Z"
              fill="#B8935A"
              fillOpacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
