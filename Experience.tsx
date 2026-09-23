import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience } from "../data/portfolio";

export default function Experience({ accent }: { accent: string }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.75", "end 0.5"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          num="04"
          label="Journey"
          accent={accent}
          title={
            <>
              8 years of <span style={{ color: accent }}>plot twists.</span>
            </>
          }
        />

        <div ref={lineRef} className="relative">
          {/* track */}
          <div className="absolute top-0 bottom-0 left-[19px] w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div style={{ scaleY }} className="absolute top-0 bottom-0 left-[19px] w-[2px] origin-top md:left-1/2 md:-translate-x-1/2" >
            <div className="h-full w-full" style={{ background: `linear-gradient(180deg, ${accent}, #8b5cf6, #22d3ee)`, boxShadow: `0 0 20px ${accent}` }} />
          </motion.div>

          <div className="space-y-8">
            {experience.map((e, i) => (
              <motion.div
                key={e.company}
                initial={{ opacity: 0, y: 50, x: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex gap-6 pl-14 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-14" : "md:ml-auto md:flex-row-reverse md:pl-14 md:text-left"}`}
              >
                {/* dot - mobile */}
                <span
                  className="absolute top-6 left-[11px] flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 bg-[#050508] md:hidden"
                  style={{ borderColor: accent }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                </span>
                {/* dot - desktop */}
                <span
                  className="absolute top-6 hidden h-[18px] w-[18px] items-center justify-center rounded-full border-2 bg-[#050508] md:flex"
                  style={{
                    borderColor: accent,
                    ...(i % 2 === 0 ? { right: "-9px" } : { left: "-9px" }),
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                </span>

                <div className="glass group flex-1 rounded-3xl p-6 transition-all hover:-translate-y-1 hover:border-white/25 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8" style={{ color: accent }}>
                      <Briefcase size={18} />
                    </span>
                    <span className="font-mono2 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60">{e.period}</span>
                  </div>
                  <h3 className="font-display mt-4 text-xl font-bold">{e.role}</h3>
                  <div className="mt-1 text-sm font-semibold" style={{ color: accent }}>
                    {e.company} • {e.location}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{e.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-transparent p-8 text-center"
        >
          <div className="font-mono2 text-xs tracking-[0.3em] text-white/50 uppercase">Next chapter — you?</div>
          <div className="font-display mt-2 text-2xl font-bold md:text-3xl">
            Open for <span className="italic" style={{ color: accent }}>ambitious</span> collaborations in 2026
          </div>
        </motion.div>
      </div>
    </section>
  );
}
