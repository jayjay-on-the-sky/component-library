import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const sizes = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8', xl: 'w-12 h-12' }
const strokes = { xs: 1.5, sm: 2, md: 2, lg: 2.5, xl: 3 }

const Spinner = React.forwardRef(({ size = 'md', color = 'primary', label = 'Loading…', className, ...props }, ref) => {
  const colorClass = color === 'primary' ? 'text-primary' : color === 'muted' ? 'text-muted' : color === 'white' ? 'text-on-primary' : 'text-primary'

  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', colorClass, className)}
      {...props}
    >
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className={sizes[size]}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={strokes[size]}
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="9" strokeOpacity={0.25} />
        <path d="M3 12a9 9 0 0 1 9-9" strokeLinecap="round" />
      </motion.svg>
      <span className="sr-only">{label}</span>
    </span>
  )
})

Spinner.displayName = 'Spinner'
export default Spinner
