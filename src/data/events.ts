export interface WeddingEvent {
  id: string;
  name: string;
  shortName: string;
  date: string;
  isoDate?: string;
  time: string;
  endTime?: string;
  venue: string;
  address?: string;
  description: string;
  color: string;
  colorText: string;
  dressCode: string;
  icon: string;
  mapUrl?: string;
  photograph?: string;
  directions?: string;
}

export const weddingEvents: WeddingEvent[] = [
  {
    id: "roka",
    name: "Roka / Engagement",
    shortName: "Roka",
    date: "Details Coming Soon",
    time: "Details Coming Soon",
    venue: "Details Coming Soon",
    description: "A joyful ceremony marking the formal beginning of Ankit and Avani's journey together, surrounded by family blessings and love.",
    color: "#D9A6A1",
    colorText: "#641E2B",
    dressCode: "Details Coming Soon",
    icon: "ring",
    mapUrl: "#",
    photograph: "/images/engagement/DSC08106 (1).JPG",
    directions: "Directions will be shared upon venue confirmation."
  },
  {
    id: "haldi",
    name: "Haldi Ceremony",
    shortName: "Haldi",
    date: "Details Coming Soon",
    time: "Details Coming Soon",
    venue: "Details Coming Soon",
    description: "A radiant turmeric ceremony filled with laughter, golden memories, and heartfelt family blessings for Ankit and Avani.",
    color: "#F9E07A",
    colorText: "#7A5C00",
    dressCode: "Details Coming Soon",
    icon: "sun",
    mapUrl: "#",
    photograph: "",
    directions: "Directions will be shared upon venue confirmation."
  },
  {
    id: "mehendi",
    name: "Mehendi Night",
    shortName: "Mehendi",
    date: "Details Coming Soon",
    time: "Details Coming Soon",
    venue: "Details Coming Soon",
    description: "Intricate henna artistry, folk melodies, and an evening steeped in the warmth of tradition — celebrating Avani and Ankit.",
    color: "#A6AA91",
    colorText: "#2D4A1E",
    dressCode: "Details Coming Soon",
    icon: "leaf",
    mapUrl: "#",
    photograph: "",
    directions: "Directions will be shared upon venue confirmation."
  },
  {
    id: "sangeet",
    name: "Sangeet Evening",
    shortName: "Sangeet",
    date: "Details Coming Soon",
    time: "Details Coming Soon",
    venue: "Details Coming Soon",
    description: "A night of music, dance, and pure celebration as two families come together to rejoice in Ankit and Avani's love.",
    color: "#F6D6DC",
    colorText: "#641E2B",
    dressCode: "Details Coming Soon",
    icon: "music",
    mapUrl: "#",
    photograph: "",
    directions: "Directions will be shared upon venue confirmation."
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    shortName: "Wedding",
    date: "26 January 2027",
    isoDate: "2027-01-26",
    time: "Details Coming Soon",
    venue: "Details Coming Soon",
    description: "The sacred union of Ankit and Avani — a moment blessed by the heavens, witnessed by family, and remembered for a lifetime.",
    color: "#D4AF77",
    colorText: "#3A211C",
    dressCode: "Traditional Indian Formals (Details Coming Soon)",
    icon: "heart",
    mapUrl: "#",
    photograph: "",
    directions: "Directions will be shared upon venue confirmation."
  },
  {
    id: "reception",
    name: "Reception",
    shortName: "Reception",
    date: "Details Coming Soon",
    time: "Details Coming Soon",
    venue: "Details Coming Soon",
    description: "An elegant celebration to welcome Ankit and Avani into their new chapter — an evening of joy, love, and shared memories.",
    color: "#FFDCC8",
    colorText: "#641E2B",
    dressCode: "Cocktail / Formal Wear (Details Coming Soon)",
    icon: "star",
    mapUrl: "#",
    photograph: "",
    directions: "Directions will be shared upon venue confirmation."
  }
];

export default weddingEvents;

