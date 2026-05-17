import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const ActivityFeed = React.forwardRef(({ items = [], className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex flex-col', className)} role="feed" {...props}>
      {items.map((item, i) => (
        <motion.div
          key={item.id ?? i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className="flex gap-3 py-3 relative"
        >
          {/* Timeline line */}
          {i < items.length - 1 && (
            <div className="absolute left-4 top-10 bottom-0 w-px bg-hairline" />
          )}

          {/* Avatar/Icon */}
          <div className={cn(
            'w-8 h-8 rounded-full shrink-0 flex items-center justify-center z-10',
            item.iconBg || 'bg-surface'
          )}>
            {item.avatar ? (
              <img src={item.avatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : item.icon ? (
              <span className={cn('text-muted', item.iconColor)}>{item.icon}</span>
            ) : (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm text-ink leading-snug">
              {item.content}
            </p>
            {item.meta && (
              <p className="text-xs text-muted mt-0.5">{item.meta}</p>
            )}
            {item.timestamp && (
              <p className="text-xs text-muted mt-1">{item.timestamp}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
})

ActivityFeed.displayName = 'ActivityFeed'
export default ActivityFeed
