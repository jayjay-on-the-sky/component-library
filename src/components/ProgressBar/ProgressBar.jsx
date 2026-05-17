import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

// Linear progress bar
const ProgressBar = React.forwardRef(({
  value = 0,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  color = 'primary',
  indeterminate = false,
  className,
  ...props
}, ref) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const heights = { xs: 'h-1', sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
  const colorClass = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  }[color] || 'bg-primary'

  return (
    <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-ink">{label}</span>}
          {showValue && !indeterminate && (
            <span className="text-xs text-muted">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemax={max}
        aria-label={label}
        className={cn('w-full rounded-full bg-surface overflow-hidden', heights[size])}
      >
        {indeterminate ? (
          <motion.div
            className={cn('h-full rounded-full w-1/3', colorClass)}
            animate={{ x: ['−100%', '400%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <motion.div
            className={cn('h-full rounded-full', colorClass)}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </div>
    </div>
  )
})

// Circular progress
export const CircularProgress = React.forwardRef(({
  value = 0,
  max = 100,
  size = 48,
  strokeWidth = 4,
  color = 'primary',
  label,
  showValue = true,
  className,
  ...props
}, ref) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)

  const colorVar = {
    primary: 'var(--color-primary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
  }[color] || 'var(--color-primary)'

  return (
    <div ref={ref} className={cn('inline-flex items-center justify-center relative', className)} {...props}>
      <svg width={size} height={size} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colorVar}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {showValue && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-ink">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  )
})

CircularProgress.displayName = 'CircularProgress'
ProgressBar.displayName = 'ProgressBar'
export default ProgressBar
