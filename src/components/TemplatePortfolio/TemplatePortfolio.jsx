import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, ArrowRight, ExternalLink } from '../../lib/icons'
import { cn } from '../../lib/utils'

const projects = [
  { title: 'Orbital OS', desc: 'A spatial computing OS built for the next decade of human interaction.', tags: ['React', 'WebGL', 'Three.js'], year: '2026' },
  { title: 'Flux Design System', desc: 'Open-source design system used by 200+ teams worldwide.', tags: ['TypeScript', 'Storybook', 'Figma'], year: '2025' },
  { title: 'Helix Analytics', desc: 'Real-time analytics platform processing 10M events/day.', tags: ['Rust', 'ClickHouse', 'React'], year: '2025' },
  { title: 'Signal AI', desc: 'LLM-powered workflow automation for enterprise teams.', tags: ['Python', 'LangChain', 'Next.js'], year: '2024' },
]

const skills = ['React', 'TypeScript', 'Rust', 'Figma', 'System Design', 'WebGL', 'GraphQL', 'PostgreSQL']

export default function TemplatePortfolio({ className }) {
  return (
    <div className={cn('min-h-screen bg-canvas', className)}>
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-black text-xl text-ink">JD</div>
        <div className="flex items-center gap-4 text-sm text-muted">
          {['Work', 'About', 'Contact'].map(l => <a key={l} href="#" className="hover:text-ink transition-colors">{l}</a>)}
        </div>
        <a href="#" className="text-muted hover:text-ink transition-colors"><Github size={18} /></a>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-sm font-medium text-muted mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" style={{ boxShadow: '0 0 6px var(--color-success)' }} />
            Available for work
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-ink tracking-tighter mb-6">
            Jane<br />Doe
          </h1>
          <p className="text-xl text-muted max-w-lg mb-8">
            Senior software engineer & designer. I build products that live at the intersection of great design and reliable engineering.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-semibold">
              View work <ArrowRight size={14} />
            </a>
            <div className="flex items-center gap-3 text-muted">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-ink transition-colors"><Icon size={18} /></a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <span key={s} className="px-3 py-1.5 rounded-full border border-hairline bg-surface text-xs font-medium text-muted">{s}</span>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-8">Selected Work</div>
        <div className="space-y-px border border-hairline rounded-2xl overflow-hidden">
          {projects.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group flex items-center justify-between p-6 bg-canvas hover:bg-surface transition-colors cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-muted">{p.year}</span>
                  <h3 className="font-semibold text-ink group-hover:text-primary transition-colors">{p.title}</h3>
                </div>
                <p className="text-sm text-muted max-w-md">{p.desc}</p>
                <div className="flex gap-1.5 mt-2">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <ExternalLink size={16} className="text-muted group-hover:text-primary transition-colors shrink-0 ml-4" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-muted">
          <span>Jane Doe © 2026</span>
          <a href="mailto:hello@janedoe.dev" className="hover:text-ink transition-colors">hello@janedoe.dev</a>
        </div>
      </footer>
    </div>
  )
}
