import { ArrowUp, Heart } from "lucide-react";

export default function Footer({ accent }: { accent: string }) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-extrabold text-black" style={{ background: accent }}>
              K®
            </div>
            <div className="text-sm text-white/60">
              © 2026 Kai Ren. Crafted with <Heart size={12} className="inline fill-rose-500 text-rose-500" /> + too much coffee in Tokyo.
            </div>
          </div>
          <div className="font-mono2 flex items-center gap-6 text-[11px] tracking-widest text-white/40 uppercase">
            <a href="#work" className="transition hover:text-white">Work</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#lab" className="transition hover:text-white">Lab</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition hover:border-transparent hover:text-black" onMouseEnter={(e) => (e.currentTarget.style.background = accent)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <ArrowUp size={18} className="transition group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
      <div className="pointer-events-none relative select-none overflow-hidden">
        <div className="font-display -mb-[3vw] text-center text-[14.5vw] leading-none font-extrabold tracking-tight whitespace-nowrap text-white/[0.04]">
          KAI REN®
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050508] to-transparent" />
      </div>
    </footer>
  );
}
