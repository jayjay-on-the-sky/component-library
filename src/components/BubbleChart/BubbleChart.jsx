import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'React', x: 72, y: 85, size: 42 },
  { label: 'Vue', x: 55, y: 70, size: 28 },
  { label: 'Angular', x: 40, y: 62, size: 35 },
  { label: 'Svelte', x: 80, y: 78, size: 18 },
  { label: 'Solid', x: 65, y: 55, size: 12 },
  { label: 'Next.js', x: 85, y: 90, size: 38 },
  { label: 'Nuxt', x: 50, y: 80, size: 20 },
]

export default function BubbleChart({
  data = DEFAULT_DATA,
  height = 240,
  xLabel = 'Popularity',
  yLabel = 'Satisfaction',
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const W = 400, H = height
  const padL = 36, padR = 16, padT = 16, padB = 36
  const chartW = W - padL - padR, chartH = H - padT - padB

  const maxSize = Math.max(...data.map(d => d.size))
  const maxR = 28

  function px(x) { return padL + (x / 100) * chartW }
  function py(y) { return padT + chartH - (y / 100) * chartH }
  function pr(s) { return (s / maxSize) * maxR + 4 }

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img" aria-label="Bubble chart"
        onMouseLeave={() => setTooltip(null)}>

        {/* Grid */}
        {[0.25, 0.5, 0.75, 1].map(t => (
          <g key={t}>
            <line x1={padL} y1={padT + (1 - t) * chartH} x2={W - padR} y2={padT + (1 - t) * chartH}
              stroke="var(--color-hairline)" strokeWidth={0.5} strokeDasharray="4 4" />
            <line x1={padL + t * chartW} y1={padT} x2={padL + t * chartW} y2={padT + chartH}
              stroke="var(--color-hairline)" strokeWidth={0.5} strokeDasharray="4 4" />
          </g>
        ))}

        <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="var(--color-hairline)" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="var(--color-hairline)" />

        <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="var(--color-muted)">{xLabel}</text>
        <text x={10} y={padT + chartH / 2} textAnchor="middle" fontSize={9} fill="var(--color-muted)"
          transform={`rotate(-90, 10, ${padT + chartH / 2})`}>{yLabel}</text>

        {data.map((d, i) => (
          <motion.circle
            key={i}
            cx={px(d.x)} cy={py(d.y)} r={pr(d.size)}
            fill="var(--color-primary)"
            fillOpacity={tooltip?.label === d.label ? 0.9 : 0.5}
            stroke="var(--color-primary)"
            strokeWidth={1.5}
            strokeOpacity={0.7}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: pr(d.size), opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setTooltip({ ...d, bx: px(d.x), by: py(d.y) })}
          />
        ))}

        {data.map((d, i) => (
          <text key={i} x={px(d.x)} y={py(d.y) + 3}
            textAnchor="middle" fontSize={8} fill="var(--color-ink)" fontWeight="600" pointerEvents="none">
            {d.label}
          </text>
        ))}
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute px-2.5 py-1.5 rounded-lg bg-ink text-canvas text-xs font-medium shadow-xl z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.bx / W) * 100}%`,
            top: `${((tooltip.by - pr(tooltip.size) - 8) / H) * 100}%`,
          }}
        >
          {tooltip.label} — size: {tooltip.size}
        </div>
      )}
    </div>
  )
}
