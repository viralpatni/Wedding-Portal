import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Compass,
  Home,
  Mail,
  Calendar,
  Heart,
  Send,
  Sparkles,
  Flower2,
  Camera,
  MapPin,
  Languages
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { weddingConfig } from "@/config/weddingConfig";
import { useLanguage } from "@/context/LanguageContext";
import type { ShowerType } from "@/components/ui/FullPageShower";

interface NavItem {
  key: string;
  href: string;
  id: string;
  icon?: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { key: "navHome", href: "#hero", id: "hero", icon: <Home className="w-3.5 h-3.5" /> },
  { key: "navInvitation", href: "#invitation", id: "invitation", icon: <Mail className="w-3.5 h-3.5" /> },
  { key: "navEvents", href: "#events", id: "events", icon: <Calendar className="w-3.5 h-3.5" /> },
  { key: "navStory", href: "#story", id: "story", icon: <Heart className="w-3.5 h-3.5" /> },
  { key: "navLivePhotos", href: "#live-wall", id: "live-wall", icon: <Camera className="w-3.5 h-3.5" /> },
  { key: "navAlbums", href: "#albums", id: "albums", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { key: "navGallery", href: "#gallery", id: "gallery", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { key: "navRsvp", href: "#rsvp", id: "rsvp", icon: <Send className="w-3.5 h-3.5" /> }
];

export default function Navigation() {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

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

  const [activeShowerType, setActiveShowerType] = useState<ShowerType>("gulab");
  const [showShowerMenu, setShowShowerMenu] = useState(false);

  const handleTriggerShower = (type: ShowerType = "gulab") => {
    setActiveShowerType(type);
    setShowShowerMenu(false);
    if (window.triggerWeddingShower) {
      window.triggerWeddingShower(type);
    }
  };

  const handleQuickShower = () => {
    const types: ShowerType[] = ["gulab", "genda", "hearts"];
    const nextIdx = (types.indexOf(activeShowerType) + 1) % types.length;
    const nextType = types[nextIdx];
    handleTriggerShower(nextType);
  };

  return (
    <>
      {/* 1. Main Floating Glass-Pill Navbar (Top) */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] sm:max-w-none"
            aria-label="Ankit & Avani Wedding Navigation"
          >
            <div className="glass-card-strong px-3 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-[0_12px_32px_rgba(58,40,35,0.12)] border border-white/80 bg-white/80 backdrop-blur-xl rounded-full">
              {/* Couple Monogram Badge directing strictly to Admin */}
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-1.5 px-3 py-1 font-script text-2xl text-[#641E2B] font-bold hover:opacity-80 transition-opacity cursor-pointer"
                style={{ fontFamily: "'Pinyon Script', cursive" }}
                aria-label="AvNit Admin Portal"
                title="AvNit Admin Portal"
              >
                AvNit
              </button>

              <div className="hidden xl:block w-px h-4 bg-[#D4AF77]/30" />

              {/* Desktop Nav Items (visible on extra large screens 1200px+) */}
              <div className="hidden xl:flex items-center gap-1">
                {NAV_ITEMS.slice(0, 7).map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.href)}
                      className={`relative px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-body font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#3A211C] text-[#FFF8F0] shadow-sm"
                          : "text-[#3A211C]/70 hover:text-[#3A211C] hover:bg-[#D4AF77]/15"
                      }`}
                    >
                      {t(item.key)}
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

              {/* Language Switcher Pill Button (English / शुद्ध हिन्दी) */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FFF8F0] via-white to-[#FFF8F0] border border-[#D4AF77]/50 text-[#641E2B] text-xs font-semibold hover:border-[#641E2B] hover:shadow-sm transition-all"
                title="Switch Language / भाषा बदलें (हिन्दी / English)"
                aria-label="Toggle Language between Pure Hindi and English"
              >
                <Languages className="w-3.5 h-3.5 text-[#D4AF77]" />
                <span className="font-bold text-[11px] tracking-wide">
                  {language === "hi" ? "हिन्दी" : "English"}
                </span>
              </button>

              {/* Quick Flower / Heart Shower Action with Popover */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowShowerMenu((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F6D6DC]/50 hover:bg-[#F6D6DC] text-[#641E2B] text-[11px] font-body font-semibold uppercase tracking-wider transition-colors border border-[#D9A6A1]/40 cursor-pointer"
                  title="Flower & Heart Shower"
                >
                  <Flower2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">
                    {activeShowerType === "gulab" ? "🌹 " + t("showerPetals") : activeShowerType === "genda" ? "🌼 Genda" : "❤️ Hearts"}
                  </span>
                </button>

                <AnimatePresence>
                  {showShowerMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-[#D4AF77]/40 shadow-xl flex flex-col gap-1.5 min-w-[165px] z-50 text-left"
                    >
                      <button
                        onClick={() => handleTriggerShower("gulab")}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#641E2B] hover:bg-[#F6D6DC]/40 transition-colors cursor-pointer"
                      >
                        <span>🌹</span>
                        <span>Gulab Varsha</span>
                      </button>
                      <button
                        onClick={() => handleTriggerShower("genda")}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#B8935A] hover:bg-[#FFF8F0] transition-colors cursor-pointer"
                      >
                        <span>🌼</span>
                        <span>Genda Phool</span>
                      </button>
                      <button
                        onClick={() => handleTriggerShower("hearts")}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#8B2635] hover:bg-[#FBEBE8] transition-colors cursor-pointer"
                      >
                        <span>❤️</span>
                        <span>Romantic Hearts</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Circular Navigation Toggle Trigger */}
              <button
                onClick={() => setIsCircularMenuOpen((prev) => !prev)}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full text-[#3A211C] hover:bg-[#D4AF77]/20 transition-colors"
                title="Circular Navigation Ring"
                aria-label="Toggle circular quick navigation ring"
              >
                <Compass className="w-4 h-4 text-[#641E2B]" />
              </button>

              {/* Mobile & Tablet Hamburger Button (< 1200px) */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="xl:hidden p-2 rounded-full text-[#3A211C] hover:bg-black/5"
                aria-label="Toggle mobile & tablet menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Circular Navigation Dial Option (Radial Ring) */}
      <AnimatePresence>
        {isCircularMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-24 right-6 sm:right-10 z-50 w-64 h-64 rounded-full bg-white/85 backdrop-blur-xl border border-[#D4AF77]/50 shadow-2xl p-4 flex items-center justify-center"
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
                  {t(item.key)}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Responsive Mobile & Tablet Menu Drawer (< 1200px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="xl:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="xl:hidden fixed inset-x-4 top-20 z-50 max-w-lg mx-auto rounded-3xl bg-white/95 backdrop-blur-xl border border-[#D4AF77]/40 shadow-2xl p-6 max-h-[85vh] overflow-y-auto"
              role="menu"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF77]/20 mb-4">
                <div>
                  <span className="font-script text-2xl text-[#641E2B]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                    Ankit &amp; Avani
                  </span>
                  <p className="text-[10px] uppercase tracking-widest text-[#D4AF77] font-semibold">
                    {language === "hi" ? "शाही विवाह महोत्सव २०२७" : "Wedding Celebration · 2027"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLanguage}
                    className="px-2.5 py-1 rounded-full bg-[#FFF8F0] border border-[#D4AF77]/40 text-[#641E2B] text-xs font-semibold"
                  >
                    {language === "hi" ? "हिन्दी" : "English"}
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full text-[#3A211C]/60 hover:text-[#3A211C] hover:bg-black/5"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
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
                          ? "bg-[#641E2B] text-white shadow-sm"
                          : "text-[#3A211C] hover:bg-[#FFF8F0]"
                      }`}
                    >
                      {t(item.key)}
                    </button>
                  );
                })}
              </div>

              {/* Quick Flower & Heart Shower Options in mobile drawer */}
              <div className="pt-3 space-y-1.5">
                <p className="text-[10px] uppercase tracking-widest text-[#641E2B] font-semibold text-center mb-1">
                  Full Page Flower Shower
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleTriggerShower("gulab");
                    }}
                    className="py-2 rounded-xl bg-[#F6D6DC]/60 text-[#641E2B] text-xs font-semibold flex flex-col items-center gap-0.5 border border-[#D9A6A1]/40 hover:bg-[#F6D6DC]"
                  >
                    <span className="text-sm">🌹</span>
                    <span className="text-[10px]">Gulab</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleTriggerShower("genda");
                    }}
                    className="py-2 rounded-xl bg-[#FFF8F0] text-[#B8935A] text-xs font-semibold flex flex-col items-center gap-0.5 border border-[#D4AF77]/40 hover:bg-[#FDF5EB]"
                  >
                    <span className="text-sm">🌼</span>
                    <span className="text-[10px]">Genda</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleTriggerShower("hearts");
                    }}
                    className="py-2 rounded-xl bg-[#FBEBE8] text-[#8B2635] text-xs font-semibold flex flex-col items-center gap-0.5 border border-[#B76E79]/40 hover:bg-[#F7D8DE]"
                  >
                    <span className="text-sm">❤️</span>
                    <span className="text-[10px]">Hearts</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#D4AF77]/20 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#641E2B] font-semibold font-body">
                <span>26 January 2027</span>
                <span>{weddingConfig.hashtag}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
