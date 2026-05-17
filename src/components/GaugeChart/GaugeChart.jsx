import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const ZONES = [
  { from: 0, to: 33, color: 'var(--color-success)' },
  { from: 33, to: 66, color: 'var(--color-warning)' },
  { from: 66, to: 100, color: 'var(--color-error)' },
]

function arcD(cx, cy, r, startDeg, endDeg) {
  function polar(deg) {
    const rad = ((deg - 180) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  const s = polar(startDeg), e = polar(endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

export default function GaugeChart({
  value = 62,
  max = 100,
  size = 200,
  thickness = 18,
  label = 'Score',
  zones = ZONES,
  className,
}) {
  const cx = size / 2, cy = size * 0.62
  const r = size / 2 - thickness - 4
  const pct = Math.min(value / max, 1)

  // Needle angle: -90deg = 0%, +90deg = 100%
  const needleAngle = -90 + pct * 180

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`} role="img" aria-label={`Gauge: ${value}`}>
        {/* Zone arcs */}
        {zones.map((z, i) => {
          const startDeg = z.from * 1.8
          const endDeg = z.to * 1.8
          return (
            <path
              key={i}
              d={arcD(cx, cy, r, startDeg, endDeg)}
              fill="none"
              stroke={z.color}
              strokeWidth={thickness}
              strokeLinecap="butt"
              opacity={0.25}
            />
          )
        })}

        {/* Value arc */}
        <motion.path
          d={arcD(cx, cy, r, 0, 1)}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={thickness}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: pct }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: needleAngle }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <line x1={cx} y1={cy} x2={cx} y2={cy - r + thickness / 2}
            stroke="var(--color-ink)" strokeWidth={2} strokeLinecap="round" />
        </motion.g>

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={5} fill="var(--color-ink)" />

        {/* Value text */}
        <text x={cx} y={cy + 20} textAnchor="middle" fontSize={22} fontWeight="700" fill="var(--color-ink)">
          {value}
        </text>
        <text x={cx} y={cy + 34} textAnchor="middle" fontSize={10} fill="var(--color-muted)">{label}</text>
      </svg>
    </div>
  )
}
