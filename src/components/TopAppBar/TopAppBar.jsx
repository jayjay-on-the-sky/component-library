import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * TopAppBar — M3-style top navigation bar.
 * Variants: small | medium | large | center-aligned
 */

const TopAppBar = forwardRef(function TopAppBar(
  {
    title,
    subtitle,
    variant = 'small', // small | center-aligned | medium | large
    leadingIcon,
    trailingActions = [],
    scrolled = false,
    className,
    ...props
  },
  ref
) {
  const isCentered = variant === 'center-aligned'
  const isMedium = variant === 'medium'
  const isLarge = variant === 'large'
  const isExpanded = isMedium || isLarge

  return (
    <motion.header
      ref={ref}
      animate={{ boxShadow: scrolled ? '0 1px 0 0 var(--color-hairline)' : '0 0 0 0 transparent' }}
      transition={{ duration: 0.2 }}
      className={cn(
        'w-full bg-canvas transition-colors duration-200',
        isExpanded ? 'flex flex-col pb-4' : 'flex items-center h-16 px-4 gap-2',
        className
      )}
      role="banner"
      {...props}
    >
      {/* Top row (always present) */}
      <div className={cn(
        'flex items-center gap-2',
        isExpanded && 'h-16 px-4',
        isCentered && 'justify-between'
      )}>
        {/* Leading icon */}
        {leadingIcon && (
          <IconButton aria-label="Navigation">{leadingIcon}</IconButton>
        )}

        {/* Title — small & center-aligned show here */}
        {!isExpanded && (
          <span className={cn(
            'flex-1 text-lg font-semibold text-ink truncate',
            isCentered && 'text-center'
          )}>
            {title}
          </span>
        )}

        {/* Trailing actions */}
        {trailingActions.length > 0 && (
          <div className="flex items-center gap-1 ml-auto">
            {trailingActions.map((action, i) => (
              <IconButton key={i} aria-label={action.label} onClick={action.onClick}>
                {action.icon}
              </IconButton>
            ))}
          </div>
        )}
      </div>

      {/* Expanded title row (medium / large) */}
      {isExpanded && (
        <div className={cn('px-4', isLarge ? 'pb-2' : '')}>
          <h1 className={cn(
            'font-bold text-ink',
            isLarge ? 'text-3xl' : 'text-2xl'
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-ink-muted mt-0.5">{subtitle}</p>
          )}
        </div>
      )}
    </motion.header>
  )
})

function IconButton({ children, className, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.08 }}
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center',
        'text-ink hover:bg-surface-strong transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default TopAppBar
