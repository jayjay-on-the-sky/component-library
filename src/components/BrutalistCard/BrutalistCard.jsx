import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const BrutalistCard = forwardRef(function BrutalistCard({
  title,
  tag,
  children,
  cta,
  onCtaClick,
  accent = 'primary', // primary | warning | error | success
  offsetShadow = true,
  className,
  ...props
}, ref) {
  const accentColor = {
    primary: 'var(--color-primary)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    success: 'var(--color-success)',
  }[accent]

  return (
    <motion.div
      ref={ref}
      whileHover={offsetShadow ? { x: -3, y: -3 } : {}}
      transition={{ duration: 0.15 }}
      className={cn('relative bg-canvas', className)}
      style={{
        border: '3px solid var(--color-ink)',
        boxShadow: offsetShadow ? `6px 6px 0px ${accentColor}` : 'none',
      }}
      {...props}
    >
      {/* Accent top bar */}
      <div style={{ height: 6, background: accentColor }} />

      <div className="p-6">
        {tag && (
          <div
            className="inline-block text-xs font-black uppercase tracking-widest px-2 py-0.5 mb-3"
            style={{ background: accentColor, color: 'white' }}
          >
            {tag}
          </div>
        )}

        {title && (
          <h3 className="text-xl font-black text-ink uppercase tracking-tight mb-3 leading-tight">
            {title}
          </h3>
        )}

        <div className="text-sm text-ink/70 leading-relaxed">{children}</div>

        {cta && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onCtaClick}
            className="mt-4 text-sm font-black uppercase tracking-wider px-4 py-2"
            style={{
              border: '2px solid var(--color-ink)',
              background: 'var(--color-ink)',
              color: 'var(--color-canvas)',
            }}
          >
            {cta} →
          </motion.button>
        )}
      </div>
    </motion.div>
  )
})

export default BrutalistCard
