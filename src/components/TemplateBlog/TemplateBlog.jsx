import { motion } from 'framer-motion'
import { ArrowRight, Clock, Tag } from '../../lib/icons'
import { cn } from '../../lib/utils'

const featured = {
  title: 'The Architecture of Modern AI Systems',
  excerpt: 'A deep dive into how large language models are deployed at scale, the infrastructure decisions that matter, and the tradeoffs every team faces.',
  author: 'Jane Doe', role: 'Principal Engineer',
  readTime: '12 min', date: 'May 15, 2026',
  tags: ['AI', 'Infrastructure'],
}

const posts = [
  { title: 'Why We Migrated to Rust', excerpt: 'After 3 years on Node.js, we moved our critical path to Rust. Here\'s what we learned.', author: 'Tom Reed', readTime: '8 min', date: 'May 10', tags: ['Rust', 'Performance'] },
  { title: 'Designing for Zero Trust', excerpt: 'Security-first design patterns for modern distributed systems.', author: 'Mia Chen', readTime: '6 min', date: 'May 5', tags: ['Security'] },
  { title: 'The Compounding Effect of DX', excerpt: 'Developer experience isn\'t a luxury. It\'s a competitive advantage.', author: 'Alex Kim', readTime: '5 min', date: 'Apr 28', tags: ['DX'] },
  { title: 'Building Observable Systems', excerpt: 'Metrics, traces, and logs: a practical guide to production visibility.', author: 'Sara Wolf', readTime: '10 min', date: 'Apr 20', tags: ['Observability'] },
]

export default function TemplateBlog({ className }) {
  return (
    <div className={cn('min-h-screen bg-canvas', className)}>
      {/* Nav */}
      <nav className="border-b border-hairline">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-black text-ink">The Forge</div>
          <div className="flex items-center gap-6 text-sm text-muted">
            {['Engineering', 'Design', 'Culture'].map(l => <a key={l} href="#" className="hover:text-ink">{l}</a>)}
          </div>
          <a href="#" className="text-sm px-4 py-2 rounded-full border border-hairline font-medium text-ink">Subscribe</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Featured */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="group rounded-2xl border border-hairline overflow-hidden bg-surface cursor-pointer mb-12 hover:border-primary/30 transition-colors">
          <div className="h-64 bg-gradient-to-br from-primary/20 via-surface to-canvas" />
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Featured</span>
              {featured.tags.map(t => (
                <span key={t} className="text-xs text-muted border border-hairline px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
            <h2 className="text-3xl font-black text-ink mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
            <p className="text-muted mb-6 max-w-2xl">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20" />
                <div>
                  <div className="text-sm font-semibold text-ink">{featured.author}</div>
                  <div className="text-xs text-muted">{featured.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span>{featured.date}</span>
                <span>·</span>
                <div className="flex items-center gap-1"><Clock size={11} /> {featured.readTime}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group rounded-xl border border-hairline p-6 cursor-pointer hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-1.5 mb-3">
                {p.tags.map(t => (
                  <span key={t} className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
              <h3 className="font-bold text-ink mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted mb-4">{p.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{p.author} · {p.date}</span>
                <div className="flex items-center gap-1"><Clock size={11} /> {p.readTime}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="flex items-center gap-2 mx-auto text-sm font-semibold text-muted hover:text-ink transition-colors">
            Load more posts <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
