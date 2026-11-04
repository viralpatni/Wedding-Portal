import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

/**
 * GlobalCanvas — single WebGL context for the entire site.
 * Fixed to the viewport, pointer-events: none.
 * Sections render into this canvas using Drei's <View> portal system.
 */
export default function GlobalCanvas() {
  const quality = useAdaptiveQuality();

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      id="global-canvas-container"
    >
      <Canvas
        dpr={quality.dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          {/* Soft studio lighting */}
          <ambientLight intensity={0.6} color="#FFF5EA" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            color="#FFE8D6"
            castShadow={quality.enableShadows}
          />
          <directionalLight
            position={[-5, 2, -3]}
            intensity={0.4}
            color="#F6D6DC"
          />
          <pointLight position={[0, -3, 2]} intensity={0.3} color="#EBD3B5" />

          {/* HDRI-style environment for metalness reflections */}
          <Environment preset="studio" />

          {/* Subtle bloom — disabled on low-end */}
          {quality.enableBloom && (
            <EffectComposer multisampling={0}>
              <Bloom
                luminanceThreshold={0.8}
                luminanceSmoothing={0.9}
                intensity={0.3}
                mipmapBlur
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
