import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionHero — full page hero with headline, subtitle, CTA pair, badge, and media slot.
 */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const SectionHero = forwardRef(function SectionHero(
  {
    badge,
    headline = 'Build faster than\never before',
    subheadline = 'A production-quality component library with design token theming, AI generation, and one-click export.',
    primaryCta = 'Get started free',
    secondaryCta = 'View components',
    onPrimaryClick,
    onSecondaryClick,
    media,
    align = 'center', // center | left
    className,
    ...props
  },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden bg-canvas py-24 px-6',
        className
      )}
      {...props}
    >
      {/* Background glow */}
      <div
        className="absolute inset-x-0 -top-32 h-96 pointer-events-none"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-primary) 0%, transparent 70%)',
          opacity: 0.08,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={cn(
          'relative max-w-5xl mx-auto',
          align === 'center' ? 'text-center flex flex-col items-center' : 'text-left'
        )}
      >
        {/* Badge */}
        {badge && (
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
              {badge}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-ink leading-[1.08] tracking-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          {headline.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className={cn(
            'mt-6 text-lg text-ink-muted leading-relaxed',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl'
          )}
        >
          {subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className={cn(
            'mt-8 flex flex-wrap gap-3',
            align === 'center' ? 'justify-center' : 'justify-start'
          )}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onPrimaryClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-hairline text-ink rounded-xl text-sm font-semibold hover:bg-surface-strong transition-colors"
            >
              {secondaryCta}
            </motion.button>
          )}
        </motion.div>

        {/* Social proof */}
        <motion.p variants={itemVariants} className="mt-5 text-xs text-ink-muted">
          No credit card required · Free forever plan available
        </motion.p>

        {/* Media slot */}
        {media && (
          <motion.div
            variants={itemVariants}
            className="mt-16 w-full rounded-2xl overflow-hidden border border-hairline shadow-2xl"
          >
            {media}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
})

export default SectionHero
