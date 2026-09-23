import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Lab from "./components/Lab";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [accent, setAccent] = useState("#d4ff3f");

  return (
    <div className="relative min-h-screen bg-[#050508] text-white antialiased">
      <CustomCursor />
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
        <main>
          <Hero accent={accent} setAccent={setAccent} />
          <Marquee accent={accent} />
          <Projects accent={accent} />
          <About accent={accent} />
          <Skills accent={accent} />
          <Experience accent={accent} />
          <Lab accent={accent} />
          <Testimonials accent={accent} />
          <Contact accent={accent} />
        </main>
        <Footer accent={accent} />

        {/* ambient vignette */}
        <div className="pointer-events-none fixed inset-0 z-[50] bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,.45)_100%)]" />
      </motion.div>
    </div>
  );
}
