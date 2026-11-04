// ============================================================
// weddingConfig.ts — Wedding details configuration.
// Fill in details as they are confirmed.
// ============================================================

export const weddingConfig = {
  // ── Names ────────────────────────────────────────────────
  groomName: "Ankit",
  brideName: "Avani",

  // ── Wedding Date & Time ──────────────────────────────────
  weddingDate: "2027-01-26",
  weddingTimezone: "Asia/Kolkata",
  weddingTime: "", // e.g. "11:00 AM IST" — to be confirmed

  // ── Venue ────────────────────────────────────────────────
  venue: "",       // e.g. "The Grand Ballroom" — to be confirmed
  location: "",    // e.g. "Mumbai, Maharashtra" — to be confirmed
  address: "",     // Full address — to be confirmed

  // ── Website ──────────────────────────────────────────────
  tagline: "Two Hearts, One Beautiful Forever.",
  websiteName: "AvNit — A Forever Story",
  hashtag: "#AnkitWedAvani",

  // ── Invitation ───────────────────────────────────────────
  invitationMessage:
    "With immense joy and love, we invite you to celebrate the wedding of Ankit & Avani.",

  // ── Family Names ─────────────────────────────────────────
  groomFamily: "", // To be confirmed
  brideFamily: "", // To be confirmed

  // ── Personal Message ─────────────────────────────────────
  // This is the personal message from the family/gift-giver
  // Written inside the sealed letter section
  personalMessage: "", // To be filled when ready

  // ── Closing ──────────────────────────────────────────────
  closingMessage: "Here's to a lifetime of love, laughter, and togetherness.",

  // ── Gift Giver ───────────────────────────────────────────
  giftFrom: "Patni Family", // The family gifting this wedding website
} as const;

export type WeddingConfig = typeof weddingConfig;

