import { useEffect, useRef, useState } from "react";

export interface GyroscopeData {
  x: number; // tilt left/right (-1 to 1)
  y: number; // tilt forward/back (-1 to 1)
}

/**
 * iOS gyroscope hook.
 * Permission must be requested inside a user gesture (done in IntroGate).
 * Falls back to mouse parallax on desktop.
 */
export function useGyroscope(enabled: boolean) {
  const [tilt, setTilt] = useState<GyroscopeData>({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile && "DeviceOrientationEvent" in window) {
      const handler = (e: DeviceOrientationEvent) => {
        const x = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30));
        const y = Math.max(-1, Math.min(1, ((e.beta ?? 0) - 30) / 30));
        setTilt({ x, y });
      };
      window.addEventListener("deviceorientation", handler);
      return () => window.removeEventListener("deviceorientation", handler);
    } else {
      // Desktop: mouse parallax
      const handler = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setTilt({ x, y });
      };
      window.addEventListener("mousemove", handler);
      return () => window.removeEventListener("mousemove", handler);
    }
  }, [enabled]);

  return tilt;
}

/**
 * Request iOS DeviceOrientationEvent permission.
 * Must be called inside a user gesture (tap).
 * Safe to call on non-iOS — just returns 'granted'.
 */
export async function requestGyroscopePermission(): Promise<boolean> {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof (DeviceOrientationEvent as any).requestPermission === "function"
  ) {
    try {
      const permission = await (DeviceOrientationEvent as any).requestPermission();
      return permission === "granted";
    } catch {
      return false;
    }
  }
  // Android/desktop — no permission needed
  return true;
}
