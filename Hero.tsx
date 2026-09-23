import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, Sparkles, Globe, AtSign, Layers } from "lucide-react";
import { useRef } from "react";
import HeroScene from "./HeroScene";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero({ accent, setAccent }: { accent: string; setAccent: (c: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const accents = ["#d4ff3f", "#22d3ee", "#8b5cf6", "#fb7185"];

  return (
    <section id="top" ref={ref} className="noise relative flex min-h-screen flex-col overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <HeroScene accent={accent} />
      </motion.div>
      <div className="grid-bg absolute inset-0" />

      {/* side rails */}
      <div className="absolute top-1/2 left-5 hidden -translate-y-1/2 -rotate-90 items-center gap-3 font-mono2 text-[10px] tracking-[0.4em] text-white/40 xl:flex">
        <span className="h-px w-12 bg-white/20" /> SCROLL TO EXPLORE — 35.68°N
      </div>
      <div className="absolute top-1/2 right-5 hidden -translate-y-1/2 rotate-90 items-center gap-3 font-mono2 text-[10px] tracking-[0.4em] text-white/40 xl:flex">
        FOLIO / 2026 <span className="h-px w-12 bg-white/20" />
      </div>

      <motion.div style={{ y: yText, opacity }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-32 pb-10 md:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">
          <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4ff3f] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d4ff3f]" />
              </span>
              Available for Q4 — 2 slots left
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono2 text-[11px] text-white/60 sm:flex">
              <Sparkles size={13} className="text-[#d4ff3f]" /> 8+ yrs crafting the weird web
            </span>
          </motion.div>

          <motion.p variants={item} className="font-mono2 mb-4 text-sm tracking-[0.3em] text-white/60 uppercase">
            Hello, I’m <span style={{ color: accent }} className="font-bold">Kai Ren</span> — Tokyo / Remote
          </motion.p>

          <h1 className="font-display leading-[0.92] font-extrabold tracking-tight">
            <motion.span variants={item} className="block text-[12.5vw] md:text-[7.5rem] lg:text-[8.5rem]">
              CREATIVE
            </motion.span>
            <motion.span variants={item} className="text-stroke block text-[12.5vw] md:text-[7.5rem] lg:text-[8.5rem]">
              DEVELOPER
            </motion.span>
            <motion.span variants={item} className="mt-2 flex flex-wrap items-center gap-4 text-[12.5vw] md:text-[7.5rem] lg:text-[8.5rem]">
              <span className="inline-flex h-[0.9em] w-[1.8em] items-center overflow-hidden rounded-full border border-white/15">
                <img src="https://images.pexels.com/photos/29506609/pexels-photo-29506609.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" className="h-full w-full object-cover" alt="work" />
              </span>
              <span style={{ color: accent }} className="transition-colors duration-500">&amp; 3D</span>
              <span className="font-light italic">maker</span>
            </motion.span>
          </h1>

          <motion.div variants={item} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed text-white/60 md:text-lg">
              I blend <span className="text-white">React, WebGL & motion</span> to build sites that feel alive — awarded, convert-obsessed, and buttery at 60fps.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#work" data-hover className="group flex items-center gap-3 rounded-full bg-white px-2 py-2 pr-6 text-sm font-bold text-black transition hover:shadow-[0_0_40px_rgba(255,255,255,.3)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-[#d4ff3f] group-hover:text-black">
                  <ArrowDown size={18} className="transition group-hover:translate-y-0.5" />
                </span>
                View Selected Work
              </a>
              <a href="#lab" data-hover className="glass group flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition hover:border-[#d4ff3f]/50">
                <Play size={15} className="fill-[#d4ff3f] text-[#d4ff3f]" /> Play with 3D Lab
              </a>
            </div>
          </motion.div>

          {/* accent switcher + stats */}
          <motion.div variants={item} className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono2 text-[11px] tracking-widest text-white/40 uppercase">Scene tint —</span>
              <div className="flex gap-2">
                {accents.map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccent(c)}
                    data-hover
                    className={`h-8 w-8 rounded-full transition-all duration-300 ${accent === c ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-black" : "opacity-60 hover:opacity-100 hover:scale-105"}`}
                    style={{ background: c, boxShadow: accent === c ? `0 0 20px ${c}` : "none" }}
                    aria-label="change accent"
                  />
                ))}
              </div>
              <span className="font-mono2 hidden text-[11px] text-white/40 sm:block">{accent}</span>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {[
                ["120+", "Projects shipped"],
                ["14", "Global awards"],
                ["8y", "Obsession"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold md:text-3xl">
                    {n}
                  </div>
                  <div className="font-mono2 text-[10px] tracking-widest text-white/40 uppercase">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* bottom bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pb-6 md:px-8">
        <div className="flex gap-2">
          {[Globe, AtSign, Layers].map((Icon, i) => (
            <a key={i} href="#top" className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition hover:bg-white hover:text-black">
              <Icon size={16} />
            </a>
          ))}
        </div>
        <a href="#work" className="group flex items-center gap-3 font-mono2 text-[11px] tracking-[0.3em] text-white/50 uppercase">
          Scroll <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition group-hover:border-[#d4ff3f] group-hover:text-[#d4ff3f]"><ArrowDown size={16} className="animate-bounce" /></span>
        </a>
        <div className="hidden items-center gap-2 font-mono2 text-[11px] text-white/50 md:flex">
          DRAG TO ORBIT <ArrowUpRight size={14} />
        </div>
      </div>
    </section>
  );
}
