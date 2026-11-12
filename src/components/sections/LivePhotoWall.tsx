import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  Heart,
  Sparkles,
  QrCode,
  CheckCircle2,
  X,
  Share2,
  Image as ImageIcon
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useLanguage } from "@/context/LanguageContext";
import PillButton from "@/components/shared/PillButton";
import confetti from "canvas-confetti";

export default function LivePhotoWall() {
  const { liveGuestPhotos, addLiveGuestPhoto, likeLiveGuestPhoto } = useAdmin();
  const { t, language } = useLanguage();

  const [guestName, setGuestName] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Legacy: auto trigger camera when user arrives via ?snap=1 on old QR codes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("snap") === "1" || window.location.hash === "#snap") {
      const cleanUrl = window.location.pathname + "#live-wall";
      window.history.replaceState({}, "", cleanUrl);
      // Show upload modal directly (new /snap page handles camera natively)
      setTimeout(() => setShowUploadModal(true), 500);
    }
  }, []);

  // Resize and compress uploaded image to max 1280px for instant uploading & zero storage bloat
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 1280;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setImagePreview(compressedDataUrl);
        // Automatically ask user to share photo on the live wall
        setShowUploadModal(true);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview || !guestName.trim()) return;

    setIsUploading(true);

    setTimeout(() => {
      addLiveGuestPhoto({
        guestName: guestName.trim(),
        caption: caption.trim() || "Celebrating with Ankit & Avani! 💖",
        imageUrl: imagePreview,
      });

      setIsUploading(false);
      setSuccessMsg(language === "hi" ? "आपका फोटो लाइव वॉल पर जुड़ गया है! ✨" : "Photo added to the Live Wall! ✨");
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D4AF77", "#641E2B", "#F6D6DC"]
      });

      setTimeout(() => {
        setShowUploadModal(false);
        setImagePreview(null);
        setGuestName("");
        setCaption("");
        setSuccessMsg("");
      }, 1200);
    }, 600);
  };

  // QR Code URL → dedicated /snap page that opens the camera directly
  const originUrl = typeof window !== "undefined" ? window.location.origin : "https://avnit-wedding.com";
  const snapTargetUrl = `${originUrl}/snap`;
  const qrCodeImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&color=64-30-43&bgcolor=FFF8F0&margin=12&data=${encodeURIComponent(snapTargetUrl)}`;

  return (
    <section
      id="live-wall"
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#FAF0E6]/50 to-[#FFF8F0] overflow-hidden"
      aria-label="Live Wedding Guest Photo Wall"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
            <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#641E2B]">
              {t("livePhotosPre")}
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
            {t("livePhotosTitle")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-2xl mx-auto mb-8"
          >
            {t("livePhotosSub")}
          </motion.p>

          {/* Action Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#641E2B] text-white text-xs uppercase tracking-wider font-semibold font-body shadow-lg hover:bg-[#7D2636] hover:scale-105 active:scale-95 transition-all"
            >
              <Camera className="w-4 h-4 text-[#D4AF77]" />
              <span>{t("uploadPhotoBtn")}</span>
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 border border-[#D4AF77]/50 text-xs uppercase tracking-wider font-semibold font-body text-[#3A211C] hover:bg-white shadow-sm transition-all"
            >
              <QrCode className="w-4 h-4 text-[#641E2B]" />
              <span>{language === "hi" ? "QR कोड देखें" : "View Scan QR Code"}</span>
            </button>
          </div>
        </div>

        {/* Live Wall Photos Feed or Empty State */}
        {liveGuestPhotos.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4AF77]/30 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FFF8F0] border border-[#D4AF77]/40 flex items-center justify-center mx-auto mb-4 text-3xl">
              📸
            </div>
            <h3 className="font-display italic text-2xl text-[#3A211C] mb-2">
              {language === "hi" ? "अभी कोई फोटो उपलब्ध नहीं है" : "No memories on the live wall yet"}
            </h3>
            <p className="text-xs font-body text-[#3A211C]/70 mb-6 leading-relaxed">
              {language === "hi"
                ? "विवाह के शुभ पलों की पहली तस्वीर अपने फोन से खींचें और नव-दंपति की लाइव वॉल पर सीधे साझा करें!"
                : "Be the first guest to capture a blessed moment! Scan the QR code or tap below to snap and share directly with Ankit & Avani!"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-full bg-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-[#4E1420] transition-colors shadow-sm cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#D4AF77]" />
                <span>{language === "hi" ? "कैमरा खोलें / फोटो खींचें" : "Take Photo (Camera)"}</span>
              </button>
              <button
                onClick={() => setShowQrModal(true)}
                className="px-5 py-2.5 rounded-full bg-white border border-[#D4AF77]/60 text-[#3A211C] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-[#FFF8F0] transition-colors shadow-sm cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#641E2B]" />
                <span>{language === "hi" ? "QR कोड स्कैन करें" : "Scan QR Code"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {liveGuestPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden bg-white/90 backdrop-blur-md p-3 shadow-md border border-[#D4AF77]/30 hover:shadow-xl transition-all group"
              >
                {/* Photo Image */}
                <div
                  className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#FFF8F0] cursor-pointer"
                  onClick={() => setSelectedPhoto(photo.imageUrl)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241310]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs">
                    <span>Tap to enlarge photo</span>
                  </div>
                </div>

                {/* Photo Caption & Guest Details */}
                <div className="pt-3 px-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-display italic text-base text-[#3A211C] font-semibold">
                      {photo.guestName}
                    </span>
                    <button
                      onClick={() => likeLiveGuestPhoto(photo.id)}
                      className="flex items-center gap-1 text-xs text-[#641E2B] hover:scale-115 active:scale-95 transition-transform cursor-pointer"
                      title="Like photo"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#641E2B]" />
                      <span className="text-[11px] font-bold">{photo.likes || 1}</span>
                    </button>
                  </div>
                  <p className="text-xs font-body text-[#3A211C]/75 italic leading-relaxed mb-1">
                    "{photo.caption}"
                  </p>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF77] font-semibold">
                    {new Date(photo.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · Wedding Day
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#D4AF77]/50 relative"
          >
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#3A211C]/60 hover:text-[#3A211C]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display italic text-2xl text-[#3A211C] mb-1">
              {imagePreview
                ? (language === "hi" ? "यह फोटो लाइव वॉल पर साझा करें?" : "Share Photo to Live Wall?")
                : t("uploadPhotoBtn")}
            </h3>
            <p className="text-xs font-body text-[#3A211C]/70 mb-5">
              {imagePreview
                ? (language === "hi"
                    ? "शुभ पलों की तस्वीर तैयार है! अपना नाम दर्ज करें और इसे तुरंत लाइव वेबसाइट पर साझा करें।"
                    : "You've captured a memorable moment! Enter your name to publish directly on Ankit & Avani's live wall.")
                : "Share a photo with Ankit & Avani and everyone celebrating!"}
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* File Drop Area */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-44 rounded-2xl border-2 border-dashed border-[#D4AF77]/60 bg-[#FFF8F0] flex flex-col items-center justify-center cursor-pointer hover:border-[#641E2B] transition-colors p-4 text-center"
                  >
                    <Upload className="w-8 h-8 text-[#641E2B] mb-2 animate-bounce" />
                    <span className="text-xs font-body font-semibold text-[#3A211C]">
                      {t("dropPhotoHere")}
                    </span>
                    <span className="text-[10px] text-[#3A211C]/50 mt-1">
                      Tap to open camera or gallery
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#D4AF77]">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Guest Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1 font-body">
                  {t("yourName")} *
                </label>
                <input
                  type="text"
                  required
                  maxLength={40}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul &amp; Priya"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/40 text-sm text-[#3A211C] focus:outline-none focus:border-[#641E2B]"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1 font-body">
                  {t("caption")}
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Sangeet dance ready!"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/40 text-sm text-[#3A211C] focus:outline-none focus:border-[#641E2B]"
                />
              </div>

              {successMsg && (
                <p className="text-xs text-center font-body text-emerald-700 bg-emerald-50 py-2 rounded-lg">
                  {successMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={!imagePreview || !guestName.trim() || isUploading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF77] via-[#B8935A] to-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider hover:opacity-95 disabled:opacity-50 transition-all shadow-md cursor-pointer"
              >
                {isUploading
                  ? (language === "hi" ? "अपलोड हो रहा है..." : "Sharing...")
                  : (language === "hi" ? "✦ लाइव वॉल पर साझा करें ✦" : "✦ Share Photo Directly to Live Wall ✦")}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* QR Code Modal for Phone Scanning at Tables */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-[#D4AF77]/50 relative"
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#3A211C]/60 hover:text-[#3A211C]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="inline-flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#641E2B]">Guest Photo Wall</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
            </div>
            <h3 className="font-display italic text-2xl text-[#3A211C] mb-1">
              Scan &amp; Share a Moment
            </h3>
            <p className="text-xs font-body text-[#3A211C]/65 mb-5 leading-relaxed">
              Point your phone camera at the QR code below.
              It opens a camera page — snap a photo and it
              <span className="font-semibold text-[#641E2B]"> appears instantly</span> on the live wall!
            </p>

            {/* QR Code */}
            <div className="p-4 rounded-2xl bg-[#FFF8F0] border-2 border-[#D4AF77]/40 inline-block mb-5 shadow-inner relative">
              <img
                src={qrCodeImgSrc}
                alt="Scan QR code to open camera and share photo to live wall"
                className="w-52 h-52 mx-auto rounded-lg"
                loading="lazy"
              />
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF77] rounded-tl-md" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF77] rounded-tr-md" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF77] rounded-bl-md" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF77] rounded-br-md" />
            </div>

            {/* How it works — 3 steps */}
            <div className="text-left space-y-2.5 mb-5">
              {[
                { step: "1", icon: "📷", text: "Scan → your phone camera opens" },
                { step: "2", icon: "🤳", text: "Take a photo of the celebration" },
                { step: "3", icon: "🎉", text: "It appears live on this wall instantly!" },
              ].map(({ step, icon, text }) => (
                <div key={step} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/30">
                  <span className="w-6 h-6 rounded-full bg-[#641E2B] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {step}
                  </span>
                  <span className="text-lg">{icon}</span>
                  <span className="text-xs font-body text-[#3A211C]">{text}</span>
                </div>
              ))}
            </div>

            <p className="font-script text-xl text-[#641E2B]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
              AvNit Forever · 26 January 2027
            </p>
          </motion.div>
        </div>
      )}

      {/* Enlarge Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto}
            alt="Enlarged photo"
            className="max-w-[92vw] max-h-[88vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

