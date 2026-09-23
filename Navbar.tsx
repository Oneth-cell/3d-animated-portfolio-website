import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Work", href: "#work", num: "01" },
  { label: "About", href: "#about", num: "02" },
  { label: "Stack", href: "#stack", num: "03" },
  { label: "Journey", href: "#journey", num: "04" },
  { label: "Lab", href: "#lab", num: "05" },
  { label: "Contact", href: "#contact", num: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div className="fixed top-0 right-0 left-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-[#d4ff3f] via-[#22d3ee] to-[#8b5cf6]" style={{ scaleX: scrollYProgress }} />
      <header className={`fixed top-2 right-0 left-0 z-[99] transition-all duration-500 ${scrolled ? "top-0" : ""}`}>
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-3 transition-all duration-500 md:px-8 ${
            scrolled ? "glass mt-3 mx-4 md:mx-auto rounded-2xl shadow-2xl shadow-black/40" : "bg-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#d4ff3f] font-display text-lg font-extrabold text-black transition-transform duration-500 group-hover:rotate-[20deg]">
              K<span className="absolute -right-1 -bottom-2 text-[10px]">®</span>
            </div>
            <div className="leading-none">
              <div className="font-display text-sm font-bold tracking-wide">KAI REN</div>
              <div className="font-mono2 text-[10px] tracking-[0.25em] text-white/50">CREATIVE DEV</div>
            </div>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-sm text-white/70 transition hover:text-white"
              >
                <span className="mr-1 font-mono2 text-[10px] text-[#d4ff3f]/70">{l.num}</span> {l.label}
                <span className="absolute bottom-1 left-4 h-px w-0 bg-[#d4ff3f] transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[#d4ff3f] hover:shadow-[0_0_30px_rgba(212,255,63,.4)]"
            >
              Let's Talk <ArrowUpRight size={16} />
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="glass flex h-11 w-11 items-center justify-center rounded-full lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[98] flex flex-col justify-center bg-[#050508]/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            <div className="space-y-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-baseline gap-4 border-b border-white/10 py-4"
                >
                  <span className="font-mono2 text-xs text-[#d4ff3f]">{l.num}</span>
                  <span className="font-display text-4xl font-bold">{l.label}</span>
                </motion.a>
              ))}
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-8 rounded-2xl bg-[#d4ff3f] p-4 text-center font-bold text-black">
              Start a Project →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
