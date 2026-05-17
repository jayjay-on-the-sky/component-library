import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from '../../lib/icons'
import { cn } from '../../lib/utils'

const NavMenu = React.forwardRef(({ items = [], className, ...props }, ref) => {
  const [active, setActive] = useState(null)
  const timeoutRef = useRef(null)

  const open = (id) => {
    clearTimeout(timeoutRef.current)
    setActive(id)
  }

  const close = () => {
    timeoutRef.current = setTimeout(() => setActive(null), 100)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return (
    <nav ref={ref} className={cn('flex items-center gap-1', className)} {...props}>
      {items.map((item) => {
        const hasMega = item.columns?.length > 0
        const isOpen = active === item.id

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => hasMega && open(item.id)}
            onMouseLeave={close}
          >
            <button
              aria-haspopup={hasMega}
              aria-expanded={isOpen}
              className={cn(
                'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors',
                isOpen ? 'text-ink bg-surface' : 'text-ink-muted hover:text-ink hover:bg-surface'
              )}
            >
              {item.label}
              {hasMega && (
                <ChevronDown
                  size={13}
                  className={cn('text-muted transition-transform', isOpen && 'rotate-180')}
                />
              )}
            </button>

            <AnimatePresence>
              {hasMega && isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  onMouseEnter={() => open(item.id)}
                  onMouseLeave={close}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-xl z-50 p-5 min-w-[480px]"
                >
                  {item.header && (
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">{item.header}</p>
                  )}
                  <div
                    className="grid gap-6"
                    style={{ gridTemplateColumns: `repeat(${item.columns.length}, 1fr)` }}
                  >
                    {item.columns.map((col, ci) => (
                      <div key={ci}>
                        {col.label && (
                          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">{col.label}</p>
                        )}
                        <ul className="flex flex-col gap-0.5">
                          {col.links.map((link, li) => (
                            <li key={li}>
                              <a
                                href={link.href || '#'}
                                className="flex items-start gap-3 p-2 rounded-[var(--radius-md)] hover:bg-surface transition-colors group"
                              >
                                {link.icon && (
                                  <div className="w-8 h-8 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                                    {link.icon}
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium text-ink group-hover:text-primary transition-colors">{link.label}</p>
                                  {link.description && (
                                    <p className="text-xs text-muted mt-0.5">{link.description}</p>
                                  )}
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
})

NavMenu.displayName = 'NavMenu'
export default NavMenu
