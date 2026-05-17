import { motion } from 'framer-motion'
import { Star, Download, Shield, Zap, Smartphone } from '../../lib/icons'
import { cn } from '../../lib/utils'

const features = [
  { icon: Zap, title: 'Instant sync', desc: 'Changes sync across all your devices in real-time.' },
  { icon: Shield, title: 'End-to-end encrypted', desc: 'Your data is encrypted before it leaves your device.' },
  { icon: Smartphone, title: 'Works offline', desc: 'Full functionality even without an internet connection.' },
]

export default function TemplateMobile({ className }) {
  return (
    <div className={cn('min-h-screen bg-canvas', className)}>
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="font-black text-ink text-lg">Beacon</div>
        <div className="flex items-center gap-4 text-sm text-muted">
          <a href="#" className="hover:text-ink">Features</a>
          <a href="#" className="hover:text-ink">Pricing</a>
          <a href="#" className="px-4 py-2 rounded-full bg-primary text-on-primary font-semibold text-sm">Download</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-warning fill-warning" />)}
            <span className="text-sm text-muted ml-1">4.9 from 12,400 reviews</span>
          </div>
          <h1 className="text-5xl font-black text-ink tracking-tight mb-4">
            Focus on what<br />matters most.
          </h1>
          <p className="text-lg text-muted mb-8">
            Beacon helps you stay organized, focused, and productive — wherever you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ink text-canvas font-semibold text-sm">
              <Download size={15} /> App Store
            </a>
            <a href="#" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ink text-canvas font-semibold text-sm">
              <Download size={15} /> Google Play
            </a>
          </div>
          <p className="text-xs text-muted mt-4">Free to download · Premium from $4.99/mo</p>
        </motion.div>

        {/* Phone mockup */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center">
          <div className="relative w-56 h-[480px] rounded-[36px] border-4 border-ink bg-ink shadow-2xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-8 bg-ink flex items-center justify-center">
              <div className="w-20 h-4 rounded-full bg-black/80" />
            </div>
            <div className="absolute inset-x-2 top-10 bottom-2 rounded-[28px] bg-canvas overflow-hidden p-4">
              <div className="text-xs font-black text-ink mb-3">Today</div>
              {[
                { done: true, text: 'Review Q2 metrics', time: '9:00' },
                { done: true, text: 'Design sync', time: '11:00' },
                { done: false, text: 'Write release notes', time: '2:00' },
                { done: false, text: 'Team 1:1s', time: '4:00' },
                { done: false, text: 'Plan tomorrow', time: '5:30' },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b border-hairline last:border-0">
                  <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                    task.done ? 'border-success bg-success' : 'border-hairline')}>
                    {task.done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className={cn('text-[10px] flex-1', task.done ? 'text-muted line-through' : 'text-ink')}>{task.text}</span>
                  <span className="text-[9px] text-muted">{task.time}</span>
                </div>
              ))}
              <div className="mt-4 p-3 rounded-xl bg-primary/10">
                <div className="text-[10px] font-bold text-primary">🔥 3 day streak</div>
                <div className="text-[9px] text-muted mt-0.5">You've hit your daily goal!</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16 bg-surface rounded-2xl mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <f.icon size={18} />
              </div>
              <h3 className="font-semibold text-ink">{f.title}</h3>
              <p className="text-sm text-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
