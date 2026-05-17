import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * BottomNav — M3 Navigation Bar for mobile.
 * Items: [{ label, icon, value, badge }]
 */

const BottomNav = forwardRef(function BottomNav(
  {
    items = [],
    value,
    onChange,
    className,
    ...props
  },
  ref
) {
  return (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Bottom navigation"
      className={cn(
        'flex items-center justify-around h-20 bg-canvas border-t border-hairline px-2',
        'safe-area-pb',
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={active}
            aria-label={item.label}
            onClick={() => onChange?.(item.value)}
            className={cn(
              'relative flex flex-col items-center gap-1 flex-1 py-2 rounded-xl',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
              'transition-colors duration-150'
            )}
          >
            {/* Indicator pill */}
            <AnimatePresence>
              {active && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 rounded-full bg-primary/12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </AnimatePresence>

            {/* Icon + badge */}
            <div className="relative z-10 flex items-center justify-center w-6 h-6">
              <span className={cn(
                'transition-colors duration-150',
                active ? 'text-primary' : 'text-ink-muted'
              )}>
                {item.icon}
              </span>
              {item.badge != null && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-error text-canvas text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span className={cn(
              'text-[11px] font-medium transition-colors duration-150',
              active ? 'text-primary' : 'text-ink-muted'
            )}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
})

export default BottomNav
