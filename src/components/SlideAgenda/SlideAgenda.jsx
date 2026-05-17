import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_ITEMS = [
  { title: 'The Problem', desc: 'Why current solutions fall short' },
  { title: 'Our Approach', desc: 'A new framework for thinking about scale' },
  { title: 'Live Demo', desc: 'See it in action' },
  { title: 'Results', desc: 'What we measured and what it means' },
  { title: 'Next Steps', desc: 'How to get started today' },
]

export default function SlideAgenda({
  title = 'Agenda',
  items = DEFAULT_ITEMS,
  accentColor,
  className,
}) {
  return (
    <div
      className={cn('relative bg-canvas overflow-hidden flex flex-col', className)}
      style={{ width: '100%', aspectRatio: '16/9' }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{ background: accentColor ?? 'var(--color-primary)' }} />

      <div className="flex h-full">
        {/* Left panel */}
        <div className="w-1/3 bg-surface border-r border-hairline flex flex-col justify-center p-12 pl-14">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Today's Session</div>
            <h1 className="text-5xl font-black text-ink">{title}</h1>
          </motion.div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center p-12">
          <div className="space-y-5">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-5"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shrink-0 text-on-primary"
                  style={{ background: accentColor ?? 'var(--color-primary)' }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="font-bold text-ink text-lg leading-tight">{item.title}</div>
                  <div className="text-sm text-muted">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
