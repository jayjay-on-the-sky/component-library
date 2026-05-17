import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Visitors', value: 10000 },
  { label: 'Signups', value: 4200 },
  { label: 'Activated', value: 2100 },
  { label: 'Converted', value: 840 },
  { label: 'Retained', value: 380 },
]

export default function FunnelChart({
  data = DEFAULT_DATA,
  className,
}) {
  const [hovered, setHovered] = useState(null)
  const max = data[0]?.value || 1

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)} role="img" aria-label="Funnel chart">
      {data.map((d, i) => {
        const pct = (d.value / max) * 100
        const dropPct = i > 0 ? Math.round((1 - d.value / data[i - 1].value) * 100) : null
        const isHov = hovered === i

        return (
          <div key={i} className="flex flex-col items-center gap-0.5"
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            {dropPct !== null && (
              <div className="text-[10px] text-muted">↓ {dropPct}% drop</div>
            )}
            <div className="flex items-center gap-3 w-full justify-center">
              <div className="text-xs text-muted text-right w-20 shrink-0">{d.label}</div>
              <motion.div
                className="h-9 rounded-sm relative flex items-center justify-center"
                style={{ background: 'var(--color-primary)', opacity: isHov ? 1 : 0.75 + (i * -0.08) }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs font-semibold text-on-primary whitespace-nowrap">
                  {d.value.toLocaleString()}
                </span>
              </motion.div>
              <div className="text-xs text-muted w-10 shrink-0">{Math.round(pct)}%</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
