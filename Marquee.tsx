import { Asterisk } from "lucide-react";

export default function Marquee({ accent }: { accent: string }) {
  const words = ["WEBGL", "THREE.JS", "REACT", "SHADERS", "GSAP", "AI INTERFACES", "MOTION", "BRANDING"];
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#0b0b12] py-5">
      <div className="animate-marquee flex w-max items-center gap-6 pr-6">
        {row.map((w, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className={`font-display text-2xl font-bold tracking-tight whitespace-nowrap md:text-3xl ${i % 3 === 0 ? "" : "text-stroke"}`}>{w}</span>
            <Asterisk size={28} style={{ color: accent }} className="shrink-0 transition-colors duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
