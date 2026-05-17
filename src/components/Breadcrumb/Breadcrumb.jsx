import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from '../../lib/icons'
import { cn } from '../../lib/utils'

const BreadcrumbItem = ({ children, href, isLast, separator = <ChevronRight size={14} /> }) => (
  <li className="flex items-center gap-1">
    {href && !isLast ? (
      <a
        href={href}
        className="text-muted hover:text-ink transition-colors duration-150 text-sm"
      >
        {children}
      </a>
    ) : (
      <span className={cn('text-sm', isLast ? 'text-ink font-medium' : 'text-muted')}>{children}</span>
    )}
    {!isLast && <span className="text-muted">{separator}</span>}
  </li>
)

const Breadcrumb = React.forwardRef(({ items = [], showHome = false, className, ...props }, ref) => {
  const allItems = showHome ? [{ label: 'Home', href: '/', icon: <Home size={14} /> }, ...items] : items

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('flex', className)} {...props}>
      <ol className="flex items-center gap-1 flex-wrap">
        {allItems.map((item, i) => (
          <BreadcrumbItem key={i} href={item.href} isLast={i === allItems.length - 1}>
            <span className="flex items-center gap-1">
              {item.icon}
              {item.label}
            </span>
          </BreadcrumbItem>
        ))}
      </ol>
    </nav>
  )
})

Breadcrumb.displayName = 'Breadcrumb'
export default Breadcrumb
