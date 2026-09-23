import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/portfolio";

export default function Testimonials({ accent }: { accent: string }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setIdx((p) => (p + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[idx];

  return (
    <section className="relative py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading num="06" label="Love letters" accent={accent} align="center" title={<>Clients say it <span className="italic" style={{ color: accent }}>better.</span></>} />

        <div className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-12">
          <Quote size={120} className="absolute -top-4 -left-4 opacity-[0.06]" />
          <div className="flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={16} className="fill-[#d4ff3f] text-[#d4ff3f]" />
            ))}
          </div>
          <div className="relative mt-6 min-h-[150px] md:min-h-[130px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={idx}
                custom={dir}
                initial={{ opacity: 0, x: 60 * dir, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -60 * dir, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center text-xl leading-relaxed font-medium md:text-2xl"
              >
                “{t.quote}”
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-black" style={{ background: accent }}>
              {t.avatar}
            </div>
            <div className="text-left">
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-white/50">{t.role}</div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={() => { setDir(-1); setIdx((idx - 1 + testimonials.length) % testimonials.length); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:bg-white hover:text-black">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }} className="h-2 rounded-full transition-all" style={{ width: i === idx ? 28 : 8, background: i === idx ? accent : "rgba(255,255,255,.2)" }} />
              ))}
            </div>
            <button onClick={() => { setDir(1); setIdx((idx + 1) % testimonials.length); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:bg-white hover:text-black">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
