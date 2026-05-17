import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const trackColors = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error:   'bg-error',
}

export default function Progress({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  label,
  showValue = false,
  animated = true,
  className,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' }

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs font-medium text-ink">{label}</span>}
          {showValue && (
            <span className="text-xs text-muted tabular-nums">{Math.round(pct)}%</span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={cn('w-full bg-surface-strong rounded-full overflow-hidden', heights[size])}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={animated ? { duration: 0.6, ease: [0.32, 0, 0.67, 0] } : { duration: 0 }}
          className={cn('h-full rounded-full', trackColors[variant])}
        />
      </div>
    </div>
  )
}

export function ProgressDemo() {
  return (
    <div className="w-64 space-y-4">
      <Progress value={72} label="Upload progress" showValue />
      <Progress value={45} variant="success" label="Completed" showValue size="sm" />
      <Progress value={90} variant="warning" label="Storage used" showValue size="lg" />
      <Progress value={15} variant="error" label="Budget remaining" showValue />
    </div>
  )
}
