import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionFeatureGrid — responsive feature grid with icon, title, and description.
 * Layout: 2-col or 3-col grid. Feature cards have hover lift.
 */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

function FeatureCard({ icon, title, description, highlight = false }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className={cn(
        'relative flex flex-col gap-4 p-6 rounded-2xl border transition-shadow duration-200',
        highlight
          ? 'bg-primary/6 border-primary/20 hover:shadow-lg hover:shadow-primary/10'
          : 'bg-surface border-hairline hover:shadow-md hover:border-primary/20'
      )}
    >
      {icon && (
        <span className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
          highlight ? 'bg-primary/15 text-primary' : 'bg-surface-strong text-ink'
        )}>
          {icon}
        </span>
      )}
      <div>
        <h3 className="text-base font-semibold text-ink mb-1.5">{title}</h3>
        <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

const SectionFeatureGrid = forwardRef(function SectionFeatureGrid(
  {
    eyebrow,
    title = 'Everything you need',
    subtitle,
    features = [],
    columns = 3,
    className,
    ...props
  },
  ref
) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section
      ref={ref}
      className={cn('py-24 px-6 bg-canvas', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              {eyebrow}
            </span>
          )}
          <h2 className="text-4xl font-bold text-ink tracking-tight" style={{ letterSpacing: '-0.025em' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-ink-muted leading-relaxed">{subtitle}</p>
          )}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className={cn('grid grid-cols-1 gap-5', gridCols[columns])}
        >
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  )
})

export default SectionFeatureGrid
