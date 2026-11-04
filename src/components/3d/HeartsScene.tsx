import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Generates a heart-shaped curve in 2D.
 */
function heartShape(scale = 1): THREE.Shape {
  const shape = new THREE.Shape();
  const s = scale;
  // Parametric heart curve
  shape.moveTo(0, s * 0.25);
  shape.bezierCurveTo(0, s * 0.5, s * -0.5, s * 0.5, s * -0.5, s * 0.25);
  shape.bezierCurveTo(s * -0.5, s * 0, 0, s * -0.15, 0, s * -0.5);
  shape.bezierCurveTo(0, s * -0.15, s * 0.5, s * 0, s * 0.5, s * 0.25);
  shape.bezierCurveTo(s * 0.5, s * 0.5, 0, s * 0.5, 0, s * 0.25);
  return shape;
}

interface HeartRingProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color?: string;
  speed?: number;
}

function HeartRing({ position, rotation, color = "#D9A38F", speed = 1 }: HeartRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = heartShape(1);
    // Create a tube path along the heart shape
    const points = shape.getPoints(100);
    // Close the path
    points.push(points[0]);
    const path = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(p.x, p.y, 0)),
      true
    );
    return new THREE.TubeGeometry(path, 120, 0.06, 12, true);
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 1.0,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 1.5,
      }),
    [color]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.3) * 0.15;
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.2) * 0.1;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={position} rotation={rotation} />
  );
}

interface HeartsSceneProps {
  tiltX?: number;
  tiltY?: number;
  scale?: number;
}

/**
 * Procedural interlocked rose-gold hearts.
 * Two heart-tube rings offset so they appear interlocked.
 * MeshPhysicalMaterial: metalness 1, roughness 0.15, clearcoat 1.
 */
export default function HeartsScene({ tiltX = 0, tiltY = 0, scale = 1 }: HeartsSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slow float + cursor/gyro tilt
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3 + tiltX * 0.3;
    groupRef.current.rotation.x = Math.cos(t * 0.15) * 0.1 + tiltY * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.05;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Heart 1 — rose gold base */}
      <HeartRing
        position={[-0.15, 0.1, 0]}
        rotation={[0.2, -0.3, 0]}
        color="#D9A38F"
        speed={0.8}
      />
      {/* Heart 2 — deeper rose, offset and rotated to interlock */}
      <HeartRing
        position={[0.15, -0.1, 0.05]}
        rotation={[0.15, 0.3, Math.PI * 0.05]}
        color="#B76E79"
        speed={1.2}
      />
    </group>
  );
}
