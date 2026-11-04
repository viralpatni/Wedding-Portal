# Wedding Website: "Editorial Romance × Rose-Gold 3D"
## Complete Implementation Plan

---

## 🎯 Project Overview

**Concept**: Award-level wedding website fusing editorial high-fashion aesthetics with photorealistic 3D rose-gold objects. Light-mode only, magazine-quality per section.

**Groom**: [GROOM]  
**Bride**: [BRIDE]  
**Gift From**: [YOUR NAME]  
**Hashtag**: #[HASHTAG]

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite + React + TypeScript |
| Styling | Tailwind CSS (custom config) |
| 3D | React Three Fiber + Drei + postprocessing |
| Animation | GSAP + ScrollTrigger, Lenis, Framer Motion |
| Puppets | Lottie / custom CSS animation |
| Backend | Supabase (RSVP, Wishes, Quiz, Time Capsule) |
| AI | Google Gemini API (serverless edge function) |
| PWA | vite-plugin-pwa |

---

## 🎨 Design System

### Color Tokens
```
--color-pearl:       #FBF7F2  (base background)
--color-blush:       #F6D6DC  (soft pink accent)
--color-peach:       #FFDCC8  (warm peach)
--color-champagne:   #EBD3B5  (golden mid-tone)
--color-rose-gold:   #D9A38F  (primary metal)
--color-rose-dark:   #B76E79  (deeper metal)
--color-espresso:    #3A2823  (primary text)
--color-gold-line:   #B8935A  (hairlines, accents)
--color-lavender:    #E9DDF5  (gradient accent, optional)
```

### Typography Scale
```
Display:  Cormorant Garamond Italic, clamp(56px, 10vw, 160px)
Script:   Pinyon Script, for names only
Body:     Plus Jakarta Sans / DM Sans
Labels:   uppercase, letter-spacing: 0.2em, 11-12px
```

### Motion
```
Easing: cubic-bezier(.22,1,.36,1)  (slow, elegant)
Scroll: Lenis smooth scroll
3D rotation: slow, continuous
Transitions: 0.6s - 1.2s
```

### Surface Tokens
```
Glass card:   backdrop-blur(20px), border: 1px solid white/60, 
              box-shadow: inset 0 0 40px white/20, border-radius: 28px
Arch mask:    clip-path ellipse or border-radius top round
Grain:        3% film noise overlay (CSS or SVG filter)
```

---

## 📁 Project Structure

```
wedding/
├── public/
│   ├── assets/
│   │   ├── couple-hero.jpg
│   │   ├── hearts-rose-gold.png
│   │   └── hearts.glb (optional)
│   ├── photos/
│   │   └── photos.json
│   ├── audio/
│   │   └── romantic-theme.mp3
│   └── puppets/
│       └── *.png / *.json (Lottie)
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── HeartsScene.tsx       (main 3D hearts)
│   │   │   ├── HeartsLoader.tsx      (loading hearts)
│   │   │   └── MiniHearts.tsx        (accent hearts)
│   │   ├── sections/
│   │   │   ├── Loader.tsx
│   │   │   ├── IntroGate.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Countdown.tsx
│   │   │   ├── OurStory.tsx
│   │   │   ├── PhotoMemories.tsx
│   │   │   ├── ECard.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── PuppetMela.tsx
│   │   │   ├── LoveLetter.tsx
│   │   │   ├── BlessingsWall.tsx
│   │   │   ├── LoveExtras.tsx
│   │   │   ├── RSVP.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Nav.tsx               (sticky glass pill nav)
│   │   │   ├── Cursor.tsx            (custom heart cursor)
│   │   │   ├── AmbientLayer.tsx      (petals, bokeh, sparkles)
│   │   │   ├── MusicPlayer.tsx       (floating music button)
│   │   │   └── ReduceMotionToggle.tsx
│   │   └── shared/
│   │       ├── GlassCard.tsx
│   │       ├── ArchFrame.tsx
│   │       ├── HairlineDivider.tsx
│   │       └── PillButton.tsx
│   ├── hooks/
│   │   ├── useGyroscope.ts
│   │   ├── useScrollProgress.ts
│   │   ├── useLenis.ts
│   │   └── useAdaptiveQuality.ts
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── gsap.ts
│   │   └── config.ts               (all swappable content)
│   ├── data/
│   │   ├── story.json
│   │   ├── events.json
│   │   └── quiz.json
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   ├── App.tsx
│   └── main.tsx
├── api/
│   └── ai-story.ts                 (Gemini serverless function)
├── .env.example
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## 📋 Implementation Phases

### Phase 1: Foundation + Hero + Countdown
1. Vite + React + TS scaffold
2. Tailwind config with full design system tokens
3. Google Fonts import (Cormorant Garamond, Pinyon Script, Plus Jakarta Sans)
4. Global CSS (base styles, grain overlay, scroll behavior)
5. Lenis smooth scroll setup
6. GSAP + ScrollTrigger registration
7. Loader component (interlocking hearts animation)
8. IntroGate (full-screen, "Tap to begin", audio unlock)
9. Sticky Nav (glass pill, anchors)
10. Custom Cursor (rose-gold heart + sparkle trail)
11. Ambient Layer (petals, bokeh, sparkles)
12. Music Player (floating, waveform animation)
13. Hero section (3D hearts via R3F, editorial photo, big type, CTA)
14. Countdown section (flip numerals, mini hearts, progress arc)

### Phase 2: Story + Memories + E-Card
1. Our Story section (scroll-pinned timeline, 7 chapters, arch frames)
2. story.json data structure
3. "Ask the Story" AI chat bubble (Gemini integration)
4. Photo Memories (Polaroid Wall mode + 3D Carousel mode)
5. photos.json structure
6. Lightbox component
7. Cinematic slideshow (Ken Burns, crossfades)
8. E-Card (3D flip, personalized, download/share)

### Phase 3: Events + Puppets + Love Letter
1. Events section (horizontal snap-scroll, 5 events, editorial cards)
2. events.json structure
3. .ics calendar generation
4. Google Maps embed
5. Puppet Mela section (dancing figures, beat sync, confetti)
6. Love Letter (wax seal, typewriter reveal, pressed flower)

### Phase 4: Blessings + Extras + RSVP + Footer
1. Blessings Wall (paper lanterns, Supabase realtime, voice notes)
2. Love Extras bento grid:
   - Quiz (10 questions, leaderboard)
   - Love Meter
   - Scratch Cards (100 reasons)
   - Time Capsule
   - Photo Booth
   - Easter eggs
3. RSVP form (glass card, Supabase, validation, sparkle submit)
4. Footer (sunset gradient, 3D hearts, fireworks)
5. Supabase schema and client setup

### Phase 5: Polish + Performance + PWA
1. Adaptive quality (DPR, disable postprocessing on low-end)
2. prefers-reduced-motion support everywhere
3. Image optimization (WebP, lazy load)
4. Code splitting (dynamic imports per section)
5. PWA manifest + service worker
6. Open Graph meta tags
7. Accessibility audit (AA contrast, alt text, focus states)
8. Lighthouse audit (target 85+ mobile)
9. README documentation

---

## 📊 Data File Schemas

### config.ts
```typescript
export const config = {
  groom: "[GROOM]",
  bride: "[BRIDE]",
  giftFrom: "[YOUR NAME]",
  weddingDate: "2025-02-14", // ISO date
  weddingCity: "[CITY]",
  hashtag: "#[HASHTAG]",
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
}
```

### story.json
```json
[
  {
    "chapter": 1,
    "title": "First Meeting",
    "emoji": "👀",
    "date": "Month Year",
    "caption": "Short romantic caption...",
    "image": "/photos/story-1.jpg"
  }
  // ... 7 chapters total
]
```

### events.json
```json
[
  {
    "id": "haldi",
    "name": "Haldi Ceremony",
    "date": "Feb 12, 2025",
    "time": "10:00 AM",
    "venue": "Venue Name",
    "address": "Full address",
    "color": "#F4D03F",
    "dressCode": "Yellow & White",
    "icon": "sun",
    "mapUrl": "https://maps.google.com/..."
  }
  // ...5 events
]
```

### photos.json
```json
[
  {
    "src": "/photos/photo-01.jpg",
    "caption": "Caption text",
    "date": "Year",
    "category": "Together" // Childhood | Together | Engagement | Pre-wedding
  }
]
```

---

## 🗄️ Supabase Schema

```sql
-- RSVP
create table rsvp (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  guest_count int,
  events text[],
  food_pref text,
  message text,
  created_at timestamptz default now()
);

-- Blessings
create table blessings (
  id uuid default gen_random_uuid() primary key,
  name text,
  message text,
  emoji text,
  voice_url text,
  approved boolean default false,
  created_at timestamptz default now()
);

-- Quiz Leaderboard
create table quiz_scores (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  score int not null,
  created_at timestamptz default now()
);

-- Time Capsule
create table time_capsule (
  id uuid default gen_random_uuid() primary key,
  name text,
  message text,
  unlocks_at timestamptz not null, -- 1 year from wedding
  created_at timestamptz default now()
);
```

---

## 🔑 Environment Variables

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
GEMINI_API_KEY=           # server-side only
VITE_GA_TRACKING_ID=      # optional analytics
```

---

## ✅ Quality Checklist

- [ ] Every section looks like a separate magazine spread
- [ ] Typography is the hero (oversized, good kerning)
- [ ] Tests at 375px, 768px, 1440px — no horizontal scroll
- [ ] Accessibility: AA contrast, alt text, keyboard focus
- [ ] Reduce Motion toggle visible and functional
- [ ] Lighthouse mobile 85+
- [ ] 60fps target on mid-range phones
- [ ] PWA installable
- [ ] Open Graph image set
- [ ] All 3D lazy-loaded with Suspense

---

*"One strong idea per screen. Big typography. Generous white space. A few perfect details."*
