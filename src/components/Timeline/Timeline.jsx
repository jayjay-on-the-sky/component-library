import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const TimelineItem = ({ icon, title, description, timestamp, color = 'primary', last = false }) => {
  const dotColor = {
    primary: 'bg-primary border-primary/30',
    success: 'bg-success border-success/30',
    warning: 'bg-warning border-warning/30',
    error: 'bg-error border-error/30',
    muted: 'bg-muted border-muted/30',
  }[color] || 'bg-primary border-primary/30'

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4"
    >
      {/* Line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={cn('w-3 h-3 rounded-full border-4 z-10 shrink-0 mt-1', dotColor)} />
        {!last && <div className="w-px flex-1 bg-hairline mt-1" />}
      </div>

      {/* Content */}
      <div className={cn('flex-1 pb-6', last && 'pb-0')}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-muted">{icon}</span>}
            <h4 className="text-sm font-semibold text-ink">{title}</h4>
          </div>
          {timestamp && <span className="text-xs text-muted shrink-0">{timestamp}</span>}
        </div>
        {description && (
          <p className="text-sm text-body mt-1 leading-relaxed">{description}</p>
        )}
      </div>
    </motion.div>
  )
}

const Timeline = React.forwardRef(({ items = [], className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex flex-col', className)} role="list" {...props}>
      {items.map((item, i) => (
        <TimelineItem key={item.id ?? i} {...item} last={i === items.length - 1} />
      ))}
    </div>
  )
})

Timeline.displayName = 'Timeline'
export default Timeline
