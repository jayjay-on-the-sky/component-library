import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const statusColors = {
  online: 'var(--color-success)',
  offline: 'var(--color-muted)',
  busy: 'var(--color-error)',
  away: 'var(--color-warning)',
}

const PulseRing = forwardRef(function PulseRing({
  status = 'online',
  size = 12,
  label,
  showLabel = true,
  rings = 2,
  className,
  ...props
}, ref) {
  const color = statusColors[status] ?? statusColors.online

  return (
    <div
      ref={ref}
      className={cn('inline-flex items-center gap-2', className)}
      role="status"
      aria-label={label ?? status}
      {...props}
    >
      <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
        {/* Pulse rings */}
        {Array.from({ length: rings }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: size, height: size, border: `2px solid ${color}` }}
            animate={{
              scale: [1, 2.5 + i * 0.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
          />
        ))}
        {/* Core dot */}
        <div
          className="relative rounded-full"
          style={{ width: size, height: size, background: color }}
        />
      </div>

      {showLabel && (
        <span className="text-sm font-medium capitalize" style={{ color }}>
          {label ?? status}
        </span>
      )}
    </div>
  )
})

export default PulseRing
