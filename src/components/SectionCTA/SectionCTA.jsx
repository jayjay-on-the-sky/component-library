import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionCTA — full-width call-to-action band.
 * Variants: gradient | outlined | solid
 */

const SectionCTA = forwardRef(function SectionCTA(
  {
    eyebrow,
    headline = 'Ready to build something great?',
    subheadline,
    primaryCta = 'Get started free',
    secondaryCta,
    onPrimaryClick,
    onSecondaryClick,
    variant = 'gradient',
    className,
    ...props
  },
  ref
) {
  const variants = {
    gradient: 'bg-canvas',
    solid: 'bg-primary',
    outlined: 'bg-canvas border border-hairline rounded-3xl',
  }

  const textColor = {
    gradient: 'text-ink',
    solid: 'text-on-primary',
    outlined: 'text-ink',
  }

  const subColor = {
    gradient: 'text-ink-muted',
    solid: 'text-on-primary/70',
    outlined: 'text-ink-muted',
  }

  return (
    <section
      ref={ref}
      className={cn('py-24 px-6', variant !== 'outlined' && variants[variant], className)}
      {...props}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            'relative overflow-hidden text-center px-8 py-16 rounded-3xl',
            variant === 'outlined' ? variants.outlined : variants[variant]
          )}
        >
          {/* Gradient orbs (gradient variant) */}
          {variant === 'gradient' && (
            <>
              <div
                className="absolute -left-20 -top-20 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)', opacity: 0.12 }}
                aria-hidden
              />
              <div
                className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)', opacity: 0.08 }}
                aria-hidden
              />
            </>
          )}

          <div className="relative">
            {eyebrow && (
              <span className={cn(
                'text-xs font-semibold uppercase tracking-widest mb-4 block',
                variant === 'solid' ? 'text-on-primary/60' : 'text-primary'
              )}>
                {eyebrow}
              </span>
            )}

            <h2 className={cn(
              'text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-4',
              textColor[variant]
            )} style={{ letterSpacing: '-0.028em' }}>
              {headline}
            </h2>

            {subheadline && (
              <p className={cn('text-lg max-w-2xl mx-auto mb-10 leading-relaxed', subColor[variant])}>
                {subheadline}
              </p>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onPrimaryClick}
                className={cn(
                  'inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors',
                  variant === 'solid'
                    ? 'bg-canvas text-primary hover:bg-canvas/90 shadow-lg'
                    : 'bg-primary text-on-primary hover:bg-primary-hover shadow-lg shadow-primary/25'
                )}
              >
                {primaryCta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

              {secondaryCta && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onSecondaryClick}
                  className={cn(
                    'inline-flex items-center px-7 py-3.5 rounded-xl text-sm font-semibold border transition-colors',
                    variant === 'solid'
                      ? 'border-on-primary/30 text-on-primary hover:bg-on-primary/10'
                      : 'border-hairline text-ink hover:bg-surface'
                  )}
                >
                  {secondaryCta}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default SectionCTA
