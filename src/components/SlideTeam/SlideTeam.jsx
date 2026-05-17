import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_MEMBERS = [
  { name: 'Alex Kim', role: 'CEO & Co-founder', prev: 'ex-Google', avatar: 'AK' },
  { name: 'Mia Chen', role: 'CTO & Co-founder', prev: 'ex-Stripe', avatar: 'MC' },
  { name: 'Tom Reed', role: 'VP Engineering', prev: 'ex-Airbnb', avatar: 'TR' },
  { name: 'Sara Wolf', role: 'VP Product', prev: 'ex-Figma', avatar: 'SW' },
  { name: 'James Liu', role: 'Head of Design', prev: 'ex-Linear', avatar: 'JL' },
  { name: 'Ana Costa', role: 'Head of Sales', prev: 'ex-Salesforce', avatar: 'AC' },
]

const COLORS = ['bg-primary/20 text-primary', 'bg-success/20 text-success', 'bg-warning/20 text-warning',
  'bg-error/20 text-error', 'bg-primary/30 text-primary', 'bg-success/30 text-success']

export default function SlideTeam({
  eyebrow = 'The Team',
  title = 'Built by the best',
  subtitle = 'Former leaders from Google, Stripe, Figma, and beyond.',
  members = DEFAULT_MEMBERS,
  className,
}) {
  return (
    <div
      className={cn('relative bg-canvas overflow-hidden flex flex-col', className)}
      style={{ width: '100%', aspectRatio: '16/9', padding: '5% 8%' }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{eyebrow}</div>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-black text-ink">{title}</h2>
          <p className="text-muted text-sm max-w-xs text-right">{subtitle}</p>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-4 flex-1">
        {members.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-black', COLORS[i % COLORS.length])}>
              {m.avatar}
            </div>
            <div>
              <div className="font-bold text-ink text-sm leading-tight">{m.name}</div>
              <div className="text-[11px] text-muted leading-tight">{m.role}</div>
              {m.prev && <div className="text-[10px] text-primary font-medium mt-0.5">{m.prev}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
