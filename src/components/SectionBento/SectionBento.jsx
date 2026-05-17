import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const BentoCard = ({ title, description, icon, colSpan = 1, rowSpan = 1, accent, image, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.4 }}
    className={cn(
      'relative rounded-[var(--radius-xl)] border border-hairline bg-canvas p-6 overflow-hidden flex flex-col gap-3',
      accent && 'bg-primary border-primary/20',
      className
    )}
    style={{
      gridColumn: `span ${colSpan}`,
      gridRow: `span ${rowSpan}`,
    }}
  >
    {image && (
      <div className="absolute inset-0 opacity-5">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
    )}
    {icon && (
      <div className={cn('w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center', accent ? 'bg-on-primary/20 text-on-primary' : 'bg-primary/10 text-primary')}>
        {icon}
      </div>
    )}
    <div>
      <h3 className={cn('font-semibold text-base', accent ? 'text-on-primary' : 'text-ink')}>{title}</h3>
      {description && (
        <p className={cn('text-sm mt-1 leading-relaxed', accent ? 'text-on-primary/70' : 'text-body')}>{description}</p>
      )}
    </div>
  </motion.div>
)

const SectionBento = ({
  eyebrow,
  title,
  subtitle,
  cards = [],
  columns = 3,
  className,
}) => (
  <section className={cn('py-20 bg-canvas', className)}>
    <div className="max-w-6xl mx-auto px-6">
      {(eyebrow || title || subtitle) && (
        <div className="text-center mb-12">
          {eyebrow && <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{eyebrow}</p>}
          {title && <h2 className="text-3xl md:text-4xl font-bold text-ink">{title}</h2>}
          {subtitle && <p className="text-body mt-4 max-w-xl mx-auto">{subtitle}</p>}
        </div>
      )}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {cards.map((card, i) => (
          <BentoCard key={i} {...card} />
        ))}
      </div>
    </div>
  </section>
)

export default SectionBento
