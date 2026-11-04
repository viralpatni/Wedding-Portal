import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quizData from "@/data/quiz.json";
import { config } from "@/lib/config";
import { submitTimeCapsule } from "@/lib/supabase";
import PillButton from "@/components/shared/PillButton";
import confetti from "canvas-confetti";

export default function LoveExtras() {
  // ── 1. QUIZ STATE ──
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
      confetti({ particleCount: 20, spread: 50, origin: { y: 0.6 } });
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

  // ── 2. LOVE METER STATE ──
  const [meterName1, setMeterName1] = useState<string>(config.groom);
  const [meterName2, setMeterName2] = useState<string>(config.bride);
  const [meterResult, setMeterResult] = useState<number | null>(null);

  const calculateLove = () => {
    if (!meterName1.trim() || !meterName2.trim()) return;
    // Couple gets 100%
    const isCouple =
      (meterName1.toLowerCase().includes("ankit") && meterName2.toLowerCase().includes("avani")) ||
      (meterName1.toLowerCase().includes("avani") && meterName2.toLowerCase().includes("ankit"));
    const percent = isCouple ? 100 : Math.floor(85 + (Math.sin(meterName1.length + meterName2.length) + 1) * 7.5);
    setMeterResult(percent);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
  };

  // ── 3. SCRATCH CARD STATE ──
  const scratchCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratchedEnough, setIsScratchedEnough] = useState(false);

  useEffect(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill with rose gold metallic foil
    ctx.fillStyle = "#D9A38F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFF";
    ctx.font = "italic 16px serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch Here with Cursor/Touch ✨", canvas.width / 2, canvas.height / 2 + 5);

    let isDrawing = false;
    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      setIsScratchedEnough(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      scratch(t.clientX - rect.left, t.clientY - rect.top);
    };

    canvas.addEventListener("mousedown", () => (isDrawing = true));
    window.addEventListener("mouseup", () => (isDrawing = false));
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // ── 4. TIME CAPSULE STATE ──
  const [capsuleName, setCapsuleName] = useState("");
  const [capsuleMsg, setCapsuleMsg] = useState("");
  const [capsuleDone, setCapsuleDone] = useState(false);

  const handleCapsuleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capsuleMsg.trim()) return;
    await submitTimeCapsule({ name: capsuleName.trim(), message: capsuleMsg.trim() });
    setCapsuleDone(true);
  };

  // ── 5. PHOTO BOOTH (ZERO SERVER UPLOAD) ──
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const boothCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [activeSticker, setActiveSticker] = useState<"safa" | "garland" | "sunglasses" | "none">("safa");
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch {
      alert("Camera access denied or unavailable.");
    }
  };

  const takeBoothPhoto = () => {
    const video = videoRef.current;
    const canvas = boothCanvasRef.current;
    if (!video || !canvas) return;

    canvas.width = 480;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw video frame
    ctx.drawImage(video, 0, 0, 480, 480);

    // Draw arch border overlay
    ctx.strokeStyle = "#B8935A";
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 468, 468);

    // Draw sticker
    ctx.font = "60px sans-serif";
    ctx.textAlign = "center";
    if (activeSticker === "safa") {
      ctx.fillText("👑", 240, 110);
    } else if (activeSticker === "garland") {
      ctx.fillText("🌺", 240, 420);
    } else if (activeSticker === "sunglasses") {
      ctx.fillText("🕶️", 240, 220);
    }

    // Couple watermark
    ctx.font = "italic 22px serif";
    ctx.fillStyle = "#FFF";
    ctx.shadowColor = "#3A2823";
    ctx.shadowBlur = 8;
    ctx.fillText(`${config.groom} & ${config.bride} · 2027`, 240, 455);

    const url = canvas.toDataURL("image/png");
    setCapturedPhotoUrl(url);

    // Stop stream tracks
    const stream = video.srcObject as MediaStream;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setIsCameraActive(false);
  };

  return (
    <section
      id="extras"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FBF7F2] via-[#F6D6DC]/10 to-[#FBF7F2] overflow-hidden"
      aria-label="Love Extras and Interactive Games"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label text-[#B76E79] tracking-[0.25em] mb-3 text-xs sm:text-sm"
          >
            Playful Keepsakes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A2823] mb-4"
          >
            The Love Extras
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A2823]/60 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            Trivia quiz, compatibility meter, scratch surprises, photo booth with royal stickers, and an anniversary time capsule.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* BENTO CARD 1: THE COUPLE QUIZ (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_10px_30px_rgba(58,40,35,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full bg-[#EBD3B5]/30 text-[#3A2823] text-xs font-semibold uppercase tracking-wider font-body">
                  🧠 The Couple Trivia Quiz
                </span>
                <span className="text-xs text-[#B76E79] font-body font-semibold">
                  Score: {score}/{quizData.length}
                </span>
              </div>

              {!isQuizCompleted ? (
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#3A2823]/50 font-body mb-2">
                    Question {currentQIndex + 1} of {quizData.length}
                  </p>
                  <h3 className="font-display italic text-2xl sm:text-3xl text-[#3A2823] mb-6">
                    {quizData[currentQIndex].question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {quizData[currentQIndex].options.map((opt, idx) => {
                      const isChosen = selectedOption === idx;
                      const isCorrect = idx === quizData[currentQIndex].correct;

                      let btnStyle = "bg-[#FBF7F2] border-[#B8935A]/30 text-[#3A2823]";
                      if (selectedOption !== null) {
                        if (isCorrect) btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900";
                        else if (isChosen) btnStyle = "bg-rose-100 border-rose-500 text-rose-900";
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
                      className="p-3.5 rounded-2xl bg-[#F6D6DC]/30 border border-[#F6D6DC] mb-6 flex items-center justify-between"
                    >
                      <p className="text-xs text-[#3A2823] font-body">
                        💡 {quizData[currentQIndex].funFact}
                      </p>
                      <button
                        onClick={handleNextQuestion}
                        className="ml-3 px-4 py-1.5 rounded-full bg-[#3A2823] text-white text-xs font-body uppercase tracking-wider"
                      >
                        Next →
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* QUIZ RESULT */
                <div className="text-center py-8">
                  <span className="text-5xl mb-3 block">🏆</span>
                  <h3 className="font-display italic text-3xl text-[#3A2823] mb-2">
                    You Scored {score} out of {quizData.length}!
                  </h3>
                  <p className="text-sm text-[#3A2823]/75 font-body max-w-md mx-auto mb-6">
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
                    className="px-6 py-2.5 rounded-full bg-[#3A2823] text-white text-xs font-body uppercase tracking-wider hover:bg-[#641E2B] transition-colors shadow-md"
                  >
                    Play Again ↻
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BENTO CARD 2: LOVE METER */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_10px_30px_rgba(58,40,35,0.06)] flex flex-col justify-between">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-[#F6D6DC]/50 text-[#B76E79] text-xs font-semibold uppercase tracking-wider font-body">
                💖 Love Compatibility
              </span>
              <h3 className="font-display italic text-2xl text-[#3A2823] mt-3 mb-2">
                Cosmic Love Meter
              </h3>
              <p className="text-xs text-[#3A2823]/60 font-body mb-6">
                Calculate the astrological love resonance between any two names!
              </p>

              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="First Name"
                  value={meterName1}
                  onChange={(e) => setMeterName1(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-xs text-[#3A2823]"
                />
                <input
                  type="text"
                  placeholder="Second Name"
                  value={meterName2}
                  onChange={(e) => setMeterName2(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-xs text-[#3A2823]"
                />
              </div>

              {meterResult !== null && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-[#F6D6DC]/50 to-[#FFDCC8]/50 text-center mb-4"
                >
                  <p className="font-display italic text-4xl text-[#B76E79]">
                    {meterResult}%
                  </p>
                  <p className="text-xs font-body text-[#3A2823] mt-1 font-medium">
                    {meterResult === 100
                      ? "Eternal Cosmic Match Made in Heaven! 💍"
                      : "Destined to dance through life hand in hand! ✨"}
                  </p>
                </motion.div>
              )}
            </div>

            <PillButton
              variant="gold"
              onClick={calculateLove}
              className="w-full justify-center py-2.5"
            >
              Calculate Match
            </PillButton>
          </div>

          {/* BENTO CARD 3: SCRATCH CARD */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_10px_30px_rgba(58,40,35,0.06)] flex flex-col justify-between">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-[#EBD3B5]/40 text-[#3A2823] text-xs font-semibold uppercase tracking-wider font-body">
                🎁 Secret Surprise
              </span>
              <h3 className="font-display italic text-2xl text-[#3A2823] mt-3 mb-2">
                Foil Scratch Card
              </h3>
              <p className="text-xs text-[#3A2823]/60 font-body mb-4">
                Use your finger or mouse to scratch away the rose gold layer!
              </p>

              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-gradient-to-br from-[#FBF7F2] to-[#FFDCC8] p-4 text-center">
                {/* Secret message underneath */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <span className="text-2xl mb-1">💌</span>
                  <p className="font-display italic text-lg sm:text-xl text-[#3A2823]">
                    "You two are destined for infinity."
                  </p>
                  <p className="script-name text-2xl text-[#B76E79] mt-1">
                    — Rahul
                  </p>
                </div>

                {/* Canvas Foil Scratch Layer */}
                <canvas
                  ref={scratchCanvasRef}
                  width={320}
                  height={180}
                  className="absolute inset-0 w-full h-full cursor-crosshair"
                />
              </div>
            </div>

            <p className="text-[11px] text-center text-[#3A2823]/50 font-body mt-4">
              {isScratchedEnough ? "Revealed! A secret brotherly wish ✨" : "Rub to scratch foil"}
            </p>
          </div>

          {/* BENTO CARD 4: 1-YEAR TIME CAPSULE */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_10px_30px_rgba(58,40,35,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#EBD3B5]/30 text-[#3A2823] text-xs font-semibold uppercase tracking-wider font-body">
                  ⏳ 1-Year Time Capsule
                </span>
                <span className="text-[10px] uppercase tracking-wider text-rose-dark font-body font-semibold">
                  Locked Till Jan 2028
                </span>
              </div>
              <h3 className="font-display italic text-2xl text-[#3A2823] mb-2">
                Letter to the Future
              </h3>
              <p className="text-xs text-[#3A2823]/60 font-body mb-4">
                Leave a secret message that {config.groom} &amp; {config.bride} will only open on their 1st Wedding Anniversary: 26 January 2028.
              </p>

              {!capsuleDone ? (
                <form onSubmit={handleCapsuleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name (optional)"
                    value={capsuleName}
                    onChange={(e) => setCapsuleName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-xs"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder={`Where do you hope to see ${config.groom} and ${config.bride} in one year? What memories will they cherish?`}
                    value={capsuleMsg}
                    onChange={(e) => setCapsuleMsg(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-xs resize-none"
                  />
                  <PillButton
                    variant="primary"
                    type="submit"
                    className="w-full justify-center py-2.5 text-xs"
                  >
                    Lock Into Vault 🔒
                  </PillButton>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 text-center text-xs text-emerald-800 font-body">
                  ✓ Locked into the anniversary vault! Unlocks Jan 26, 2028.
                </div>
              )}
            </div>

            <p className="text-[10px] text-center text-[#3A2823]/40 uppercase tracking-widest font-body mt-4">
              Cryptographically timestamped
            </p>
          </div>

          {/* BENTO CARD 5: PHOTO BOOTH (Zero Server Upload) */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_10px_30px_rgba(58,40,35,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#F6D6DC]/60 text-[#B76E79] text-xs font-semibold uppercase tracking-wider font-body">
                  📸 Virtual Photo Booth
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-body font-semibold">
                  100% Private
                </span>
              </div>
              <h3 className="font-display italic text-2xl text-[#3A2823] mb-2">
                Rajasthani Selfie Frame
              </h3>
              <p className="text-xs text-[#3A2823]/60 font-body mb-4">
                Pose with royal stickers. Stays in your browser—zero server upload!
              </p>

              {/* Viewport Box */}
              <div className="relative aspect-square w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden bg-black/5 border border-[#B8935A]/30 flex items-center justify-center mb-4">
                {!isCameraActive && !capturedPhotoUrl && (
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 rounded-full bg-[#3A2823] text-white text-xs font-body uppercase tracking-wider"
                  >
                    Open Camera
                  </button>
                )}

                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover ${!isCameraActive ? "hidden" : ""}`}
                  playsInline
                  muted
                />

                <canvas ref={boothCanvasRef} className="hidden" />

                {capturedPhotoUrl && (
                  <img
                    src={capturedPhotoUrl}
                    alt="Captured souvenir"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Sticker Selector */}
              {isCameraActive && (
                <div className="flex justify-center gap-2 mb-3">
                  {(["safa", "garland", "sunglasses"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setActiveSticker(st)}
                      className={`px-3 py-1 rounded-full text-xs font-body ${
                        activeSticker === st ? "bg-[#B76E79] text-white" : "bg-white text-[#3A2823]"
                      }`}
                    >
                      {st === "safa" ? "👑 Safa" : st === "garland" ? "🌺 Garland" : "🕶️ Shades"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isCameraActive ? (
              <PillButton
                variant="gold"
                onClick={takeBoothPhoto}
                className="w-full justify-center py-2.5 text-xs"
              >
                Snap Photo 📷
              </PillButton>
            ) : capturedPhotoUrl ? (
              <a
                href={capturedPhotoUrl}
                download={`${config.groom}-${config.bride}-PhotoBooth.png`}
                className="w-full py-2.5 rounded-full bg-[#3A2823] text-white text-center text-xs uppercase tracking-widest font-body font-medium block"
              >
                Download Souvenir PNG ⬇
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
