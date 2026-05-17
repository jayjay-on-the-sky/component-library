import { useState, useRef, useEffect, useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Jan', value: 20 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 38 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 52 },
  { label: 'Jun', value: 75 },
  { label: 'Jul', value: 88 },
  { label: 'Aug', value: 71 },
]

export default function AreaChart({
  data = DEFAULT_DATA,
  height = 200,
  showGrid = true,
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const [ready, setReady] = useState(false)
  const gradId = useId()

  const W = 500, H = height
  const padL = 32, padR = 16, padT = 16, padB = 32
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const max = Math.max(...data.map(d => d.value)) * 1.1
  const min = 0

  const points = data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * chartW,
    y: padT + chartH - ((d.value - min) / (max - min)) * chartH,
    ...d,
  }))

  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')
  const areaPath = linePath + ` L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`

  useEffect(() => { setReady(true) }, [])

  const yTicks = 4
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((max / yTicks) * (yTicks - i))
  )

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img" aria-label="Area chart"
        onMouseLeave={() => setTooltip(null)}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {showGrid && ticks.map((tick, i) => {
          const y = padT + (i / yTicks) * chartH
          return (
            <g key={i}>
              <line x1={padL} y1={y} x2={W - padR} y2={y}
                stroke="var(--color-hairline)" strokeWidth={0.5} strokeDasharray="4 4" />
              <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="var(--color-muted)">{tick}</text>
            </g>
          )
        })}

        {points.map((p, i) => (
          <text key={i} x={p.x} y={H - 4} textAnchor="middle" fontSize={9} fill="var(--color-muted)">{p.label}</text>
        ))}

        {ready && (
          <>
            <motion.path
              d={areaPath}
              fill={`url(#${gradId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </>
        )}

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x} cy={p.y}
            r={tooltip?.index === i ? 6 : 4}
            fill="var(--color-canvas)"
            stroke="var(--color-primary)"
            strokeWidth={2}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setTooltip({ index: i, ...p })}
          />
        ))}
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute px-2.5 py-1.5 rounded-lg bg-ink text-canvas text-xs font-medium shadow-xl z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.x / W) * 100}%`,
            top: `${((tooltip.y - 10) / H) * 100}%`,
          }}
        >
          {tooltip.label}: <span className="font-bold">{tooltip.value}</span>
        </div>
      )}
    </div>
  )
}
