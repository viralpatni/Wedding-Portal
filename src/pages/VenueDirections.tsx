import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import {
  MapPin,
  Compass,
  Layers,
  Navigation as NavIcon,
  Sparkles,
  Phone,
  Clock,
  Car,
  ChevronLeft,
  ExternalLink,
  ShieldCheck,
  LocateFixed
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useLanguage } from "@/context/LanguageContext";

export type MapViewMode = "normal" | "satellite" | "3d";

export default function VenueDirections() {
  const { venueLocation } = useAdmin();
  const { t, language } = useLanguage();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeLayerRef = useRef<L.TileLayer | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [viewMode, setViewMode] = useState<MapViewMode>("normal");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locatingStatus, setLocatingStatus] = useState<"locating" | "found" | "denied">("locating");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [estMinutes, setEstMinutes] = useState<number | null>(null);

  const venueLat = venueLocation.lat || 26.9124;
  const venueLng = venueLocation.lng || 75.7873;
  const apiKey = venueLocation.apiKey;

  // Calculate Haversine distance in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 1.25); // estimate driving distance (with 1.25 road curvature multiplier)
  };

  // Locate user position
  const requestUserLocation = () => {
    setLocatingStatus("locating");
    if (!navigator.geolocation) {
      setLocatingStatus("denied");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        setUserCoords({ lat: uLat, lng: uLng });
        setLocatingStatus("found");

        const dist = calculateDistance(uLat, uLng, venueLat, venueLng);
        setDistanceKm(dist);
        setEstMinutes(Math.round((dist / 45) * 60)); // Avg 45 km/h driving speed
      },
      () => {
        setLocatingStatus("denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    requestUserLocation();
  }, [venueLat, venueLng]);

  // Leaflet map setup
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [venueLat, venueLng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });
      L.control.zoom({ position: "topright" }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing layer
    if (activeLayerRef.current) {
      map.removeLayer(activeLayerRef.current);
    }

    // Determine tile URL based on viewMode & Geoapify API key
    let tileUrl = "";
    if (viewMode === "satellite") {
      if (apiKey && apiKey.trim().length > 5) {
        tileUrl = `https://maps.geoapify.com/v1/tile/osm-bright-satellite/{z}/{x}/{y}.png?apiKey=${apiKey.trim()}`;
      } else {
        tileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      }
    } else if (viewMode === "3d") {
      if (apiKey && apiKey.trim().length > 5) {
        tileUrl = `https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}.png?apiKey=${apiKey.trim()}`;
      } else {
        tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      }
    } else {
      if (apiKey && apiKey.trim().length > 5) {
        tileUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey.trim()}`;
      } else {
        tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      }
    }

    const tileLayer = L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);
    activeLayerRef.current = tileLayer;

    // Custom Venue Diya Marker
    const venueIcon = L.divIcon({
      className: "venue-custom-diya",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #D4AF77, #641E2B); box-shadow: 0 8px 30px rgba(100,30,43,0.6); display: flex; align-items: center; justify-content: center; border: 3px solid #FFF8F0; animation: bounce 2s infinite;">
            <span style="font-size: 24px;">🪔</span>
          </div>
          <div style="background: rgba(100,30,43,0.95); color: #FFF8F0; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; white-space: nowrap; margin-top: 5px; border: 1px solid #D4AF77; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            ${venueLocation.venueName || "AvNit Royal Vivah Mandap"}
          </div>
        </div>
      `,
      iconSize: [50, 75],
      iconAnchor: [25, 45]
    });

    const venueMarker = L.marker([venueLat, venueLng], { icon: venueIcon }).addTo(map);
    venueMarker.bindPopup(`
      <div style="text-align: center; padding: 6px; font-family: 'Playfair Display', serif;">
        <h4 style="margin: 0; color: #641E2B; font-weight: bold; font-size: 15px;">${venueLocation.venueName}</h4>
        <p style="margin: 4px 0 0 0; color: #3A211C; font-size: 12px;">${venueLocation.address}</p>
        <p style="margin: 4px 0 0 0; color: #D4AF77; font-weight: bold; font-size: 10px;">✦ Auspicious Ceremony Destination ✦</p>
      </div>
    `);

    // Handle User Location & Route line
    if (userCoords) {
      if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
      if (routeLineRef.current) map.removeLayer(routeLineRef.current);

      const userIcon = L.divIcon({
        className: "user-loc-marker",
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: #2563EB; box-shadow: 0 0 0 6px rgba(37,99,235,0.3); border: 2.5px solid white;"></div>
            <div style="background: #1E293B; color: white; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; margin-top: 4px; white-space: nowrap;">
              Your Location
            </div>
          </div>
        `,
        iconSize: [20, 45],
        iconAnchor: [10, 10]
      });

      const uMarker = L.marker([userCoords.lat, userCoords.lng], { icon: userIcon }).addTo(map);
      uMarker.bindPopup("<b>You are here</b><br/>Starting point of your journey");
      userMarkerRef.current = uMarker;

      // Draw dashed golden path
      const pathLine = L.polyline(
        [
          [userCoords.lat, userCoords.lng],
          [venueLat, venueLng]
        ],
        {
          color: "#641E2B",
          weight: 4,
          dashArray: "8, 8",
          opacity: 0.85
        }
      ).addTo(map);
      routeLineRef.current = pathLine;

      // Fit map bounds to show both user and venue
      map.fitBounds(
        [
          [userCoords.lat, userCoords.lng],
          [venueLat, venueLng]
        ],
        { padding: [60, 60] }
      );
    } else {
      map.setView([venueLat, venueLng], 15);
    }
  }, [venueLat, venueLng, userCoords, viewMode, apiKey, venueLocation.venueName, venueLocation.address]);

  // Turnkey Navigation
  const handleOpenTurnByTurn = () => {
    let url = `https://www.google.com/maps/dir/?api=1&destination=${venueLat},${venueLng}`;
    if (userCoords) {
      url += `&origin=${userCoords.lat},${userCoords.lng}`;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#3A211C] flex flex-col font-body">
      {/* Top Royal Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D4AF77]/30 shadow-sm py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.close()}
              className="p-2 rounded-full hover:bg-[#D4AF77]/15 transition-colors text-[#641E2B]"
              title="Close Tab"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#641E2B] flex items-center justify-center text-white font-script text-xl font-bold shadow-sm" style={{ fontFamily: "'Pinyon Script', cursive" }}>
              AvNit
            </div>
            <div>
              <h1 className="font-display italic text-base sm:text-lg text-[#3A211C] leading-none">
                Royal Venue Directions &amp; Geoapify Route
              </h1>
              <p className="text-[11px] text-[#3A211C]/60">
                {venueLocation.venueName} · {venueLocation.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleOpenTurnByTurn}
              className="px-4 py-2 rounded-full bg-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:bg-[#4E1420] transition-colors"
            >
              <Car className="w-3.5 h-3.5 text-[#D4AF77]" />
              <span className="hidden sm:inline">Start Turn-by-Turn GPS</span>
              <span className="sm:hidden">Start GPS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Map & Controls */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Map View Mode Switchers */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#641E2B] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Map Style:
              </span>
              {(["normal", "satellite", "3d"] as MapViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    viewMode === mode
                      ? "bg-[#641E2B] text-white shadow-sm"
                      : "bg-white border border-[#D4AF77]/40 text-[#3A211C] hover:bg-[#FFF8F0]"
                  }`}
                >
                  {mode === "normal" ? "Street / Normal" : mode === "satellite" ? "🛰️ Satellite" : "🌐 3D Tilt"}
                </button>
              ))}
            </div>

            <button
              onClick={requestUserLocation}
              className="px-3 py-1.5 rounded-full bg-white border border-[#D4AF77]/50 text-xs font-semibold text-[#3A211C] flex items-center gap-1.5 hover:bg-[#FFF8F0] transition-colors shadow-sm"
            >
              <LocateFixed className="w-3.5 h-3.5 text-[#641E2B]" />
              <span>{locatingStatus === "locating" ? "Locating..." : "My Location"}</span>
            </button>
          </div>

          {/* Interactive Leaflet Map Container */}
          <div
            className="relative w-full h-[450px] sm:h-[550px] rounded-3xl overflow-hidden border-2 border-[#D4AF77]/40 shadow-lg bg-[#FFF8F0]"
            style={{
              perspective: viewMode === "3d" ? "1000px" : "none"
            }}
          >
            <div
              ref={mapContainerRef}
              className="w-full h-full"
              style={{
                transform: viewMode === "3d" ? "rotateX(18deg) scale(1.04)" : "none",
                transformOrigin: "center center",
                transition: "transform 0.5s ease"
              }}
            />

            {/* Bottom floating route badge */}
            {distanceKm !== null && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[400] bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-[#D4AF77]/40 shadow-xl flex items-center justify-between gap-4 max-w-sm">
                <div>
                  <div className="flex items-center gap-1.5 text-[#641E2B] font-semibold text-xs">
                    <Car className="w-3.5 h-3.5" />
                    <span>Estimated Road Distance:</span>
                  </div>
                  <p className="font-display italic text-2xl text-[#3A211C] font-bold">
                    {distanceKm} km <span className="text-sm font-normal text-[#3A211C]/60">· ~{estMinutes} mins</span>
                  </p>
                </div>
                <button
                  onClick={handleOpenTurnByTurn}
                  className="px-3.5 py-2 rounded-xl bg-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4E1420] transition-colors flex items-center gap-1 shadow-sm"
                >
                  <NavIcon className="w-3 h-3 text-[#D4AF77]" />
                  <span>Navigate</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Venue Card, Weather, Accommodations */}
        <div className="lg:col-span-4 space-y-4">
          {/* Destination Details Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#D4AF77]/35 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF77]" />
              <span className="text-[11px] uppercase tracking-widest text-[#641E2B] font-bold font-body">
                Official Wedding Venue
              </span>
            </div>

            <div>
              <h3 className="font-display italic text-2xl text-[#3A211C]">
                {venueLocation.venueName}
              </h3>
              <p className="text-xs text-[#3A211C]/75 mt-1 leading-relaxed">
                {venueLocation.address}
              </p>
              <p className="text-xs text-[#D4AF77] font-semibold mt-0.5">
                {venueLocation.city}
              </p>
            </div>

            <div className="pt-2 border-t border-[#D4AF77]/20 flex items-center justify-between text-xs">
              <span className="text-[#3A211C]/60">GPS Coordinates:</span>
              <span className="font-mono font-semibold text-[#641E2B]">
                {venueLat.toFixed(4)}, {venueLng.toFixed(4)}
              </span>
            </div>

            <button
              onClick={handleOpenTurnByTurn}
              className="w-full py-3 rounded-2xl bg-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-[#4E1420] transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#D4AF77]" />
              <span>Open in Google Maps / Apple Maps</span>
            </button>
          </div>

          {/* Winter Climate & Recommended Attire */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#D4AF77]/35 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B8935A]">
              <span>🌤️</span>
              <span>January Weather &amp; Attire</span>
            </div>
            <p className="text-xs text-[#3A211C]/75 leading-relaxed">
              Pleasant winter sunshine (22°C) during day ceremonies and cool celebratory evenings (11°C). Elegant royal shawls and warm stoles are recommended for night events.
            </p>
          </div>

          {/* Concierge & Guest Helpdesk */}
          <div className="bg-gradient-to-br from-[#FFF8F0] via-white to-[#FBECE8] rounded-3xl p-6 border border-[#D4AF77]/35 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#641E2B]">
              <Phone className="w-4 h-4 text-[#D4AF77]" />
              <span>Family Hospitality Helpdesk</span>
            </div>
            <p className="text-xs text-[#3A211C]/75 leading-relaxed">
              For venue shuttles, airport arrivals, or stay assistance, please reach out to the Patni Family Hospitality Desk:
            </p>
            <div className="bg-white/80 rounded-xl p-3 border border-[#D4AF77]/25 text-xs text-[#3A211C] font-medium space-y-1">
              <p>📞 Concierge: +91 98765 43210</p>
              <p>✉️ Email: hospitality@ankit-avani.wedding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

