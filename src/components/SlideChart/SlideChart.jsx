import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Q1 2024', value: 28 },
  { label: 'Q2 2024', value: 42 },
  { label: 'Q3 2024', value: 58 },
  { label: 'Q4 2024', value: 71 },
  { label: 'Q1 2025', value: 88 },
  { label: 'Q2 2025', value: 110 },
  { label: 'Q3 2025', value: 138 },
  { label: 'Q4 2025', value: 165 },
]

export default function SlideChart({
  eyebrow = 'Growth',
  title = 'Revenue on a\nsteep trajectory',
  data = DEFAULT_DATA,
  unit = '$K ARR',
  insight = 'We reached profitability in Q3 2025 — ahead of schedule by 6 months.',
  className,
}) {
  const max = Math.max(...data.map(d => d.value)) * 1.1

  return (
    <div
      className={cn('relative bg-canvas overflow-hidden flex', className)}
      style={{ width: '100%', aspectRatio: '16/9' }}
    >
      {/* Left panel */}
      <div className="w-2/5 flex flex-col justify-center p-12 border-r border-hairline">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{eyebrow}</div>
          <h2 className="text-3xl font-black text-ink mb-4" style={{ whiteSpace: 'pre-line' }}>{title}</h2>
          <div className="w-8 h-1 bg-primary rounded-full mb-4" />
          <p className="text-sm text-muted">{insight}</p>
          <div className="mt-6 flex flex-col gap-1">
            <div className="text-4xl font-black text-ink">{data[data.length - 1].value}<span className="text-xl text-muted font-normal">K</span></div>
            <div className="text-xs text-muted">{unit} — {data[data.length - 1].label}</div>
          </div>
        </motion.div>
      </div>

      {/* Right chart */}
      <div className="flex-1 flex flex-col justify-end p-8 pb-10">
        {/* Y axis label */}
        <div className="text-[10px] text-muted mb-3 ml-8">{unit}</div>
        <div className="flex items-end gap-3 h-40 pl-8 relative">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map(t => (
            <div key={t} className="absolute left-8 right-0 h-px bg-hairline"
              style={{ bottom: `${t * 100}%` }}>
              <span className="absolute -left-8 -top-2 text-[9px] text-muted">{Math.round(t * max)}</span>
            </div>
          ))}

          {data.map((d, i) => {
            const pct = (d.value / max) * 100
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t-md"
                  style={{ background: i === data.length - 1 ? 'var(--color-primary)' : 'color-mix(in srgb, var(--color-primary) 50%, var(--color-surface))' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )
          })}
        </div>
        <div className="flex gap-3 pl-8 mt-2">
          {data.map((d, i) => (
            <div key={i} className="flex-1 text-center text-[9px] text-muted truncate">{d.label}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
