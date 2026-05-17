import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from '../../lib/icons'
import { cn } from '../../lib/utils'

const Rating = React.forwardRef(({
  value = 0,
  onChange,
  max = 5,
  size = 20,
  readOnly = false,
  showLabel = false,
  className,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(null)

  const display = hovered !== null ? hovered : value

  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      role={readOnly ? 'img' : 'group'}
      aria-label={`Rating: ${value} out of ${max}`}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={readOnly}
          whileTap={readOnly ? {} : { scale: 0.85 }}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(null)}
          onClick={() => !readOnly && onChange?.(star === value ? 0 : star)}
          aria-label={`${star} star`}
          className={cn('transition-colors disabled:cursor-default', !readOnly && 'cursor-pointer hover:scale-110')}
          style={{ color: star <= display ? 'var(--color-warning)' : 'var(--color-hairline)' }}
        >
          <Star
            size={size}
            fill={star <= display ? 'currentColor' : 'none'}
            strokeWidth={1.7}
          />
        </motion.button>
      ))}
      {showLabel && (
        <span className="ml-2 text-sm text-ink-muted">
          {value > 0 ? `${value} / ${max}` : 'Not rated'}
        </span>
      )}
    </div>
  )
})

Rating.displayName = 'Rating'
export default Rating
