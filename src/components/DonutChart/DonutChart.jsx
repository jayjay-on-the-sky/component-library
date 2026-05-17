import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Design', value: 35 },
  { label: 'Engineering', value: 45 },
  { label: 'Marketing', value: 20 },
]

const PALETTE = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-error)',
  'color-mix(in srgb, var(--color-primary) 50%, var(--color-success))',
]

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const s = polarToCartesian(cx, cy, r, startAngle)
  const e = polarToCartesian(cx, cy, r, endAngle)
  const large = endAngle - startAngle > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

export default function DonutChart({
  data = DEFAULT_DATA,
  size = 180,
  thickness = 28,
  centerLabel,
  className,
}) {
  const [hovered, setHovered] = useState(null)
  const cx = size / 2, cy = size / 2
  const r = (size - thickness) / 2 - 4

  const total = data.reduce((s, d) => s + d.value, 0)
  let angle = 0
  const segments = data.map((d, i) => {
    const sweep = (d.value / total) * 360
    const start = angle
    angle += sweep
    return { ...d, start, end: angle, color: PALETTE[i % PALETTE.length], index: i }
  })

  const displayValue = hovered !== null
    ? data[hovered].value
    : total

  const displayLabel = hovered !== null
    ? data[hovered].label
    : (centerLabel ?? 'Total')

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Donut chart">
          {segments.map((seg, i) => {
            const isHov = hovered === i
            const rr = isHov ? r + 4 : r
            return (
              <motion.path
                key={i}
                d={arcPath(cx, cy, rr, seg.start + 1, seg.end - 1)}
                fill="none"
                stroke={seg.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-2xl font-bold text-ink">{displayValue}</div>
          <div className="text-xs text-muted mt-0.5">{displayLabel}</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
            <span className="text-xs text-muted">{d.label}</span>
            <span className="text-xs font-semibold text-ink">{Math.round(d.value / total * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
