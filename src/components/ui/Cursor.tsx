import { useEffect, useRef } from "react";

/**
 * Custom rose-gold heart cursor for desktop.
 * Automatically disabled on touch devices.
 */
export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    };

    const onDown = () => cursor.classList.add("scale-75");
    const onUp = () => cursor.classList.remove("scale-75");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Touch check — render null on touch-only devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Main heart cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none transition-transform duration-75"
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EBC4B3" />
              <stop offset="100%" stopColor="#B76E79" />
            </linearGradient>
            <filter id="cglow">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path
            d="M12 21C12 21 2 14 2 8C2 5 4.5 3 7 3C9 3 11 4.5 12 6C13 4.5 15 3 17 3C19.5 3 22 5 22 8C22 14 12 21 12 21Z"
            fill="url(#cg)"
            filter="url(#cglow)"
            opacity="0.9"
          />
        </svg>

        {/* Sparkle trail */}
        <div className="absolute -inset-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-line animate-ping"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 30}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
                opacity: 0.5 - i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
