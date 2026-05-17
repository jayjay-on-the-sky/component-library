import { motion } from 'framer-motion'
import { Zap, Shield, Globe } from '../../lib/icons'
import { cn } from '../../lib/utils'

const DEFAULT_COLS = [
  { icon: Zap, title: 'Speed', body: 'Ship features 10× faster with our AI-powered development suite.' },
  { icon: Shield, title: 'Security', body: 'Enterprise-grade security built in, not bolted on.' },
  { icon: Globe, title: 'Scale', body: 'From 0 to millions of users without changing a single line.' },
]

export default function SlideThreeUp({
  eyebrow = 'Why us?',
  title = 'Three things\nthat set us apart',
  columns = DEFAULT_COLS,
  className,
}) {
  return (
    <div
      className={cn('relative bg-canvas overflow-hidden flex flex-col', className)}
      style={{ width: '100%', aspectRatio: '16/9', padding: '6% 8%' }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{eyebrow}</div>
        <h2 className="text-4xl font-black text-ink" style={{ whiteSpace: 'pre-line' }}>{title}</h2>
      </motion.div>

      {/* Columns */}
      <div className="grid grid-cols-3 gap-6 flex-1">
        {columns.map((col, i) => {
          const Icon = col.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col bg-surface rounded-2xl p-6 border border-hairline"
            >
              {Icon && (
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Icon size={22} />
                </div>
              )}
              {col.number && (
                <div className="text-5xl font-black text-primary mb-3">{col.number}</div>
              )}
              <div className="font-bold text-ink text-xl mb-2">{col.title}</div>
              <div className="text-sm text-muted">{col.body}</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
