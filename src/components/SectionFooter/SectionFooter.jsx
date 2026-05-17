import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionFooter — full page footer with columns, social links, and legal row.
 * columns: [{ heading, links: [{ label, href }] }]
 * socials: [{ icon, href, label }]
 */

const SectionFooter = forwardRef(function SectionFooter(
  {
    logoText = 'Brand',
    logo,
    tagline,
    columns = [],
    socials = [],
    legal,
    legalLinks = [],
    className,
    ...props
  },
  ref
) {
  return (
    <footer
      ref={ref}
      className={cn('bg-canvas border-t border-hairline', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-[2fr_repeat(3,1fr)] gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-flex items-center gap-2.5 mb-4">
              {logo ? (
                <span className="w-8 h-8">{logo}</span>
              ) : (
                <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 12V7l5-5 5 5v5a1 1 0 01-1 1H4a1 1 0 01-1-1z" fill="currentColor" className="text-on-primary"/>
                  </svg>
                </span>
              )}
              <span className="text-base font-bold text-ink">{logoText}</span>
            </a>
            {tagline && (
              <p className="text-sm text-ink-muted leading-relaxed max-w-xs">{tagline}</p>
            )}
            {/* Socials */}
            {socials.length > 0 && (
              <div className="flex items-center gap-2 mt-5">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.12 }}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-hairline text-ink-muted hover:text-ink hover:border-primary/30 transition-colors"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col, ci) => (
            <div key={ci}>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <a
                      href={link.href || '#'}
                      className="text-sm text-ink-muted hover:text-ink transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom legal row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-hairline">
          <p className="text-xs text-ink-muted">
            {legal || `© ${new Date().getFullYear()} ${logoText}. All rights reserved.`}
          </p>
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-5">
              {legalLinks.map((link, i) => (
                <a key={i} href={link.href || '#'} className="text-xs text-ink-muted hover:text-ink transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
})

export default SectionFooter
