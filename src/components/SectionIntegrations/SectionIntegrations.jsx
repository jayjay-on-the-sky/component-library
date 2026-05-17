import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const SectionIntegrations = ({
  eyebrow,
  title,
  subtitle,
  integrations = [],
  centerLogo,
  centerLabel,
  className,
}) => {
  const radius = 140
  const count = integrations.length

  return (
    <section className={cn('py-20 bg-canvas overflow-hidden', className)}>
      <div className="max-w-5xl mx-auto px-6">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-14">
            {eyebrow && <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{eyebrow}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold text-ink">{title}</h2>}
            {subtitle && <p className="text-body mt-3 max-w-lg mx-auto">{subtitle}</p>}
          </div>
        )}

        {/* Orbital layout */}
        <div className="relative flex items-center justify-center" style={{ height: 360 }}>
          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-dashed border-hairline"
            style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}
          />

          {/* Center */}
          <div className="relative z-10 flex flex-col items-center justify-center w-24 h-24 rounded-full bg-canvas border-2 border-primary/30 shadow-lg">
            {centerLogo ? (
              <img src={centerLogo} alt={centerLabel} className="w-12 h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg">
                {centerLabel?.[0] || 'A'}
              </div>
            )}
            {centerLabel && <span className="text-xs text-muted mt-1 font-medium">{centerLabel}</span>}
          </div>

          {/* Orbiting logos */}
          {integrations.map((int, i) => {
            const angle = (i / count) * 2 * Math.PI - Math.PI / 2
            const x = Math.cos(angle) * (radius + 40)
            const y = Math.sin(angle) * (radius + 40)
            return (
              <motion.div
                key={int.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))` }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className={cn(
                  'w-12 h-12 rounded-[var(--radius-lg)] bg-canvas border border-hairline shadow flex items-center justify-center hover:border-primary/30 hover:shadow-md transition-all',
                  int.color && `text-[${int.color}]`
                )}>
                  {int.logo ? (
                    <img src={int.logo} alt={int.name} className="w-7 h-7 object-contain" />
                  ) : (
                    <span className="text-sm font-bold text-ink">{int.name[0]}</span>
                  )}
                </div>
                <span className="text-xs text-muted font-medium whitespace-nowrap">{int.name}</span>
              </motion.div>
            )
          })}
        </div>

        {/* List view below */}
        {integrations.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {integrations.map(int => (
              <div key={int.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline text-sm text-ink-muted bg-canvas hover:border-primary/30 transition-colors">
                {int.logo && <img src={int.logo} alt="" className="w-4 h-4 object-contain" />}
                {int.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SectionIntegrations
