import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, Trail } from "@react-three/drei";
import * as THREE from "three";

function DistortedCore({ color = "#d4ff3f" }: { color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.y = t * 0.35;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15;
  });
  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.6}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial color={color} roughness={0.15} metalness={0.9} distort={0.42} speed={2.5} emissive={color} emissiveIntensity={0.12} />
      </mesh>
      {/* inner wireframe */}
      <mesh scale={2.15}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

function OrbitRings() {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (g1.current) {
      g1.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.15;
      g1.current.rotation.z = t * 0.18;
    }
    if (g2.current) {
      g2.current.rotation.x = Math.PI / 1.8;
      g2.current.rotation.y = -t * 0.12;
    }
  });
  return (
    <>
      <group ref={g1}>
        <mesh>
          <torusGeometry args={[3.1, 0.015, 16, 180]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
        </mesh>
        <mesh position={[3.1, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      </group>
      <group ref={g2}>
        <mesh>
          <torusGeometry args={[3.8, 0.012, 16, 180]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
        </mesh>
        <mesh position={[-3.8, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#d4ff3f" />
        </mesh>
      </group>
    </>
  );
}

function ParticleField({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.025;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#d4ff3f" transparent opacity={0.75} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Comet() {
  const ref = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime * 0.5;
    if (!group.current || !ref.current) return;
    const r = 4.6;
    group.current.rotation.z = t * 0.4;
    group.current.rotation.x = 0.4;
    ref.current.position.set(Math.cos(t * 1.2) * r, Math.sin(t * 1.2) * r, 0);
  });
  return (
    <group ref={group}>
      <Trail width={2.5} length={7} color={new THREE.Color("#d4ff3f")} attenuation={(w) => w * w}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Trail>
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.8 + 0.2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ accent = "#d4ff3f" }: { accent?: string }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0.4, 8.5], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -2, 3]} intensity={25} color="#8b5cf6" />
        <pointLight position={[5, 3, 2]} intensity={20} color={accent} />
        <Stars radius={40} depth={30} count={2200} factor={3} saturation={0} fade speed={0.8} />
        <DistortedCore color={accent} />
        <OrbitRings />
        <ParticleField />
        <Comet />
        <Rig />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050508_78%)]" />
    </div>
  );
}
