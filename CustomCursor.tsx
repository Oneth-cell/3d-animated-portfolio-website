import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-hover]");
      setHovering(!!interactive);
      const l = t.closest("[data-cursor]")?.getAttribute("data-cursor") || "";
      setLabel(l);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[200] hidden md:block">
      {/* dot */}
      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-0"
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.5 : 1 }}
      >
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4ff3f] shadow-[0_0_18px_rgba(212,255,63,.9)]" />
      </motion.div>
      {/* ring */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0" animate={{ opacity: visible ? 1 : 0 }}>
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ${
            label
              ? "h-20 w-20 border-[#d4ff3f] bg-[#d4ff3f]/15 backdrop-blur-md"
              : hovering
              ? "h-12 w-12 border-[#d4ff3f]/80 bg-[#d4ff3f]/10"
              : "h-8 w-8 border-white/30"
          }`}
        >
          {label && <span className="font-mono2 text-[10px] font-bold tracking-widest text-[#d4ff3f] uppercase">{label}</span>}
        </div>
      </motion.div>
    </div>
  );
}
