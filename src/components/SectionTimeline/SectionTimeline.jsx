import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const SectionTimeline = ({
  eyebrow,
  title,
  subtitle,
  events = [],
  className,
}) => (
  <section className={cn('py-20 bg-canvas', className)}>
    <div className="max-w-4xl mx-auto px-6">
      {(eyebrow || title || subtitle) && (
        <div className="text-center mb-16">
          {eyebrow && <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{eyebrow}</p>}
          {title && <h2 className="text-3xl md:text-4xl font-bold text-ink">{title}</h2>}
          {subtitle && <p className="text-body mt-3 max-w-lg mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-hairline -translate-x-1/2 hidden md:block" />

        <div className="flex flex-col gap-12">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={cn('relative flex items-center', isLeft ? 'md:flex-row' : 'md:flex-row-reverse', 'flex-col md:gap-8')}
              >
                {/* Content */}
                <div className={cn('flex-1 md:text-right', !isLeft && 'md:text-left')}>
                  <div className={cn('bg-canvas border border-hairline rounded-[var(--radius-xl)] p-5 hover:border-primary/30 transition-colors', isLeft ? 'md:ml-auto' : 'md:mr-auto')}>
                    <div className={cn('flex items-center gap-2 mb-2', !isLeft && 'md:flex-row-reverse')}>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{event.year}</span>
                      {event.tag && <span className="text-xs text-muted">{event.tag}</span>}
                    </div>
                    <h3 className="font-semibold text-ink">{event.title}</h3>
                    {event.description && (
                      <p className="text-sm text-body mt-1 leading-relaxed">{event.description}</p>
                    )}
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 hidden md:flex">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-canvas shadow" />
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  </section>
)

export default SectionTimeline
