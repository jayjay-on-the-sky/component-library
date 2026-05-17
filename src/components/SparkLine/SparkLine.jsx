import { cn } from '../../lib/utils'
import { motion } from 'framer-motion'

const DEFAULT_DATA = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35]

export default function SparkLine({
  data = DEFAULT_DATA,
  width = 80,
  height = 28,
  positive,
  className,
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 2) - 1,
  }))

  const linePath = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')

  const trend = data[data.length - 1] >= data[0]
  const isPos = positive ?? trend
  const color = isPos ? 'var(--color-success)' : 'var(--color-error)'

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('shrink-0', className)}
      aria-label="Sparkline"
      role="img"
    >
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r={2.5}
        fill={color}
      />
    </svg>
  )
}
