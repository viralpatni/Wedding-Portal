import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Music,
  Disc,
  Send,
  CheckCircle2,
  Flame,
  Volume2,
  RefreshCw,
  Gift,
  Star
} from "lucide-react";
import quizData from "@/data/quiz.json";
import { config } from "@/lib/config";
import PillButton from "@/components/shared/PillButton";
import confetti from "canvas-confetti";

// Romantic Love Oracle Prophecies for Ankit & Avani
const ROMANTIC_ORACLES = [
  {
    prophecy: "Two souls, one sacred destiny — written in the stars long before their paths first crossed.",
    theme: "Eternal Destiny",
    icon: "✨"
  },
  {
    prophecy: "Avani's radiant laughter will forever be Ankit's favorite melody, and his gentle loyalty her unshakeable home.",
    theme: "Soul Connection",
    icon: "🕊️"
  },
  {
    prophecy: "May your love stand as majestic as the palaces of Rajasthan and as tender as morning dew upon fresh rose petals.",
    theme: "Royal Grace",
    icon: "🏰"
  },
  {
    prophecy: "Through late-night chai, spontaneous road trips, and quiet hand-holds across roomfuls of family — you two will always choose each other.",
    theme: "Everyday Magic",
    icon: "☕"
  },
  {
    prophecy: "A partnership where friendship comes first, dreams multiply when shared, and joy deepens with every tomorrow.",
    theme: "Boundless Love",
    icon: "💍"
  },
  {
    prophecy: "In each other, you have found not just a life partner, but your sacred sanctuary, your mirror, and your greatest adventure.",
    theme: "True Sanctuary",
    icon: "🪔"
  }
];

// Romantic Sangeet Playlist Dedications
const SANGEET_SONGS = [
  { title: "Kesariya", film: "Brahmāstra", mood: "Pure Love Anthem", year: "2022" },
  { title: "Tere Hawaale", film: "Laal Singh Chaddha", mood: "Soulful Devotion", year: "2023" },
  { title: "Rang Sharbaton Ka", film: "Phata Poster Nikhla Hero", mood: "Sweet Romance", year: "2013" },
  { title: "Raabta (Kehte Hain Khuda Ne)", film: "Agent Vinod", mood: "Destined Connection", year: "2012" },
  { title: "Kudmayi (Royal Vivah Version)", film: "Rocky Aur Rani", mood: "Grand Vivah Special", year: "2023" },
  { title: "Chaleya", film: "Jawan", mood: "Joyous Couple Dance", year: "2023" }
];

// Romantic Milestones & Sweet Secrets
const LOVE_MILESTONES = [
  {
    title: "The First Spark",
    subtitle: "A Glance That Changed Everything",
    detail: "A moment of gentle curiosity that instantly felt like meeting an old soul. From that first warm smile, destiny silently set their forever into motion.",
    motif: "💫"
  },
  {
    title: "Hours Like Seconds",
    subtitle: "Endless Chai & Late Night Talks",
    detail: "Where conversations never ran dry. Talking about childhood memories, family traditions, and unspoken dreams until the stars surrendered to the sunrise.",
    motif: "☕"
  },
  {
    title: "The Silent Certainty",
    subtitle: "Knowing Before Any Words Were Said",
    detail: "That quiet, golden afternoon where they both realized home was no longer a place — it was each other. The heart had already said yes.",
    motif: "💍"
  },
  {
    title: "The Sacred Vows",
    subtitle: "26 January 2027",
    detail: "Under the sacred mandap, surrounded by the blessings of the Patni family, taking the seven sacred pheras to walk as one for all lifetimes.",
    motif: "🪔"
  }
];

export default function LoveExtras() {
  // ─────────────────────────────────────────────────────────────
  // 1. COUPLE TRIVIA QUIZ
  // ─────────────────────────────────────────────────────────────
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const isCorrect = idx === quizData[currentQIndex].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({ particleCount: 25, spread: 55, origin: { y: 0.6 } });
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < quizData.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsQuizCompleted(true);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 2. VIRTUAL ROSE & FLOWER SHOWER (Shubh Phoolon Ki Varsha)
  // ─────────────────────────────────────────────────────────────
  const [showerCount, setShowerCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("avnit_flower_shower_count");
      return stored ? parseInt(stored, 10) : 2480;
    } catch {
      return 2480;
    }
  });

  const [activeShowerType, setActiveShowerType] = useState<"gulab" | "genda" | "hearts" | "gold">("gulab");
  const [isShowering, setIsShowering] = useState(false);

  const triggerFloralShower = (type: "gulab" | "genda" | "hearts" | "gold") => {
    setActiveShowerType(type);
    setIsShowering(true);
    const newCount = showerCount + 10;
    setShowerCount(newCount);
    try {
      localStorage.setItem("avnit_flower_shower_count", newCount.toString());
    } catch {}

    // Full-page canvas shower cascade
    if (typeof window !== "undefined" && window.triggerWeddingShower) {
      window.triggerWeddingShower(type);
    }

    // Local confetti accompaniment
    if (type === "gulab") {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#800020", "#A51C30", "#C70039", "#8B0000"]
      });
    } else if (type === "genda") {
      confetti({
        particleCount: 40,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#F9A825", "#F57F17", "#FF8C00", "#FFB300"]
      });
    } else if (type === "hearts") {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E53935", "#D32F2F", "#FF1744", "#C62828"]
      });
    } else {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D4AF77", "#FFE082", "#FFF8E1", "#B8935A"]
      });
    }

    setTimeout(() => setIsShowering(false), 3800);
  };

  // ─────────────────────────────────────────────────────────────
  // 3. SANGEET JUKEBOX & SONG DEDICATIONS
  // ─────────────────────────────────────────────────────────────
  const [selectedSongIdx, setSelectedSongIdx] = useState(0);
  const [dedicationName, setDedicationName] = useState("");
  const [dedicationNote, setDedicationNote] = useState("");
  const [hasDedicated, setHasDedicated] = useState(false);
  const [isPlayingJukebox, setIsPlayingJukebox] = useState(false);

  const handleDedicateSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dedicationName.trim()) return;
    setHasDedicated(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#D4AF77", "#641E2B", "#B76E79"]
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 4. ROMANTIC DESTINY ORACLE
  // ─────────────────────────────────────────────────────────────
  const [oracleIdx, setOracleIdx] = useState(0);
  const [isOracleFlipping, setIsOracleFlipping] = useState(false);

  const nextOracle = () => {
    setIsOracleFlipping(true);
    setTimeout(() => {
      setOracleIdx((prev) => (prev + 1) % ROMANTIC_ORACLES.length);
      setIsOracleFlipping(false);
      confetti({ particleCount: 20, spread: 40, origin: { y: 0.6 } });
    }, 280);
  };

  // ─────────────────────────────────────────────────────────────
  // 5. SWEET SECRETS MILESTONES (Active selected card)
  // ─────────────────────────────────────────────────────────────
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0);

  return (
    <section
      id="extras"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#FDF7F2] to-[#FFF8F0] overflow-hidden"
      aria-label="Romantic Wedding Celebrations & Experiences"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-[110px] opacity-25 bg-[#D4AF77] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full blur-[110px] opacity-20 bg-[#641E2B] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
            <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#641E2B]">
              Celebratory Keepsakes
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A211C] mb-4"
          >
            Celebrations of Love
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            Playful trivia, virtual rose showers, Sangeet dance dedications, romantic whispers of destiny, and tender milestone memories dedicated to Ankit &amp; Avani.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* ========================================================= */}
          {/* BENTO CARD 1: THE COUPLE TRIVIA QUIZ (Spans 2 cols on lg) */}
          {/* ========================================================= */}
          <div className="lg:col-span-2 bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_12px_35px_rgba(58,33,28,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full bg-[#EBD3B5]/30 text-[#641E2B] text-xs font-semibold uppercase tracking-wider font-body">
                  🧠 The Couple Trivia Quiz
                </span>
                <span className="text-xs text-[#B76E79] font-body font-semibold">
                  Score: {score}/{quizData.length}
                </span>
              </div>

              {!isQuizCompleted ? (
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#3A211C]/50 font-body mb-2">
                    Question {currentQIndex + 1} of {quizData.length}
                  </p>
                  <h3 className="font-display italic text-2xl sm:text-3xl text-[#3A211C] mb-6">
                    {quizData[currentQIndex].question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {quizData[currentQIndex].options.map((opt, idx) => {
                      const isChosen = selectedOption === idx;
                      const isCorrect = idx === quizData[currentQIndex].correct;

                      let btnStyle = "bg-[#FFFDFB] border-[#D4AF77]/40 text-[#3A211C] hover:border-[#D4AF77]";
                      if (selectedOption !== null) {
                        if (isCorrect) btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900";
                        else if (isChosen) btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-body transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-[#F6D6DC]/30 border border-[#F6D6DC] mb-2 flex items-center justify-between"
                    >
                      <p className="text-xs text-[#3A211C] font-body">
                        💡 {quizData[currentQIndex].funFact}
                      </p>
                      <button
                        onClick={handleNextQuestion}
                        className="ml-3 px-4 py-1.5 rounded-full bg-[#641E2B] text-white text-xs font-body uppercase tracking-wider hover:bg-[#4E1420] transition-colors shadow-sm shrink-0"
                      >
                        {currentQIndex < quizData.length - 1 ? "Next →" : "See Result ✦"}
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* QUIZ RESULT */
                <div className="text-center py-8">
                  <span className="text-5xl mb-3 block">🏆</span>
                  <h3 className="font-display italic text-3xl text-[#3A211C] mb-2">
                    You Scored {score} out of {quizData.length}!
                  </h3>
                  <p className="text-sm text-[#3A211C]/75 font-body max-w-md mx-auto mb-6">
                    {score >= 6
                      ? `Incredible! You know ${config.groom} & ${config.bride} like the back of your hand! ❤️`
                      : `A wonderful try! Get ready to discover even more fun stories at the Sangeet night! 💃`}
                  </p>
                  <button
                    onClick={() => {
                      setCurrentQIndex(0);
                      setSelectedOption(null);
                      setScore(0);
                      setIsQuizCompleted(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#641E2B] text-white text-xs font-body uppercase tracking-wider hover:bg-[#4E1420] transition-colors shadow-md cursor-pointer"
                  >
                    Play Again ↻
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* BENTO CARD 2: VIRTUAL ROSE & FLOWER SHOWER                */}
          {/* ========================================================= */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_12px_35px_rgba(58,33,28,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#F6D6DC]/60 text-[#641E2B] text-xs font-semibold uppercase tracking-wider font-body">
                  🌸 Shubh Varsha
                </span>
                <span className="text-[11px] text-[#D4AF77] font-semibold uppercase tracking-wider font-body">
                  Blessings
                </span>
              </div>

              <h3 className="font-display italic text-2xl text-[#3A211C] mb-1">
                Shower of Petals
              </h3>
              <p className="text-xs text-[#3A211C]/65 font-body mb-5">
                Send virtual blessing showers of roses and marigolds to celebrate the couple!
              </p>

              {/* Counter Display */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF9F5] to-[#FBECE8] border border-[#D4AF77]/30 text-center mb-5">
                <span className="text-[10px] uppercase tracking-widest text-[#641E2B] font-semibold block mb-0.5">
                  Total Petals Showered with Love
                </span>
                <motion.p
                  key={showerCount}
                  initial={{ scale: 1.15, color: "#641E2B" }}
                  animate={{ scale: 1, color: "#3A211C" }}
                  className="font-display italic text-4xl text-[#3A211C]"
                >
                  {showerCount.toLocaleString()}
                </motion.p>
                <span className="text-[10px] text-[#3A211C]/50 italic">
                  Blessings showered by family &amp; friends
                </span>
              </div>

              {/* Shower Type Buttons Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <button
                  type="button"
                  onClick={() => triggerFloralShower("gulab")}
                  className={`p-2.5 rounded-xl border text-xs font-body font-medium flex items-center justify-center gap-1.5 transition-all ${
                    activeShowerType === "gulab"
                      ? "bg-[#641E2B] text-white border-[#641E2B] shadow-sm"
                      : "bg-[#FFFDFB] text-[#3A211C] border-[#D4AF77]/30 hover:bg-[#F6D6DC]/30"
                  }`}
                >
                  <span>🌹</span>
                  <span>Gulab Varsha</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerFloralShower("genda")}
                  className={`p-2.5 rounded-xl border text-xs font-body font-medium flex items-center justify-center gap-1.5 transition-all ${
                    activeShowerType === "genda"
                      ? "bg-[#F9A825] text-white border-[#F9A825] shadow-sm"
                      : "bg-[#FFFDFB] text-[#3A211C] border-[#D4AF77]/30 hover:bg-[#FFF9C4]/40"
                  }`}
                >
                  <span>🌼</span>
                  <span>Genda Phool</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerFloralShower("hearts")}
                  className={`p-2.5 rounded-xl border text-xs font-body font-medium flex items-center justify-center gap-1.5 transition-all ${
                    activeShowerType === "hearts"
                      ? "bg-[#E53935] text-white border-[#E53935] shadow-sm"
                      : "bg-[#FFFDFB] text-[#3A211C] border-[#D4AF77]/30 hover:bg-[#FFEBEE]/50"
                  }`}
                >
                  <span>💖</span>
                  <span>Red Hearts</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerFloralShower("gold")}
                  className={`p-2.5 rounded-xl border text-xs font-body font-medium flex items-center justify-center gap-1.5 transition-all ${
                    activeShowerType === "gold"
                      ? "bg-[#B8935A] text-white border-[#B8935A] shadow-sm"
                      : "bg-[#FFFDFB] text-[#3A211C] border-[#D4AF77]/30 hover:bg-[#FFF8E1]/50"
                  }`}
                >
                  <span>✨</span>
                  <span>Sona Rupa</span>
                </button>
              </div>
            </div>

            <PillButton
              variant="gold"
              onClick={() => triggerFloralShower(activeShowerType)}
              disabled={isShowering}
              className="w-full justify-center py-2.5 text-xs font-semibold"
            >
              {isShowering ? "Showering Blessings… ✨" : "Shower Ankit & Avani Now ✦"}
            </PillButton>
          </div>

          {/* ========================================================= */}
          {/* BENTO CARD 3: SANGEET JUKEBOX & SONG DEDICATIONS          */}
          {/* ========================================================= */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_12px_35px_rgba(58,33,28,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#EBD3B5]/35 text-[#641E2B] text-xs font-semibold uppercase tracking-wider font-body">
                  🎶 Sangeet Jukebox
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF77] font-semibold font-body">
                  Dance Night 2027
                </span>
              </div>

              <h3 className="font-display italic text-2xl text-[#3A211C] mb-1">
                Dedicate a Song
              </h3>
              <p className="text-xs text-[#3A211C]/65 font-body mb-4">
                Pick a romantic anthem to be played for {config.groom} &amp; {config.bride} during their Sangeet evening!
              </p>

              {/* Spinning Vinyl Record Visual */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#241310] via-[#3A211C] to-[#241310] text-white mb-4 shadow-sm">
                <motion.div
                  animate={{ rotate: isPlayingJukebox ? 360 : 0 }}
                  transition={{ duration: 3, repeat: isPlayingJukebox ? Infinity : 0, ease: "linear" }}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-black via-[#3A211C] to-[#D4AF77] flex items-center justify-center border border-[#D4AF77]/50 shrink-0"
                >
                  <Disc className="w-6 h-6 text-[#D4AF77]" />
                </motion.div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate text-[#D4AF77]">
                    {SANGEET_SONGS[selectedSongIdx].title}
                  </p>
                  <p className="text-[10px] text-white/70 truncate">
                    {SANGEET_SONGS[selectedSongIdx].film} · {SANGEET_SONGS[selectedSongIdx].mood}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlayingJukebox(!isPlayingJukebox)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF77] shrink-0"
                  title="Toggle Jukebox Rhythm"
                >
                  <Music className="w-4 h-4" />
                </button>
              </div>

              {/* Song Select Carousel Pills */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-4">
                {SANGEET_SONGS.map((song, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedSongIdx(i);
                      setIsPlayingJukebox(true);
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-body whitespace-nowrap transition-all ${
                      selectedSongIdx === i
                        ? "bg-[#641E2B] text-white shadow-sm font-medium"
                        : "bg-[#FFFDFB] border border-[#D4AF77]/30 text-[#3A211C]/75 hover:bg-[#FFF8F0]"
                    }`}
                  >
                    {song.title}
                  </button>
                ))}
              </div>

              {/* Dedication Form */}
              {!hasDedicated ? (
                <form onSubmit={handleDedicateSong} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Kabir, Aunt Sunita)"
                    value={dedicationName}
                    onChange={(e) => setDedicationName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C] placeholder-[#3A211C]/40"
                  />
                  <input
                    type="text"
                    placeholder="Sweet wish for the dance floor (optional)"
                    value={dedicationNote}
                    onChange={(e) => setDedicationNote(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C] placeholder-[#3A211C]/40"
                  />
                  <PillButton
                    variant="primary"
                    type="submit"
                    className="w-full justify-center py-2.5 text-xs font-semibold"
                  >
                    Dedicate Song to Couple 🎵
                  </PillButton>
                </form>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-body">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <p className="font-semibold">Song Added to the Sangeet Queue!</p>
                  <p className="text-[11px] text-emerald-700/80 mt-0.5">
                    "{SANGEET_SONGS[selectedSongIdx].title}" dedicated by {dedicationName}!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* BENTO CARD 4: WHISPERS OF DESTINY & ROMANTIC ORACLE      */}
          {/* ========================================================= */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_12px_35px_rgba(58,33,28,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#EBD3B5]/30 text-[#641E2B] text-xs font-semibold uppercase tracking-wider font-body">
                  ✨ Whispers of Destiny
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF77] font-semibold font-body">
                  Eternal Prophecy
                </span>
              </div>

              <h3 className="font-display italic text-2xl text-[#3A211C] mb-1">
                The Love Oracle
              </h3>
              <p className="text-xs text-[#3A211C]/65 font-body mb-5">
                Sacred prophecies and poetic truths written for Ankit &amp; Avani's married life.
              </p>

              {/* Glowing Sacred Lotus Card */}
              <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#FFFDFB] via-[#FCF4EC] to-[#FBF0E6] border border-[#D4AF77] shadow-[0_8px_25px_rgba(212,175,119,0.18)] text-center min-h-[175px] flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute top-2 right-2 text-xs text-[#D4AF77]">
                  {ROMANTIC_ORACLES[oracleIdx].icon}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={oracleIdx}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-2"
                  >
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF77]/20 text-[#641E2B] text-[10px] uppercase tracking-widest font-semibold">
                      {ROMANTIC_ORACLES[oracleIdx].theme}
                    </span>
                    <p className="font-display italic text-base sm:text-lg text-[#3A211C] leading-snug">
                      "{ROMANTIC_ORACLES[oracleIdx].prophecy}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-4">
              <PillButton
                variant="gold"
                onClick={nextOracle}
                disabled={isOracleFlipping}
                className="w-full justify-center py-2.5 text-xs font-semibold"
              >
                <span>Reveal Another Romantic Prophecy ✨</span>
              </PillButton>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BENTO CARD 5: SWEET LITTLE SECRETS (Love Milestones)      */}
          {/* ========================================================= */}
          <div className="lg:col-span-2 bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_12px_35px_rgba(58,33,28,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#F6D6DC]/60 text-[#641E2B] text-xs font-semibold uppercase tracking-wider font-body">
                  💍 Sacred Milestones
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF77] font-semibold font-body">
                  AvNit Chapters
                </span>
              </div>

              <h3 className="font-display italic text-2xl sm:text-3xl text-[#3A211C] mb-1">
                Sweet Little Secrets
              </h3>
              <p className="text-xs text-[#3A211C]/65 font-body mb-5">
                Explore the quiet, tender milestones that shaped Ankit &amp; Avani's beautiful journey together.
              </p>

              {/* 4 Interactive Milestone Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {LOVE_MILESTONES.map((m, idx) => {
                  const isSelected = activeMilestoneIdx === idx;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveMilestoneIdx(idx);
                        confetti({ particleCount: 15, spread: 45, origin: { y: 0.7 } });
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-[#FFF9F5] to-[#FBECE8] border-[#641E2B] shadow-md"
                          : "bg-[#FFFDFB] border-[#D4AF77]/30 hover:border-[#D4AF77]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">{m.motif}</span>
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#641E2B]">
                          Chapter 0{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-display italic text-lg text-[#3A211C] mb-0.5">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-[#D4AF77] font-medium mb-2">
                        {m.subtitle}
                      </p>
                      <p className="text-xs text-[#3A211C]/75 leading-relaxed font-body">
                        {m.detail}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-[#D4AF77]/20 flex items-center justify-between text-xs text-[#3A211C]/60 font-body">
              <span>Dedicated with love by Patni Family</span>
              <span className="text-[#641E2B] font-semibold">{config.hashtag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
