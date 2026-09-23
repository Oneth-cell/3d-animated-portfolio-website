import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, MapPin, CalendarClock, Copy } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Contact({ accent }: { accent: string }) {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", msg: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]" style={{ background: `linear-gradient(90deg, ${accent}, #8b5cf6)` }} />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          num="07"
          label="Contact"
          accent={accent}
          align="center"
          title={
            <>
              Have an idea? <br />
              Let’s make it <span className="text-stroke">unreal.</span>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* info */}
          <div className="flex flex-col gap-4">
            <a href="mailto:hello@kairen.dev" className="group glass overflow-hidden rounded-3xl p-7 transition hover:border-white/25" data-cursor="SAY HI">
              <div className="font-mono2 text-[11px] tracking-widest text-white/50 uppercase">Drop me a line</div>
              <div className="font-display mt-2 text-2xl font-bold break-all transition group-hover:translate-x-1 md:text-3xl">hello@kairen.dev</div>
              <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: accent }}>
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Replies within 24h — usually 2h
              </div>
            </a>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-3xl p-6">
                <MapPin size={20} style={{ color: accent }} />
                <div className="mt-3 font-bold">Base</div>
                <div className="text-sm text-white/55">Tokyo, JP<br />Working worldwide</div>
              </div>
              <div className="glass rounded-3xl p-6">
                <CalendarClock size={20} style={{ color: accent }} />
                <div className="mt-3 font-bold">Booking</div>
                <div className="text-sm text-white/55">Q4 2026<br />2 slots left</div>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText("hello@kairen.dev");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 py-4 text-sm text-white/70 transition hover:border-white/50 hover:text-white"
            >
              <Copy size={15} /> {copied ? "Copied to clipboard ✓" : "Copy email address"}
            </button>

            <div className="flex items-center gap-3 rounded-3xl bg-white p-6 text-black">
              <Mail size={22} />
              <div className="text-sm">
                <span className="font-bold">Prefer async?</span> Grab my 1-pager capabilities deck.
              </div>
              <span className="ml-auto rounded-full bg-black px-4 py-2 text-xs font-bold text-white">PDF ↓</span>
            </div>
          </div>

          {/* form */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b12] p-7 md:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
                    <CheckCircle2 size={72} style={{ color: accent }} />
                  </motion.div>
                  <h3 className="font-display mt-6 text-3xl font-bold">Message beamed! 🚀</h3>
                  <p className="mt-3 max-w-sm text-white/60">Thanks {form.name.split(" ")[0] || "friend"} — I’ll get back within a day. Meanwhile, go touch some grass (or shaders).</p>
                  <div className="font-mono2 mt-6 text-xs text-white/40">AVG RESPONSE — 02:14:33</div>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }} onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="font-mono2 mb-2 block text-[11px] tracking-widest text-white/50 uppercase">Your name *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ada Lovelace" className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none transition placeholder:text-white/25 focus:border-[#d4ff3f] focus:bg-white/[0.08]" />
                    </div>
                    <div>
                      <label className="font-mono2 mb-2 block text-[11px] tracking-widest text-white/50 uppercase">Email *</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ada@analytical.engine" className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none transition placeholder:text-white/25 focus:border-[#d4ff3f] focus:bg-white/[0.08]" />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono2 mb-2 block text-[11px] tracking-widest text-white/50 uppercase">Budget</label>
                    <div className="flex flex-wrap gap-2">
                      {["< $5k", "$5–15k", "$15–40k", "$40k+"].map((b, i) => (
                        <span key={b} className={`rounded-full border px-4 py-2 text-xs transition ${i === 2 ? "border-transparent font-bold text-black" : "border-white/10 text-white/60"}`} style={i === 2 ? { background: accent } : {}}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-mono2 mb-2 block text-[11px] tracking-widest text-white/50 uppercase">Project dreams</label>
                    <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} rows={5} placeholder="Tell me about your wild idea — goals, vibes, timeline…" className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none transition placeholder:text-white/25 focus:border-[#d4ff3f] focus:bg-white/[0.08]" />
                  </div>
                  <button type="submit" className="group flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-bold text-black transition hover:shadow-[0_0_40px_rgba(212,255,63,.35)]" style={{ background: accent }}>
                    Beam my message <Send size={17} className="transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>
                  <p className="text-center text-xs text-white/35">No spam. No newsletters. Just human reply.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
