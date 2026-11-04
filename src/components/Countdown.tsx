import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, Heart } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { weddingConfig } from "@/config/weddingConfig";
import HairlineDivider from "@/components/shared/HairlineDivider";
import PillButton from "@/components/shared/PillButton";
import { createEvent, type EventAttributes } from "ics";

export default function Countdown() {
  const timeLeft = useCountdown();

  const handleDownloadICS = () => {
    const eventConfig: EventAttributes = {
      start: [2027, 1, 26, 9, 0],
      duration: { hours: 14, minutes: 0 },
      title: `${weddingConfig.groomName} & ${weddingConfig.brideName}'s Wedding Celebration`,
      description: `With immense joy and love, we invite you to celebrate the wedding of ${weddingConfig.groomName} & ${weddingConfig.brideName}! ${weddingConfig.hashtag}`,
      location: weddingConfig.venue ? `${weddingConfig.venue}, ${weddingConfig.location}` : "India",
      url: window.location.href,
      status: "CONFIRMED",
      busyStatus: "BUSY"
    };

    createEvent(eventConfig, (error, value) => {
      if (error) return;
      const blob = new Blob([value], { type: "text/calendar;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${weddingConfig.groomName}-and-${weddingConfig.brideName}-wedding.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleGoogleCalendar = () => {
    const gCalUrl = new URL("https://calendar.google.com/calendar/render");
    gCalUrl.searchParams.append("action", "TEMPLATE");
    gCalUrl.searchParams.append("text", `${weddingConfig.groomName} & ${weddingConfig.brideName}'s Wedding`);
    gCalUrl.searchParams.append("dates", "20270126T033000Z/20270126T183000Z");
    gCalUrl.searchParams.append(
      "details",
      `Celebrating the wedding of ${weddingConfig.groomName} and ${weddingConfig.brideName}! ${weddingConfig.hashtag}`
    );
    gCalUrl.searchParams.append("location", weddingConfig.venue || "India");
    window.open(gCalUrl.toString(), "_blank");
  };

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <section
      id="countdown"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#F9EFE4]/60 to-[#FFF8F0] overflow-hidden"
      aria-label="Wedding Countdown & Celebration Details"
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#D9A6A1]/20 via-[#D4AF77]/25 to-[#F6D6DC]/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF77]" />
          <span className="text-xs uppercase tracking-[0.25em] font-body font-semibold text-[#641E2B]">
            Counting Down To The Sacred Vows
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF77]" />
        </motion.div>

        {/* Section Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A211C] mb-4"
        >
          Every Heartbeat Closer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto mb-12"
        >
          {weddingConfig.tagline} Join us on 26th January 2027 as Ankit and Avani unite in an eternal celebration of love.
        </motion.p>

        {/* Real-time Countdown or Completion Celebration Card */}
        {timeLeft.isComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-white/80 backdrop-blur-md border border-[#D4AF77]/50 shadow-xl max-w-2xl mx-auto mb-12"
          >
            <div className="w-16 h-16 rounded-full bg-[#641E2B]/10 flex items-center justify-center mx-auto mb-4 text-[#641E2B]">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h3 className="font-display italic text-3xl sm:text-4xl text-[#3A211C] mb-2">
              The Countdown Is Over.
            </h3>
            <p className="font-script text-3xl text-[#641E2B]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
              Their Forever Has Begun.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-14">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative"
              >
                <div className="relative bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_10px_30px_rgba(58,40,35,0.06)] transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_16px_36px_rgba(212,175,119,0.22)] group-hover:border-[#D4AF77]/60">
                  {/* Top hairline accent inside unit card */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent" />

                  <div className="flex items-baseline justify-center">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={unit.value}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="font-display italic text-5xl sm:text-6xl md:text-7xl text-[#3A211C] tracking-tight"
                      >
                        {String(unit.value).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="mt-2">
                    <span className="font-body uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold text-[#641E2B]">
                      {unit.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* SECTION 4: Prominent Decorative Date Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white/90 via-[#FFF8F0]/90 to-white/90 border-2 border-[#D4AF77]/40 shadow-[0_16px_40px_rgba(100,30,43,0.07)] relative mb-12"
        >
          {/* Inner golden border frame */}
          <div className="absolute inset-3 border border-[#D4AF77]/25 rounded-2xl pointer-events-none" />

          <p className="text-[11px] uppercase tracking-[0.3em] font-body font-semibold text-[#641E2B] mb-2">
            The Auspicious Date
          </p>

          <h3 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-[#3A211C] mb-3">
            26 JANUARY 2027
          </h3>

          <p className="font-script text-2xl sm:text-3xl text-[#D4AF77] mb-6" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Tuesday · Republic Day Celebration
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body text-[#3A211C]/80 border-t border-[#D4AF77]/20 pt-6">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF77]" />
              <span>Timezone: {weddingConfig.weddingTimezone} (IST)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF77]" />
              <span>{weddingConfig.location || "Venue Details Coming Soon"}</span>
            </div>
          </div>
        </motion.div>

        <HairlineDivider withDiamond className="max-w-md mx-auto my-10" />

        {/* Calendar Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <PillButton
            variant="gold"
            onClick={handleDownloadICS}
            icon={<Calendar className="w-4 h-4" />}
          >
            Add to Calendar (.ics)
          </PillButton>

          <PillButton
            variant="ghost"
            onClick={handleGoogleCalendar}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            }
          >
            Google Calendar
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
}

