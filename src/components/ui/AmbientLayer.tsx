import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Ambient layer: floating rose petals, bokeh orbs, sparkles.
 * Optimized for 60fps on mobile/tablet — pre-softened radial gradients, no GPU-heavy live filter blurs.
 */
export default function AmbientLayer({ reduceMotion }: { reduceMotion: boolean }) {
  if (reduceMotion) return null;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const petalCount = isMobile ? 5 : 10;
  const PETALS = Array.from({ length: petalCount }, (_, i) => ({
    id: i,
    left: `${10 + (i * 18) % 85}%`,
    delay: `${(i * 1.2) % 6}s`,
    duration: `${7 + (i % 3)}s`,
    size: 10 + (i % 4) * 2,
  }));

  const orbCount = isMobile ? 3 : 5;
  const BOKEH = Array.from({ length: orbCount }, (_, i) => ({
    id: i,
    left: `${12 + i * 28}%`,
    top: `${20 + (i % 3) * 25}%`,
    size: isMobile ? 90 + i * 30 : 120 + i * 40,
    color: ["#F6D6DC", "#FFDCC8", "#E9DDF5", "#EBD3B5"][i % 4],
    delay: i * 0.9,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {/* Bokeh orbs with pre-diffused radial gradient (zero CSS blur filter overhead) */}
      {BOKEH.map((orb) => (
        <motion.div
          key={`bokeh-${orb.id}`}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}45 0%, ${orb.color}15 45%, transparent 70%)`,
            transform: "translateZ(0)",
            willChange: "transform, opacity",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{
            duration: 6 + orb.delay,
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
            top: "-25px",
            transform: "translateZ(0)",
            willChange: "transform, opacity",
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, 15, -8, 12, 0],
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
              fillOpacity="0.75"
              transform="rotate(-15 10 14)"
            />
          </svg>
        </motion.div>
      ))}

      {/* Subtle Sparkles */}
      {Array.from({ length: isMobile ? 4 : 7 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 14}%`,
            top: `${25 + (i % 4) * 18}%`,
            transform: "translateZ(0)",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8">
            <path
              d="M4 0L4.5 3.5L8 4L4.5 4.5L4 8L3.5 4.5L0 4L3.5 3.5Z"
              fill="#D4AF77"
              fillOpacity="0.7"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

