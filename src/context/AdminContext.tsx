import React, { createContext, useContext, useState, useEffect } from "react";
import { weddingConfig } from "@/config/weddingConfig";
import type { WeddingConfig } from "@/config/weddingConfig";
import { weddingImages } from "@/config/weddingImages";
import type { WeddingImage } from "@/config/weddingImages";

export interface InvitationPageData {
  id: string;
  pageNumber: number;
  title: string;
  subtitle: string;
  introMessage: string;
  eventDate: string;
  time: string;
  venue: string;
  address: string;
  dressCode?: string;
  customNote?: string;
  motif?: string;
}

export interface AdminImageItem {
  id: string;
  section: "hero" | "engagement" | "haldi" | "mehendi" | "sangeet" | "wedding" | "reception" | "gallery" | "loveStory" | "personalMessage" | "closing" | "preWedding";
  src: string;
  alt: string;
  caption?: string;
  dateAdded: string;
}

export interface AdminContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  // Invitation Details & Pages
  invitationConfig: typeof weddingConfig;
  invitationPages: InvitationPageData[];
  updateInvitationConfig: (updates: Partial<typeof weddingConfig>) => void;
  addInvitationPage: (page: Omit<InvitationPageData, "id" | "pageNumber">) => void;
  updateInvitationPage: (id: string, updates: Partial<InvitationPageData>) => void;
  deleteInvitationPage: (id: string) => void;
  resetInvitationToDefault: () => void;
  // Custom Images
  customImages: AdminImageItem[];
  addImageToSection: (image: Omit<AdminImageItem, "id" | "dateAdded">) => void;
  removeImage: (id: string) => void;
  getSectionImages: (section: AdminImageItem["section"]) => AdminImageItem[];
  getPrimarySectionImage: (section: AdminImageItem["section"], fallback: string) => string;
}

const DEFAULT_INVITATION_PAGES: InvitationPageData[] = [
  {
    id: "page-1",
    pageNumber: 1,
    title: "॥ ॐ श्री गणेशाय नमः ॥",
    subtitle: "With The Blessings of Elders & The Patni Family",
    introMessage: "With immense joy and love, we invite you to celebrate the sacred wedding of our beloved Ankit & Avani.",
    eventDate: "Tuesday, 26 January 2027",
    time: "10:30 AM Onwards (Auspicious Vivah Muhurat)",
    venue: "The Royal Grand Heritage Palace",
    address: "Palace Road, Jaipur, Rajasthan",
    dressCode: "Royal Traditional / Elegant Festive",
    customNote: "Followed by Royal Vivah Bhojan & Blessings",
    motif: "🪔"
  }
];

const STORAGE_KEYS = {
  AUTH: "avnit_admin_auth",
  INVITATION_CONFIG: "avnit_invitation_config",
  INVITATION_PAGES: "avnit_invitation_pages",
  CUSTOM_IMAGES: "avnit_custom_images"
};

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === "true";
  });

  // Invitation General Config
  const [invitationConfig, setInvitationConfig] = useState<typeof weddingConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVITATION_CONFIG);
      if (saved) return { ...weddingConfig, ...JSON.parse(saved) };
    } catch {}
    return weddingConfig;
  });

  // Invitation Pages List
  const [invitationPages, setInvitationPages] = useState<InvitationPageData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVITATION_PAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_INVITATION_PAGES;
  });

  // Custom Uploaded Images
  const [customImages, setCustomImages] = useState<AdminImageItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_IMAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INVITATION_CONFIG, JSON.stringify(invitationConfig));
    } catch {}
  }, [invitationConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INVITATION_PAGES, JSON.stringify(invitationPages));
    } catch {}
  }, [invitationPages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_IMAGES, JSON.stringify(customImages));
    } catch {}
  }, [customImages]);

  // Auth Functions
  const login = (user: string, pass: string): boolean => {
    // Admin credentials required by user:
    // Username: AvNit_Forever
    // Password: Avani_Ankit@26
    if (user.trim() === "AvNit_Forever" && pass.trim() === "Avani_Ankit@26") {
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  // Invitation Config Methods
  const updateInvitationConfig = (updates: Partial<typeof weddingConfig>) => {
    setInvitationConfig((prev) => ({ ...prev, ...updates }));
  };

  const addInvitationPage = (page: Omit<InvitationPageData, "id" | "pageNumber">) => {
    const newPage: InvitationPageData = {
      ...page,
      id: `page-${Date.now()}`,
      pageNumber: invitationPages.length + 1
    };
    setInvitationPages((prev) => [...prev, newPage]);
  };

  const updateInvitationPage = (id: string, updates: Partial<InvitationPageData>) => {
    setInvitationPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteInvitationPage = (id: string) => {
    setInvitationPages((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      return filtered.map((p, idx) => ({ ...p, pageNumber: idx + 1 }));
    });
  };

  const resetInvitationToDefault = () => {
    setInvitationConfig(weddingConfig);
    setInvitationPages(DEFAULT_INVITATION_PAGES);
    localStorage.removeItem(STORAGE_KEYS.INVITATION_CONFIG);
    localStorage.removeItem(STORAGE_KEYS.INVITATION_PAGES);
  };

  // Image Management Methods
  const addImageToSection = (image: Omit<AdminImageItem, "id" | "dateAdded">) => {
    const newImage: AdminImageItem = {
      ...image,
      id: `img-${Date.now()}`,
      dateAdded: new Date().toISOString()
    };
    setCustomImages((prev) => [newImage, ...prev]);
  };

  const removeImage = (id: string) => {
    setCustomImages((prev) => prev.filter((img) => img.id !== id));
  };

  const getSectionImages = (section: AdminImageItem["section"]): AdminImageItem[] => {
    return customImages.filter((img) => img.section === section);
  };

  const getPrimarySectionImage = (section: AdminImageItem["section"], fallback: string): string => {
    const match = customImages.find((img) => img.section === section);
    return match ? match.src : fallback;
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
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
        getPrimarySectionImage
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

