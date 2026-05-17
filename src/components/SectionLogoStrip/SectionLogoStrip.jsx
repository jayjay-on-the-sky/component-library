import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionLogoStrip — scrolling or static trusted-by logo strip.
 * logos: [{ name, src? }]  — if no src, renders text initials badge.
 * mode: 'scroll' (infinite marquee) | 'static' (centered row)
 */

const SectionLogoStrip = forwardRef(function SectionLogoStrip(
  {
    label = 'Trusted by teams at',
    logos = [],
    mode = 'scroll',
    className,
    ...props
  },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn('py-16 px-6 bg-canvas', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {label && (
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-ink-muted mb-8">
            {label}
          </p>
        )}

        {mode === 'scroll' ? (
          <div className="relative overflow-hidden" aria-hidden>
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--color-canvas), transparent)' }}/>
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--color-canvas), transparent)' }}/>

            <div className="flex gap-10 overflow-hidden">
              {/* Duplicate for seamless loop */}
              {[0, 1].map(set => (
                <motion.div
                  key={set}
                  animate={{ x: ['0%', '-100%'] }}
                  transition={{ duration: logos.length * 2.5, repeat: Infinity, ease: 'linear' }}
                  className="flex items-center gap-10 shrink-0"
                >
                  {logos.map((logo, i) => (
                    <LogoItem key={i} logo={logo} />
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <LogoItem logo={logo} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
})

function LogoItem({ logo }) {
  return (
    <div className="flex items-center justify-center h-8 grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300">
      {logo.src ? (
        <img src={logo.src} alt={logo.name} className="h-7 object-contain" />
      ) : (
        <span className="text-lg font-bold text-ink-muted tracking-tight px-3 py-1 rounded-lg border border-hairline">
          {logo.name}
        </span>
      )}
    </div>
  )
}

export default SectionLogoStrip
