import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Revenue', value: 500, type: 'start' },
  { label: 'COGS', value: -180 },
  { label: 'Gross Profit', value: 320, type: 'total' },
  { label: 'OpEx', value: -120 },
  { label: 'Marketing', value: -40 },
  { label: 'R&D', value: -30 },
  { label: 'Net Income', value: 130, type: 'total' },
]

export default function WaterfallChart({
  data = DEFAULT_DATA,
  height = 240,
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const W = 520, H = height
  const padL = 36, padR = 16, padT = 20, padB = 36
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  // Calculate running totals
  let running = 0
  const bars = data.map((d, i) => {
    let start, end, bar
    if (d.type === 'start' || d.type === 'total') {
      start = 0
      end = d.type === 'total' ? running + d.value : d.value
      if (d.type === 'start') running = d.value
    } else {
      start = running
      end = running + d.value
      running += d.value
    }
    return { ...d, start, end, index: i }
  })

  const allVals = bars.flatMap(b => [b.start, b.end])
  const maxV = Math.max(...allVals) * 1.1
  const minV = Math.min(...allVals, 0)
  const range = maxV - minV

  function py(v) { return padT + chartH - ((v - minV) / range) * chartH }

  const barW = (chartW / data.length) * 0.55
  const gap = chartW / data.length

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img" aria-label="Waterfall chart"
        onMouseLeave={() => setTooltip(null)}>

        {/* Baseline */}
        <line x1={padL} y1={py(0)} x2={W - padR} y2={py(0)}
          stroke="var(--color-hairline)" strokeWidth={1} />

        {bars.map((b, i) => {
          const x = padL + i * gap + (gap - barW) / 2
          const y1 = py(Math.max(b.start, b.end))
          const y2 = py(Math.min(b.start, b.end))
          const barH = Math.abs(y2 - y1) || 2
          const isTotal = b.type === 'start' || b.type === 'total'
          const isPos = b.end >= b.start
          const color = isTotal ? 'var(--color-primary)'
            : isPos ? 'var(--color-success)' : 'var(--color-error)'

          return (
            <g key={i}>
              {/* Connector */}
              {i > 0 && !isTotal && (
                <line
                  x1={padL + (i - 1) * gap + (gap - barW) / 2 + barW}
                  y1={py(bars[i - 1].end)}
                  x2={x}
                  y2={py(bars[i - 1].end)}
                  stroke="var(--color-hairline)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
              )}

              <motion.rect
                x={x} y={y1} width={barW} height={barH}
                rx={3}
                fill={color}
                fillOpacity={0.85}
                initial={{ scaleY: 0, originY: y2 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ cursor: 'pointer', transformOrigin: `0px ${y2}px` }}
                onMouseEnter={() => setTooltip({ ...b, bx: x + barW / 2, by: y1 })}
              />

              <text x={x + barW / 2} y={padT + chartH + 14} textAnchor="middle"
                fontSize={8} fill="var(--color-muted)">{b.label}</text>
            </g>
          )
        })}
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute px-2.5 py-1.5 rounded-lg bg-ink text-canvas text-xs font-medium shadow-xl z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.bx / W) * 100}%`,
            top: `${((tooltip.by - 8) / H) * 100}%`,
          }}
        >
          {tooltip.label}: <span className="font-bold">{tooltip.value > 0 ? '+' : ''}{tooltip.value}</span>
        </div>
      )}
    </div>
  )
}
