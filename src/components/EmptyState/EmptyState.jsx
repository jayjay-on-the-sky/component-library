import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const EmptyState = React.forwardRef(({
  icon,
  title = 'Nothing here yet',
  description,
  action,
  size = 'md',
  className,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: { wrapper: 'py-8', icon: 'w-10 h-10', title: 'text-sm', desc: 'text-xs' },
    md: { wrapper: 'py-12', icon: 'w-14 h-14', title: 'text-base', desc: 'text-sm' },
    lg: { wrapper: 'py-20', icon: 'w-20 h-20', title: 'text-xl', desc: 'text-base' },
  }
  const s = sizeClasses[size]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex flex-col items-center text-center', s.wrapper, className)}
      {...props}
    >
      {icon && (
        <div className={cn(s.icon, 'flex items-center justify-center rounded-[var(--radius-xl)] bg-surface text-muted mb-4')}>
          {icon}
        </div>
      )}
      <h3 className={cn('font-semibold text-ink mb-1', s.title)}>{title}</h3>
      {description && (
        <p className={cn('text-muted max-w-sm', s.desc)}>{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  )
})

EmptyState.displayName = 'EmptyState'
export default EmptyState
