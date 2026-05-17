import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogOut, Settings, User, CreditCard, Bell } from '../../lib/icons'
import { cn } from '../../lib/utils'

const UserMenu = React.forwardRef(({
  user = {},
  items,
  onSignOut,
  className,
  ...props
}, ref) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const h = (e) => { if (!containerRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const defaultItems = items || [
    { icon: <User size={14} />, label: 'Profile', onClick: () => {} },
    { icon: <Settings size={14} />, label: 'Settings', onClick: () => {} },
    { icon: <CreditCard size={14} />, label: 'Billing', onClick: () => {} },
    { icon: <Bell size={14} />, label: 'Notifications', onClick: () => {} },
    { divider: true },
    { icon: <LogOut size={14} />, label: 'Sign out', onClick: onSignOut, danger: true },
  ]

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  return (
    <div ref={containerRef} className={cn('relative', className)} {...props}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-[var(--radius-lg)] hover:bg-shell-surface transition-colors"
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
            {initials}
          </div>
        )}
        <div className="text-left hidden sm:block">
          <p className="text-xs font-medium text-shell-text leading-none">{user.name || 'User'}</p>
          {user.email && <p className="text-xs text-shell-text-muted mt-0.5">{user.email}</p>}
        </div>
        <ChevronDown size={14} className={cn('text-shell-text-muted transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.13 }}
            className="absolute bottom-full mb-2 right-0 w-56 bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-xl overflow-hidden z-50"
            role="menu"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-hairline">
              <p className="text-sm font-semibold text-ink">{user.name}</p>
              {user.email && <p className="text-xs text-muted mt-0.5">{user.email}</p>}
              {user.plan && (
                <span className="inline-block mt-1.5 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {user.plan}
                </span>
              )}
            </div>

            {/* Items */}
            <div className="py-1">
              {defaultItems.map((item, i) =>
                item.divider ? (
                  <div key={i} className="h-px bg-hairline my-1" />
                ) : (
                  <button
                    key={i}
                    role="menuitem"
                    onClick={() => { item.onClick?.(); setOpen(false) }}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors text-left',
                      item.danger
                        ? 'text-error hover:bg-error/5'
                        : 'text-ink-muted hover:bg-surface hover:text-ink'
                    )}
                  >
                    <span className={item.danger ? 'text-error' : 'text-muted'}>{item.icon}</span>
                    {item.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

UserMenu.displayName = 'UserMenu'
export default UserMenu
