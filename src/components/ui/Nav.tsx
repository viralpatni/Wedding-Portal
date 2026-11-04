import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";

const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Countdown", href: "#countdown" },
  { label: "Memories", href: "#memories" },
  { label: "Events", href: "#events" },
  { label: "RSVP", href: "#rsvp" },
];

/**
 * Sticky glass-pill navigation bar.
 * Hides on scroll down, reappears on scroll up.
 */
export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY || currentY < 100);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Intersection observer for active section
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Wedding site navigation"
        >
          <div className="glass-card-strong px-2 py-2 flex items-center gap-1">
            {/* Logo mark */}
            <span className="script-name text-lg px-3 text-rose-dark hidden md:block">
              A&P
            </span>
            <div className="hidden md:block w-px h-4 bg-gold-line/30" />

            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 rounded-pill text-xs uppercase tracking-widest font-body font-medium transition-all duration-300
                    ${isActive
                      ? "bg-espresso text-pearl"
                      : "text-espresso/70 hover:text-espresso hover:bg-champagne/40"
                    }`}
                  aria-label={`Go to ${link.label} section`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-gold"
                      layoutId="nav-dot"
                    />
                  )}
                </button>
              );
            })}

            {/* Hashtag */}
            <span className="hidden lg:block label text-espresso/40 ml-2 px-3">
              {config.hashtag}
            </span>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
