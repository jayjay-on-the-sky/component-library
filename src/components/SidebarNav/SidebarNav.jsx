import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from '../../lib/icons'
import { cn } from '../../lib/utils'

const SidebarNav = React.forwardRef(({
  groups = [],
  activeItem,
  onSelect,
  collapsed = false,
  header,
  footer,
  className,
  ...props
}, ref) => {
  const [expanded, setExpanded] = useState({})

  const toggleGroup = (label) => setExpanded(e => ({ ...e, [label]: !e[label] }))

  return (
    <nav
      ref={ref}
      aria-label="Sidebar navigation"
      className={cn(
        'flex flex-col h-full bg-shell-bg border-r border-shell-border transition-all',
        collapsed ? 'w-14' : 'w-56',
        className
      )}
      {...props}
    >
      {header && <div className="shrink-0">{header}</div>}

      <div className="flex-1 overflow-y-auto py-2 px-2">
        {groups.map((group, gi) => (
          <div key={gi} className="mb-4">
            {/* Group label */}
            {group.label && !collapsed && (
              <p className="text-xs font-semibold text-shell-text-muted uppercase tracking-wider px-3 py-1.5 mb-1">
                {group.label}
              </p>
            )}

            {group.items.map((item) => {
              const isActive = activeItem === item.id
              const hasChildren = item.children?.length > 0
              const isExpanded = expanded[item.id]

              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (hasChildren) toggleGroup(item.id)
                      else onSelect?.(item.id)
                    }}
                    title={collapsed ? item.label : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-shell-accent text-white'
                        : 'text-shell-text-muted hover:bg-shell-surface hover:text-shell-text'
                    )}
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.badge && (
                          <span className="text-xs bg-shell-surface rounded-full px-1.5 py-0.5">
                            {item.badge}
                          </span>
                        )}
                        {hasChildren && (
                          <ChevronDown
                            size={14}
                            className={cn('transition-transform shrink-0', isExpanded && 'rotate-180')}
                          />
                        )}
                      </>
                    )}
                  </button>

                  {/* Sub-items */}
                  <AnimatePresence>
                    {hasChildren && isExpanded && !collapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 pl-3 border-l border-shell-border mt-0.5 mb-0.5 flex flex-col gap-0.5"
                      >
                        {item.children.map(child => (
                          <button
                            key={child.id}
                            onClick={() => onSelect?.(child.id)}
                            aria-current={activeItem === child.id ? 'page' : undefined}
                            className={cn(
                              'w-full text-left px-3 py-1.5 rounded-[var(--radius-sm)] text-xs transition-colors',
                              activeItem === child.id
                                ? 'text-shell-accent font-medium'
                                : 'text-shell-text-muted hover:text-shell-text'
                            )}
                          >
                            {child.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {footer && <div className="shrink-0 border-t border-shell-border">{footer}</div>}
    </nav>
  )
})

SidebarNav.displayName = 'SidebarNav'
export default SidebarNav
