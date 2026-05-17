import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionPricing — pricing tiers with monthly/annual toggle.
 * plans: [{ name, price, annualPrice?, description, features[], cta, popular? }]
 */

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlanCard({ plan, annual }) {
  const price = annual && plan.annualPrice != null ? plan.annualPrice : plan.price

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className={cn(
        'relative flex flex-col p-7 rounded-2xl border transition-shadow duration-200',
        plan.popular
          ? 'bg-primary border-primary/30 shadow-xl shadow-primary/15'
          : 'bg-surface border-hairline hover:shadow-md'
      )}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-canvas text-primary text-xs font-bold border border-primary/20">
            Most popular
          </span>
        </div>
      )}

      {/* Plan name */}
      <p className={cn('text-sm font-semibold mb-4', plan.popular ? 'text-on-primary/80' : 'text-ink-muted')}>
        {plan.name}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1">
        {typeof price === 'number' ? (
          <>
            <span className={cn('text-5xl font-bold tracking-tight', plan.popular ? 'text-on-primary' : 'text-ink')}>
              ${price}
            </span>
            <span className={cn('text-sm', plan.popular ? 'text-on-primary/60' : 'text-ink-muted')}>
              /mo
            </span>
          </>
        ) : (
          <span className={cn('text-4xl font-bold', plan.popular ? 'text-on-primary' : 'text-ink')}>
            {price}
          </span>
        )}
      </div>

      {annual && plan.annualPrice != null && (
        <p className={cn('text-xs mb-4', plan.popular ? 'text-on-primary/60' : 'text-ink-muted')}>
          Billed ${plan.annualPrice * 12}/year · save {Math.round((1 - plan.annualPrice / plan.price) * 100)}%
        </p>
      )}

      <p className={cn('text-sm mb-6 leading-relaxed', plan.popular ? 'text-on-primary/80' : 'text-ink-muted')}>
        {plan.description}
      </p>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className={cn(
          'w-full py-2.5 rounded-xl text-sm font-semibold transition-colors mb-7',
          plan.popular
            ? 'bg-canvas text-primary hover:bg-canvas/90'
            : 'bg-primary text-on-primary hover:bg-primary-hover'
        )}
      >
        {plan.cta || 'Get started'}
      </motion.button>

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className={cn('flex items-start gap-2.5 text-sm', plan.popular ? 'text-on-primary/90' : 'text-ink')}>
            <span className={cn('mt-0.5 shrink-0', plan.popular ? 'text-on-primary' : 'text-success')}>
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

const SectionPricing = forwardRef(function SectionPricing(
  {
    eyebrow,
    title = 'Simple, transparent pricing',
    subtitle,
    plans = [],
    showToggle = true,
    className,
    ...props
  },
  ref
) {
  const [annual, setAnnual] = useState(false)

  return (
    <section ref={ref} className={cn('py-24 px-6 bg-canvas', className)} {...props}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">{eyebrow}</span>
          )}
          <h2 className="text-4xl font-bold text-ink tracking-tight mb-4" style={{ letterSpacing: '-0.025em' }}>
            {title}
          </h2>
          {subtitle && <p className="text-lg text-ink-muted">{subtitle}</p>}

          {/* Billing toggle */}
          {showToggle && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={cn('text-sm', !annual ? 'text-ink font-medium' : 'text-ink-muted')}>Monthly</span>
              <button
                role="switch"
                aria-checked={annual}
                aria-label="Toggle annual billing"
                onClick={() => setAnnual(a => !a)}
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors duration-200',
                  annual ? 'bg-primary' : 'bg-surface-strong'
                )}
              >
                <motion.span
                  animate={{ x: annual ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-0 w-4 h-4 rounded-full bg-canvas shadow"
                />
              </button>
              <span className={cn('text-sm', annual ? 'text-ink font-medium' : 'text-ink-muted')}>
                Annual
                <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded bg-success/15 text-success text-[11px] font-bold">
                  Save 20%
                </span>
              </span>
            </div>
          )}
        </motion.div>

        {/* Plans */}
        <div className={cn(
          'grid grid-cols-1 gap-6',
          plans.length === 2 && 'sm:grid-cols-2 max-w-3xl mx-auto',
          plans.length >= 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        )}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <PlanCard plan={plan} annual={annual} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default SectionPricing
