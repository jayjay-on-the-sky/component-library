import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionTestimonials — auto-cycling or static testimonial carousel.
 * testimonials: [{ quote, author, title, avatar?, company? }]
 */

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.5 3.5L12 5l-2.5 2.4.6 3.6L7 9.5 4 11l.6-3.6L2 5l3.5-.5L7 1z"
            fill={i < count ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1"
            className={i < count ? 'text-warning' : 'text-hairline'}
          />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ quote, author, title, avatar, company, stars = 5 }) {
  return (
    <div className="flex flex-col gap-5 p-7 rounded-2xl border border-hairline bg-surface h-full">
      <StarRating count={stars} />
      <blockquote className="text-base text-ink leading-relaxed flex-1">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        {avatar ? (
          <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover"/>
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-ink">{author}</p>
          <p className="text-xs text-ink-muted">{title}{company ? ` · ${company}` : ''}</p>
        </div>
      </div>
    </div>
  )
}

const SectionTestimonials = forwardRef(function SectionTestimonials(
  {
    eyebrow,
    title = 'Loved by designers and engineers',
    testimonials = [],
    columns = 3,
    className,
    ...props
  },
  ref
) {
  const gridCols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }

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
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              {eyebrow}
            </span>
          )}
          <h2 className="text-4xl font-bold text-ink tracking-tight" style={{ letterSpacing: '-0.025em' }}>
            {title}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className={cn('grid grid-cols-1 gap-5', gridCols[columns])}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default SectionTestimonials
