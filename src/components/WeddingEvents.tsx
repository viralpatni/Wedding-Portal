import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, Compass, CheckCircle2 } from "lucide-react";
import { weddingEvents, type WeddingEvent } from "@/data/events";
import { weddingConfig } from "@/config/weddingConfig";
import { useAdmin } from "@/context/AdminContext";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { createEvent, type EventAttributes } from "ics";

export default function WeddingEvents() {
  const { getPrimarySectionImage } = useAdmin();
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleDownloadEventICS = (ev: WeddingEvent) => {
    // Only allow calendar download for wedding ceremony or confirmed dates
    if (ev.id !== "wedding" && ev.date.includes("Coming Soon")) {
      alert("Timings and calendar invite will be activated once event details are confirmed.");
      return;
    }

    const eventConfig: EventAttributes = {
      start: [2027, 1, 26, 9, 0],
      duration: { hours: 6, minutes: 0 },
      title: `${ev.name} — ${weddingConfig.groomName} & ${weddingConfig.brideName}'s Wedding`,
      description: `${ev.description}\n\nDress Code: ${ev.dressCode}`,
      location: ev.venue !== "Details Coming Soon" ? `${ev.venue}, ${weddingConfig.location}` : "India",
      url: window.location.href,
      status: "CONFIRMED"
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

  const filteredEvents = activeTab === "all"
    ? weddingEvents
    : weddingEvents.filter((ev) => ev.id === activeTab);

  return (
    <section
      id="events"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#FDF5EB] to-[#FFF8F0] overflow-hidden"
      aria-label="Wedding Events Timeline"
    >
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full blur-[100px] opacity-25 bg-[#D4AF77]" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-20 bg-[#641E2B]" />

      <div className="max-w-6xl mx-auto">
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
              The Auspicious Schedule
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF77]" />
          </motion.div>

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
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-xl mx-auto"
          >
            A multi-day royal celebration celebrating the union of Ankit and Avani. Timings, venues, and directions will be updated as they are confirmed.
          </motion.p>

          {/* Event Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-body font-medium transition-all ${
                activeTab === "all"
                  ? "bg-[#3A211C] text-[#FFF8F0] shadow-sm"
                  : "bg-white/70 text-[#3A211C]/70 hover:bg-white border border-[#D4AF77]/30"
              }`}
            >
              All Ceremonies ({weddingEvents.length})
            </button>
            {weddingEvents.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setActiveTab(ev.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-body font-medium transition-all ${
                  activeTab === ev.id
                    ? "bg-[#641E2B] text-white shadow-sm"
                    : "bg-white/70 text-[#3A211C]/70 hover:bg-white border border-[#D4AF77]/30"
                }`}
              >
                {ev.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Ceremonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {filteredEvents.map((ev, index) => {
            const isWedding = ev.id === "wedding";
            const isConfirmed = !ev.date.includes("Coming Soon");

            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 * index }}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
                  isWedding
                    ? "bg-gradient-to-b from-white via-[#FFF8F0] to-white border-2 border-[#D4AF77] shadow-[0_15px_40px_rgba(212,175,119,0.25)] md:col-span-2 lg:col-span-1"
                    : "bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_10px_30px_rgba(58,40,35,0.06)]"
                }`}
              >
                {/* Wedding highlight badge */}
                {isWedding && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF77] to-[#641E2B] text-white text-[10px] uppercase tracking-widest font-semibold shadow-sm whitespace-nowrap">
                    ✦ The Sacred Vows ✦
                  </div>
                )}

                {/* Event Top Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-medium font-body uppercase tracking-wider"
                      style={{
                        backgroundColor: `${ev.color}35`,
                        color: ev.colorText
                      }}
                    >
                      {ev.shortName}
                    </span>

                    <span className={`text-xs font-body ${isConfirmed ? "font-semibold text-[#3A211C]" : "italic text-[#3A211C]/40"}`}>
                      {ev.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display italic text-2xl sm:text-3xl text-[#3A211C] mb-3">
                    {ev.name}
                  </h3>

                  {/* Photograph Placeholder or Admin Upload */}
                  <div className="mb-4 rounded-xl overflow-hidden aspect-[16/9]">
                    {(() => {
                      const sectionKey = ev.id === "roka" ? "engagement" : (ev.id as any);
                      const photoSrc = getPrimarySectionImage(sectionKey, ev.photograph || "");
                      if (photoSrc) {
                        return (
                          <img
                            src={photoSrc}
                            alt={`${ev.name} venue or ceremony for Ankit and Avani`}
                            className="w-full h-full object-cover"
                          />
                        );
                      }
                      return (
                        <ImagePlaceholder
                          alt={`Venue photograph placeholder for ${ev.name}`}
                          caption={ev.name}
                          subtitle="Venue Photograph Coming Soon"
                          aspect="w-full h-full"
                          icon="photo"
                        />
                      );
                    })()}
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs sm:text-sm text-[#3A211C]/75 leading-relaxed mb-6">
                    {ev.description}
                  </p>

                  {/* Details Card Table */}
                  <div className="space-y-3 pt-4 border-t border-[#D4AF77]/20 mb-6 text-xs font-body text-[#3A211C]">
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#D4AF77] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#3A211C]/50">Time: </span>
                        <span className={ev.time.includes("Coming Soon") ? "italic text-[#3A211C]/50" : "font-medium"}>
                          {ev.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D4AF77] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#3A211C]/50">Venue: </span>
                        <span className={ev.venue.includes("Coming Soon") ? "italic text-[#3A211C]/50" : "font-medium"}>
                          {ev.venue}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#D4AF77] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#3A211C]/50">Dress Code: </span>
                        <span className={ev.dressCode.includes("Coming Soon") ? "italic text-[#3A211C]/50" : "font-semibold text-[#641E2B]"}>
                          {ev.dressCode}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Compass className="w-4 h-4 text-[#D4AF77] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#3A211C]/50">Directions: </span>
                        <span className="italic text-[#3A211C]/50 text-[11px]">
                          {ev.directions || "Details Coming Soon"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  {ev.mapUrl && ev.mapUrl !== "#" ? (
                    <a
                      href={ev.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-full border border-[#D4AF77]/40 text-center text-[11px] uppercase tracking-widest text-[#3A211C] hover:border-[#3A211C] hover:bg-white transition-all font-body font-medium"
                    >
                      Directions ↗
                    </a>
                  ) : (
                    <span className="flex-1 py-2.5 px-3 rounded-full border border-[#D4AF77]/20 text-center text-[11px] uppercase tracking-widest text-[#3A211C]/30 font-body font-medium cursor-default">
                      Directions Soon
                    </span>
                  )}

                  {isWedding ? (
                    <button
                      onClick={() => handleDownloadEventICS(ev)}
                      className="py-2.5 px-4 rounded-full bg-[#3A211C] text-[#FFF8F0] text-[11px] uppercase tracking-widest hover:bg-[#641E2B] transition-all font-body font-medium shadow-sm"
                      title="Save ceremony to calendar"
                    >
                      + Calendar
                    </button>
                  ) : (
                    <span className="py-2.5 px-3 rounded-full bg-[#3A211C]/5 text-[#3A211C]/40 text-[11px] uppercase tracking-wider font-body font-medium cursor-default">
                      Details Soon
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note on upcoming information */}
        <p className="text-center text-xs text-[#3A211C]/50 font-body italic">
          All event venues, specific timings, and dress codes will be refreshed once confirmed.
        </p>
      </div>
    </section>
  );
}

