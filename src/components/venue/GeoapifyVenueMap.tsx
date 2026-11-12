import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import {
  MapPin,
  Compass,
  Layers,
  Eye,
  Navigation as NavIcon,
  Sparkles,
  Phone,
  Clock,
  Car,
  Key
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useLanguage } from "@/context/LanguageContext";

export type MapViewMode = "normal" | "satellite" | "3d";

export default function GeoapifyVenueMap() {
  const { venueLocation, updateVenueLocationData } = useAdmin();
  const { t, language } = useLanguage();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeLayerRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [viewMode, setViewMode] = useState<MapViewMode>("normal");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [inputApiKey, setInputApiKey] = useState(venueLocation.apiKey || "");

  // Coordinates for the royal wedding venue (Jaipur / Udaipur royal palace heritage)
  const lat = venueLocation.lat || 26.9124;
  const lng = venueLocation.lng || 75.7873;
  const apiKey = venueLocation.apiKey;

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      // Custom Zoom control top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    map.setView([lat, lng], 15);

    // Remove existing tile layer if any
    if (activeLayerRef.current) {
      map.removeLayer(activeLayerRef.current);
    }

    // Determine tile URL based on viewMode & Geoapify API key
    let tileUrl = "";
    let maxZoom = 19;
    let attribution = "";

    if (viewMode === "satellite") {
      if (apiKey && apiKey.trim().length > 5) {
        tileUrl = `https://maps.geoapify.com/v1/tile/osm-bright-satellite/{z}/{x}/{y}.png?apiKey=${apiKey.trim()}`;
        attribution = "Powered by Geoapify | Satellite";
      } else {
        // High-definition ESRI World Imagery satellite tiles
        tileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
        attribution = "ESRI World Imagery | Geoapify Compatible";
      }
    } else if (viewMode === "3d") {
      if (apiKey && apiKey.trim().length > 5) {
        tileUrl = `https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}.png?apiKey=${apiKey.trim()}`;
        attribution = "Powered by Geoapify | 3D Street";
      } else {
        tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
        attribution = "CartoDB Voyager 3D | Geoapify Compatible";
      }
    } else {
      // Normal View
      if (apiKey && apiKey.trim().length > 5) {
        tileUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey.trim()}`;
        attribution = "Powered by Geoapify | OSM Bright";
      } else {
        tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        attribution = "OpenStreetMap | Geoapify Compatible";
      }
    }

    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom,
      subdomains: ["a", "b", "c"],
      attribution
    }).addTo(map);

    activeLayerRef.current = tileLayer;

    // Custom Royal Crest Animated Marker
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    const customIcon = L.divIcon({
      className: "royal-venue-marker",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #D4AF77, #641E2B); box-shadow: 0 8px 25px rgba(100,30,43,0.5); display: flex; align-items: center; justify-content: center; border: 3px solid #FFF8F0; animation: bounce 2s infinite;">
            <span style="font-size: 20px;">🪔</span>
          </div>
          <div style="width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-top: 10px solid #641E2B; margin-top: -2px;"></div>
          <div style="background: rgba(36,19,16,0.92); color: #FFF8F0; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; border: 1px solid #D4AF77; white-space: nowrap; margin-top: 4px;">
            ${venueLocation.venueName || "AvNit Royal Vivah Mandap"}
          </div>
        </div>
      `,
      iconSize: [60, 70],
      iconAnchor: [30, 60]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <div style="text-align: center; padding: 6px; font-family: 'Playfair Display', serif;">
        <h4 style="margin: 0; color: #641E2B; font-weight: bold; font-size: 15px;">${venueLocation.venueName}</h4>
        <p style="margin: 4px 0 0 0; color: #3A211C; font-size: 11px;">${venueLocation.address}</p>
        <p style="margin: 4px 0 0 0; color: #D4AF77; font-weight: bold; font-size: 10px;">✦ Auspicious Ceremony Destination ✦</p>
      </div>
    `);

    markerRef.current = marker;

    return () => {
      // Cleanup happens gracefully
    };
  }, [lat, lng, viewMode, apiKey, venueLocation.venueName, venueLocation.address]);

  // Open native directions / route in external map or Geoapify route
  const handleOpenDirections = () => {
    const geoUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(geoUrl, "_blank");
  };

  const handleSaveApiKey = () => {
    updateVenueLocationData({ apiKey: inputApiKey.trim() });
    setIsApiKeyModalOpen(false);
  };

  return (
    <section
      id="travel"
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-gradient-to-b from-[#FFF8F0] via-[#FDF7F1] to-[#FFF8F0] overflow-hidden"
      aria-label="Travel Concierge & Geoapify Leaflet Map"
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
              {t("travelPre")}
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
            {t("travelTitle")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#3A211C]/70 font-body text-sm sm:text-base max-w-2xl mx-auto"
          >
            {t("travelSub")}
          </motion.p>
        </div>

        {/* Map & Concierge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: LEAFLET & GEOAPIFY INTERACTIVE MAP */}
          <div className="lg:col-span-8 bg-white/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border-2 border-[#D4AF77]/40 shadow-[0_20px_50px_rgba(58,33,28,0.12)]">
            
            {/* Top Toolbar Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              
              {/* Layer View Mode Switchers */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FFF8F0] border border-[#D4AF77]/30 shadow-sm text-xs font-body font-semibold">
                <button
                  onClick={() => setViewMode("normal")}
                  className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1 ${
                    viewMode === "normal"
                      ? "bg-[#641E2B] text-white shadow-sm"
                      : "text-[#3A211C]/70 hover:text-[#3A211C]"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === "hi" ? "सामान्य" : "Normal"}</span>
                </button>

                <button
                  onClick={() => setViewMode("satellite")}
                  className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1 ${
                    viewMode === "satellite"
                      ? "bg-[#641E2B] text-white shadow-sm"
                      : "text-[#3A211C]/70 hover:text-[#3A211C]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{language === "hi" ? "उपग्रह" : "Satellite"}</span>
                </button>

                <button
                  onClick={() => setViewMode("3d")}
                  className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1 ${
                    viewMode === "3d"
                      ? "bg-[#641E2B] text-white shadow-sm"
                      : "text-[#3A211C]/70 hover:text-[#3A211C]"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{language === "hi" ? "3D परिप्रेक्ष्य" : "3D Street"}</span>
                </button>
              </div>

              {/* Geoapify API Key Status Pill */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsApiKeyModalOpen(true)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#D4AF77]/50 text-[11px] font-body text-[#641E2B] hover:bg-[#F6D6DC]/30 flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Configure Geoapify API Key"
                >
                  <Key className="w-3 h-3 text-[#D4AF77]" />
                  <span>{apiKey ? "Geoapify Connected ✓" : "Set Geoapify API Key"}</span>
                </button>

                <button
                  onClick={handleOpenDirections}
                  className="px-3.5 py-1.5 rounded-full bg-[#3A211C] text-white text-[11px] font-body font-semibold uppercase tracking-wider hover:bg-[#641E2B] flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Car className="w-3.5 h-3.5 text-[#D4AF77]" />
                  <span>{t("getRoute")}</span>
                </button>
              </div>
            </div>

            {/* Interactive Leaflet Map Canvas with optional 3D Perspective CSS */}
            <div
              className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#D4AF77]/30 shadow-inner"
              style={{
                perspective: viewMode === "3d" ? "1000px" : "none"
              }}
            >
              <div
                ref={mapContainerRef}
                className="w-full h-full transition-transform duration-700 ease-out"
                style={{
                  transform: viewMode === "3d" ? "rotateX(18deg) scale(1.04)" : "none",
                  transformOrigin: "bottom center"
                }}
              />

              {/* 3D View Indicator Badge */}
              {viewMode === "3d" && (
                <div className="absolute top-3 left-3 z-[400] px-3 py-1 rounded-full bg-[#241310]/80 backdrop-blur-md text-[#D4AF77] text-[10px] font-body uppercase tracking-wider border border-[#D4AF77]/40">
                  ✦ 3D Perspective &amp; Street Orientation Active
                </div>
              )}
            </div>

            {/* Bottom Venue Strip */}
            <div className="mt-4 p-4 rounded-2xl bg-[#FFF8F0] border border-[#D4AF77]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-body">
              <div>
                <p className="font-display italic text-lg text-[#3A211C] font-semibold">
                  {venueLocation.venueName}
                </p>
                <p className="text-[#3A211C]/70">
                  {venueLocation.address} · {venueLocation.city}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#641E2B] font-semibold">
                <Clock className="w-4 h-4 text-[#D4AF77]" />
                <span>26 January 2027 · 10:30 AM Onwards</span>
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLS: ROYAL CONCIERGE CARDS */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Climate & Dress Code Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-[#D4AF77]/30 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">☀️</span>
                <h4 className="font-display italic text-xl text-[#3A211C]">
                  {t("weatherHeading")}
                </h4>
              </div>
              <p className="text-xs sm:text-sm font-body text-[#3A211C]/80 leading-relaxed mb-4">
                {t("weatherDesc")}
              </p>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-body font-semibold">
                <div className="p-2.5 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/30 text-[#641E2B]">
                  <span className="block text-lg font-bold">22°C</span>
                  <span className="text-[10px] uppercase text-[#3A211C]/60">Afternoon Sun</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/30 text-[#641E2B]">
                  <span className="block text-lg font-bold">11°C</span>
                  <span className="text-[10px] uppercase text-[#3A211C]/60">Evening Chill</span>
                </div>
              </div>
            </div>

            {/* Recommended Stays & Hotels */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-[#D4AF77]/30 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🏰</span>
                <h4 className="font-display italic text-xl text-[#3A211C]">
                  {t("stayHeading")}
                </h4>
              </div>

              <div className="space-y-3 text-xs font-body">
                <div className="p-3 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/20">
                  <p className="font-semibold text-[#3A211C] text-sm">
                    The Grand Heritage Palace Resort
                  </p>
                  <p className="text-[#3A211C]/60 text-[11px] mb-1">
                    0.5 km from Main Mandap · Official Guest Partner
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#641E2B]/10 text-[#641E2B] text-[10px] font-bold">
                    Group Code: AVNIT2027
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/20">
                  <p className="font-semibold text-[#3A211C] text-sm">
                    Rajputana Haveli &amp; Suites
                  </p>
                  <p className="text-[#3A211C]/60 text-[11px] mb-1">
                    1.8 km from Venue · Deluxe Family Suites
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#D4AF77]/20 text-[#641E2B] text-[10px] font-bold">
                    Shuttle Service Provided
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Helpline Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-[#641E2B] to-[#4E1420] text-white shadow-lg">
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF77] font-semibold mb-1">
                Family Hospitality &amp; Helpdesk
              </p>
              <h4 className="font-display italic text-xl mb-2">
                Need Help Reaching The Venue?
              </h4>
              <p className="text-xs text-white/80 font-body mb-3">
                Our wedding logistics coordinators are available round-the-clock for guest airport/station pickups and directions.
              </p>
              <div className="flex items-center gap-2 text-xs font-body font-semibold text-[#D4AF77]">
                <Phone className="w-3.5 h-3.5" />
                <span>Patni Family Concierge: +91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#D4AF77]/50">
            <h3 className="font-display italic text-2xl text-[#3A211C] mb-2">
              Geoapify API Key
            </h3>
            <p className="text-xs font-body text-[#3A211C]/70 mb-4">
              Enter your Geoapify API key here. The Leaflet map will instantly load authentic Geoapify vector/satellite and 3D street layers.
            </p>
            <input
              type="text"
              value={inputApiKey}
              onChange={(e) => setInputApiKey(e.target.value)}
              placeholder="e.g. 5a1b2c3d4e5f6g7h8i9j..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/40 text-sm text-[#3A211C] mb-4 focus:outline-none focus:border-[#641E2B]"
            />
            <div className="flex justify-end gap-2 text-xs font-body">
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-[#3A211C]/70 hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                className="px-5 py-2 rounded-xl bg-[#641E2B] text-white font-semibold hover:bg-[#4E1420]"
              >
                Save &amp; Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

