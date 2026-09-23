import { motion } from "framer-motion";
import { Atom, Box, Code2, Sparkles, Server, Shapes, Cpu, Globe } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skills } from "../data/portfolio";

const iconMap: Record<string, typeof Atom> = {
  atom: Atom,
  box: Box,
  code: Code2,
  sparkles: Sparkles,
  server: Server,
  shapes: Shapes,
};

export default function Skills({ accent }: { accent: string }) {
  return (
    <section id="stack" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          num="03"
          label="Tech Stack"
          accent={accent}
          align="center"
          title={
            <>
              Weapons of <span className="text-stroke">mass creation.</span>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => {
            const Icon = iconMap[s.icon] || Cpu;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group glass perspective-1000 relative overflow-hidden rounded-3xl p-6"
                data-hover
              >
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-[60px] transition group-hover:opacity-30" style={{ background: accent }} />
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:scale-110" style={{ color: accent }}>
                    <Icon size={22} />
                  </span>
                  <span className="font-display text-2xl font-extrabold">{s.level}%</span>
                </div>
                <div className="mt-5 font-bold">{s.name}</div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, #fff)`, boxShadow: `0 0 12px ${accent}` }}
                  />
                </div>
                <div className="font-mono2 mt-3 text-[10px] tracking-widest text-white/35 uppercase">
                  {s.level > 93 ? "●●●●● Master" : s.level > 88 ? "●●●●○ Expert" : "●●●○○ Advanced"}
                </div>
              </motion.div>
            );
          })}

          {/* orbit card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#d4ff3f] to-[#22d3ee] p-6 text-black sm:col-span-2 lg:col-span-3"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 animate-spin-slow items-center justify-center rounded-full border-2 border-dashed border-black/40">
                  <Globe size={24} />
                </span>
                <div>
                  <div className="font-display text-xl font-extrabold md:text-2xl">Always in orbit around what's next</div>
                  <div className="text-sm font-medium text-black/60">Currently exploring: WebGPU compute • Gaussian splats • AI agents</div>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {["WebGPU", "R3F", "Lenis", "Zustand", "Prisma", "Docker"].map((t) => (
                  <span key={t} className="rounded-full bg-black px-4 py-2 text-xs font-bold whitespace-nowrap text-white">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
