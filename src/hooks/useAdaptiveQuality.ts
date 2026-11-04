import { useEffect, useState } from "react";

export interface QualitySettings {
  dpr: number;
  enableBloom: boolean;
  enableShadows: boolean;
  isLowEnd: boolean;
}

/**
 * Detect device capability and return adaptive quality settings.
 * Lower DPR and disable postprocessing on low-end devices to hit 60fps.
 */
export function useAdaptiveQuality(): QualitySettings {
  const [settings, setSettings] = useState<QualitySettings>({
    dpr: 1,
    enableBloom: true,
    enableShadows: true,
    isLowEnd: false,
  });

  useEffect(() => {
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Heuristics for low-end detection
    const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as any).deviceMemory ?? 4; // GB
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    const isLowEnd =
      memory <= 2 ||
      hardwareConcurrency <= 2 ||
      (isMobile && devicePixelRatio > 2.5);

    setSettings({
      // Cap DPR: low-end gets 1.0, mid-range gets 1.5, high-end gets min(2, actual)
      dpr: isLowEnd ? 1 : Math.min(2, devicePixelRatio),
      enableBloom: !isLowEnd,
      enableShadows: !isLowEnd,
      isLowEnd,
    });
  }, []);

  return settings;
}
