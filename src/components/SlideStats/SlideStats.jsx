import { motion } from 'framer-motion'
import { TrendingUp } from '../../lib/icons'
import { cn } from '../../lib/utils'

const DEFAULT_STATS = [
  { value: '$50M', label: 'Series B', sub: 'Raised in March 2026' },
  { value: '3×', label: 'Revenue growth', sub: 'Year over year' },
  { value: '180+', label: 'Countries', sub: 'Active customers' },
  { value: '98%', label: 'Retention', sub: 'Monthly churn < 2%' },
]

export default function SlideStats({
  eyebrow = 'Traction',
  title = 'Numbers that matter',
  stats = DEFAULT_STATS,
  dark = true,
  className,
}) {
  return (
    <div
      className={cn('relative overflow-hidden flex flex-col', dark ? 'bg-ink text-canvas' : 'bg-canvas text-ink', className)}
      style={{ width: '100%', aspectRatio: '16/9', padding: '6% 8%' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(99,102,241,0.15), transparent)' }} />

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
          <TrendingUp size={14} /> {eyebrow}
        </div>
        <h2 className="text-4xl font-black">{title}</h2>
      </motion.div>

      <div className="grid grid-cols-4 gap-6 flex-1 items-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="text-6xl font-black text-primary mb-2" style={{ lineHeight: 1 }}>{s.value}</div>
            <div className="font-semibold text-lg mb-1" style={{ color: dark ? 'rgba(255,255,255,0.9)' : 'var(--color-ink)' }}>{s.label}</div>
            <div className="text-sm" style={{ color: dark ? 'rgba(255,255,255,0.4)' : 'var(--color-muted)' }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
