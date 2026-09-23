import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MapPin, Award, Coffee, Zap } from "lucide-react";
import SectionHeading from "./SectionHeading";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 150, damping: 20 });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="perspective-1000"
    >
      {children}
    </motion.div>
  );
}

export default function About({ accent }: { accent: string }) {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#8b5cf6]/15 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          num="02"
          label="About"
          accent={accent}
          title={
            <>
              Designer brain, <br />
              <span className="text-stroke">engineer hands.</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* portrait */}
          <TiltCard>
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10" data-cursor="HELLO">
              <img
                src="https://images.pexels.com/photos/14375823/pexels-photo-14375823.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                alt="Kai Ren portrait"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              {/* floating badges */}
              <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs backdrop-blur-xl">
                <MapPin size={14} style={{ color: accent }} /> Tokyo — 35.6762°N
              </div>
              <div className="animate-float-y absolute top-20 right-5 rounded-2xl border border-white/15 bg-black/60 p-3 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4ff3f] text-black">
                    <Award size={18} />
                  </span>
                  <div>
                    <div className="text-sm font-bold">Awwwards</div>
                    <div className="font-mono2 text-[10px] text-white/50">SOTD × 6</div>
                  </div>
                </div>
              </div>
              <div className="absolute right-5 bottom-24 hidden animate-float-y rounded-2xl border border-white/15 bg-black/60 p-3 backdrop-blur-xl [animation-delay:1.2s] sm:block">
                <div className="font-mono2 text-[11px] text-white/60">currently playing</div>
                <div className="mt-1 flex items-center gap-2 text-sm font-semibold">
                  <span className="flex gap-0.5">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="w-1 animate-pulse rounded-full bg-[#d4ff3f]" style={{ height: `${12 + i * 5}px`, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </span>
                  Midnight shaders — lofi
                </div>
              </div>
              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl font-bold">Kai Ren</div>
                  <div className="text-sm text-white/60">b. 1994 — on the internet since dial-up</div>
                </div>
                <div className="font-mono2 rounded-full px-3 py-1 text-[11px]" style={{ background: accent, color: "#000" }}>
                  OPEN TO WORK
                </div>
              </div>
            </div>
          </TiltCard>

          {/* copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-xl leading-relaxed text-white/80 md:text-2xl"
            >
              I’ve spent <span className="font-bold text-white">8 years</span> turning wild ideas into
              <span style={{ color: accent }}> high-performing websites</span>. From WebGL wonderlands to
              design systems that scale — if it lives in a browser, I can make it unforgettable.
            </motion.p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Zap, title: "Performance freak", desc: "95+ Lighthouse, always. 3D that never janks." },
                { icon: Coffee, title: "Motion with meaning", desc: "Every animation earns its place. No decoration." },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl p-5 transition hover:border-white/25"
                >
                  <c.icon size={20} style={{ color: accent }} />
                  <div className="mt-3 font-bold">{c.title}</div>
                  <div className="mt-1 text-sm text-white/55">{c.desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              {[
                { v: 120, s: "+", l: "Projects" },
                { v: 14, s: "", l: "Awards" },
                { v: 98, s: "%", l: "Happy clients" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display text-3xl font-extrabold md:text-4xl">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="font-mono2 mt-1 text-[10px] tracking-widest text-white/40 uppercase">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "Three.js", "TypeScript", "GSAP", "Tailwind", "Node.js", "Blender", "Figma", "WebGPU", "Sanity"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/70 transition hover:border-[#d4ff3f]/50 hover:text-white">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
