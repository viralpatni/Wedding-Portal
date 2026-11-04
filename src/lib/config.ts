// ============================================================
// config.ts — All swappable content. Edit this file to
// personalise the site without touching any component code.
// ============================================================

export const config = {
  // ── Couple ──────────────────────────────────────────────
  groom: "Ankit",
  bride: "Avani",
  groomFull: "Ankit",
  brideFull: "Avani",
  giftFrom: "Patni Family",

  // ── Event ───────────────────────────────────────────────
  weddingDate: "2027-01-26T00:00:00+05:30", // ISO 8601 with IST offset
  weddingCity: "",          // To be updated when venue is confirmed
  hashtag: "#AnkitWedAvani",

  // ── Tagline ─────────────────────────────────────────────
  tagline: "Two Hearts, One Beautiful Forever.",
  websiteName: "AvNit — A Forever Story",

  // ── Invitation ──────────────────────────────────────────
  invitationMessage:
    "With immense joy and love, we invite you to celebrate the wedding of Ankit & Avani.",

  // ── Personal Message ────────────────────────────────────
  // Update this when you want to write your personal message
  personalMessage: "",

  // ── Closing ─────────────────────────────────────────────
  closingMessage:
    "Here's to a lifetime of love, laughter, and togetherness.",

  // ── Anniversary ─────────────────────────────────────────
  anniversaryDate: "2028-01-26T00:00:00+05:30",

  // ── Supabase (anon key is public; RLS is the security layer)
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,

  // ── Analytics (optional) ────────────────────────────────
  gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID as string | undefined,

  // ── Guest param limits ──────────────────────────────────
  guestNameMaxLength: 40,

  // ── Audio ────────────────────────────────────────────────
  // Place a royalty-free or the couple's own song at /public/audio/romantic-theme.mp3
  audioSrc: "/audio/romantic-theme.mp3",

  // ── Social ───────────────────────────────────────────────
  whatsappShareText:
    "You're invited to Ankit & Avani's wedding! ✨ #AnkitWedAvani",
} as const;

export type Config = typeof config;

