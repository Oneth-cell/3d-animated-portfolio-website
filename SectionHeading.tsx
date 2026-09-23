import { motion } from "framer-motion";

export default function SectionHeading({
  num,
  label,
  title,
  accent = "#d4ff3f",
  align = "left",
}: {
  num: string;
  label: string;
  title: React.ReactNode;
  accent?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} mb-12 md:mb-16`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="font-mono2 rounded-full border border-white/15 px-3 py-1 text-[11px] tracking-[0.25em] uppercase" style={{ color: accent }}>
          {num} — {label}
        </span>
        <span className="h-px w-16 bg-white/15" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl leading-[1.02] font-extrabold tracking-tight md:text-6xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
