/**
 * /snap — Mobile Camera Capture Page
 *
 * This page is opened when a wedding guest scans the QR code from their phone.
 * It immediately opens the rear camera, lets the guest take/select a photo,
 * add their name + caption, then saves directly to the shared localStorage so
 * it appears instantly on the Live Photo Wall without any server round-trip.
 */
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Sparkles, CheckCircle2, X, ArrowLeft, Upload } from "lucide-react";
import confetti from "canvas-confetti";

// Same storage key as AdminContext
const LIVE_PHOTOS_KEY = "avnit_live_guest_photos";

interface LiveGuestPhoto {
  id: string;
  guestName: string;
  caption: string;
  imageUrl: string;
  timestamp: number;
  likes: number;
}

type Step = "camera" | "preview" | "details" | "success";

export default function SnapCamera() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState<Step>("camera");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Auto-trigger camera on mount (mobile: opens native camera via capture="environment")
  useEffect(() => {
    const timer = setTimeout(() => {
      fileInputRef.current?.click();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // ── Compress image to max 1280px ──────────────────────────────────────────
  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1280;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
            else       { w = Math.round((w * maxDim) / h); h = maxDim; }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.src = ev.target!.result as string;
      };
      reader.readAsDataURL(file);
    });

  // ── Handle file / photo selected ─────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    const dataUrl = await compressImage(file);
    setImageDataUrl(dataUrl);
    setStep("preview");
  };

  // ── Retake photo ──────────────────────────────────────────────────────────
  const handleRetake = () => {
    setImageDataUrl(null);
    setStep("camera");
    // reset file input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
    setTimeout(() => fileInputRef.current?.click(), 200);
  };

  // ── Save photo to localStorage → instantly appears on Live Wall ───────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageDataUrl || !guestName.trim()) {
      setError("Please enter your name before sharing.");
      return;
    }
    setIsSubmitting(true);

    try {
      const existing: LiveGuestPhoto[] = JSON.parse(
        localStorage.getItem(LIVE_PHOTOS_KEY) || "[]"
      );
      const newPhoto: LiveGuestPhoto = {
        id: `snap_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        guestName: guestName.trim(),
        caption: caption.trim() || "Celebrating with Ankit & Avani! 💖",
        imageUrl: imageDataUrl,
        timestamp: Date.now(),
        likes: 0,
      };
      localStorage.setItem(
        LIVE_PHOTOS_KEY,
        JSON.stringify([newPhoto, ...existing])
      );
    } catch {
      setError("Could not save photo. Storage might be full.");
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#D4AF77", "#641E2B", "#F4DDE3", "#F6D6DC"],
      });
    }, 700);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #F9E9ED 50%, #FFF5F0 100%)" }}
    >
      {/* ── Decorative background blobs ───────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #F4DDE3, transparent)" }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4AF77, transparent)" }} />

      {/* ── Hidden file input (opens native camera on mobile) ─────────────── */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Open camera to take a photo"
      />

      <AnimatePresence mode="wait">

        {/* ============================================================ */}
        {/* STEP 1 — CAMERA PROMPT                                       */}
        {/* ============================================================ */}
        {step === "camera" && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm text-center"
          >
            {/* Logo / monogram */}
            <div className="w-20 h-20 rounded-full border-2 border-[#D4AF77] flex items-center justify-center mx-auto mb-5 shadow-lg"
              style={{ background: "radial-gradient(circle at 35% 30%, #FFF8F0, #F4DDE3)" }}>
              <span className="font-script text-3xl text-[#641E2B]"
                style={{ fontFamily: "'Pinyon Script', cursive" }}>AvNit</span>
            </div>

            <div className="inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#641E2B]">
                Live Photo Wall
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
            </div>

            <h1 className="font-display italic text-3xl text-[#3A211C] mb-2">
              Capture The Moment
            </h1>
            <p className="text-sm font-body text-[#3A211C]/70 mb-8 leading-relaxed">
              Take a photo right now — it will appear instantly on<br />
              <span className="font-semibold text-[#641E2B]">Ankit &amp; Avani's Live Wall</span> for everyone to see!
            </p>

            {/* Primary: open camera */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 rounded-2xl text-white font-body text-sm font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 mb-3 cursor-pointer active:scale-95 transition-transform"
              style={{ background: "linear-gradient(135deg, #B8935A 0%, #641E2B 60%, #4A121D 100%)" }}
            >
              <Camera className="w-5 h-5 text-[#D4AF77]" />
              <span>Open Camera &amp; Take Photo</span>
            </button>

            {/* Secondary: pick from gallery */}
            <button
              onClick={() => {
                // remove capture attr momentarily to allow gallery pick
                if (fileInputRef.current) {
                  fileInputRef.current.removeAttribute("capture");
                  fileInputRef.current.click();
                  setTimeout(() => fileInputRef.current?.setAttribute("capture", "environment"), 500);
                }
              }}
              className="w-full py-3.5 rounded-2xl bg-white/80 border border-[#D4AF77]/60 text-[#3A211C] font-body text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all shadow-sm"
            >
              <Upload className="w-4 h-4 text-[#641E2B]" />
              <span>Or Choose from Gallery</span>
            </button>

            <p className="text-[10px] text-[#3A211C]/40 mt-6 font-body">
              Your photo will be shared on the wedding website 💕
            </p>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STEP 2 — PHOTO PREVIEW                                       */}
        {/* ============================================================ */}
        {step === "preview" && imageDataUrl && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-sm"
          >
            <h2 className="font-display italic text-2xl text-[#3A211C] text-center mb-4">
              Looking good! 📸
            </h2>

            {/* Photo preview */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-5 border-2 border-[#D4AF77]/60"
              style={{ aspectRatio: "4/5" }}>
              <img
                src={imageDataUrl}
                alt="Your captured photo"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ background: "rgba(100,30,43,0.80)", backdropFilter: "blur(6px)" }}>
                ✦ Ankit &amp; Avani · 26 Jan 2027
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleRetake}
                className="flex-1 py-3.5 rounded-2xl bg-white/80 border border-[#D4AF77]/50 text-[#3A211C] text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Retake
              </button>
              <button
                onClick={() => setStep("details")}
                className="flex-[2] py-3.5 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform shadow-lg"
                style={{ background: "linear-gradient(135deg, #B8935A, #641E2B)" }}
              >
                <Heart className="w-4 h-4 text-[#F4DDE3] fill-[#F4DDE3]" />
                Use This Photo
              </button>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STEP 3 — GUEST DETAILS FORM                                  */}
        {/* ============================================================ */}
        {step === "details" && imageDataUrl && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="w-full max-w-sm"
          >
            {/* Mini photo thumbnail */}
            <div className="flex items-center gap-4 mb-6 p-3 rounded-2xl bg-white/70 border border-[#D4AF77]/40 shadow-sm">
              <img
                src={imageDataUrl}
                alt="Preview"
                className="w-16 h-16 rounded-xl object-cover border border-[#D4AF77]/60 shadow"
              />
              <div>
                <p className="text-xs font-body font-semibold text-[#3A211C] mb-0.5">Photo ready to share!</p>
                <button
                  onClick={() => setStep("preview")}
                  className="text-[10px] text-[#641E2B] underline underline-offset-2 cursor-pointer"
                >
                  ← Change photo
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guest name */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-bold text-[#3A211C]/80 mb-1.5 font-body">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={40}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul & Priya"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#D4AF77]/50 text-sm text-[#3A211C] focus:outline-none focus:border-[#641E2B] focus:ring-2 focus:ring-[#641E2B]/20 transition-all shadow-sm placeholder:text-[#3A211C]/30"
                />
              </div>

              {/* Caption (optional) */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-bold text-[#3A211C]/80 mb-1.5 font-body">
                  Caption <span className="text-[#3A211C]/40 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Best wedding ever! 🎉"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#D4AF77]/50 text-sm text-[#3A211C] focus:outline-none focus:border-[#641E2B] focus:ring-2 focus:ring-[#641E2B]/20 transition-all shadow-sm placeholder:text-[#3A211C]/30"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-200">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!guestName.trim() || isSubmitting}
                className="w-full py-4 rounded-2xl text-white text-sm font-bold uppercase tracking-wider disabled:opacity-50 cursor-pointer active:scale-95 transition-all shadow-xl mt-2 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #B8935A 0%, #641E2B 60%, #4A121D 100%)" }}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Sharing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D4AF77]" />
                    <span>✦ Share to Live Wall ✦</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-[#3A211C]/40 font-body">
                Your photo will appear instantly on the wedding website 💕
              </p>
            </form>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STEP 4 — SUCCESS                                             */}
        {/* ============================================================ */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
              style={{ background: "linear-gradient(135deg, #D4AF77, #641E2B)" }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="font-display italic text-3xl text-[#3A211C] mb-2">
              Photo Shared! 🎉
            </h2>
            <p className="text-sm font-body text-[#3A211C]/70 mb-6 leading-relaxed">
              Your photo is now live on<br />
              <span className="font-bold text-[#641E2B]">Ankit &amp; Avani's Wedding Wall!</span><br />
              Everyone at the celebration can see it.
            </p>

            {imageDataUrl && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6 border-2 border-[#D4AF77]/60 mx-auto"
                style={{ maxWidth: "180px", aspectRatio: "4/5" }}>
                <img src={imageDataUrl} alt="Shared photo" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Share another */}
            <button
              onClick={() => {
                setStep("camera");
                setImageDataUrl(null);
                setGuestName("");
                setCaption("");
                setError("");
                if (fileInputRef.current) fileInputRef.current.value = "";
                setTimeout(() => fileInputRef.current?.click(), 300);
              }}
              className="w-full py-3.5 rounded-2xl text-white font-body text-sm font-bold uppercase tracking-wider shadow-lg cursor-pointer active:scale-95 transition-transform flex items-center justify-center gap-2 mb-3"
              style={{ background: "linear-gradient(135deg, #B8935A, #641E2B)" }}
            >
              <Camera className="w-4 h-4 text-[#D4AF77]" />
              Take Another Photo
            </button>

            <p className="font-script text-2xl text-[#641E2B]"
              style={{ fontFamily: "'Pinyon Script', cursive" }}>
              With Love · AvNit Forever
            </p>
            <p className="text-xs text-[#3A211C]/40 mt-1 font-body">26 January 2027</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

