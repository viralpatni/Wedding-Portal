import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { weddingConfig } from "@/config/weddingConfig";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "Invitation", href: "#invitation", id: "invitation" },
  { label: "Events", href: "#events", id: "events" },
  { label: "Our Story", href: "#story", id: "story" },
  { label: "Albums", href: "#albums", id: "albums" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Wedding Film", href: "#video", id: "video" }
];

export default function Navigation() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCircularMenuOpen, setIsCircularMenuOpen] = useState(false);

  // Auto hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY || currentY < 120);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Section observer for active indicator
  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) => document.querySelector(item.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation (Tab and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsCircularMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsCircularMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 1. Main Floating Glass-Pill Navbar (Desktop & Tablet) */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[94vw] sm:max-w-none"
            aria-label="Ankit & Avani Wedding Navigation"
          >
            <div className="glass-card-strong px-3 py-2 flex items-center gap-1 sm:gap-2 shadow-[0_12px_32px_rgba(58,40,35,0.12)] border border-white/80 bg-white/70 backdrop-blur-md rounded-full">
              {/* Couple Monogram Badge directing to Admin */}
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-1.5 px-3 py-1 font-script text-2xl text-[#641E2B] font-bold hover:opacity-80 transition-opacity cursor-pointer"
                style={{ fontFamily: "'Pinyon Script', cursive" }}
                aria-label="AvNit"
                title="AvNit"
              >
                AvNit
              </button>

              <div className="hidden lg:block w-px h-4 bg-[#D4AF77]/30" />

              {/* Desktop Nav Items */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.href)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest font-body font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#3A211C] text-[#FFF8F0] shadow-sm"
                          : "text-[#3A211C]/70 hover:text-[#3A211C] hover:bg-[#D4AF77]/15"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="active-pill-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF77]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Circular Navigation Toggle Trigger */}
              <button
                onClick={() => setIsCircularMenuOpen((prev) => !prev)}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full text-[#3A211C] hover:bg-[#D4AF77]/20 transition-colors"
                title="Circular Navigation Ring"
                aria-label="Toggle circular quick navigation ring"
              >
                <Compass className="w-4 h-4 text-[#641E2B]" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-full text-[#3A211C] hover:bg-black/5"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 2. Circular Navigation Dial Option (Radial Ring) */}
      <AnimatePresence>
        {isCircularMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-24 right-10 z-50 w-64 h-64 rounded-full bg-white/85 backdrop-blur-xl border border-[#D4AF77]/50 shadow-2xl p-4 flex items-center justify-center"
            role="dialog"
            aria-label="Circular Navigation Dial"
          >
            {/* Center Monogram */}
            <button
              onClick={() => {
                setIsCircularMenuOpen(false);
                navigate("/admin");
              }}
              className="w-16 h-16 rounded-full bg-[#641E2B] text-white flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform"
              title="AvNit"
            >
              <span className="font-script text-xl" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                AvNit
              </span>
            </button>

            {/* Circular Orbit Buttons */}
            {NAV_ITEMS.map((item, idx) => {
              const total = NAV_ITEMS.length;
              const angle = (idx * 360) / total - 90; // degrees
              const radius = 95; // px from center
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`absolute px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-body font-semibold transition-transform hover:scale-110 shadow-sm ${
                    isActive
                      ? "bg-[#3A211C] text-[#FFF8F0] border border-[#D4AF77]"
                      : "bg-white text-[#3A211C] border border-[#D4AF77]/40 hover:bg-[#FFF8F0]"
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Responsive Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-4 top-20 z-50 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#D4AF77]/40 shadow-2xl p-6"
            role="menu"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF77]/20 mb-4">
              <span className="font-script text-2xl text-[#641E2B]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                Ankit &amp; Avani
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-[#3A211C]/60 hover:text-[#3A211C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-left px-4 py-3 rounded-2xl text-xs uppercase tracking-widest font-body font-medium transition-all ${
                      isActive
                        ? "bg-[#641E2B] text-white"
                        : "text-[#3A211C] hover:bg-[#FFF8F0]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 mt-4 border-t border-[#D4AF77]/20 text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#641E2B] font-semibold font-body">
                26 January 2027 · {weddingConfig.hashtag}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

