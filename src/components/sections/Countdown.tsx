import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import HairlineDivider from "@/components/shared/HairlineDivider";
import PillButton from "@/components/shared/PillButton";
import { createEvent, type EventAttributes } from "ics";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const target = new Date(config.weddingDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPassed: false,
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [prevValues, setPrevValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const next = calculateTimeLeft();
      setPrevValues({
        days: timeLeft.days,
        hours: timeLeft.hours,
        minutes: timeLeft.minutes,
        seconds: timeLeft.seconds,
      });
      setTimeLeft(next);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleDownloadICS = () => {
    const event: EventAttributes = {
      start: [2027, 1, 26, 9, 0],
      duration: { hours: 14, minutes: 0 },
      title: `${config.groom} & ${config.bride}'s Wedding Celebration`,
      description: `Join us to celebrate the wedding of ${config.groom} and ${config.bride}! ${config.hashtag}`,
      location: `India`,
      url: window.location.href,
      status: "CONFIRMED",
      busyStatus: "BUSY",
    };

    createEvent(event, (error, value) => {
      if (error) return;
      const blob = new Blob([value], { type: "text/calendar;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${config.groom}-and-${config.bride}-wedding.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleGoogleCalendar = () => {
    const gCalUrl = new URL("https://calendar.google.com/calendar/render");
    gCalUrl.searchParams.append("action", "TEMPLATE");
    gCalUrl.searchParams.append("text", `${config.groom} & ${config.bride}'s Wedding`);
    gCalUrl.searchParams.append("dates", "20270126T033000Z/20270126T183000Z");
    gCalUrl.searchParams.append(
      "details",
      `Celebrating the wedding of ${config.groom} and ${config.bride}! ${config.hashtag}`
    );
    gCalUrl.searchParams.append("location", "India");
    window.open(gCalUrl.toString(), "_blank");
  };

  const timeUnits = [
    { label: "Days", value: timeLeft.days, key: "days" },
    { label: "Hours", value: timeLeft.hours, key: "hours" },
    { label: "Minutes", value: timeLeft.minutes, key: "minutes" },
    { label: "Seconds", value: timeLeft.seconds, key: "seconds" },
  ];

  if (timeLeft.isPassed) {
    return (
      <section
        id="countdown"
        className="relative py-24 sm:py-32 px-6 sm:px-12 overflow-hidden bg-gradient-to-b from-[#FFF8F0] via-[#F6D6DC]/20 to-[#FFF8F0]"
        aria-label="Wedding Countdown Complete"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="script-name text-5xl md:text-6xl text-[#641E2B] mb-4">
              The Countdown Is Over.
            </p>
            <h2 className="font-display italic text-4xl md:text-6xl text-[#3A211C] mb-6">
              Their Forever Has Begun.
            </h2>
            <p className="font-body text-[#3A211C]/60 text-base max-w-md mx-auto">
              {config.groom} & {config.bride} are now married. Here's to a lifetime of love, laughter, and togetherness.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="countdown"
      className="relative py-24 sm:py-32 px-6 sm:px-12 overflow-hidden bg-gradient-to-b from-[#FFF8F0] via-[#F6D6DC]/20 to-[#FFF8F0]"
      aria-label="Wedding Countdown"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#F6D6DC]/30 via-[#FFDCC8]/25 to-[#EBD3B5]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Gold dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: "#D4AF77",
              opacity: 0.4,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="label text-rose-dark tracking-[0.25em] mb-3 text-xs sm:text-sm"
        >
          Counting Down To The Sacred Vows
        </motion.p>

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
          className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto mb-12 sm:mb-16"
        >
          Join us on Republic Day — 26th January 2027 — as Ankit and Avani celebrate the beginning of their beautiful forever.
        </motion.p>

        {/* Countdown Units */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
          {timeUnits.map((unit, index) => {
            const changed = prevValues[unit.key] !== unit.value;
            return (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 * index }}
                className="relative group"
              >
                <div className="relative bg-white/60 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_10px_30px_-5px_rgba(100,30,43,0.08)] transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_15px_35px_rgba(212,175,119,0.2)]">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${unit.key}-${unit.value}`}
                      initial={changed ? { y: -10, opacity: 0 } : { y: 0, opacity: 1 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex items-baseline justify-center"
                    >
                      <span className="font-display italic text-5xl sm:text-6xl md:text-7xl text-[#3A211C] tracking-tight">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-2">
                    <span className="font-body uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold text-[#641E2B]">
                      {unit.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <HairlineDivider withDiamond className="max-w-md mx-auto my-10" />

        {/* Decorative date display */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10"
        >
          <p
            className="font-display italic text-3xl sm:text-4xl text-[#3A211C]/80 mb-1"
          >
            26 January 2027
          </p>
          <p className="label text-[#641E2B] tracking-[0.25em] text-xs">
            Republic Day · India
          </p>
        </motion.div>

        {/* Calendar Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <PillButton
            variant="gold"
            onClick={handleDownloadICS}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          >
            Add to Calendar (.ics)
          </PillButton>

          <PillButton
            variant="ghost"
            onClick={handleGoogleCalendar}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
