import { forwardRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionNavbar — full page-level header with logo, nav links, CTA, and mobile menu.
 * Theme-aware: uses token classes throughout.
 */

const SectionNavbar = forwardRef(function SectionNavbar(
  {
    logo,
    logoText = 'Brand',
    links = [],
    cta,
    ctaLabel = 'Get started',
    onCtaClick,
    sticky = true,
    className,
    ...props
  },
  ref
) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        ref={ref}
        animate={{
          backgroundColor: scrolled ? 'var(--color-canvas)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--color-hairline)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'w-full z-30 border-b',
          sticky && 'sticky top-0',
          className
        )}
        role="banner"
        {...props}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="Home">
            {logo ? (
              <span className="w-8 h-8 shrink-0">{logo}</span>
            ) : (
              <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 12V7l5-5 5 5v5a1 1 0 01-1 1H4a1 1 0 01-1-1z" fill="currentColor" className="text-on-primary"/>
                </svg>
              </span>
            )}
            <span className="text-base font-bold text-ink tracking-tight">{logoText}</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href || '#'}
                className="px-3 py-1.5 text-sm text-ink-muted hover:text-ink rounded-lg hover:bg-surface transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <motion.a
              href={cta || '#'}
              onClick={onCtaClick}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-colors"
            >
              {ctaLabel}
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-ink hover:bg-surface transition-colors"
            >
              <motion.svg
                width="18" height="14" viewBox="0 0 18 14" fill="none"
                animate={mobileOpen ? 'open' : 'closed'}
              >
                <motion.path
                  d="M1 1h16"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  variants={{ open: { d: 'M2 2l14 10' }, closed: { d: 'M1 1h16' } }}
                  transition={{ duration: 0.2 }}
                />
                <motion.path
                  d="M1 7h16"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
                  transition={{ duration: 0.15 }}
                />
                <motion.path
                  d="M1 13h16"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  variants={{ open: { d: 'M2 12l14-10' }, closed: { d: 'M1 13h16' } }}
                  transition={{ duration: 0.2 }}
                />
              </motion.svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-16 z-20 bg-canvas border-b border-hairline overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href || '#'}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-ink-muted hover:text-ink hover:bg-surface rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={cta || '#'}
                className="mt-2 px-3 py-2.5 text-sm font-medium bg-primary text-on-primary rounded-lg text-center"
              >
                {ctaLabel}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default SectionNavbar
