import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/portfolio";

const filters = [
  { id: "all", label: "All Work" },
  { id: "webgl", label: "WebGL / 3D" },
  { id: "ai", label: "AI / SaaS" },
  { id: "brand", label: "Brand / Motion" },
];

function ProjectCard({ p, i, accent }: { p: (typeof projects)[0]; i: number; accent: string }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="VIEW"
      className="group perspective-1000 relative"
    >
      <motion.div
        animate={{ rotateX: hover ? 4 : 0, rotateY: hover ? -4 : 0, y: hover ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="preserve-3d overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b0b12] transition-colors hover:border-white/25"
      >
        <div className="relative overflow-hidden">
          <img src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover transition-transform duration-[1s] group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="rounded-full bg-black/60 px-3 py-1.5 font-mono2 text-[10px] tracking-widest text-white backdrop-blur-xl uppercase">{p.year}</span>
            <span className="rounded-full px-3 py-1.5 font-mono2 text-[10px] font-bold tracking-widest uppercase" style={{ background: p.color, color: "#000" }}>
              {p.stats}
            </span>
          </div>
          <motion.div
            animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.8 }}
            className="absolute right-4 bottom-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black"
          >
            <ArrowUpRight size={22} />
          </motion.div>
        </div>
        <div className="p-6">
          <div className="font-mono2 text-[11px] tracking-[0.25em] uppercase" style={{ color: p.color }}>
            {p.category}
          </div>
          <h3 className="font-display mt-2 text-xl font-bold transition group-hover:translate-x-1 md:text-2xl">{p.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/60">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: accent }} />
      </motion.div>
    </motion.article>
  );
}

export default function Projects({ accent }: { accent: string }) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.filter === active);

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#22d3ee]/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            num="01"
            label="Selected Work"
            accent={accent}
            title={
              <>
                Work that <span style={{ color: accent }}>bends</span>
                <br />
                reality a little.
              </>
            }
          />
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                active === f.id ? "text-black" : "glass text-white/60 hover:text-white"
              }`}
              style={active === f.id ? { background: accent } : {}}
            >
              {f.label}
            </button>
          ))}
          <div className="ml-auto hidden items-center gap-2 font-mono2 text-xs text-white/40 md:flex">
            {filtered.length} projects — hover to preview in 3D tilt
          </div>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i} accent={accent} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <a href="#contact" className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4 font-semibold transition hover:border-[#d4ff3f] hover:bg-[#d4ff3f] hover:text-black">
            Want 120+ more? Let's talk <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
