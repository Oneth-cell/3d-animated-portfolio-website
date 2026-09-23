import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit">("loading");

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.floor(Math.random() * 9) + 3;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => setPhase("exit"), 400);
        setTimeout(() => onDone(), 1100);
      }
      setCount(v);
    }, 70);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase === "loading" || true ? (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-[#050508] p-6 md:p-10"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono2 text-xs tracking-[0.3em] text-white/50 uppercase">
            <span>Kai Ren® Portfolio</span>
            <span className="hidden sm:block">Loading Experience</span>
            <span className="text-[#d4ff3f]">v3.0 — 2026</span>
          </div>

          <div className="flex items-end justify-between">
            <div className="space-y-3">
              <div className="flex gap-2">
                {["DESIGN", "MOTION", "3D", "CODE"].map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="rounded-full border border-white/15 px-3 py-1 font-mono2 text-[10px] tracking-widest text-white/60"
                  >
                    {w}
                  </motion.span>
                ))}
              </div>
              <h1 className="font-display text-[13vw] leading-[0.9] font-extrabold tracking-tight text-white md:text-[9vw]">
                {count}
                <span className="text-[#d4ff3f]">%</span>
              </h1>
            </div>
            <div className="mb-4 hidden h-40 w-40 items-center justify-center md:flex">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/20" />
                <div className="absolute inset-4 animate-spin-slower rounded-full border border-[#d4ff3f]/30" />
                <div className="absolute inset-0 flex items-center justify-center font-mono2 text-xs text-[#d4ff3f]">
                  {count < 40 ? "INIT" : count < 80 ? "RENDER" : "READY"}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex justify-between font-mono2 text-[11px] text-white/40">
              <span>Compiling shaders…</span>
              <span>{count}%</span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-[#d4ff3f] via-[#22d3ee] to-[#8b5cf6]" style={{ width: `${count}%` }} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
