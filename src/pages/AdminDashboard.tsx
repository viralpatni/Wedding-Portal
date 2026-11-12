import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Mail,
  Calendar,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  Upload,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  RefreshCw,
  FolderOpen,
  MessageSquare,
  Users,
  CheckCircle,
  XCircle,
  Volume2,
  Camera,
  MapPin,
  Key
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { InvitationPageData, AdminImageItem, LiveGuestPhoto, VenueLocationData } from "@/context/AdminContext";
import {
  getStoredRSVPs,
  deleteStoredRSVP,
  getBlessings,
  deleteStoredBlessing,
  type RSVPItem,
  type BlessingItem
} from "@/lib/supabase";

export default function AdminDashboard() {
  const {
    isAuthenticated,
    logout,
    invitationConfig,
    invitationPages,
    updateInvitationConfig,
    addInvitationPage,
    updateInvitationPage,
    deleteInvitationPage,
    resetInvitationToDefault,
    customImages,
    addImageToSection,
    removeImage,
    getSectionImages,
    liveGuestPhotos,
    deleteLiveGuestPhoto,
    venueLocation,
    updateVenueLocationData
  } = useAdmin();

  const navigate = useNavigate();

  // Auth redirect protection
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [activeTab, setActiveTab] = useState<"invitation" | "images" | "rsvp" | "blessings" | "livePhotos" | "venue">("invitation");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Venue form temporary state
  const [venueForm, setVenueForm] = useState(venueLocation);
  useEffect(() => {
    setVenueForm(venueLocation);
  }, [venueLocation]);

  // RSVP & Blessings Data State
  const [rsvps, setRsvps] = useState<(RSVPItem & { id: string; submitted_at: string })[]>([]);
  const [blessings, setBlessings] = useState<BlessingItem[]>([]);

  const refreshRSVPData = () => {
    setRsvps(getStoredRSVPs());
  };

  const refreshBlessingData = () => {
    getBlessings().then(setBlessings);
  };

  useEffect(() => {
    refreshRSVPData();
    refreshBlessingData();
  }, [activeTab]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // ─────────────────────────────────────────────────────────────
  // 1. INVITATION FORM STATE
  // ─────────────────────────────────────────────────────────────
  const [editingPageId, setEditingPageId] = useState<string>(invitationPages[0]?.id || "");
  const [previewPageIdx, setPreviewPageIdx] = useState(0);

  // New Page creation state
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [newPageData, setNewPageData] = useState({
    title: "Royal Sangeet & Cocktails",
    subtitle: "An Evening of Music, Dance & Celebration",
    introMessage: "Join us for an unforgettable night of musical celebrations and joyous performances.",
    eventDate: "Sunday, 24 January 2027",
    time: "7:00 PM Onwards",
    venue: "The Grand Royal Lawns",
    address: "Jaipur, Rajasthan",
    dressCode: "Glamorous Indo-Western / Cocktail Attire",
    customNote: "Dinner & Drinks to follow",
    motif: "✨"
  });

  const handleAddNewPage = (e: React.FormEvent) => {
    e.preventDefault();
    addInvitationPage(newPageData);
    setIsAddingPage(false);
    showToast("New Invitation Page added successfully! Total pages: " + (invitationPages.length + 1));
  };

  // ─────────────────────────────────────────────────────────────
  // 2. IMAGE UPLOAD STATE
  // ─────────────────────────────────────────────────────────────
  const [selectedSection, setSelectedSection] = useState<AdminImageItem["section"]>("engagement");
  const [imgCaption, setImgCaption] = useState("");
  const [imgAlt, setImgAlt] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const SECTION_OPTIONS: { id: AdminImageItem["section"]; label: string; icon: string }[] = [
    { id: "hero", label: "Hero Portrait", icon: "🌟" },
    { id: "engagement", label: "Engagement Ceremony", icon: "💍" },
    { id: "haldi", label: "Haldi Rasam", icon: "💛" },
    { id: "mehendi", label: "Mehendi Night", icon: "🌿" },
    { id: "sangeet", label: "Royal Sangeet", icon: "💃" },
    { id: "wedding", label: "Sacred Vivah", icon: "🪔" },
    { id: "reception", label: "Grand Reception", icon: "✨" },
    { id: "preWedding", label: "Pre-Wedding Album", icon: "📸" },
    { id: "gallery", label: "Gallery Moments", icon: "🖼️" },
    { id: "loveStory", label: "Love Story Chapters", icon: "📖" },
    { id: "personalMessage", label: "Personal Message Background", icon: "💌" },
    { id: "closing", label: "Closing Section", icon: "🎆" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read image as Data URL (base64)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result as string);
      if (!imgAlt) {
        setImgAlt(`Ankit and Avani celebrating ${selectedSection}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewSrc) return;

    addImageToSection({
      section: selectedSection,
      src: previewSrc,
      alt: imgAlt || `Ankit and Avani ${selectedSection} photograph`,
      caption: imgCaption || `${selectedSection.toUpperCase()} Moment`
    });

    setPreviewSrc(null);
    setImgCaption("");
    setImgAlt("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    showToast(`Image successfully added to the "${selectedSection}" folder! It is now active on the live website.`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#3A211C] font-body">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#D4AF77]/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#641E2B] flex items-center justify-center text-white font-script text-2xl font-bold shadow-sm" style={{ fontFamily: "'Pinyon Script', cursive" }}>
              AvNit
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display italic text-lg sm:text-xl text-[#3A211C] leading-none">
                  Admin Sanctuary
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF77]/20 text-[#641E2B] text-[10px] font-semibold uppercase tracking-wider">
                  Patni Family
                </span>
              </div>
              <p className="text-[11px] text-[#3A211C]/60">
                Logged in as <span className="font-medium text-[#641E2B]">AvNit_Forever</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF8F0] border border-[#D4AF77]/50 text-xs font-medium text-[#3A211C] hover:bg-[#D4AF77]/10 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#641E2B]" />
              <span className="hidden sm:inline">View Live Website</span>
              <span className="sm:hidden">Live</span>
            </Link>

            <button
              onClick={() => {
                logout();
                navigate("/admin");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#641E2B] text-white text-xs font-medium hover:bg-[#4E1420] transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setActiveTab("invitation")}
            className={`flex items-center gap-2 px-5 py-2.5 border-b-2 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === "invitation"
                ? "border-[#641E2B] text-[#641E2B]"
                : "border-transparent text-[#3A211C]/60 hover:text-[#3A211C]"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Sacred Invitation &amp; Multi-Pages ({invitationPages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("images")}
            className={`flex items-center gap-2 px-5 py-2.5 border-b-2 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === "images"
                ? "border-[#641E2B] text-[#641E2B]"
                : "border-transparent text-[#3A211C]/60 hover:text-[#3A211C]"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Image Manager ({customImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("rsvp")}
            className={`flex items-center gap-2 px-5 py-2.5 border-b-2 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === "rsvp"
                ? "border-[#641E2B] text-[#641E2B]"
                : "border-transparent text-[#3A211C]/60 hover:text-[#3A211C]"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>RSVP Messages ({rsvps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("blessings")}
            className={`flex items-center gap-2 px-5 py-2.5 border-b-2 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === "blessings"
                ? "border-[#641E2B] text-[#641E2B]"
                : "border-transparent text-[#3A211C]/60 hover:text-[#3A211C]"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Blessings Wall ({blessings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("livePhotos")}
            className={`flex items-center gap-2 px-5 py-2.5 border-b-2 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === "livePhotos"
                ? "border-[#641E2B] text-[#641E2B]"
                : "border-transparent text-[#3A211C]/60 hover:text-[#3A211C]"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Live Guest Photos ({liveGuestPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("venue")}
            className={`flex items-center gap-2 px-5 py-2.5 border-b-2 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === "venue"
                ? "border-[#641E2B] text-[#641E2B]"
                : "border-transparent text-[#3A211C]/60 hover:text-[#3A211C]"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Venue &amp; Geoapify Map</span>
          </button>
        </div>
      </header>

      {/* Floating Success Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-20 left-1/2 z-50 px-5 py-2.5 rounded-full bg-[#641E2B] text-white text-xs font-medium shadow-xl flex items-center gap-2 border border-[#D4AF77]/40"
          >
            <Check className="w-4 h-4 text-[#D4AF77]" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ========================================================= */}
        {/* TAB 1: INVITATION DETAILS & MULTIPLE PAGES MANAGER       */}
        {/* ========================================================= */}
        {activeTab === "invitation" && (
          <div className="space-y-8">
            {/* Header info */}
            <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#D4AF77]" />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF77] font-semibold">
                    Royal Interactive E-Invitation
                  </span>
                </div>
                <h2 className="font-display italic text-3xl text-[#3A211C]">
                  Sacred Invitation &amp; Multi-Page Slider
                </h2>
                <p className="text-xs text-[#3A211C]/70 max-w-2xl mt-1">
                  Add multiple ceremonial invitation cards (e.g. Vivah, Sangeet, Mehendi, Reception). On the main website, when guests open the 3D envelope, all pages animate as an interactive slider!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingPage(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4E1420] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4 text-[#D4AF77]" />
                  <span>Add Invitation Page</span>
                </button>
              </div>
            </div>

            {/* Grid: Left Editor & Right Live Slider Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT: Pages List & Page Editor (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Pages List Selector */}
                <div className="bg-white/80 rounded-2xl p-4 border border-[#D4AF77]/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#3A211C]">
                      Invitation Booklet Pages ({invitationPages.length})
                    </span>
                    <span className="text-[11px] text-[#641E2B] font-medium">
                      Click to edit details
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {invitationPages.map((page, idx) => (
                      <div
                        key={page.id}
                        onClick={() => {
                          setEditingPageId(page.id);
                          setPreviewPageIdx(idx);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          editingPageId === page.id
                            ? "bg-[#641E2B]/5 border-[#641E2B] shadow-sm"
                            : "bg-[#FFFDFB] border-[#D4AF77]/30 hover:border-[#D4AF77]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded-full bg-[#D4AF77]/20 text-[#641E2B] text-[10px] font-bold">
                            PAGE {idx + 1}
                          </span>
                          {invitationPages.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Delete Page ${idx + 1} ("${page.title}")?`)) {
                                  deleteInvitationPage(page.id);
                                  showToast("Invitation page removed.");
                                }
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Delete Page"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="font-display italic text-sm text-[#3A211C] truncate">
                          {page.title}
                        </p>
                        <p className="text-[11px] text-[#3A211C]/60 truncate">
                          {page.eventDate} · {page.venue || "Venue TBA"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edit Selected Page Form */}
                {(() => {
                  const activePage = invitationPages.find((p) => p.id === editingPageId) || invitationPages[0];
                  if (!activePage) return null;

                  return (
                    <div className="bg-white/90 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/40 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#D4AF77]/20">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#D4AF77] font-bold">
                            Editing Page #{activePage.pageNumber}
                          </span>
                          <h3 className="font-display italic text-2xl text-[#3A211C]">
                            {activePage.title}
                          </h3>
                        </div>
                        <span className="text-xs text-[#3A211C]/50">Auto-saves instantly</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Page Main Title / Invocation
                          </label>
                          <input
                            type="text"
                            value={activePage.title}
                            onChange={(e) => updateInvitationPage(activePage.id, { title: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs sm:text-sm text-[#3A211C]"
                            placeholder="e.g. ॥ ॐ श्री गणेशाय नमः ॥ or Royal Vivah Ceremony"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Subtitle / Family Blessing
                          </label>
                          <input
                            type="text"
                            value={activePage.subtitle}
                            onChange={(e) => updateInvitationPage(activePage.id, { subtitle: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs sm:text-sm text-[#3A211C]"
                            placeholder="e.g. With The Blessings of Elders & The Patni Family"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Invitation Welcome Message
                          </label>
                          <textarea
                            rows={2}
                            value={activePage.introMessage}
                            onChange={(e) => updateInvitationPage(activePage.id, { introMessage: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs sm:text-sm text-[#3A211C] resize-none"
                            placeholder="With immense joy and love, Patni family invites you to celebrate..."
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Event Date
                          </label>
                          <input
                            type="text"
                            value={activePage.eventDate}
                            onChange={(e) => updateInvitationPage(activePage.id, { eventDate: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C]"
                            placeholder="e.g. Tuesday, 26 January 2027"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Auspicious Time / Muhurat
                          </label>
                          <input
                            type="text"
                            value={activePage.time}
                            onChange={(e) => updateInvitationPage(activePage.id, { time: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C]"
                            placeholder="e.g. 10:30 AM Onwards (Vivah Muhurat)"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Venue Name
                          </label>
                          <input
                            type="text"
                            value={activePage.venue}
                            onChange={(e) => updateInvitationPage(activePage.id, { venue: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C]"
                            placeholder="e.g. The Royal Grand Heritage Palace"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Venue Address / City
                          </label>
                          <input
                            type="text"
                            value={activePage.address}
                            onChange={(e) => updateInvitationPage(activePage.id, { address: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C]"
                            placeholder="e.g. Palace Road, Jaipur, Rajasthan"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Dress Code / Attire
                          </label>
                          <input
                            type="text"
                            value={activePage.dressCode || ""}
                            onChange={(e) => updateInvitationPage(activePage.id, { dressCode: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C]"
                            placeholder="e.g. Royal Traditional / Festive Pastels"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1">
                            Custom Note / Ceremony Tag
                          </label>
                          <input
                            type="text"
                            value={activePage.customNote || ""}
                            onChange={(e) => updateInvitationPage(activePage.id, { customNote: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C]"
                            placeholder="e.g. Followed by Royal Vivah Bhojan"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => showToast("Changes saved successfully to live website!")}
                          className="px-5 py-2 rounded-xl bg-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4E1420] transition-colors flex items-center gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-[#D4AF77]" />
                          <span>Save &amp; Confirm Live</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* MODAL / COLLAPSIBLE: Add New Page */}
                {isAddingPage && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#641E2B] shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4 pb-2 border-b">
                      <h4 className="font-display italic text-2xl text-[#641E2B]">
                        Create New Invitation Page
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingPage(false)}
                        className="text-xs text-[#3A211C]/60 hover:text-[#3A211C]"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleAddNewPage} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold mb-1">Title</label>
                          <input
                            type="text"
                            required
                            value={newPageData.title}
                            onChange={(e) => setNewPageData({ ...newPageData, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={newPageData.subtitle}
                            onChange={(e) => setNewPageData({ ...newPageData, subtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1">Event Date</label>
                          <input
                            type="text"
                            required
                            value={newPageData.eventDate}
                            onChange={(e) => setNewPageData({ ...newPageData, eventDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1">Time</label>
                          <input
                            type="text"
                            value={newPageData.time}
                            onChange={(e) => setNewPageData({ ...newPageData, time: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1">Venue</label>
                          <input
                            type="text"
                            value={newPageData.venue}
                            onChange={(e) => setNewPageData({ ...newPageData, venue: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1">Dress Code</label>
                          <input
                            type="text"
                            value={newPageData.dressCode}
                            onChange={(e) => setNewPageData({ ...newPageData, dressCode: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingPage(false)}
                          className="px-4 py-2 rounded-lg border text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[#641E2B] text-white text-xs font-semibold uppercase tracking-wider"
                        >
                          Add Page to Booklet
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>

              {/* RIGHT: Live Invitation Slider Preview (5 cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 bg-[#FFFDFB] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF77] shadow-[0_20px_50px_rgba(100,30,43,0.12)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF77] font-bold">
                      Interactive Slider Preview
                    </span>
                    <span className="text-xs text-[#641E2B] font-semibold">
                      Page {previewPageIdx + 1} of {invitationPages.length}
                    </span>
                  </div>

                  {/* Card Slider Box */}
                  <div className="relative rounded-2xl p-6 sm:p-8 text-center border border-[#D4AF77]/30 bg-gradient-to-b from-[#FFFDFB] to-[#FBF3EA] shadow-inner min-h-[380px] flex flex-col justify-between overflow-hidden">
                    {/* Gold Frame */}
                    <div className="absolute inset-2 border border-[#D4AF77]/25 rounded-xl pointer-events-none" />

                    {(() => {
                      const cur = invitationPages[previewPageIdx] || invitationPages[0];
                      if (!cur) return null;

                      return (
                        <div className="space-y-3 relative z-10">
                          <p className="font-display italic text-lg text-[#641E2B]">
                            {cur.title}
                          </p>
                          <p className="text-[10px] uppercase tracking-widest text-[#D4AF77]">
                            {cur.subtitle}
                          </p>

                          <div className="my-4">
                            <h3 className="font-display italic text-3xl text-[#3A211C]">
                              {invitationConfig.groomName} &amp; {invitationConfig.brideName}
                            </h3>
                            <p className="text-xs text-[#3A211C]/70 mt-1 max-w-xs mx-auto">
                              {cur.introMessage}
                            </p>
                          </div>

                          <div className="py-3 border-y border-[#D4AF77]/20 text-xs space-y-1">
                            <p className="font-display italic text-base text-[#3A211C]">
                              {cur.eventDate}
                            </p>
                            <p className="text-[#641E2B] font-semibold text-[11px]">
                              {cur.time}
                            </p>
                            <p className="text-[#3A211C]/80 font-medium">
                              {cur.venue}
                            </p>
                            <p className="text-[#3A211C]/50 text-[10px]">
                              {cur.address}
                            </p>
                          </div>

                          {cur.dressCode && (
                            <p className="text-[10px] uppercase tracking-wider text-[#641E2B]">
                              Attire: {cur.dressCode}
                            </p>
                          )}
                        </div>
                      );
                    })()}

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#D4AF77]/20 relative z-10">
                      <button
                        type="button"
                        disabled={previewPageIdx === 0}
                        onClick={() => setPreviewPageIdx((p) => Math.max(0, p - 1))}
                        className="p-2 rounded-full border border-[#D4AF77]/40 text-[#3A211C] disabled:opacity-30 hover:bg-[#D4AF77]/10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Dots */}
                      <div className="flex gap-1.5">
                        {invitationPages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setPreviewPageIdx(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              previewPageIdx === i
                                ? "bg-[#641E2B] w-5"
                                : "bg-[#D4AF77]/40"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        disabled={previewPageIdx === invitationPages.length - 1}
                        onClick={() => setPreviewPageIdx((p) => Math.min(invitationPages.length - 1, p + 1))}
                        className="p-2 rounded-full border border-[#D4AF77]/40 text-[#3A211C] disabled:opacity-30 hover:bg-[#D4AF77]/10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-center text-[11px] text-[#3A211C]/50 mt-4">
                    On the main website, guests will see this interactive multi-page slider upon opening the royal envelope.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: IMAGE UPLOAD & SECTION FOLDER MANAGER             */}
        {/* ========================================================= */}
        {activeTab === "images" && (
          <div className="space-y-8">
            <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#D4AF77]" />
                <span className="text-xs uppercase tracking-widest text-[#D4AF77] font-semibold">
                  Photo Folder Manager
                </span>
              </div>
              <h2 className="font-display italic text-3xl text-[#3A211C]">
                Assign &amp; Upload Images by Section
              </h2>
              <p className="text-xs text-[#3A211C]/70 max-w-2xl mt-1">
                Choose any section placeholder (e.g. Engagement, Sangeet, Hero, Haldi, Gallery). Uploading a photo will place it in that section folder and instantly display it on the live website.
              </p>
            </div>

            {/* Upload Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form (5 cols) */}
              <div className="lg:col-span-5 bg-white/90 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/40 shadow-sm space-y-5">
                <h3 className="font-display italic text-2xl text-[#3A211C] flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#641E2B]" />
                  <span>Upload to Section Folder</span>
                </h3>

                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  {/* Target Section Selector */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1.5">
                      Target Wedding Section / Folder
                    </label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value as AdminImageItem["section"])}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs sm:text-sm text-[#3A211C] font-medium"
                    >
                      {SECTION_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.icon} {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* File Upload Input */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1.5">
                      Select Photograph
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleFileChange}
                      className="w-full text-xs text-[#3A211C] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#641E2B] file:text-white hover:file:bg-[#4E1420] cursor-pointer"
                    />
                  </div>

                  {/* Caption */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1.5">
                      Photo Caption (Optional)
                    </label>
                    <input
                      type="text"
                      value={imgCaption}
                      onChange={(e) => setImgCaption(e.target.value)}
                      placeholder="e.g. Ring Ceremony Golden Hour"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C]"
                    />
                  </div>

                  {/* Alt text */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1.5">
                      Descriptive Alt Text (Accessibility)
                    </label>
                    <input
                      type="text"
                      value={imgAlt}
                      onChange={(e) => setImgAlt(e.target.value)}
                      placeholder="e.g. Ankit and Avani exchanging rings with radiant smiles"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-xs text-[#3A211C]"
                    />
                  </div>

                  {/* Preview if chosen */}
                  {previewSrc && (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-[#D4AF77] shadow-sm">
                      <img
                        src={previewSrc}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                        Preview ready
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!previewSrc}
                    className="w-full py-3 rounded-xl bg-[#641E2B] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#4E1420] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-[#D4AF77]" />
                    <span>Save into {selectedSection.toUpperCase()} Folder</span>
                  </button>
                </form>
              </div>

              {/* Uploaded Gallery Grid by Section (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                      <h3 className="font-display italic text-2xl text-[#3A211C]">
                        Section Gallery Folders
                      </h3>
                      <p className="text-xs text-[#3A211C]/60">
                        {customImages.length} custom photographs currently uploaded
                      </p>
                    </div>

                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                      {SECTION_OPTIONS.map((opt) => {
                        const count = getSectionImages(opt.id).length;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedSection(opt.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                              selectedSection === opt.id
                                ? "bg-[#641E2B] text-white shadow-sm"
                                : "bg-[#FFFDFB] border border-[#D4AF77]/30 text-[#3A211C]/70 hover:bg-[#D4AF77]/10"
                            }`}
                          >
                            {opt.icon} {opt.label} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Image Grid */}
                  {(() => {
                    const sectionImgs = getSectionImages(selectedSection);
                    if (sectionImgs.length === 0) {
                      return (
                        <div className="py-16 text-center border-2 border-dashed border-[#D4AF77]/30 rounded-2xl">
                          <FolderOpen className="w-10 h-10 text-[#D4AF77] mx-auto mb-2 opacity-60" />
                          <p className="font-display italic text-xl text-[#3A211C]">
                            No custom photos in "{selectedSection}" folder yet
                          </p>
                          <p className="text-xs text-[#3A211C]/50 mt-1">
                            Upload a photo using the form on the left to display it under the {selectedSection} section on the website.
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sectionImgs.map((img) => (
                          <div
                            key={img.id}
                            className="group relative rounded-2xl overflow-hidden border border-[#D4AF77]/30 bg-white shadow-sm"
                          >
                            <div className="aspect-[4/3] overflow-hidden">
                              <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-3 bg-white">
                              <p className="font-medium text-xs text-[#3A211C] truncate">
                                {img.caption || "Untitled Photo"}
                              </p>
                              <p className="text-[10px] text-[#3A211C]/50 truncate">
                                {img.alt}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm("Remove this image from the section?")) {
                                  removeImage(img.id);
                                  showToast("Image removed from folder.");
                                }
                              }}
                              className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: RSVP MESSAGES & ATTENDANCE TRACKER                 */}
        {/* ========================================================= */}
        {activeTab === "rsvp" && (
          <div className="space-y-8">
            <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#D4AF77]" />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF77] font-semibold">
                    Guest Response Sanctuary
                  </span>
                </div>
                <h2 className="font-display italic text-3xl text-[#3A211C]">
                  RSVP Messages &amp; Headcount
                </h2>
                <p className="text-xs text-[#3A211C]/70 max-w-2xl mt-1">
                  Every RSVP response submitted by guests on the website is sent here. View attendance numbers, meal preferences, ceremonies chosen, and personal notes.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    refreshRSVPData();
                    showToast("RSVP list refreshed!");
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#D4AF77]/50 text-[#3A211C] text-xs font-semibold uppercase tracking-wider hover:bg-[#FFF8F0] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#641E2B]" />
                  <span>Refresh List</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white/90 border border-[#D4AF77]/30 shadow-sm text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#3A211C]/60 font-semibold block mb-1">
                  Total Responses
                </span>
                <p className="font-display italic text-3xl text-[#641E2B]">
                  {rsvps.length}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-sm text-center">
                <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
                  Joyfully Attending
                </span>
                <p className="font-display italic text-3xl text-emerald-700">
                  {rsvps.filter((r) => r.attending).length}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF9F5] to-[#FBECE8] border border-[#D4AF77]/40 shadow-sm text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#641E2B] font-semibold block mb-1">
                  Confirmed Headcount
                </span>
                <p className="font-display italic text-3xl text-[#3A211C]">
                  {rsvps.filter((r) => r.attending).reduce((acc, r) => acc + (Number(r.guest_count) || 1), 0)}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-sm text-center">
                <span className="text-[10px] uppercase tracking-wider text-rose-800 font-semibold block mb-1">
                  Regretfully Declining
                </span>
                <p className="font-display italic text-3xl text-rose-700">
                  {rsvps.filter((r) => !r.attending).length}
                </p>
              </div>
            </div>

            {/* RSVPs Cards List */}
            {rsvps.length === 0 ? (
              <div className="bg-white/80 rounded-3xl p-16 text-center border-2 border-dashed border-[#D4AF77]/30">
                <Users className="w-10 h-10 text-[#D4AF77] mx-auto mb-2 opacity-60" />
                <h4 className="font-display italic text-2xl text-[#3A211C] mb-1">
                  No RSVP Messages Yet
                </h4>
                <p className="text-xs text-[#3A211C]/60 max-w-sm mx-auto">
                  When guests submit their attendance and greetings in the RSVP section on the website, their full details will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rsvps.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="bg-white/95 rounded-2xl p-6 border border-[#D4AF77]/35 shadow-sm space-y-3 relative hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display italic text-xl text-[#3A211C]">
                            {rsvp.name}
                          </h4>
                          {rsvp.attending ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Attending ({rsvp.guest_count} guests)</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              <span>Not Attending</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#3A211C]/50 mt-0.5">
                          Submitted on {new Date(rsvp.submitted_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete RSVP response from ${rsvp.name}?`)) {
                            deleteStoredRSVP(rsvp.id);
                            refreshRSVPData();
                            showToast("RSVP removed.");
                          }
                        }}
                        className="text-red-400 hover:text-red-700 p-1"
                        title="Delete RSVP"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {rsvp.attending && (
                      <div className="space-y-1.5 text-xs text-[#3A211C]/80 pt-1 border-t border-[#D4AF77]/20">
                        {rsvp.food_pref && (
                          <p>
                            <span className="font-semibold text-[#641E2B]">Meal Preference: </span>
                            <span>{rsvp.food_pref}</span>
                          </p>
                        )}
                        {rsvp.events && rsvp.events.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {rsvp.events.map((evId) => (
                              <span
                                key={evId}
                                className="px-2 py-0.5 rounded-md bg-[#FFF8F0] border border-[#D4AF77]/40 text-[10px] font-medium uppercase text-[#3A211C]"
                              >
                                {evId}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {rsvp.message && (
                      <div className="pt-2 border-t border-[#D4AF77]/15">
                        <p className="text-[11px] text-[#641E2B] font-semibold uppercase tracking-wider mb-0.5">
                          Personal Message:
                        </p>
                        <p className="text-xs italic text-[#3A211C]/85 bg-[#FFFDFB] p-3 rounded-xl border border-[#D4AF77]/25 leading-relaxed">
                          "{rsvp.message}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: BLESSINGS WALL & VOICE NOTE VAULT                  */}
        {/* ========================================================= */}
        {activeTab === "blessings" && (
          <div className="space-y-8">
            <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#D4AF77]" />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF77] font-semibold">
                    Sacred Wishes Vault
                  </span>
                </div>
                <h2 className="font-display italic text-3xl text-[#3A211C]">
                  Blessings Wall &amp; Voice Notes
                </h2>
                <p className="text-xs text-[#3A211C]/70 max-w-2xl mt-1">
                  Every blessing lantern released by guests is displayed on the live website and preserved here. Listen to recorded audio voice notes or read prayers.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    refreshBlessingData();
                    showToast("Blessings list refreshed!");
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#D4AF77]/50 text-[#3A211C] text-xs font-semibold uppercase tracking-wider hover:bg-[#FFF8F0] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#641E2B]" />
                  <span>Refresh Blessings</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/90 border border-[#D4AF77]/30 shadow-sm text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#3A211C]/60 font-semibold block mb-1">
                  Total Blessings Released
                </span>
                <p className="font-display italic text-3xl text-[#641E2B]">
                  {blessings.length}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF9F5] to-[#FBECE8] border border-[#D4AF77]/40 shadow-sm text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#641E2B] font-semibold block mb-1">
                  Audio Voice Notes Recorded
                </span>
                <p className="font-display italic text-3xl text-[#3A211C]">
                  {blessings.filter((b) => b.voice_url).length}
                </p>
              </div>
            </div>

            {/* Blessings List */}
            {blessings.length === 0 ? (
              <div className="bg-white/80 rounded-3xl p-16 text-center border-2 border-dashed border-[#D4AF77]/30">
                <span className="text-4xl mb-2 block">🪔</span>
                <h4 className="font-display italic text-2xl text-[#3A211C] mb-1">
                  No Blessings Submitted Yet
                </h4>
                <p className="text-xs text-[#3A211C]/60 max-w-sm mx-auto">
                  When guests release blessing lanterns on the Blessings Wall, their written wishes and recorded voice notes will be archived here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blessings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white/95 rounded-2xl p-6 border border-[#D4AF77]/35 shadow-sm space-y-3 relative hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{b.emoji || "💖"}</span>
                        <div>
                          <h4 className="font-display italic text-xl text-[#3A211C]">
                            {b.name}
                          </h4>
                          <p className="text-[10px] text-[#641E2B] uppercase tracking-wider font-semibold">
                            {new Date(b.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete blessing from ${b.name}?`)) {
                            deleteStoredBlessing(b.id);
                            refreshBlessingData();
                            showToast("Blessing deleted.");
                          }
                        }}
                        className="text-red-400 hover:text-red-700 p-1"
                        title="Delete Blessing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-[#3A211C]/85 bg-[#FFFDFB] p-3.5 rounded-xl border border-[#D4AF77]/25 leading-relaxed italic">
                      "{b.message}"
                    </p>

                    {/* Voice Note Audio Player */}
                    {b.voice_url && (
                      <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-[#FFF8F0] to-[#FBECE8] border border-[#D4AF77]/40 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-[#641E2B] font-semibold">
                          <Volume2 className="w-4 h-4 text-[#D4AF77]" />
                          <span>Recorded Audio Blessing:</span>
                        </div>
                        <audio src={b.voice_url} controls className="w-full h-8" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* ========================================================= */}
        {/* TAB 5: LIVE GUEST PHOTOS                                  */}
        {/* ========================================================= */}
        {activeTab === "livePhotos" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Camera className="w-4 h-4 text-[#D4AF77]" />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF77] font-semibold">
                    Live Guest Photo Wall — Admin View
                  </span>
                </div>
                <h2 className="font-display italic text-3xl text-[#3A211C]">
                  Guest Memories ({liveGuestPhotos.length})
                </h2>
                <p className="text-xs text-[#3A211C]/70 max-w-2xl mt-1">
                  All photos uploaded by guests via the live photo wall on the main website are shown here. You can review and delete inappropriate content.
                </p>
              </div>
              {liveGuestPhotos.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear ALL guest photos? This cannot be undone.")) {
                      liveGuestPhotos.forEach(p => deleteLiveGuestPhoto(p.id));
                      showToast("All guest photos cleared.");
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider hover:bg-red-100 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Photos</span>
                </button>
              )}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Total Photos", value: liveGuestPhotos.length, icon: "📸" },
                { label: "Total Likes", value: liveGuestPhotos.reduce((acc, p) => acc + (p.likes || 0), 0), icon: "❤️" },
                { label: "Avg. Likes", value: liveGuestPhotos.length ? Math.round(liveGuestPhotos.reduce((acc, p) => acc + (p.likes || 0), 0) / liveGuestPhotos.length) : 0, icon: "✨" },
                { label: "Unique Guests", value: new Set(liveGuestPhotos.map(p => p.guestName)).size, icon: "👥" }
              ].map(stat => (
                <div key={stat.label} className="bg-white/80 rounded-2xl p-4 border border-[#D4AF77]/25 shadow-sm text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-display italic text-[#641E2B] font-bold">{stat.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#3A211C]/60 font-semibold mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Photos Grid */}
            {liveGuestPhotos.length === 0 ? (
              <div className="bg-white/60 rounded-3xl p-16 border border-[#D4AF77]/20 text-center">
                <div className="text-5xl mb-3">📸</div>
                <p className="font-display italic text-xl text-[#3A211C]/60">No guest photos yet</p>
                <p className="text-xs text-[#3A211C]/40 mt-1">When guests upload photos on the live website, they will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {liveGuestPhotos.map(photo => (
                  <div key={photo.id} className="bg-white rounded-2xl border border-[#D4AF77]/25 shadow-sm overflow-hidden group">
                    {/* Photo thumbnail */}
                    <div className="relative aspect-square overflow-hidden bg-[#FFF8F0]">
                      <img
                        src={photo.imageUrl}
                        alt={photo.caption || photo.guestName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23FFF8F0'/%3E%3Ctext x='50%25' y='50%25' font-size='40' text-anchor='middle' dy='.3em'%3E📸%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      {/* Like badge */}
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-semibold text-[#641E2B] shadow-sm">
                        ❤️ {photo.likes || 0}
                      </div>
                    </div>

                    {/* Photo info */}
                    <div className="p-3.5 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#3A211C] truncate">{photo.guestName}</p>
                          {photo.caption && (
                            <p className="text-xs text-[#3A211C]/70 mt-0.5 line-clamp-2 leading-relaxed">{photo.caption}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#3A211C]/40 font-medium">
                          {new Date(photo.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete photo by "${photo.guestName}"?`)) {
                              deleteLiveGuestPhoto(photo.id);
                              showToast("Photo deleted.");
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: VENUE & GEOAPIFY MAP SETTINGS                       */}
        {/* ========================================================= */}
        {activeTab === "venue" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#D4AF77]" />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF77] font-semibold">
                    Live Venue & Interactive Map Config
                  </span>
                </div>
                <h2 className="font-display italic text-3xl text-[#3A211C]">
                  Venue & Geoapify Map Settings
                </h2>
                <p className="text-xs text-[#3A211C]/70 max-w-2xl mt-1">
                  Set the exact venue coordinates, name, and your Geoapify API key. The map on the main website will update instantly with your changes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Venue Details Form */}
              <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm space-y-5">
                <h3 className="font-display italic text-xl text-[#3A211C] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#641E2B]" />
                  Venue Details
                </h3>

                {/* Venue Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#641E2B] mb-1.5">Venue Name</label>
                  <input
                    type="text"
                    value={venueForm.venueName}
                    onChange={e => setVenueForm(prev => ({ ...prev, venueName: e.target.value }))}
                    placeholder="e.g. The Royal Grand Heritage Palace"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4AF77]/40 bg-[#FFFDFB] text-sm text-[#3A211C] focus:outline-none focus:ring-2 focus:ring-[#D4AF77]/60 transition-shadow"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#641E2B] mb-1.5">City</label>
                  <input
                    type="text"
                    value={venueForm.city}
                    onChange={e => setVenueForm(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4AF77]/40 bg-[#FFFDFB] text-sm text-[#3A211C] focus:outline-none focus:ring-2 focus:ring-[#D4AF77]/60 transition-shadow"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#641E2B] mb-1.5">Full Address</label>
                  <textarea
                    rows={2}
                    value={venueForm.address}
                    onChange={e => setVenueForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="e.g. Palace Road, Central Heritage Zone, Jaipur"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4AF77]/40 bg-[#FFFDFB] text-sm text-[#3A211C] focus:outline-none focus:ring-2 focus:ring-[#D4AF77]/60 transition-shadow resize-none"
                  />
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#641E2B] mb-1.5">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={venueForm.lat}
                      onChange={e => setVenueForm(prev => ({ ...prev, lat: parseFloat(e.target.value) || 0 }))}
                      placeholder="e.g. 26.9124"
                      className="w-full px-4 py-3 rounded-xl border border-[#D4AF77]/40 bg-[#FFFDFB] text-sm text-[#3A211C] focus:outline-none focus:ring-2 focus:ring-[#D4AF77]/60 transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#641E2B] mb-1.5">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={venueForm.lng}
                      onChange={e => setVenueForm(prev => ({ ...prev, lng: parseFloat(e.target.value) || 0 }))}
                      placeholder="e.g. 75.7873"
                      className="w-full px-4 py-3 rounded-xl border border-[#D4AF77]/40 bg-[#FFFDFB] text-sm text-[#3A211C] focus:outline-none focus:ring-2 focus:ring-[#D4AF77]/60 transition-shadow"
                    />
                  </div>
                </div>

                <div className="bg-[#FFF8F0] rounded-xl p-3 border border-[#D4AF77]/20 text-xs text-[#3A211C]/70">
                  💡 <strong>How to get coordinates:</strong> Open <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="text-[#641E2B] underline">Google Maps</a>, right-click on the venue location, and click the coordinates that appear. Paste them above.
                </div>
              </div>

              {/* Geoapify API Key */}
              <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#D4AF77]/30 shadow-sm space-y-5">
                <h3 className="font-display italic text-xl text-[#3A211C] flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#641E2B]" />
                  Geoapify API Key
                </h3>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#641E2B] mb-1.5">API Key</label>
                  <input
                    type="text"
                    value={venueForm.apiKey}
                    onChange={e => setVenueForm(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="Paste your Geoapify API key here..."
                    className="w-full px-4 py-3 rounded-xl border border-[#D4AF77]/40 bg-[#FFFDFB] text-sm text-[#3A211C] focus:outline-none focus:ring-2 focus:ring-[#D4AF77]/60 transition-shadow font-mono"
                  />
                </div>

                <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FBECE8] rounded-2xl p-4 border border-[#D4AF77]/25 space-y-3">
                  <p className="text-xs font-semibold text-[#641E2B] uppercase tracking-wider">🗺️ How to get a free Geoapify API key</p>
                  <ol className="text-xs text-[#3A211C]/75 space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>Visit <a href="https://myprojects.geoapify.com/register" target="_blank" rel="noreferrer" className="text-[#641E2B] underline">myprojects.geoapify.com/register</a></li>
                    <li>Create a free account (3,000 requests/day free)</li>
                    <li>Click "New Project" and copy the API key</li>
                    <li>Paste it above and click "Save Changes"</li>
                  </ol>
                </div>

                {/* Current Settings Preview */}
                <div className="bg-[#FFF8F0] rounded-xl p-4 border border-[#D4AF77]/20 space-y-2">
                  <p className="text-xs font-semibold text-[#641E2B] uppercase tracking-wider mb-2">📍 Current Live Settings</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[#3A211C]/50 uppercase tracking-wider text-[10px]">Venue</p>
                      <p className="text-[#3A211C] font-medium truncate">{venueLocation.venueName}</p>
                    </div>
                    <div>
                      <p className="text-[#3A211C]/50 uppercase tracking-wider text-[10px]">City</p>
                      <p className="text-[#3A211C] font-medium">{venueLocation.city}</p>
                    </div>
                    <div>
                      <p className="text-[#3A211C]/50 uppercase tracking-wider text-[10px]">Coordinates</p>
                      <p className="text-[#3A211C] font-medium font-mono">{venueLocation.lat.toFixed(4)}, {venueLocation.lng.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-[#3A211C]/50 uppercase tracking-wider text-[10px]">API Key</p>
                      <p className="text-[#3A211C] font-medium font-mono">
                        {venueLocation.apiKey ? `${venueLocation.apiKey.substring(0, 8)}...` : "Not set (using OSM fallback)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  updateVenueLocationData(venueForm);
                  showToast("Venue & Map settings saved! The live website map has been updated.");
                }}
                className="px-8 py-3.5 rounded-xl bg-[#641E2B] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#4E1420] transition-colors flex items-center gap-2 shadow-md"
              >
                <MapPin className="w-4 h-4 text-[#D4AF77]" />
                <span>Save Venue & Map Settings</span>
              </button>
            </div>

            {/* Map Preview Info */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white rounded-3xl p-6 border border-[#D4AF77]/25 shadow-sm">
              <h4 className="font-display italic text-lg text-[#3A211C] mb-3 flex items-center gap-2">
                🗺️ Map Features on Live Website
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "🏙️", title: "Normal Street View", desc: "OpenStreetMap bright style with streets, landmarks and labels." },
                  { icon: "🛰️", title: "Satellite View", desc: "Aerial imagery from Geoapify satellite tile layer." },
                  { icon: "🌐", title: "3D Tilt View", desc: "Isometric perspective view with tilt effect for a 3D feel." }
                ].map(f => (
                  <div key={f.title} className="bg-white/60 rounded-2xl p-4 border border-[#D4AF77]/20 text-center">
                    <div className="text-3xl mb-2">{f.icon}</div>
                    <p className="font-semibold text-sm text-[#641E2B] mb-1">{f.title}</p>
                    <p className="text-xs text-[#3A211C]/65 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <a href="/#travel" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#641E2B]/10 text-[#641E2B] text-xs font-semibold uppercase tracking-wider hover:bg-[#641E2B]/20 transition-colors border border-[#641E2B]/20">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Live Map on Website
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

