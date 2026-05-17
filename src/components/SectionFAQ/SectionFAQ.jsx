import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionFAQ — frequently asked questions in accordion style.
 * faqs: [{ question, answer }]
 */

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-hairline last:border-b-0"
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={id}
        className={cn(
          'w-full flex items-center justify-between gap-4 py-5 text-left',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:rounded'
        )}
      >
        <span className="text-base font-medium text-ink">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.18 }}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-surface-strong text-ink-muted"
          aria-hidden
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-ink-muted leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const SectionFAQ = forwardRef(function SectionFAQ(
  {
    eyebrow,
    title = 'Frequently asked questions',
    subtitle,
    faqs = [],
    columns = 1,
    className,
    ...props
  },
  ref
) {
  const mid = Math.ceil(faqs.length / 2)
  const left = faqs.slice(0, mid)
  const right = faqs.slice(mid)

  return (
    <section ref={ref} className={cn('py-24 px-6 bg-canvas', className)} {...props}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">{eyebrow}</span>
          )}
          <h2 className="text-4xl font-bold text-ink tracking-tight" style={{ letterSpacing: '-0.025em' }}>{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-ink-muted">{subtitle}</p>}
        </motion.div>

        {columns === 2 ? (
          <div className="grid sm:grid-cols-2 gap-x-12">
            <div>{left.map((f, i) => <FAQItem key={i} index={i} {...f} />)}</div>
            <div>{right.map((f, i) => <FAQItem key={i} index={i + mid} {...f} />)}</div>
          </div>
        ) : (
          <div>{faqs.map((f, i) => <FAQItem key={i} index={i} {...f} />)}</div>
        )}
      </div>
    </section>
  )
})

export default SectionFAQ
