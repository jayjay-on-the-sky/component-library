import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = Array.from({ length: 30 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  label: `Point ${i + 1}`,
}))

export default function ScatterPlot({
  data = DEFAULT_DATA,
  height = 240,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const W = 400, H = height
  const padL = 36, padR = 16, padT = 16, padB = 36
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const xs = data.map(d => d.x), ys = data.map(d => d.y)
  const xMin = Math.min(...xs), xMax = Math.max(...xs)
  const yMin = Math.min(...ys), yMax = Math.max(...ys)

  function px(x) { return padL + ((x - xMin) / (xMax - xMin || 1)) * chartW }
  function py(y) { return padT + chartH - ((y - yMin) / (yMax - yMin || 1)) * chartH }

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img" aria-label="Scatter plot"
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

        {/* Axes */}
        <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH}
          stroke="var(--color-hairline)" strokeWidth={1} />
        <line x1={padL} y1={padT} x2={padL} y2={padT + chartH}
          stroke="var(--color-hairline)" strokeWidth={1} />

        {/* Axis labels */}
        <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="var(--color-muted)">{xLabel}</text>
        <text x={10} y={padT + chartH / 2} textAnchor="middle" fontSize={9} fill="var(--color-muted)"
          transform={`rotate(-90, 10, ${padT + chartH / 2})`}>{yLabel}</text>

        {/* Dots */}
        {data.map((d, i) => (
          <motion.circle
            key={i}
            cx={px(d.x)} cy={py(d.y)} r={tooltip?.index === i ? 7 : 5}
            fill="var(--color-primary)"
            fillOpacity={0.7}
            stroke="var(--color-canvas)"
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setTooltip({ index: i, ...d, px: px(d.x), py: py(d.y) })}
          />
        ))}
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute px-2.5 py-1.5 rounded-lg bg-ink text-canvas text-xs font-medium shadow-xl z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.px / W) * 100}%`,
            top: `${((tooltip.py - 10) / H) * 100}%`,
          }}
        >
          {tooltip.label ?? `(${tooltip.x.toFixed(1)}, ${tooltip.y.toFixed(1)})`}
        </div>
      )}
    </div>
  )
}
