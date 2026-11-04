import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config";

// LocalStorage keys for graceful mock/offline fallback
const STORAGE_KEYS = {
  RSVP: "wedding_offline_rsvp",
  BLESSINGS: "wedding_offline_blessings",
  QUIZ_SCORES: "wedding_offline_scores",
  TIME_CAPSULE: "wedding_offline_capsule",
};

const defaultBlessings: BlessingItem[] = [];

let client: SupabaseClient | null = null;
const isConfigured = Boolean(
  config.supabaseUrl &&
  config.supabaseKey &&
  !config.supabaseUrl.includes("xxxx") &&
  config.supabaseUrl.startsWith("https://")
);

if (isConfigured) {
  try {
    client = createClient(config.supabaseUrl, config.supabaseKey);
  } catch (err) {
    console.warn("Failed to initialize real Supabase client, falling back to local store:", err);
  }
}

export const supabase = client;

// ── High-level data helpers with transparent fallback ──

export interface BlessingItem {
  id: string;
  name: string;
  message: string;
  emoji?: string;
  voice_url?: string;
  approved?: boolean;
  created_at: string;
}

export interface QuizScoreItem {
  id: string;
  name: string;
  score: number;
  created_at: string;
}

export interface RSVPItem {
  name: string;
  guest_count: number;
  events: string[];
  food_pref: string;
  message?: string;
  attending: boolean;
}

export interface TimeCapsuleItem {
  name: string;
  message: string;
}

// 1. BLESSINGS
export async function getBlessings(): Promise<BlessingItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("blessings")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase blessings query failed, using local store:", e);
    }
  }

  // Fallback
  const stored = localStorage.getItem(STORAGE_KEYS.BLESSINGS);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return [...parsed, ...defaultBlessings];
    } catch {
      // ignore JSON parse error
    }
  }
  return defaultBlessings;
}

export async function submitBlessing(blessing: Omit<BlessingItem, "id" | "created_at">): Promise<{ success: boolean; message: string }> {
  const newItem: BlessingItem = {
    ...blessing,
    id: `b-local-${Date.now()}`,
    created_at: new Date().toISOString(),
    approved: true, // Auto-approve locally for instant gratification
  };

  if (supabase) {
    try {
      const { error } = await supabase.from("blessings").insert([{
        name: blessing.name,
        message: blessing.message,
        emoji: blessing.emoji,
        voice_url: blessing.voice_url,
        approved: false, // In real Supabase, wait for moderation
      }]);
      if (error) console.warn("Supabase insert error:", error);
    } catch (e) {
      console.warn("Supabase insert failed:", e);
    }
  }

  // Always keep in local storage so guest sees their own blessing immediately
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLESSINGS) || "[]");
    localStorage.setItem(STORAGE_KEYS.BLESSINGS, JSON.stringify([newItem, ...existing]));
  } catch {}

  return { success: true, message: "Thank you! Your heartfelt blessing has been shared." };
}

// 2. RSVP
export async function submitRSVP(rsvp: RSVPItem): Promise<{ success: boolean; message: string }> {
  if (supabase) {
    try {
      const { error } = await supabase.from("rsvp").insert([{
        name: rsvp.name,
        guest_count: rsvp.guest_count,
        events: rsvp.events,
        food_pref: rsvp.food_pref,
        message: rsvp.message,
      }]);
      if (error) console.warn("Supabase RSVP error:", error);
    } catch (e) {
      console.warn("Supabase RSVP failed:", e);
    }
  }

  // Local storage backup
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.RSVP) || "[]");
    const newEntry = {
      ...rsvp,
      id: `rsvp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      submitted_at: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.RSVP, JSON.stringify([newEntry, ...existing]));
  } catch {}

  return { success: true, message: "Your RSVP has been joyfully received!" };
}

export function getStoredRSVPs(): (RSVPItem & { id: string; submitted_at: string })[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RSVP) || "[]");
  } catch {
    return [];
  }
}

export function deleteStoredRSVP(id: string): void {
  try {
    const existing = getStoredRSVPs();
    const filtered = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.RSVP, JSON.stringify(filtered));
  } catch {}
}

export function deleteStoredBlessing(id: string): void {
  try {
    const existing: BlessingItem[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLESSINGS) || "[]");
    const filtered = existing.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BLESSINGS, JSON.stringify(filtered));
  } catch {}
}

// 3. QUIZ SCORES & LEADERBOARD
export async function getQuizLeaderboard(): Promise<QuizScoreItem[]> {
  const defaultScores: QuizScoreItem[] = [
    { id: "qs-1", name: "Rahul (Brother)", score: 10, created_at: new Date().toISOString() },
    { id: "qs-2", name: "Meera (Bestie)", score: 9, created_at: new Date().toISOString() },
    { id: "qs-3", name: "Kabir", score: 8, created_at: new Date().toISOString() },
    { id: "qs-4", name: "Pooja", score: 8, created_at: new Date().toISOString() },
  ];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("quiz_scores")
        .select("*")
        .order("score", { ascending: false })
        .limit(10);
      if (!error && data && data.length > 0) return data;
    } catch {}
  }

  try {
    const localScores = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || "[]");
    return [...localScores, ...defaultScores].sort((a, b) => b.score - a.score).slice(0, 10);
  } catch {
    return defaultScores;
  }
}

export async function submitQuizScore(name: string, score: number): Promise<void> {
  const item: QuizScoreItem = {
    id: `qs-${Date.now()}`,
    name,
    score,
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      await supabase.from("quiz_scores").insert([{ name, score }]);
    } catch {}
  }

  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || "[]");
    localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify([item, ...existing]));
  } catch {}
}

// 4. TIME CAPSULE
export async function submitTimeCapsule(capsule: TimeCapsuleItem): Promise<{ success: boolean; message: string }> {
  if (supabase) {
    try {
      await supabase.from("time_capsule").insert([{
        name: capsule.name,
        message: capsule.message,
        unlocks_at: config.anniversaryDate,
      }]);
    } catch {}
  }

  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.TIME_CAPSULE) || "[]");
    localStorage.setItem(STORAGE_KEYS.TIME_CAPSULE, JSON.stringify([{ ...capsule, locked_at: new Date().toISOString() }, ...existing]));
  } catch {}

  return {
    success: true,
    message: "Locked safely in the vault! This letter will open on 26 January 2028.",
  };
}
