import { forwardRef, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Slider — accessible range slider with animated thumb, value tooltip, and track fill.
 */

const Slider = forwardRef(function Slider(
  {
    value = 50,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    showValue = true,
    onChange,
    className,
    ...props
  },
  ref
) {
  const [dragging, setDragging] = useState(false)
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-ink">{label}</span>}
          {showValue && (
            <span className="text-sm tabular-nums text-ink-muted">{value}</span>
          )}
        </div>
      )}

      <div className="relative flex items-center h-5 w-full">
        {/* Track */}
        <div
          className={cn(
            'absolute inset-x-0 h-1.5 rounded-full bg-surface-strong',
            disabled && 'opacity-40'
          )}
        >
          {/* Fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Native range input (invisible, handles a11y + keyboard) */}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={e => onChange?.(Number(e.target.value))}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onBlur={() => setDragging(false)}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          style={{ zIndex: 2 }}
          {...props}
        />

        {/* Animated thumb */}
        <motion.div
          animate={{ scale: dragging ? 1.3 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={cn(
            'absolute w-5 h-5 rounded-full bg-primary shadow-md border-2 border-canvas',
            'ring-0 focus-visible:ring-2 ring-primary/30',
            'pointer-events-none',
            disabled && 'opacity-40'
          )}
          style={{ left: `calc(${pct}% - 10px)` }}
          aria-hidden
        />
      </div>

      {/* Min / Max labels */}
      <div className="flex justify-between text-[11px] text-ink-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
})

export default Slider
