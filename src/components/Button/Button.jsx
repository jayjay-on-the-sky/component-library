import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const variants = {
  primary:     'bg-primary text-on-primary hover:bg-primary-hover border-transparent',
  secondary:   'bg-canvas text-ink border-hairline hover:bg-surface',
  ghost:       'bg-transparent text-ink border-transparent hover:bg-surface',
  destructive: 'bg-error text-white border-transparent hover:opacity-90',
}

const sizes = {
  sm: 'h-7 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]',
  md: 'h-9 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
  lg: 'h-11 px-5 text-base gap-2.5 rounded-[var(--radius-md)]',
}

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    children,
    className,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.08 }}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        'inline-flex items-center justify-center font-medium border transition-colors select-none focus-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <LoadingDots />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  )
})

function LoadingDots() {
  return (
    <span className="flex items-center gap-1" aria-label="Loading">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}

export default Button
