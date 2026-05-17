import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from '../../lib/icons'
import { cn } from '../../lib/utils'

const works = [
  { client: 'Meridian', type: 'Brand Identity', year: '2026', color: 'from-primary/20 to-surface' },
  { client: 'Flux Corp', type: 'Website Redesign', year: '2025', color: 'from-success/20 to-surface' },
  { client: 'Nomad', type: 'Mobile App', year: '2025', color: 'from-warning/20 to-surface' },
  { client: 'Vertex AI', type: 'Campaign', year: '2024', color: 'from-error/20 to-surface' },
]

const team = [
  { name: 'Alex Kim', role: 'Creative Director' },
  { name: 'Mia Chen', role: 'Lead Designer' },
  { name: 'Tom Reed', role: 'Tech Lead' },
  { name: 'Sara Wolf', role: 'Strategy' },
]

export default function TemplateAgency({ className }) {
  return (
    <div className={cn('min-h-screen bg-ink text-canvas', className)}>
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-black text-xl">FORM</div>
        <div className="hidden md:flex gap-8 text-sm text-white/50">
          {['Work', 'Services', 'About', 'Journal'].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <a href="#" className="text-sm font-semibold border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-ink transition-all">
          Get in touch
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-7xl md:text-[120px] font-black leading-none tracking-tighter mb-8">
          We craft<br />
          <span className="text-white/20">brands that</span><br />
          last.
        </motion.h1>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-lg text-white/60 max-w-sm">
            A creative studio at the intersection of strategy, design, and technology.
          </p>
          <motion.a href="#" whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-sm font-semibold">
            View our work <ArrowRight size={16} />
          </motion.a>
        </div>
      </section>

      {/* Marquee clients */}
      <div className="border-y border-white/10 py-4 overflow-hidden">
        <div className="flex items-center gap-16 whitespace-nowrap text-sm text-white/30 font-semibold uppercase tracking-widest"
          style={{ animation: 'marquee 20s linear infinite' }}>
          {['Meridian', 'Flux Corp', 'Nomad', 'Vertex AI', 'Solaris', 'Bloom', 'Meridian', 'Flux Corp', 'Nomad', 'Vertex AI'].map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </div>

      {/* Work grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-xs text-white/30 uppercase tracking-widest mb-8">Selected Work</div>
        <div className="grid md:grid-cols-2 gap-4">
          {works.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <div className={`h-48 bg-gradient-to-br ${w.color} opacity-30`} />
              <div className="p-6 flex items-end justify-between">
                <div>
                  <div className="text-xs text-white/30 mb-1">{w.year} — {w.type}</div>
                  <div className="text-xl font-black">{w.client}</div>
                </div>
                <ArrowUpRight size={20} className="text-white/30 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-xs text-white/30 uppercase tracking-widest mb-8">The Team</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-square rounded-2xl bg-white/10" />
              <div>
                <div className="font-semibold text-sm">{m.name}</div>
                <div className="text-xs text-white/40">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center border-t border-white/10">
        <h2 className="text-5xl font-black mb-6">Ready to create something<br />remarkable?</h2>
        <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-ink font-bold text-lg">
          Start a project <ArrowRight size={18} />
        </a>
      </section>
    </div>
  )
}
