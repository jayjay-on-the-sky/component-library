import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Jan', value: 42 },
  { label: 'Feb', value: 68 },
  { label: 'Mar', value: 55 },
  { label: 'Apr', value: 81 },
  { label: 'May', value: 73 },
  { label: 'Jun', value: 90 },
  { label: 'Jul', value: 61 },
]

export default function BarChart({
  data = DEFAULT_DATA,
  height = 240,
  showGrid = true,
  showLabels = true,
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const svgRef = useRef(null)

  const max = Math.max(...data.map(d => d.value)) * 1.1
  const W = 500
  const H = height
  const padL = 32, padR = 16, padT = 16, padB = 36
  const chartW = W - padL - padR
  const chartH = H - padT - padB
  const barW = (chartW / data.length) * 0.55
  const gap = chartW / data.length

  const yTicks = 4
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((max / yTicks) * (yTicks - i))
  )

  return (
    <div className={cn('relative w-full', className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        aria-label="Bar chart"
        role="img"
        style={{ height }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid lines */}
        {showGrid && ticks.map((tick, i) => {
          const y = padT + (i / yTicks) * chartH
          return (
            <g key={i}>
              <line
                x1={padL} y1={y} x2={W - padR} y2={y}
                stroke="var(--color-hairline)"
                strokeWidth={0.5}
                strokeDasharray="4 4"
              />
              <text x={padL - 6} y={y + 4} textAnchor="end"
                fontSize={9} fill="var(--color-muted)">{tick}</text>
            </g>
          )
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = (d.value / max) * chartH
          const x = padL + i * gap + (gap - barW) / 2
          const y = padT + chartH - barH
          const isHovered = tooltip?.index === i

          return (
            <g key={i}>
              <motion.rect
                x={x} y={padT + chartH} width={barW} height={0}
                rx={4}
                fill={isHovered ? 'var(--color-primary)' : 'var(--color-primary)'}
                fillOpacity={isHovered ? 1 : 0.75}
                animate={{ y, height: barH }}
                initial={{ y: padT + chartH, height: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={e => {
                  const rect = svgRef.current?.getBoundingClientRect()
                  setTooltip({ index: i, label: d.label, value: d.value, x: x + barW / 2, y })
                }}
                style={{ cursor: 'pointer' }}
              />
              {showLabels && (
                <text
                  x={x + barW / 2} y={padT + chartH + 14}
                  textAnchor="middle" fontSize={10} fill="var(--color-muted)"
                >{d.label}</text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute px-2.5 py-1.5 rounded-lg bg-ink text-canvas text-xs font-medium shadow-xl z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.x / 500) * 100}%`,
            top: `${((tooltip.y - 8) / height) * 100}%`,
          }}
        >
          {tooltip.label}: <span className="font-bold">{tooltip.value}</span>
        </div>
      )}
    </div>
  )
}
