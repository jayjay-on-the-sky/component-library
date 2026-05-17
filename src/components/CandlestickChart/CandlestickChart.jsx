import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Mon', open: 100, high: 118, low: 95, close: 112 },
  { label: 'Tue', open: 112, high: 125, low: 108, close: 106 },
  { label: 'Wed', open: 106, high: 115, low: 98, close: 119 },
  { label: 'Thu', open: 119, high: 130, low: 114, close: 128 },
  { label: 'Fri', open: 128, high: 135, low: 120, close: 122 },
  { label: 'Mon', open: 122, high: 132, low: 110, close: 115 },
  { label: 'Tue', open: 115, high: 128, low: 112, close: 126 },
  { label: 'Wed', open: 126, high: 140, low: 122, close: 138 },
]

export default function CandlestickChart({
  data = DEFAULT_DATA,
  height = 240,
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const W = 500, H = height
  const padL = 36, padR = 16, padT = 16, padB = 36
  const chartW = W - padL - padR, chartH = H - padT - padB

  const allVals = data.flatMap(d => [d.high, d.low])
  const maxV = Math.max(...allVals) * 1.02
  const minV = Math.min(...allVals) * 0.98

  function py(v) { return padT + chartH - ((v - minV) / (maxV - minV)) * chartH }

  const barW = (chartW / data.length) * 0.5
  const gap = chartW / data.length

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img" aria-label="Candlestick chart"
        onMouseLeave={() => setTooltip(null)}>

        {[0.25, 0.5, 0.75, 1].map(t => {
          const y = padT + (1 - t) * chartH
          const val = Math.round(minV + t * (maxV - minV))
          return (
            <g key={t}>
              <line x1={padL} y1={y} x2={W - padR} y2={y}
                stroke="var(--color-hairline)" strokeWidth={0.5} strokeDasharray="4 4" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="var(--color-muted)">{val}</text>
            </g>
          )
        })}

        {data.map((d, i) => {
          const x = padL + i * gap + (gap - barW) / 2
          const cx = x + barW / 2
          const isUp = d.close >= d.open
          const color = isUp ? 'var(--color-success)' : 'var(--color-error)'
          const bodyTop = py(Math.max(d.open, d.close))
          const bodyBot = py(Math.min(d.open, d.close))
          const bodyH = Math.max(bodyBot - bodyTop, 1)

          return (
            <g key={i} onMouseEnter={() => setTooltip({ ...d, cx, bodyTop })} style={{ cursor: 'pointer' }}>
              {/* Wick */}
              <motion.line
                x1={cx} y1={py(d.high)} x2={cx} y2={py(d.low)}
                stroke={color} strokeWidth={1.5}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{ transformOrigin: `${cx}px ${py(d.high)}px` }}
              />
              {/* Body */}
              <motion.rect
                x={x} y={bodyTop} width={barW} height={bodyH}
                rx={1.5} fill={color} fillOpacity={0.85}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: i * 0.06 + 0.1 }}
                style={{ transformOrigin: `0px ${bodyTop}px` }}
              />

              <text x={cx} y={padT + chartH + 14} textAnchor="middle"
                fontSize={8} fill="var(--color-muted)">{d.label}</text>
            </g>
          )
        })}
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute px-2.5 py-1.5 rounded-lg bg-ink text-canvas text-xs font-medium shadow-xl z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.cx / W) * 100}%`,
            top: `${((tooltip.bodyTop - 8) / H) * 100}%`,
          }}
        >
          <div>O: {tooltip.open} H: {tooltip.high}</div>
          <div>L: {tooltip.low} C: {tooltip.close}</div>
        </div>
      )}
    </div>
  )
}
