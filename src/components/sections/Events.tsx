import { useState } from "react";
import { motion } from "framer-motion";
import eventsData from "@/data/events.json";
import PillButton from "@/components/shared/PillButton";
import { createEvent, type EventAttributes } from "ics";

export default function Events() {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  const handleDownloadEventICS = (ev: (typeof eventsData)[0]) => {
    // Only allow ICS download for the confirmed wedding date
    if (!ev.isoDate) return;

    const eventConfig: EventAttributes = {
      start: [2027, 1, 26, 9, 0],
      duration: { hours: 6, minutes: 0 },
      title: `${ev.name} — Ankit & Avani's Wedding`,
      description: `${ev.description}`,
      location: ev.venue !== "Details Coming Soon" ? ev.venue : "India",
      url: window.location.href,
    };

    createEvent(eventConfig, (err, val) => {
      if (err) return;
      const blob = new Blob([val], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${ev.id}-ankit-avani.ics`;
      link.click();
    });
  };

  const eventIcons: Record<string, string> = {
    roka: "💍",
    haldi: "🌼",
    mehendi: "🌿",
    sangeet: "🎵",
    wedding: "💒",
    reception: "✨",
  };

  return (
    <section
      id="events"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#FFDCC8]/20 to-[#FFF8F0] overflow-hidden"
      aria-label="Wedding Ceremonies and Events"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,119,0.1) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(100,30,43,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label text-[#641E2B] tracking-[0.25em] mb-3 text-xs sm:text-sm"
          >
            The Auspicious Schedule
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#3A211C] mb-5"
          >
            Ceremonies of Joy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/60 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            A celebration spanning marigold mornings, intricate mehendi evenings, and the sacred vows of Ankit and Avani. Venue and timing details will be updated soon.
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {eventsData.map((ev, index) => {
            const isWedding = ev.id === "wedding";
            const isConfirmed = ev.date !== "Details Coming Soon";

            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                  isWedding
                    ? "bg-gradient-to-b from-white/95 via-[#FFF0E0]/60 to-white/95 border-2 border-[#D4AF77] shadow-[0_15px_40px_rgba(212,175,119,0.2)] md:col-span-2 lg:col-span-1"
                    : "bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_10px_30px_rgba(58,40,35,0.05)]"
                }`}
              >
                {/* Wedding highlight badge */}
                {isWedding && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF77] to-[#641E2B] text-white text-[10px] uppercase tracking-widest font-semibold shadow-sm whitespace-nowrap">
                    ✦ The Sacred Vows ✦
                  </div>
                )}

                {/* Colored top accent stripe */}
                <div
                  className="absolute top-0 left-6 right-6 h-1 rounded-b-full opacity-60"
                  style={{ background: ev.color }}
                />

                <div>
                  {/* Event icon & date row */}
                  <div className="flex items-center justify-between gap-2 mb-4 mt-3">
                    <span className="text-2xl">{eventIcons[ev.id] || "💫"}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium font-body ${
                        isConfirmed
                          ? "bg-[#EBD3B5]/30 text-[#3A211C]"
                          : "bg-[#F6D6DC]/40 text-[#641E2B] italic"
                      }`}
                    >
                      {ev.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display italic text-3xl sm:text-4xl text-[#3A211C] mb-3">
                    {ev.name}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-xs sm:text-sm text-[#3A211C]/70 leading-relaxed mb-6">
                    {ev.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 pt-4 border-t border-[#D4AF77]/15 mb-6">
                    {/* Time */}
                    <div className="flex items-center gap-2.5 text-xs text-[#3A211C]">
                      <span className="text-[#641E2B] text-sm">🕐</span>
                      <div>
                        <span className="text-[#3A211C]/50">Time: </span>
                        <span className={ev.time === "Details Coming Soon" ? "italic text-[#3A211C]/40" : "font-semibold"}>
                          {ev.time}
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start gap-2.5 text-xs text-[#3A211C]">
                      <span className="text-[#641E2B] text-sm">📍</span>
                      <div>
                        <span className={ev.venue === "Details Coming Soon" ? "italic text-[#3A211C]/40" : "font-semibold"}>
                          {ev.venue}
                        </span>
                      </div>
                    </div>

                    {/* Dress code */}
                    <div className="flex items-center gap-2.5 text-xs text-[#3A211C]">
                      <span className="text-[#641E2B] text-sm">✨</span>
                      <div>
                        <span className="text-[#3A211C]/50">Dress Code: </span>
                        <span className={ev.dressCode === "Details Coming Soon" ? "italic text-[#3A211C]/40" : "font-semibold text-[#641E2B]"}>
                          {ev.dressCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-2">
                  {ev.mapUrl !== "#" ? (
                    <a
                      href={ev.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-full border border-[#D4AF77]/30 text-center text-[11px] uppercase tracking-widest text-[#3A211C] hover:border-[#3A211C] hover:bg-white/80 transition-all font-body font-medium"
                    >
                      View Map ↗
                    </a>
                  ) : (
                    <span className="flex-1 py-2.5 px-3 rounded-full border border-[#D4AF77]/20 text-center text-[11px] uppercase tracking-widest text-[#3A211C]/30 font-body font-medium cursor-default">
                      Venue TBA
                    </span>
                  )}

                  {isWedding ? (
                    <button
                      onClick={() => handleDownloadEventICS(ev)}
                      className="py-2.5 px-4 rounded-full bg-[#3A211C] text-[#FFF8F0] text-[11px] uppercase tracking-widest hover:bg-[#3A211C]/90 transition-all font-body font-medium shadow-sm"
                      title="Save wedding date to calendar"
                    >
                      + Calendar
                    </button>
                  ) : (
                    <span className="py-2.5 px-4 rounded-full bg-[#3A211C]/10 text-[#3A211C]/40 text-[11px] uppercase tracking-widest font-body font-medium cursor-default">
                      Details Soon
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-xs text-[#3A211C]/40 font-body italic"
        >
          Venue addresses, timings, and dress codes will be updated once confirmed. Check back soon!
        </motion.p>
      </div>
    </section>
  );
}
