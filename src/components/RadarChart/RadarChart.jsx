import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Design', value: 85 },
  { label: 'Speed', value: 72 },
  { label: 'Reliability', value: 90 },
  { label: 'Scalability', value: 68 },
  { label: 'DX', value: 95 },
  { label: 'Docs', value: 78 },
]

export default function RadarChart({
  data = DEFAULT_DATA,
  datasets,
  size = 200,
  className,
}) {
  const cx = size / 2, cy = size / 2
  const r = size / 2 - 24
  const n = data.length
  const allDatasets = datasets ?? [{ label: 'Score', data, color: 'var(--color-primary)' }]

  function point(i, val, maxVal = 100) {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    const d = (val / maxVal) * r
    return { x: cx + d * Math.cos(angle), y: cy + d * Math.sin(angle) }
  }

  const gridLevels = [0.25, 0.5, 0.75, 1.0]

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar chart">
        {/* Grid rings */}
        {gridLevels.map((lvl, gi) => {
          const pts = data.map((_, i) => {
            const p = point(i, lvl * 100)
            return `${p.x},${p.y}`
          })
          return (
            <polygon
              key={gi}
              points={pts.join(' ')}
              fill="none"
              stroke="var(--color-hairline)"
              strokeWidth={0.5}
            />
          )
        })}

        {/* Axis lines */}
        {data.map((_, i) => {
          const p = point(i, 100)
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--color-hairline)" strokeWidth={0.5} />
        })}

        {/* Axis labels */}
        {data.map((d, i) => {
          const p = point(i, 115)
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
              fontSize={9} fill="var(--color-muted)">{d.label}</text>
          )
        })}

        {/* Dataset polygons */}
        {allDatasets.map((ds, di) => {
          const dsData = Array.isArray(ds.data[0]) ? ds.data : ds.data.map(d => ({ value: d.value ?? d }))
          const pts = dsData.map((d, i) => {
            const p = point(i, d.value ?? d)
            return `${p.x},${p.y}`
          })
          return (
            <motion.polygon
              key={di}
              points={pts.join(' ')}
              fill={ds.color ?? 'var(--color-primary)'}
              fillOpacity={0.15}
              stroke={ds.color ?? 'var(--color-primary)'}
              strokeWidth={2}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: di * 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          )
        })}
      </svg>
    </div>
  )
}
