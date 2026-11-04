import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBlessings, submitBlessing, type BlessingItem } from "@/lib/supabase";
import PillButton from "@/components/shared/PillButton";
import confetti from "canvas-confetti";

const EMOJIS = ["💖", "🪔", "🌸", "✨", "💍", "🕊️", "🌺", "🎉"];

export default function BlessingsWall() {
  const [blessings, setBlessings] = useState<BlessingItem[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💖");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Voice note recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadBlessings();
  }, []);

  async function loadBlessings() {
    const list = await getBlessings();
    setBlessings(list);
  }

  // Voice Recording handlers (60-sec UX limit, browser-only)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        // Check 2MB guard
        if (audioBlob.size > 2097152) {
          alert("Audio recording exceeded 2MB limit. Please record a shorter note.");
          return;
        }
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 59) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      alert("Microphone permission denied or unsupported on this device.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage("");

    const res = await submitBlessing({
      name: name.trim(),
      message: message.trim(),
      emoji: selectedEmoji,
      voice_url: audioUrl || undefined,
    });

    setIsSubmitting(false);
    setStatusMessage(res.message);
    setName("");
    setMessage("");
    setAudioUrl(null);

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D9A38F", "#F6D6DC", "#B76E79", "#EBD3B5"],
    });

    await loadBlessings();
    setTimeout(() => setStatusMessage(""), 4000);
  };

  return (
    <section
      id="blessings"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FBF7F2] overflow-hidden"
      aria-label="Blessings and Wishes Wall"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label text-[#B76E79] tracking-[0.25em] mb-3 text-xs sm:text-sm"
          >
            Floating Lanterns
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A2823] mb-4"
          >
            The Blessings Wall
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A2823]/60 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            Leave your warm wishes and voice notes for Ankit &amp; Avani. Each blessing floats like a sky lantern in their golden dawn.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Blessing Form */}
          <div className="lg:col-span-5 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_15px_35px_rgba(58,40,35,0.06)]">
            <h3 className="font-display italic text-2xl text-[#3A2823] mb-2">
              Send a Blessing
            </h3>
            <p className="text-xs font-body text-[#3A2823]/60 mb-6">
              Write a message or record a sweet 60-second audio note.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2823] mb-1 font-body">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  maxLength={40}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kabir & Meera"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-sm text-[#3A2823] focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              {/* Emoji Picker */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2823] mb-1 font-body">
                  Auspicious Motif
                </label>
                <div className="flex gap-2 flex-wrap">
                  {EMOJIS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                        selectedEmoji === emoji
                          ? "bg-[#D9A38F]/30 border-2 border-[#B76E79] scale-110"
                          : "bg-[#FBF7F2] border border-[#B8935A]/20 hover:border-[#D9A38F]"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2823] font-body">
                    Your Words
                  </label>
                  <span className="text-[10px] text-[#3A2823]/50">
                    {message.length}/500
                  </span>
                </div>
                <textarea
                  required
                  rows={3}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="May your lives together be filled with boundless laughter and love..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-sm text-[#3A2823] focus:outline-none focus:border-[#B76E79] resize-none"
                />
              </div>

              {/* Voice Note Recorder (60s limit) */}
              <div className="p-3.5 rounded-2xl bg-[#F6D6DC]/25 border border-[#F6D6DC]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B76E79] font-body">
                    🎙️ Voice Note (Max 60s)
                  </span>
                  {isRecording && (
                    <span className="text-xs font-bold text-red-500 animate-pulse">
                      ● Recording {60 - recordingSeconds}s left
                    </span>
                  )}
                </div>

                {!audioUrl ? (
                  !isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="w-full py-2 rounded-xl bg-white/80 border border-[#B8935A]/30 text-xs font-body font-medium text-[#3A2823] hover:bg-white flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>● Start Recording Voice Note</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="w-full py-2 rounded-xl bg-red-500 text-white text-xs font-body font-medium hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>■ Finish Recording</span>
                    </button>
                  )
                ) : (
                  <div className="flex items-center justify-between gap-2 bg-white/90 p-2 rounded-xl">
                    <audio src={audioUrl} controls className="h-8 flex-1" />
                    <button
                      type="button"
                      onClick={() => setAudioUrl(null)}
                      className="text-xs text-red-500 px-2 py-1 hover:underline"
                    >
                      Retake
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <PillButton
                variant="gold"
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center py-3"
              >
                {isSubmitting ? "Releasing Lantern..." : "Release Blessing Lantern ✦"}
              </PillButton>

              {statusMessage && (
                <p className="text-xs text-center font-body text-emerald-700 bg-emerald-50 py-2 rounded-lg">
                  {statusMessage}
                </p>
              )}
            </form>
          </div>

          {/* RIGHT: Floating Sky Lanterns List */}
          <div className="lg:col-span-7 space-y-4 max-h-[640px] overflow-y-auto pr-2 no-scrollbar">
            {blessings.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-10 border border-white/90 text-center shadow-[0_8px_25px_rgba(183,110,121,0.06)]">
                <span className="text-4xl mb-3 block">🪔</span>
                <h4 className="font-display italic text-2xl text-[#3A2823] mb-2">
                  Be the First to Bless
                </h4>
                <p className="font-body text-xs sm:text-sm text-[#3A2823]/60 max-w-sm mx-auto">
                  Send your heartfelt wishes and prayers for Ankit &amp; Avani above to light up their blessing wall!
                </p>
              </div>
            ) : (
              blessings.map((b, i) => (
              <motion.div
                key={b.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative bg-white/75 backdrop-blur-md rounded-2xl p-6 border border-white/90 shadow-[0_8px_25px_rgba(183,110,121,0.06)] hover:shadow-[0_12px_30px_rgba(217,163,143,0.15)] transition-shadow"
              >
                {/* Lantern Glow Accent */}
                <div className="absolute top-4 right-4 text-2xl">{b.emoji || "💖"}</div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display italic text-xl text-[#3A2823]">
                    {b.name}
                  </span>
                  <span className="text-[10px] text-[#B76E79] uppercase tracking-wider font-body">
                    · {new Date(b.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                  </span>
                </div>

                <p className="font-body text-sm text-[#3A2823]/80 leading-relaxed mb-3">
                  "{b.message}"
                </p>

                {b.voice_url && (
                  <div className="mt-2 pt-2 border-t border-[#B8935A]/15 flex items-center gap-2">
                    <span className="text-xs text-[#B76E79]">🎵 Audio Blessing:</span>
                    <audio src={b.voice_url} controls className="h-7 w-48" />
                  </div>
                )}
              </motion.div>
            ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
