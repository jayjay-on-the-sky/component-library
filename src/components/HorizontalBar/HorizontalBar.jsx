import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Design', value: 87 },
  { label: 'Engineering', value: 92 },
  { label: 'Marketing', value: 64 },
  { label: 'Sales', value: 78 },
  { label: 'Support', value: 55 },
  { label: 'Operations', value: 71 },
]

export default function HorizontalBar({
  data = DEFAULT_DATA,
  showValues = true,
  maxValue,
  className,
}) {
  const [hovered, setHovered] = useState(null)
  const max = maxValue ?? Math.max(...data.map(d => d.value))

  return (
    <div className={cn('flex flex-col gap-3 w-full', className)} role="img" aria-label="Horizontal bar chart">
      {data.map((d, i) => {
        const pct = (d.value / max) * 100
        const isHovered = hovered === i
        return (
          <div
            key={i}
            className="flex items-center gap-3 group"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="w-24 shrink-0 text-right text-sm text-muted truncate">{d.label}</div>
            <div className="flex-1 h-7 bg-surface rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: isHovered
                    ? 'var(--color-primary)'
                    : 'linear-gradient(90deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 70%, var(--color-canvas)) 100%)',
                  opacity: isHovered ? 1 : 0.8,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            {showValues && (
              <div className="w-10 shrink-0 text-sm font-semibold text-ink">{d.value}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
