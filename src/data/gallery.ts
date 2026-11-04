export type GalleryCategory =
  | "All"
  | "Pre-Wedding"
  | "Engagement"
  | "Haldi"
  | "Mehendi"
  | "Sangeet"
  | "Wedding"
  | "Reception"
  | "Family Moments";

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, "All">;
  title: string;
  caption: string;
  src: string;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  date?: string;
}

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Pre-Wedding",
  "Engagement",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Wedding",
  "Reception",
  "Family Moments"
];

export const initialGalleryItems: GalleryItem[] = [
  {
    id: "pw-1",
    category: "Pre-Wedding",
    title: "Golden Hour Glow",
    caption: "Ankit & Avani in a breathtaking romantic couple portrait",
    src: "/images/hero/DSC08259.JPG",
    alt: "Ankit and Avani standing together in a romantic couple portrait",
    aspectRatio: "portrait"
  },
  {
    id: "pw-2",
    category: "Pre-Wedding",
    title: "Hand in Hand",
    caption: "A quiet romantic stroll captured forever",
    src: "",
    alt: "Ankit and Avani holding hands during their pre-wedding photoshoot",
    aspectRatio: "square"
  },
  {
    id: "pw-3",
    category: "Pre-Wedding",
    title: "Embrace of Forever",
    caption: "Pure elegance and romance in every frame",
    src: "",
    alt: "Ankit and Avani in a tender embrace during their pre-wedding photography session",
    aspectRatio: "landscape"
  },
  {
    id: "eng-1",
    category: "Engagement",
    title: "The Ring Ceremony",
    caption: "When forever officially began for Ankit & Avani",
    src: "/images/engagement/DSC08106 (1).JPG",
    alt: "Ankit and Avani during their joyous engagement celebration",
    aspectRatio: "portrait"
  },
  {
    id: "eng-2",
    category: "Engagement",
    title: "Cherished Moments",
    caption: "Celebrating a lifelong commitment with radiance",
    src: "/images/engagement/DSC08259.JPG",
    alt: "Ankit and Avani sharing an intimate engagement portrait",
    aspectRatio: "landscape"
  },
  {
    id: "eng-3",
    category: "Engagement",
    title: "A Sacred Promise",
    caption: "Two souls united with family blessings",
    src: "/images/engagement/DSC08281.JPG",
    alt: "Ankit and Avani during their engagement ceremony surrounded by love",
    aspectRatio: "portrait"
  },
  {
    id: "hld-1",
    category: "Haldi",
    title: "Yellow Sunshine",
    caption: "Turmeric blessings and golden smiles",
    src: "",
    alt: "Haldi ceremony moments for Ankit and Avani filled with yellow marigolds",
    aspectRatio: "square"
  },
  {
    id: "mhd-1",
    category: "Mehendi",
    title: "Intricate Henna",
    caption: "Sacred henna motifs celebrating eternal love",
    src: "",
    alt: "Avani showing her intricate bridal mehendi patterns celebrating Ankit",
    aspectRatio: "portrait"
  },
  {
    id: "sng-1",
    category: "Sangeet",
    title: "Midnight Rhythms",
    caption: "Two families dancing in celebration",
    src: "",
    alt: "Ankit and Avani dancing together during their lively Sangeet celebration",
    aspectRatio: "landscape"
  },
  {
    id: "wed-1",
    category: "Wedding",
    title: "The Sacred Vows",
    caption: "26 January 2027 — Two hearts united as one",
    src: "",
    alt: "Ankit and Avani during their sacred wedding ceremony vows",
    aspectRatio: "portrait"
  },
  {
    id: "wed-2",
    category: "Wedding",
    title: "The Phere",
    caption: "Seven sacred promises around the eternal fire",
    src: "",
    alt: "Ankit and Avani performing the sacred wedding rituals together",
    aspectRatio: "square"
  },
  {
    id: "rcp-1",
    category: "Reception",
    title: "Evening of Elegance",
    caption: "Gala celebration welcoming the newlyweds",
    src: "",
    alt: "Ankit and Avani looking radiant during their grand wedding reception celebration",
    aspectRatio: "landscape"
  },
  {
    id: "fam-1",
    category: "Family Moments",
    title: "Generations of Blessings",
    caption: "Surrounded by the elders and the dearest of hearts",
    src: "",
    alt: "Ankit and Avani surrounded by their loving families sharing blessings",
    aspectRatio: "portrait"
  }
];

export default initialGalleryItems;

