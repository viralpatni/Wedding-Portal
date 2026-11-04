import React, { useEffect, useRef, useState } from "react";

export type ShowerType = "gulab" | "genda" | "hearts" | "gold";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  type: "rosePetal" | "marigoldHead" | "marigoldPetal" | "heart" | "goldStar";
  color: string;
  secondaryColor?: string;
  scale: number;
}

// Global window trigger declaration
declare global {
  interface Window {
    triggerWeddingShower?: (type: ShowerType) => void;
  }
}

export default function FullPageShower() {
  const [isActive, setIsActive] = useState(false);
  const [showerType, setShowerType] = useState<ShowerType>("gulab");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleShowerEvent = (e: CustomEvent<ShowerType>) => {
      triggerShower(e.detail || "gulab");
    };

    window.addEventListener("wedding:shower" as any, handleShowerEvent);
    window.triggerWeddingShower = (type: ShowerType) => {
      triggerShower(type);
    };

    return () => {
      window.removeEventListener("wedding:shower" as any, handleShowerEvent);
      delete window.triggerWeddingShower;
    };
  }, []);

  const triggerShower = (type: ShowerType) => {
    setShowerType(type);
    setIsActive(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    // Shower stays intense and gracefully falls for 4 seconds
    timerRef.current = setTimeout(() => {
      setIsActive(false);
    }, 4000);
  };

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate themed particle batch
    const particles: Particle[] = [];
    const count = showerType === "hearts" ? 70 : showerType === "genda" ? 85 : 75;

    for (let i = 0; i < count; i++) {
      // Spawn across the top width with some starting higher above the fold
      const x = Math.random() * width;
      const y = Math.random() * -height * 0.8;

      if (showerType === "gulab") {
        const REDS = ["#800020", "#8B0000", "#A51C30", "#B22222", "#C70039", "#900C3F", "#D81B60"];
        particles.push({
          x,
          y,
          size: 16 + Math.random() * 20,
          speedY: 2.5 + Math.random() * 3.5,
          speedX: (Math.random() - 0.5) * 2.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 3,
          flip: Math.random() * Math.PI,
          flipSpeed: 0.03 + Math.random() * 0.04,
          opacity: 0.8 + Math.random() * 0.2,
          type: "rosePetal",
          color: REDS[Math.floor(Math.random() * REDS.length)],
          secondaryColor: "#4A0E17",
          scale: 1,
        });
      } else if (showerType === "genda") {
        const isHead = Math.random() > 0.65;
        const ORANGES = ["#FF8C00", "#FFA500", "#FFD700", "#E65100", "#F57F17", "#FFB300"];
        particles.push({
          x,
          y,
          size: isHead ? 26 + Math.random() * 18 : 12 + Math.random() * 14,
          speedY: isHead ? 3.0 + Math.random() * 3.0 : 2.0 + Math.random() * 2.8,
          speedX: (Math.random() - 0.5) * 2.2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2.5,
          flip: Math.random() * Math.PI,
          flipSpeed: 0.02 + Math.random() * 0.03,
          opacity: 0.85 + Math.random() * 0.15,
          type: isHead ? "marigoldHead" : "marigoldPetal",
          color: ORANGES[Math.floor(Math.random() * ORANGES.length)],
          secondaryColor: "#BF360C",
          scale: 1,
        });
      } else if (showerType === "hearts") {
        const HEARTS = ["#E53935", "#D32F2F", "#C62828", "#B71C1C", "#FF1744", "#FF5252"];
        particles.push({
          x,
          y,
          size: 16 + Math.random() * 22,
          speedY: 2.2 + Math.random() * 3.2,
          speedX: (Math.random() - 0.5) * 2.0,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2.8,
          flip: Math.random() * Math.PI,
          flipSpeed: 0.03 + Math.random() * 0.04,
          opacity: 0.85 + Math.random() * 0.15,
          type: "heart",
          color: HEARTS[Math.floor(Math.random() * HEARTS.length)],
          secondaryColor: "#FFE5E5",
          scale: 1,
        });
      } else {
        // Gold / star sparks
        particles.push({
          x,
          y,
          size: 14 + Math.random() * 16,
          speedY: 2.2 + Math.random() * 3.0,
          speedX: (Math.random() - 0.5) * 2.0,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 4,
          flip: Math.random() * Math.PI,
          flipSpeed: 0.04,
          opacity: 0.85,
          type: "goldStar",
          color: "#D4AF77",
          secondaryColor: "#FFF8E1",
          scale: 1,
        });
      }
    }

    // Helper: Draw curved Velvet Crimson Rose Petal
    const drawRosePetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(p.flip), 1);

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.65, p.size * 0.9, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.85, -p.size * 0.65, 0, -p.size);

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.7, p.color);
      grad.addColorStop(1, p.secondaryColor || "#3A080E");

      ctx.fillStyle = grad;
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = "rgba(139, 0, 0, 0.4)";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Marigold Blossom Head
    const drawMarigoldHead = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(p.flip) * 0.5 + 0.5, 1);
      ctx.globalAlpha = p.opacity;

      const petalsCount = 14;
      const radius = p.size;

      // Outer petals ring
      for (let i = 0; i < petalsCount; i++) {
        const angle = (i * 2 * Math.PI) / petalsCount;
        const px = Math.cos(angle) * (radius * 0.6);
        const py = Math.sin(angle) * (radius * 0.6);
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // Inner dense ring
      for (let i = 0; i < petalsCount; i++) {
        const angle = (i * 2 * Math.PI) / petalsCount + 0.2;
        const px = Math.cos(angle) * (radius * 0.35);
        const py = Math.sin(angle) * (radius * 0.35);
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "#FFB300";
        ctx.fill();
      }

      // Center golden hub
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = p.secondaryColor || "#BF360C";
      ctx.shadowColor = "rgba(230, 81, 0, 0.4)";
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Loose Marigold Petal
    const drawMarigoldPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(p.flip), 1);

      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Red Romantic Heart
    const drawHeart = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(p.flip), 1);
      ctx.globalAlpha = p.opacity;

      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s * 0.6, -s * 0.4, -s, s * 0.2, 0, s);
      ctx.bezierCurveTo(s, s * 0.2, s * 0.6, -s * 0.4, 0, s * 0.3);

      const grad = ctx.createLinearGradient(0, -s, 0, s);
      grad.addColorStop(0, p.color);
      grad.addColorStop(1, "#800000");

      ctx.fillStyle = grad;
      ctx.shadowColor = "rgba(229, 57, 53, 0.45)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Gold Star / Diamond
    const drawGoldStar = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(p.flip), 1);
      ctx.globalAlpha = p.opacity;

      const s = p.size * 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.35, -s * 0.35);
      ctx.lineTo(s, 0);
      ctx.lineTo(s * 0.35, s * 0.35);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.35, s * 0.35);
      ctx.lineTo(-s, 0);
      ctx.lineTo(-s * 0.35, -s * 0.35);
      ctx.closePath();

      ctx.fillStyle = p.color;
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.8;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.type === "rosePetal") drawRosePetal(p);
        else if (p.type === "marigoldHead") drawMarigoldHead(p);
        else if (p.type === "marigoldPetal") drawMarigoldPetal(p);
        else if (p.type === "heart") drawHeart(p);
        else drawGoldStar(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, showerType]);

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

