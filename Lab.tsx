import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { FlaskConical, Rotate3d, Palette, Waves, Grid3X3 } from "lucide-react";
import SectionHeading from "./SectionHeading";

function LabObject({ color, distort, speed, shape, wire }: { color: string; distort: number; speed: number; shape: string; wire: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.005 * speed;
    ref.current.rotation.y += 0.008 * speed;
  });
  return (
    <Float speed={3} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.7}>
        {shape === "icosa" && <icosahedronGeometry args={[1, 64]} />}
        {shape === "torus" && <torusKnotGeometry args={[0.7, 0.22, 220, 36]} />}
        {shape === "torusRing" && <torusGeometry args={[0.9, 0.32, 64, 128]} />}
        {shape === "box" && <boxGeometry args={[1.4, 1.4, 1.4, 8, 8, 8]} />}
        {wire ? (
          <meshBasicMaterial color={color} wireframe transparent opacity={0.9} />
        ) : (
          <MeshDistortMaterial color={color} roughness={0.2} metalness={0.85} distort={distort} speed={speed} emissive={color} emissiveIntensity={0.15} />
        )}
      </mesh>
    </Float>
  );
}

function LabCanvas(props: { color: string; distort: number; speed: number; shape: string; wire: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#8b5cf6" />
      <pointLight position={[4, 2, 2]} intensity={25} color={props.color} />
      <Suspense fallback={null}>
        <LabObject {...props} />
      </Suspense>
      <ContactShadows position={[0, -2.4, 0]} opacity={0.55} scale={10} blur={2.4} far={4} color="#000" />
    </Canvas>
  );
}

export default function Lab({ accent }: { accent: string }) {
  const [color, setColor] = useState("#d4ff3f");
  const [distort, setDistort] = useState(0.45);
  const [speed, setSpeed] = useState(2.2);
  const [shape, setShape] = useState("icosa");
  const [wire, setWire] = useState(false);

  const colors = ["#d4ff3f", "#22d3ee", "#8b5cf6", "#fb7185", "#ffffff", "#f97316"];
  const shapes = [
    { id: "icosa", label: "Blob" },
    { id: "torus", label: "Knot" },
    { id: "torusRing", label: "Donut" },
    { id: "box", label: "Cube" },
  ];

  return (
    <section id="lab" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#8b5cf6]/12 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          num="05"
          label="Interactive Lab"
          accent={accent}
          title={
            <>
              Don’t just look. <span className="text-stroke">Touch the 3D.</span>
            </>
          }
        />

        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b12] lg:grid-cols-[1.2fr_0.8fr]">
          {/* viewport */}
          <div className="relative h-[420px] md:h-[560px]">
            <div className="absolute inset-0">
              <LabCanvas color={color} distort={distort} speed={speed} shape={shape} wire={wire} />
            </div>
            <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 font-mono2 text-[11px] tracking-widest text-white/70 uppercase backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> LIVE WEBGL — 60 FPS
            </div>
            <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between font-mono2 text-[11px] text-white/50">
              <span>
                {shape.toUpperCase()} • D:{distort.toFixed(2)} • S:{speed.toFixed(1)}
              </span>
              <span className="hidden sm:block">DRAG TO ORBIT — SCROLL TO ZOOM</span>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#0b0b12_100%)]" />
          </div>

          {/* controls */}
          <div className="flex flex-col justify-center gap-7 border-t border-white/10 bg-white/[0.02] p-7 md:p-10 lg:border-t-0 lg:border-l">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                <FlaskConical size={20} />
              </span>
              <div>
                <div className="font-display font-bold">Material Playground</div>
                <div className="text-xs text-white/50">Every tweak re-compiles the shader live</div>
              </div>
            </div>

            <div>
              <div className="font-mono2 mb-3 flex items-center gap-2 text-[11px] tracking-widest text-white/50 uppercase">
                <Palette size={13} /> Pigment
              </div>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`h-10 w-10 rounded-full transition-all ${color === c ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#0b0b12]" : "opacity-70 hover:scale-105 hover:opacity-100"}`}
                    style={{ background: c, boxShadow: color === c ? `0 0 24px ${c}` : "none" }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono2 mb-3 flex items-center gap-2 text-[11px] tracking-widest text-white/50 uppercase">
                <Rotate3d size={13} /> Geometry
              </div>
              <div className="grid grid-cols-4 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`rounded-xl border px-2 py-2.5 text-xs font-bold transition ${shape === s.id ? "border-transparent text-black" : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}
                    style={shape === s.id ? { background: color } : {}}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="font-mono2 mb-2 flex justify-between text-[11px] tracking-widest text-white/50 uppercase">
                  <span className="flex items-center gap-2">
                    <Waves size={13} /> Distortion — {distort.toFixed(2)}
                  </span>
                </div>
                <input type="range" min={0} max={1} step={0.01} value={distort} onChange={(e) => setDistort(parseFloat(e.target.value))} className="w-full accent-[#d4ff3f]" />
              </div>
              <div>
                <div className="font-mono2 mb-2 flex justify-between text-[11px] tracking-widest text-white/50 uppercase">
                  <span>Flow speed — {speed.toFixed(1)}</span>
                </div>
                <input type="range" min={0.2} max={6} step={0.1} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full accent-[#d4ff3f]" />
              </div>
            </div>

            <button
              onClick={() => setWire(!wire)}
              className={`flex items-center justify-center gap-2 rounded-2xl border py-3.5 text-sm font-bold transition ${wire ? "border-transparent text-black" : "border-white/15 hover:border-white/40"}`}
              style={wire ? { background: color } : {}}
            >
              <Grid3X3 size={16} /> {wire ? "Wireframe: ON" : "Wireframe: OFF"}
            </button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setColor(colors[Math.floor(Math.random() * colors.length)]);
                setDistort(Math.random() * 0.8 + 0.1);
                setSpeed(Math.random() * 4 + 1);
                setShape(shapes[Math.floor(Math.random() * shapes.length)].id);
              }}
              className="rounded-2xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-[#d4ff3f]"
            >
              🎲 Surprise me — randomize
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
