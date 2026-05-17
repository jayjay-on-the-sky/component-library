import { motion } from 'framer-motion'
import { X, Check } from '../../lib/icons'
import { cn } from '../../lib/utils'

const DEFAULT_BEFORE = [
  'Manual deployment taking 2+ hours',
  'No visibility into production errors',
  'Copy-paste configs for every team',
  'Security reviews blocking releases',
  'On-call engineers burning out',
]

const DEFAULT_AFTER = [
  'One-click deploy in under 2 minutes',
  'Real-time error tracking and alerts',
  'Shared config library with versioning',
  'Automated security scanning in CI',
  'Zero-downtime deploys, zero stress',
]

export default function SlideBeforeAfter({
  title = 'Before vs. After',
  eyebrow = 'The Transformation',
  beforeLabel = 'Before',
  afterLabel = 'After Acme',
  beforeItems = DEFAULT_BEFORE,
  afterItems = DEFAULT_AFTER,
  className,
}) {
  return (
    <div
      className={cn('relative bg-canvas overflow-hidden flex flex-col', className)}
      style={{ width: '100%', aspectRatio: '16/9', padding: '5% 8%' }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{eyebrow}</div>
        <h2 className="text-4xl font-black text-ink">{title}</h2>
      </motion.div>

      <div className="flex gap-6 flex-1">
        {/* Before */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="flex-1 rounded-2xl bg-error/5 border border-error/20 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-error/20 flex items-center justify-center">
              <X size={14} className="text-error" />
            </div>
            <span className="font-bold text-ink">{beforeLabel}</span>
          </div>
          <div className="space-y-3 flex-1">
            {beforeItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="flex items-start gap-3">
                <X size={13} className="text-error shrink-0 mt-0.5" />
                <span className="text-sm text-ink/70 line-through">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arrow */}
        <div className="flex items-center text-2xl text-muted">→</div>

        {/* After */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="flex-1 rounded-2xl bg-success/5 border border-success/20 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-success/20 flex items-center justify-center">
              <Check size={14} className="text-success" />
            </div>
            <span className="font-bold text-ink">{afterLabel}</span>
          </div>
          <div className="space-y-3 flex-1">
            {afterItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-3">
                <Check size={13} className="text-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
