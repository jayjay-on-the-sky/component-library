import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 52 },
  { label: 'Mar', value: 41 },
  { label: 'Apr', value: 67 },
  { label: 'May', value: 55 },
  { label: 'Jun', value: 78 },
  { label: 'Jul', value: 91 },
  { label: 'Aug', value: 82 },
]

function buildPath(points) {
  if (points.length === 0) return ''
  return points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ')
}

export default function LineChart({
  data = DEFAULT_DATA,
  height = 200,
  showDots = true,
  showGrid = true,
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const [pathLength, setPathLength] = useState(0)
  const pathRef = useRef(null)

  const W = 500, H = height
  const padL = 32, padR = 16, padT = 16, padB = 32
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const max = Math.max(...data.map(d => d.value)) * 1.15
  const min = Math.min(...data.map(d => d.value)) * 0.85

  const points = data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * chartW,
    y: padT + chartH - ((d.value - min) / (max - min)) * chartH,
    ...d,
  }))

  const linePath = buildPath(points)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [linePath])

  const yTicks = 4
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round(min + ((max - min) / yTicks) * (yTicks - i))
  )

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img" aria-label="Line chart"
        onMouseLeave={() => setTooltip(null)}>

        {/* Grid */}
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

        {/* X labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={H - 4} textAnchor="middle" fontSize={9} fill="var(--color-muted)">{p.label}</text>
        ))}

        {/* Line */}
        {pathLength > 0 && (
          <motion.path
            ref={pathRef}
            d={linePath}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDashoffset: pathLength, strokeDasharray: pathLength }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        )}
        {/* Hidden path for length measurement */}
        {pathLength === 0 && (
          <path ref={pathRef} d={linePath} fill="none" stroke="transparent" strokeWidth={2} />
        )}

        {/* Dots */}
        {showDots && points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r={tooltip?.index === i ? 6 : 4}
            fill="var(--color-canvas)"
            stroke="var(--color-primary)"
            strokeWidth={2}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.0 + i * 0.04 }}
            onMouseEnter={() => setTooltip({ index: i, ...p })}
            style={{ cursor: 'pointer' }}
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
