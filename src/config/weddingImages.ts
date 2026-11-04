// ============================================================
// weddingImages.ts — Centralized image configuration.
// Replace the `src` values with actual image paths when ready.
// All images under public/ are served from the root URL.
// ============================================================

export interface WeddingImage {
  src: string;
  alt: string;
  caption?: string;
}

export const weddingImages = {
  // ── Hero ────────────────────────────────────────────────
  hero: {
    src: "/images/hero/DSC08259.JPG",
    alt: "Ankit and Avani standing together in a beautiful romantic couple portrait",
    caption: "Ankit & Avani — Couple Portrait",
  } as WeddingImage,

  // ── Invitation ──────────────────────────────────────────
  invitation: {
    src: "/images/hero/DSC08259.JPG",
    alt: "Ankit and Avani's personalized wedding invitation photograph",
    caption: "Our Wedding Invitation",
  } as WeddingImage,

  // ── Love Story Chapters ─────────────────────────────────
  loveStory: [
    {
      src: "",
      alt: "Ankit and Avani sharing a memorable moment together — How They Met",
      caption: "How They Met",
    },
    {
      src: "",
      alt: "Ankit and Avani in their early days together — First Memories",
      caption: "First Memories",
    },
    {
      src: "",
      alt: "Ankit and Avani sharing a special moment — Special Moments",
      caption: "Special Moments",
    },
    {
      src: "",
      alt: "Ankit and Avani growing together — Their Journey",
      caption: "Their Journey Together",
    },
    {
      src: "/images/engagement/DSC08281.JPG",
      alt: "Ankit and Avani celebrating their engagement",
      caption: "The Engagement",
    },
    {
      src: "/images/hero/DSC08259.JPG",
      alt: "Ankit and Avani looking forward to their wedding — A Beautiful New Beginning",
      caption: "A Beautiful New Beginning",
    },
  ] as WeddingImage[],

  // ── Pre-Wedding Album ───────────────────────────────────
  preWedding: [
    {
      src: "/images/engagement/DSC08106 (1).JPG",
      alt: "Ankit and Avani's photoshoot — photograph 1",
      caption: "Together Forever",
    },
    {
      src: "/images/hero/DSC08259.JPG",
      alt: "Ankit and Avani's photoshoot — photograph 2",
      caption: "Golden Moments",
    },
    {
      src: "/images/engagement/DSC08281.JPG",
      alt: "Ankit and Avani's photoshoot — photograph 3",
      caption: "A Quiet Promise",
    },
    {
      src: "/images/engagement/DSC08259.JPG",
      alt: "Ankit and Avani's photoshoot — photograph 4",
      caption: "In Love",
    },
    {
      src: "",
      alt: "Ankit and Avani's photoshoot — photograph 5",
      caption: "Our Story",
    },
    {
      src: "",
      alt: "Ankit and Avani's photoshoot — photograph 6",
      caption: "Forever",
    },
  ] as WeddingImage[],

  // ── Engagement ──────────────────────────────────────────
  engagement: {
    src: "/images/engagement/DSC08106 (1).JPG",
    alt: "Ankit and Avani celebrating their engagement ceremony together",
    caption: "The Engagement",
  } as WeddingImage,

  // ── Wedding Gallery ─────────────────────────────────────
  gallery: {
    preWedding: [
      {
        src: "/images/hero/DSC08259.JPG",
        alt: "Ankit and Avani in a beautiful romantic portrait",
        caption: "Golden Hour Glow",
      },
    ] as WeddingImage[],
    engagement: [
      {
        src: "/images/engagement/DSC08106 (1).JPG",
        alt: "Ankit and Avani celebrating their engagement ceremony together",
        caption: "The Ring Ceremony",
      },
      {
        src: "/images/engagement/DSC08259.JPG",
        alt: "Ankit and Avani sharing an intimate engagement moment",
        caption: "Cherished Moments",
      },
      {
        src: "/images/engagement/DSC08281.JPG",
        alt: "Ankit and Avani during their joyous engagement celebration",
        caption: "A Lifelong Promise",
      },
    ] as WeddingImage[],
    haldi: [] as WeddingImage[],
    mehendi: [] as WeddingImage[],
    sangeet: [] as WeddingImage[],
    wedding: [] as WeddingImage[],
    reception: [] as WeddingImage[],
    family: [] as WeddingImage[],
  },

  // ── Wedding Video ───────────────────────────────────────
  weddingVideo: {
    src: "",
    poster: "/images/hero/DSC08259.JPG",
    alt: "Wedding film featuring Ankit and Avani",
    caption: "Ankit & Avani — Wedding Film",
  },

  // ── Personal Message Background ─────────────────────────
  personalMessage: {
    src: "/images/engagement/DSC08281.JPG",
    alt: "A beautiful portrait of Ankit and Avani together",
    caption: "A Little Something From Your Family",
  } as WeddingImage,

  // ── Closing Section ─────────────────────────────────────
  closing: {
    src: "/images/hero/DSC08259.JPG",
    alt: "A beautiful portrait of Ankit and Avani — their forever begins",
    caption: "Ankit & Avani",
  } as WeddingImage,

  // ── Event Venue / Ceremony Photographs ──────────────────
  events: {
    roka: {
      src: "/images/engagement/DSC08106 (1).JPG",
      alt: "Ankit and Avani's Roka & Engagement ceremony",
    },
    haldi: { src: "", alt: "Venue for Ankit and Avani's Haldi ceremony" },
    mehendi: { src: "", alt: "Venue for Ankit and Avani's Mehendi night" },
    sangeet: { src: "", alt: "Venue for Ankit and Avani's Sangeet evening" },
    wedding: { src: "", alt: "Venue for Ankit and Avani's wedding ceremony" },
    reception: { src: "", alt: "Venue for Ankit and Avani's wedding reception" },
  },
} as const;
