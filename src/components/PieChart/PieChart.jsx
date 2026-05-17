import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Direct', value: 40 },
  { label: 'Organic', value: 30 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 12 },
]

const PALETTE = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-error)',
  'color-mix(in srgb, var(--color-primary) 60%, var(--color-success))',
]

function polarToCartesian(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function sectorPath(cx, cy, r, startDeg, endDeg, offset = 0) {
  const angle = (startDeg + endDeg) / 2
  const rad = ((angle - 90) * Math.PI) / 180
  const ox = offset * Math.cos(rad), oy = offset * Math.sin(rad)
  const s = polarToCartesian(cx + ox, cy + oy, r, startDeg)
  const e = polarToCartesian(cx + ox, cy + oy, r, endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${cx + ox} ${cy + oy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`
}

export default function PieChart({
  data = DEFAULT_DATA,
  size = 200,
  className,
}) {
  const [hovered, setHovered] = useState(null)
  const cx = size / 2, cy = size / 2, r = size / 2 - 8

  const total = data.reduce((s, d) => s + d.value, 0)
  let angle = 0
  const segments = data.map((d, i) => {
    const sweep = (d.value / total) * 360
    const start = angle, end = angle + sweep
    angle = end
    return { ...d, start, end, color: PALETTE[i % PALETTE.length] }
  })

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Pie chart">
        {segments.map((seg, i) => (
          <motion.path
            key={i}
            d={sectorPath(cx, cy, r, seg.start, seg.end, hovered === i ? 8 : 0)}
            fill={seg.color}
            opacity={hovered !== null && hovered !== i ? 0.6 : 0.9}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: hovered !== null && hovered !== i ? 0.6 : 0.9 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ cursor: 'pointer', transformOrigin: `${cx}px ${cy}px` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
            <span className="text-xs text-muted">{d.label}</span>
            <span className="text-xs font-semibold text-ink">{Math.round(d.value / total * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
