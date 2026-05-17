import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const GlassNav = forwardRef(function GlassNav({
  logo = 'Acme',
  links = [
    { label: 'Product', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  cta = 'Get started',
  floating = true,
  className,
  ...props
}, ref) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      ref={ref}
      className={cn(
        'w-full px-6 py-3 flex items-center justify-between',
        floating && 'rounded-2xl border border-white/20',
        'backdrop-blur-md bg-white/10',
        className
      )}
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
      {...props}
    >
      {/* Logo */}
      <div className="font-bold text-lg text-ink">{logo}</div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map(l => (
          <a key={l.label} href={l.href}
            className="text-sm font-medium text-muted hover:text-ink transition-colors">
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-3">
        <motion.a
          href="#"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold"
        >
          {cta}
        </motion.a>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-ink"
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 backdrop-blur-md bg-canvas/90 border border-hairline rounded-xl shadow-xl p-4 flex flex-col gap-3 md:hidden z-50"
          >
            {links.map(l => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-ink py-1">{l.label}</a>
            ))}
            <a href="#" className="mt-2 px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold text-center">
              {cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
})

export default GlassNav
