import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp } from '../../lib/icons'
import { cn } from '../../lib/utils'

const investors = ['Sequoia', 'a16z', 'YC', 'Index', 'Founders Fund']

const numbers = [
  { value: '$50M', label: 'Series B raised', sublabel: 'March 2026' },
  { value: '3×', label: 'Revenue growth', sublabel: 'Year over year' },
  { value: '98%', label: 'Customer retention', sublabel: 'Monthly basis' },
  { value: '180+', label: 'Countries served', sublabel: 'Globally' },
]

export default function TemplateStartup({ className }) {
  return (
    <div className={cn('min-h-screen bg-canvas', className)}>
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="font-black text-ink">Pulse</div>
        <div className="flex items-center gap-4 text-sm text-muted">
          <a href="#" className="hover:text-ink">About</a>
          <a href="#" className="hover:text-ink">Team</a>
          <a href="#" className="px-4 py-2 rounded-full bg-ink text-canvas font-semibold">Invest</a>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2 text-sm text-muted mb-6">
            <TrendingUp size={14} className="text-success" />
            <span className="text-success font-semibold">3× growth</span> — fastest-growing in the category
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-ink tracking-tighter leading-none mb-8">
            The future of<br />
            <span className="text-muted">real-time</span><br />
            intelligence.
          </h1>
          <p className="text-xl text-muted max-w-xl mb-10">
            Pulse gives enterprises the data infrastructure to make decisions in milliseconds, not days.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas font-semibold text-sm">
              Request access <ArrowRight size={14} />
            </a>
            <a href="#" className="text-sm text-muted hover:text-ink">Watch demo →</a>
          </div>
        </motion.div>
      </section>

      {/* Numbers */}
      <section className="border-y border-hairline bg-surface py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {numbers.map((n, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-5xl font-black text-ink mb-1">{n.value}</div>
              <div className="text-sm font-semibold text-ink mb-0.5">{n.label}</div>
              <div className="text-xs text-muted">{n.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Investors */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">Backed by the best</div>
          <div className="flex flex-wrap justify-center gap-8">
            {investors.map(inv => (
              <div key={inv} className="text-2xl font-black text-muted/40">{inv}</div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-3xl font-black text-ink leading-tight mb-6">
            "Pulse is the most transformative infrastructure company we've seen since AWS."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20" />
            <div className="text-left">
              <div className="text-sm font-semibold text-ink">Michael Torres</div>
              <div className="text-xs text-muted">Partner, Sequoia Capital</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
