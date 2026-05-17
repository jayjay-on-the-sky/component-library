import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * FAB — Floating Action Button (M3 style).
 * Sizes: sm | md | lg (extended shows label alongside icon)
 */

const FAB = forwardRef(function FAB(
  {
    icon,
    label,
    size = 'md',
    extended = false,
    variant = 'primary', // primary | surface
    disabled = false,
    onClick,
    className,
    ...props
  },
  ref
) {
  const sizes = {
    sm: extended ? 'h-10 px-4 gap-2 text-sm rounded-xl' : 'w-10 h-10 rounded-xl',
    md: extended ? 'h-14 px-4 gap-3 text-sm rounded-2xl' : 'w-14 h-14 rounded-2xl',
    lg: extended ? 'h-16 px-6 gap-3 text-base rounded-2xl' : 'w-16 h-16 rounded-2xl',
  }

  const variants = {
    primary: 'bg-primary text-on-primary shadow-lg hover:shadow-xl',
    surface: 'bg-surface text-ink shadow-lg hover:shadow-xl border border-hairline',
  }

  const iconSizes = { sm: 18, md: 24, lg: 28 }

  return (
    <motion.button
      ref={ref}
      aria-label={label || 'Floating action button'}
      aria-disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.94 }}
      whileHover={disabled ? {} : { y: -2 }}
      transition={{ duration: 0.1 }}
      onClick={disabled ? undefined : onClick}
      className={cn(
        'inline-flex items-center justify-center cursor-pointer select-none transition-shadow duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        sizes[size],
        variants[variant],
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className="flex items-center justify-center shrink-0"
          style={{ width: iconSizes[size], height: iconSizes[size] }}
        >
          {icon}
        </span>
      )}
      {extended && label && (
        <span className="font-medium whitespace-nowrap">{label}</span>
      )}
    </motion.button>
  )
})

export default FAB
