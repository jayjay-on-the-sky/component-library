import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-surface text-ink border-hairline',
  primary: 'bg-primary-muted text-primary border-transparent',
  success: 'bg-success/10 text-success border-transparent',
  warning: 'bg-warning/10 text-warning border-transparent',
  error:   'bg-error/10 text-error border-transparent',
}

export default function Badge({
  children,
  variant = 'default',
  dot = false,
  live = false,
  count,
  className,
}) {
  return (
    <motion.span
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-[var(--radius-pill)] border',
        variants[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            live && 'animate-pulse',
            {
              default: 'bg-muted',
              primary: 'bg-primary',
              success: 'bg-success',
              warning: 'bg-warning',
              error:   'bg-error',
            }[variant]
          )}
        />
      )}
      {children}
      {count !== undefined && (
        <span className="ml-0.5 bg-current/10 px-1.5 py-0 rounded-full text-[10px] font-semibold">
          {count}
        </span>
      )}
    </motion.span>
  )
}
