import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    navHome: "Home",
    navInvitation: "Invitation",
    navEvents: "Events",
    navStory: "Our Story",
    navAlbums: "Albums",
    navGallery: "Gallery",
    navVideo: "Wedding Film",
    navLivePhotos: "Live Photos",
    navTravel: "Travel & Venue",
    navRsvp: "RSVP",
    showerPetals: "Shower 🌹",
    quickMenu: "Quick Menu",

    // Hero
    auspiciousInsignia: "॥ SHREE GANESHAYA NAMAH ॥",
    websiteName: "AVNIT — A FOREVER STORY",
    groomName: "Ankit",
    brideName: "Avani",
    tagline: "Two Hearts, One Beautiful Forever.",
    weddingDate: "26 JANUARY 2027",
    weddingLocationIST: "India (IST)",
    enterStory: "Enter Our Story",
    openInvitation: "Open Invitation",
    musicOn: "Music ON",
    musicOff: "Music OFF",
    scrollToExplore: "Scroll to Explore",

    // Countdown
    countdownPre: "Counting Down To The Sacred Vows",
    countdownTitle: "Every Heartbeat Closer",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    auspiciousDateTitle: "The Auspicious Date",
    auspiciousDateSub: "Tuesday · Republic Day Celebration",
    addToCalendar: "Add to Calendar (.ics)",
    googleCalendar: "Google Calendar",

    // Invitation
    invitationSubtitle: "Royal Wedding Card",
    tapToOpen: "Tap to Open Envelope",
    unfoldingCard: "Unfolding Sacred Invitation...",
    withBlessingsOf: "With The Blessings of Elders & The Patni Family",
    sacredVows: "To Celebrate Their Sacred Wedding Vows",
    alwaysForever: "Always & Forever",

    // Events
    eventsPre: "The Auspicious Schedule",
    eventsTitle: "Ceremonies of Joy",
    allCeremonies: "All Ceremonies",
    sacredVowsBadge: "✦ The Sacred Vows ✦",

    // Story
    storyPre: "A Journey In Six Chapters",
    storyTitle: "The Chapters of Us",
    pauseStory: "Pause Story Slideshow",
    autoPlayStory: "Auto-Play Story Reel",

    // Family Message
    familyPre: "From Those Who Love You Most",
    familyTitle: "A Little Something From Patni Family",
    tapToBreakSeal: "Tap to Break Seal",
    sealedPride: "Sealed with Blessing & Pride",
    alwaysAndForever: "With eternal love, prayers, & blessings,",

    // Live Photo Wall
    livePhotosPre: "Guest Memories in Real-Time",
    livePhotosTitle: "Live Wedding Photo Wall",
    livePhotosSub: "Snap photos on your phone during the ceremonies and upload them live to Ankit & Avani's wedding wall!",
    uploadPhotoBtn: "Upload Photo to Live Wall",
    scanQrNotice: "Or scan this QR code with your smartphone camera to upload directly from your phone:",
    yourName: "Your Name",
    caption: "Caption / Sweet Note",
    dropPhotoHere: "Drag & drop or tap to choose a photo",

    // Travel & Venue Map
    travelPre: "Royal Rajasthan Concierge",
    travelTitle: "Plan Your Trip & Venue Map",
    travelSub: "Interactive Geoapify & Leaflet mapping with Satellite, 3D Street, and Normal views to navigate to the root venue.",
    venueAddress: "Venue Address & Map Location",
    getRoute: "Get Driving Directions",
    satelliteView: "Satellite View",
    normalView: "Normal View",
    street3dView: "3D Perspective / Street",
    weatherHeading: "January Climate & Weather",
    weatherDesc: "Pleasant winter days (22°C) and cool celebratory royal evenings (11°C). Light shawls and elegant royal wraps recommended.",
    stayHeading: "Recommended Stays & Accommodations",

    // RSVP
    rsvpPre: "Will You Join Us?",
    rsvpTitle: "RSVP for the Celebration",
    joyfullyAccepts: "✦ Joyfully Accepts",
    regretfullyDeclines: "Regretfully Declines",
    sendRSVP: "Send RSVP ✦",
    
    // Blessings Wall
    blessingsPre: "Floating Sky Lanterns",
    blessingsTitle: "The Blessings Wall",
    releaseLantern: "Release Blessing Lantern ✦"
  },
  hi: {
    // Nav
    navHome: "मुख्य पृष्ठ",
    navInvitation: "निमंत्रण पत्र",
    navEvents: "शुभ कार्यक्रम",
    navStory: "प्रेम गाथा",
    navAlbums: "छायाचित्र",
    navGallery: "चित्र दीर्घा",
    navVideo: "विवाह वृत्तचित्र",
    navLivePhotos: "सजीव चित्र",
    navTravel: "मार्ग एवं स्थल",
    navRsvp: "उपस्थिति संदेश",
    showerPetals: "पुष्प वर्षा 🌹",
    quickMenu: "त्वरित सूची",

    // Hero
    auspiciousInsignia: "॥ श्री गणेशाय नमः ॥",
    websiteName: "अवनीत — एक अनमोल दास्तान",
    groomName: "अंकित",
    brideName: "अवनी",
    tagline: "दो हृदय, एक अटूट पावन बंधन।",
    weddingDate: "२६ जनवरी २०२७",
    weddingLocationIST: "भारत (भारतीय समय)",
    enterStory: "हमारी प्रेम-गाथा",
    openInvitation: "शुभ निमंत्रण खोलें",
    musicOn: "संगीत चालू",
    musicOff: "संगीत बंद",
    scrollToExplore: "नीचे देखें",

    // Countdown
    countdownPre: "शुभ विवाह वेला की ओर अग्रसर",
    countdownTitle: "हर धड़कन संगम के समीप",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    auspiciousDateTitle: "परम पावन विवाह तिथि",
    auspiciousDateSub: "मंगलवार · गणतंत्र दिवस महापर्व",
    addToCalendar: "कैलेंडर में जोड़ें (.ics)",
    googleCalendar: "गूगल कैलेंडर",

    // Invitation
    invitationSubtitle: "शाही विवाह निमंत्रण पत्रिका",
    tapToOpen: "शाही मुहर खोलें",
    unfoldingCard: "शुभ आमंत्रण खुल रहा है...",
    withBlessingsOf: "पूज्य बुजुर्गों एवं पटनी परिवार के शुभाशीर्वाद से",
    sacredVows: "पावन परिणय सूत्र में बंधने हेतु",
    alwaysForever: "सदा सर्वदा",

    // Events
    eventsPre: "शुभ मांगलिक कार्यक्रम",
    eventsTitle: "विवाह उत्सव व रस्में",
    allCeremonies: "समस्त कार्यक्रम",
    sacredVowsBadge: "✦ पवित्र सात फेरे ✦",

    // Story
    storyPre: "छह अध्यायों में हमारा सफर",
    storyTitle: "हमारी प्रेम-गाथा के पृष्ठ",
    pauseStory: "कथा रोकें",
    autoPlayStory: "कथा स्वतः चलाएं",

    // Family Message
    familyPre: "स्नेही परिजनों की ओर से",
    familyTitle: "पटनी परिवार की ओर से स्नेहाशीष",
    tapToBreakSeal: "शाही मुहर खोलें",
    sealedPride: "आशीर्वाद एवं गौरव से परिपूर्ण",
    alwaysAndForever: "अनंत स्नेह, प्रार्थनाएं एवं आशीर्वाद सहित,",

    // Live Photo Wall
    livePhotosPre: "विवाह के अविस्मरणीय क्षण",
    livePhotosTitle: "सजीव छायाचित्र दीर्घा (Live Wall)",
    livePhotosSub: "विवाह के दौरान अपने मोबाइल से सुंदर चित्र खींचें और अंकित एवं अवनी की लाइव वॉल पर तुरंत अपलोड करें!",
    uploadPhotoBtn: "लाइव वॉल पर फोटो अपलोड करें",
    scanQrNotice: "या अपने मोबाइल कैमरे से इस QR कोड को स्कैन करके सीधे अपलोड करें:",
    yourName: "आपका शुभ नाम",
    caption: "चित्र का विवरण / मंगल संदेश",
    dropPhotoHere: "फोटो यहां चुनें या खींच कर लाएं",

    // Travel & Venue Map
    travelPre: "शाही राजस्थान मार्गदर्शक",
    travelTitle: "यात्रा योजना एवं विवाह स्थल मानचित्र",
    travelSub: "जियोएपिफाई (Geoapify) एवं लीफलेट (Leaflet) मानचित्र — उपग्रह दृश्य, सामान्य दृश्य और 3D परिप्रेक्ष्य में विवाह स्थल का सटीक मार्ग।",
    venueAddress: "विवाह स्थल का पता एवं स्थिति",
    getRoute: "मार्ग एवं दिशा-निर्देश प्राप्त करें",
    satelliteView: "उपग्रह दृश्य (Satellite)",
    normalView: "सामान्य दृश्य (Normal)",
    street3dView: "3D परिप्रेक्ष्य दृश्य (3D View)",
    weatherHeading: "जनवरी मौसम एवं जलवायु",
    weatherDesc: "सुहावनी धूप (२२°C) तथा शाही ठंडक भरी शामें (११°C)। पारंपरिक शॉल एवं भव्य परिधान उत्तम रहेंगे।",
    stayHeading: "अनुशंसित होटल एवं आवास व्यवस्था",

    // RSVP
    rsvpPre: "क्या आप पधार रहे हैं?",
    rsvpTitle: "उपस्थिति स्वीकृति (RSVP)",
    joyfullyAccepts: "✦ सहर्ष पधारेंगे",
    regretfullyDeclines: "विनम्रतापूर्वक असमर्थ",
    sendRSVP: "स्वीकृति प्रेषित करें ✦",

    // Blessings Wall
    blessingsPre: "आकाश में उड़ते मंगल दीप",
    blessingsTitle: "शुभकामनाओं की दीवार",
    releaseLantern: "शुभकामना दीप प्रज्वलित करें ✦"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("avnit_wedding_lang");
    return saved === "hi" ? "hi" : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("avnit_wedding_lang", lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

