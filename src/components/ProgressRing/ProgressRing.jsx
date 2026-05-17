import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function ProgressRing({
  value = 72,
  max = 100,
  size = 120,
  thickness = 10,
  label,
  showPercent = true,
  color,
  className,
}) {
  const r = (size - thickness) / 2
  const circumference = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const cx = size / 2, cy = size / 2

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="progressbar"
          aria-valuenow={value} aria-valuemax={max}>
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="var(--color-surface)"
            strokeWidth={thickness}
          />
          {/* Progress */}
          <motion.circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color ?? 'var(--color-primary)'}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            transform={`rotate(-90 ${cx} ${cy})`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - pct) }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercent && (
            <div className="text-xl font-bold text-ink">{Math.round(pct * 100)}%</div>
          )}
          {label && <div className="text-[10px] text-muted">{label}</div>}
        </div>
      </div>
    </div>
  )
}
