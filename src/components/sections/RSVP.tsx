import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { submitRSVP } from "@/lib/supabase";
import PillButton from "@/components/shared/PillButton";
import confetti from "canvas-confetti";

interface RSVPProps {
  initialGuestName?: string;
}

const CEREMONIES = [
  { id: "haldi", label: "Haldi Ceremony (Jan 24)" },
  { id: "mehendi", label: "Mehendi Night (Jan 24)" },
  { id: "sangeet", label: "Sangeet Evening (Jan 25)" },
  { id: "wedding", label: "The Wedding (Jan 26)" },
  { id: "reception", label: "Wedding Reception (Jan 26)" },
];

export default function RSVP({ initialGuestName = "" }: RSVPProps) {
  const [name, setName] = useState(initialGuestName);
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    "haldi",
    "mehendi",
    "sangeet",
    "wedding",
    "reception",
  ]);
  const [foodPref, setFoodPref] = useState("Pure Vegetarian");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialGuestName) setName(initialGuestName);
  }, [initialGuestName]);

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);

    await submitRSVP({
      name: name.trim(),
      attending,
      guest_count: attending ? guestCount : 0,
      events: attending ? selectedEvents : [],
      food_pref: attending ? foodPref : "None",
      message: message.trim(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D9A38F", "#B76E79", "#F6D6DC", "#B8935A"],
    });
  };

  return (
    <section
      id="rsvp"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FBF7F2] overflow-hidden"
      aria-label="RSVP Form"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label text-[#B76E79] tracking-[0.25em] mb-3 text-xs sm:text-sm"
          >
            Will You Join Us?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A2823] mb-4"
          >
            RSVP for the Celebration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A2823]/60 font-body text-sm sm:text-base max-w-lg mx-auto"
          >
            Please let us know your attendance before 15th December 2026 so we may prepare the warmest welcome for you.
          </motion.p>
        </div>

        {/* RSVP Card Form */}
        <div className="relative bg-white/85 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white shadow-[0_20px_50px_rgba(58,40,35,0.06)]">
          {/* Top Gold Hairline inside */}
          <div className="absolute top-0 left-12 right-12 h-0.5 bg-gradient-to-r from-transparent via-[#D9A38F] to-transparent" />

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2823] mb-2 font-body">
                  Full Name / Family Name *
                </label>
                <input
                  type="text"
                  required
                  maxLength={40}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikramaditya Rathore & Family"
                  className="w-full px-4 py-3 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-sm text-[#3A2823] focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              {/* Attendance Toggle */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2823] mb-2 font-body">
                  Will You Attend?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-body font-medium transition-all ${
                      attending
                        ? "bg-[#3A2823] text-[#FBF7F2] shadow-sm"
                        : "bg-[#FBF7F2] text-[#3A2823]/70 border border-[#B8935A]/30"
                    }`}
                  >
                    ✦ Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-body font-medium transition-all ${
                      !attending
                        ? "bg-[#B76E79] text-white shadow-sm"
                        : "bg-[#FBF7F2] text-[#3A2823]/70 border border-[#B8935A]/30"
                    }`}
                  >
                    Regretfully Declines
                  </button>
                </div>
              </div>

              {attending && (
                <>
                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2823] mb-2 font-body">
                      Number of Guests (Including Yourself)
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setGuestCount(num)}
                          className={`w-10 h-10 rounded-xl text-sm font-body font-medium transition-all flex items-center justify-center shrink-0 ${
                            guestCount === num
                              ? "bg-gradient-to-tr from-[#D9A38F] to-[#B76E79] text-white shadow-sm scale-105"
                              : "bg-[#FBF7F2] border border-[#B8935A]/30 text-[#3A2823]"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ceremonies Checkboxes */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2823] mb-2 font-body">
                      Ceremonies You Plan to Attend
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CEREMONIES.map((c) => {
                        const isChecked = selectedEvents.includes(c.id);
                        return (
                          <div
                            key={c.id}
                            onClick={() => toggleEvent(c.id)}
                            className={`p-3 rounded-xl border text-xs font-body cursor-pointer flex items-center gap-2.5 transition-all ${
                              isChecked
                                ? "bg-[#F6D6DC]/30 border-[#B76E79] text-[#3A2823]"
                                : "bg-[#FBF7F2] border-[#B8935A]/20 text-[#3A2823]/60"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] text-white ${
                                isChecked ? "bg-[#B76E79]" : "border border-[#B8935A]/40"
                              }`}
                            >
                              {isChecked ? "✓" : ""}
                            </span>
                            <span>{c.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dietary Preference */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2823] mb-2 font-body">
                      Dietary Preferences
                    </label>
                    <select
                      value={foodPref}
                      onChange={(e) => setFoodPref(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-sm text-[#3A2823] focus:outline-none focus:border-[#B76E79]"
                    >
                      <option value="Pure Vegetarian">Pure Vegetarian (Rajasthani & Multi-cuisine)</option>
                      <option value="Jain">Jain (No onion / garlic / root veggies)</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Regular">Regular / Non-Vegetarian (Reception only)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Message / Song Request */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2823] mb-2 font-body">
                  Special Note or Song Request for the Sangeet
                </label>
                <textarea
                  rows={2}
                  maxLength={300}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Can't wait to celebrate! Please play Gallan Goodiyan on the dance floor!"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF7F2] border border-[#B8935A]/30 text-sm text-[#3A2823] focus:outline-none focus:border-[#B76E79] resize-none"
                />
              </div>

              {/* Submit Button */}
              <PillButton
                variant="gold"
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center py-3.5 text-sm"
              >
                {isSubmitting ? "Submitting RSVP..." : "Send RSVP With Love ✦"}
              </PillButton>
            </form>
          ) : (
            /* SUCCESS STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#D9A38F] to-[#B76E79] text-white flex items-center justify-center text-4xl mb-4 shadow-lg">
                ✨
              </div>
              <h3 className="font-display italic text-3xl sm:text-4xl text-[#3A2823] mb-3">
                Thank You, {name}!
              </h3>
              <p className="font-body text-sm sm:text-base text-[#3A2823]/70 max-w-md mx-auto mb-6">
                Your response has been warmly received. We eagerly look forward to celebrating with you!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs uppercase tracking-widest text-[#B76E79] hover:underline font-body font-medium"
              >
                Edit or Submit Another Response
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
