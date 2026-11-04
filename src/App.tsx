import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLenis } from "@/hooks/useLenis";
import { sanitizeGuestName } from "@/lib/sanitize";
import { config } from "@/lib/config";
import { weddingConfig } from "@/config/weddingConfig";
import { AdminProvider } from "@/context/AdminContext";

// Admin Pages
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

// UI Components
import Navigation from "@/components/Navigation";
import Cursor from "@/components/ui/Cursor";
import AmbientLayer from "@/components/ui/AmbientLayer";
import MusicPlayer from "@/components/ui/MusicPlayer";
import ReduceMotionToggle from "@/components/shared/ReduceMotionToggle";
import FullPageShower from "@/components/ui/FullPageShower";

// Section Components
import Loader from "@/components/sections/Loader";
import IntroGate from "@/components/sections/IntroGate";
import HeroSection from "@/components/HeroSection";
import Countdown from "@/components/Countdown";
import Invitation from "@/components/Invitation";
import WeddingEvents from "@/components/WeddingEvents";
import LoveStory from "@/components/LoveStory";
import PhotoAlbum from "@/components/PhotoAlbum";
import WeddingGallery from "@/components/WeddingGallery";
import WeddingVideo from "@/components/WeddingVideo";
import PersonalMessage from "@/components/PersonalMessage";
import BlessingsWall from "@/components/sections/BlessingsWall";
import LoveExtras from "@/components/sections/LoveExtras";
import RSVP from "@/components/sections/RSVP";
import ClosingSection from "@/components/ClosingSection";

function WeddingWebsite() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGateOpen, setIsGateOpen] = useState(true);
  const [gyroscopeEnabled, setGyroscopeEnabled] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [guestName, setGuestName] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize smooth scrolling with Lenis
  useLenis(reduceMotion);

  // Parse & sanitize URL ?guest= param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("guest");
    if (raw) {
      setGuestName(sanitizeGuestName(raw));
    }
  }, []);

  // Initial loader duration (1.8s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingMusic(true);
    }
  };

  const handleGateBegin = () => {
    setIsGateOpen(false);
    setIsPlayingMusic(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8F0] text-[#3A211C] overflow-x-hidden grain-overlay font-body">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src={config.audioSrc}
        loop
        preload="auto"
        onError={() => {
          // If local audio file not yet placed, fail silently without error
        }}
      />

      {/* Initial Loader */}
      <Loader isVisible={isLoading} progress={100} />

      {/* Intro Gate with audio unlock & gyroscope request */}
      {!isLoading && isGateOpen && (
        <IntroGate
          onBegin={handleGateBegin}
          audioRef={audioRef}
          onGyroscopeEnabled={() => setGyroscopeEnabled(true)}
        />
      )}

      {/* Global Interactive Layers */}
      <FullPageShower />
      <Cursor />
      <AmbientLayer reduceMotion={reduceMotion} />
      <Navigation />
      <MusicPlayer
        audioRef={audioRef}
        isPlaying={isPlayingMusic}
        onToggle={toggleMusic}
      />
      <ReduceMotionToggle
        reduceMotion={reduceMotion}
        onToggle={() => setReduceMotion((prev) => !prev)}
      />

      {/* Main Website Sections */}
      <main id="main-content" role="main">
        {/* SECTION 1: CINEMATIC HERO */}
        <HeroSection
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={toggleMusic}
          gyroscopeEnabled={gyroscopeEnabled}
        />

        {/* SECTION 2 & 4: WEDDING COUNTDOWN & CELEBRATION DETAILS */}
        <Countdown />

        {/* SECTION 3: WEDDING INVITATION (INTERACTIVE 3D ENVELOPE) */}
        <Invitation />

        {/* SECTION 5: WEDDING EVENTS TIMELINE */}
        <WeddingEvents />

        {/* SECTION 6: OUR LOVE STORY */}
        <LoveStory />

        {/* SECTION 7: PRE-WEDDING 3D PHOTO ALBUM */}
        <PhotoAlbum />

        {/* SECTION 8: WEDDING PHOTO GALLERY */}
        <WeddingGallery />

        {/* SECTION 9: WEDDING FILM & CINEMATIC VIDEO */}
        <WeddingVideo />

        {/* SECTION 10: PERSONAL MESSAGE FROM PATNI FAMILY */}
        <PersonalMessage />

        {/* CULTURAL WEDDING CELEBRATIONS */}
        <BlessingsWall />
        <LoveExtras />
        <RSVP initialGuestName={guestName} />

        {/* SECTION 11: FINAL CLOSING SECTION */}
        <ClosingSection />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<WeddingWebsite />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}
