import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_EVENTS = [
  { year: '2021', title: 'Founded', desc: 'Started in a garage with 3 engineers and a big idea.' },
  { year: '2022', title: 'Seed Round', desc: '$3M from top angels and early-stage VCs.' },
  { year: '2023', title: 'Product Launch', desc: '10K users in the first week. Product Hunt #1.' },
  { year: '2024', title: 'Series A', desc: '$18M to accelerate growth and expand the team.' },
  { year: '2025', title: 'Profitability', desc: 'Reached profitability with 500+ enterprise customers.' },
  { year: '2026', title: 'Today', desc: 'Series B closed. Global expansion underway.', active: true },
]

export default function SlideTimeline({
  title = 'Our Journey',
  eyebrow = 'History',
  events = DEFAULT_EVENTS,
  className,
}) {
  return (
    <div
      className={cn('relative bg-canvas overflow-hidden flex flex-col', className)}
      style={{ width: '100%', aspectRatio: '16/9', padding: '6% 8%' }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{eyebrow}</div>
        <h2 className="text-4xl font-black text-ink">{title}</h2>
      </motion.div>

      {/* Timeline */}
      <div className="flex items-start gap-0 flex-1">
        {events.map((ev, i) => (
          <div key={i} className="flex-1 relative flex flex-col items-center">
            {/* Connector line */}
            {i < events.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-0.5 bg-hairline" style={{ zIndex: 0 }} />
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center relative z-10"
            >
              {/* Dot */}
              <div className={cn('w-8 h-8 rounded-full border-2 flex items-center justify-center mb-3',
                ev.active ? 'bg-primary border-primary' : 'bg-canvas border-hairline')}>
                {ev.active && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>

              {/* Content */}
              <div className={cn('text-center px-2', ev.active && 'font-semibold')}>
                <div className={cn('text-xs font-bold mb-1', ev.active ? 'text-primary' : 'text-muted')}>{ev.year}</div>
                <div className="font-bold text-ink text-sm mb-1">{ev.title}</div>
                <div className="text-xs text-muted leading-snug">{ev.desc}</div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
