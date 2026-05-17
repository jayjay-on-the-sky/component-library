import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

const ContextMenu = ({ children, items = [] }) => {
  const [pos, setPos] = useState(null)
  const menuRef = useRef(null)

  const open = useCallback((e) => {
    e.preventDefault()
    setPos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    const close = () => setPos(null)
    document.addEventListener('click', close)
    document.addEventListener('keydown', e => e.key === 'Escape' && close())
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', close)
    }
  }, [])

  return (
    <>
      <div onContextMenu={open} className="inline-block">{children}</div>
      <AnimatePresence>
        {pos && (
          <motion.ul
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.1 }}
            role="menu"
            style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999 }}
            className="min-w-[180px] bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-xl py-1 overflow-hidden"
          >
            {items.map((item, i) =>
              item.divider ? (
                <li key={i} className="h-px bg-hairline my-1" />
              ) : (
                <li key={i}>
                  <button
                    role="menuitem"
                    onClick={() => { item.onClick?.(); setPos(null) }}
                    disabled={item.disabled}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
                      item.danger ? 'text-error hover:bg-error/5' : 'text-ink-muted hover:bg-surface hover:text-ink'
                    )}
                  >
                    {item.icon && <span className={item.danger ? 'text-error' : 'text-muted shrink-0'}>{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && <kbd className="text-xs text-muted">{item.shortcut}</kbd>}
                  </button>
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  )
}

export default ContextMenu
