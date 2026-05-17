import React from 'react'
import { motion } from 'framer-motion'
import { X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const NotificationItem = React.forwardRef(({
  title,
  description,
  timestamp,
  avatar,
  icon,
  iconBg = 'bg-primary/10',
  iconColor = 'text-primary',
  unread = false,
  onDismiss,
  onClick,
  className,
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8, height: 0 }}
      className={cn(
        'flex items-start gap-3 px-4 py-3 hover:bg-surface transition-colors cursor-pointer relative',
        unread && 'bg-primary/5',
        className
      )}
      onClick={onClick}
      role="listitem"
      {...props}
    >
      {/* Unread dot */}
      {unread && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
      )}

      {/* Avatar or icon */}
      <div className={cn('w-9 h-9 rounded-full shrink-0 flex items-center justify-center', avatar ? '' : cn(iconBg))}>
        {avatar ? (
          <img src={avatar} alt="" className="w-full h-full rounded-full object-cover" />
        ) : icon ? (
          <span className={iconColor}>{icon}</span>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-6">
        {title && <p className="text-sm font-medium text-ink leading-snug">{title}</p>}
        {description && <p className="text-xs text-body mt-0.5 line-clamp-2">{description}</p>}
        {timestamp && <p className="text-xs text-muted mt-1">{timestamp}</p>}
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={e => { e.stopPropagation(); onDismiss() }}
          className="absolute right-4 top-3 text-muted hover:text-ink transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Dismiss"
        >
          <X size={13} />
        </button>
      )}
    </motion.div>
  )
})

NotificationItem.displayName = 'NotificationItem'
export default NotificationItem
