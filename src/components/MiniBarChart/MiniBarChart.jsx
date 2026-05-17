import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [3, 7, 5, 9, 6, 8, 4, 10, 7, 6, 9, 11]

export default function MiniBarChart({
  data = DEFAULT_DATA,
  width = 80,
  height = 28,
  color,
  className,
}) {
  const max = Math.max(...data)
  const barW = (width / data.length) * 0.65
  const gap = width / data.length

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('shrink-0', className)}
      role="img"
      aria-label="Mini bar chart"
    >
      {data.map((v, i) => {
        const barH = (v / max) * height
        const x = i * gap + (gap - barW) / 2
        return (
          <motion.rect
            key={i}
            x={x} y={height}
            width={barW} height={0}
            rx={1}
            fill={color ?? 'var(--color-primary)'}
            fillOpacity={0.8}
            animate={{ y: height - barH, height: barH }}
            initial={{ y: height, height: 0 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          />
        )
      })}
    </svg>
  )
}
