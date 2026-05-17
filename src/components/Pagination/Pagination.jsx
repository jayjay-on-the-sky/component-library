import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MoreHorizontal } from '../../lib/icons'
import { cn } from '../../lib/utils'

const Pagination = React.forwardRef(({
  page = 1,
  totalPages = 10,
  onPageChange,
  showEdges = true,
  siblingCount = 1,
  className,
  ...props
}, ref) => {
  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const pages = React.useMemo(() => {
    const totalNumbers = siblingCount * 2 + 5
    if (totalPages <= totalNumbers) return range(1, totalPages)

    const leftSibling = Math.max(page - siblingCount, 1)
    const rightSibling = Math.min(page + siblingCount, totalPages)
    const showLeft = leftSibling > 2
    const showRight = rightSibling < totalPages - 1

    if (!showLeft && showRight) {
      return [...range(1, 3 + siblingCount * 2), 'DOTS', totalPages]
    }
    if (showLeft && !showRight) {
      return [1, 'DOTS', ...range(totalPages - (3 + siblingCount * 2) + 1, totalPages)]
    }
    return [1, 'DOTS', ...range(leftSibling, rightSibling), 'DOTS', totalPages]
  }, [page, totalPages, siblingCount])

  const btn = (p) => (
    <motion.button
      key={p}
      whileTap={{ scale: 0.93 }}
      onClick={() => onPageChange?.(p)}
      aria-label={`Page ${p}`}
      aria-current={p === page ? 'page' : undefined}
      className={cn(
        'w-9 h-9 rounded-[var(--radius-md)] text-sm font-medium flex items-center justify-center transition-colors',
        p === page
          ? 'bg-primary text-on-primary'
          : 'text-ink-muted hover:bg-surface hover:text-ink'
      )}
    >
      {p}
    </motion.button>
  )

  return (
    <nav ref={ref} aria-label="Pagination" className={cn('flex items-center gap-1', className)} {...props}>
      <motion.button
        whileTap={{ scale: 0.93 }}
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        aria-label="Previous page"
        className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-muted hover:bg-surface hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </motion.button>

      {pages.map((p, i) =>
        p === 'DOTS' ? (
          <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-muted">
            <MoreHorizontal size={16} />
          </span>
        ) : btn(p)
      )}

      <motion.button
        whileTap={{ scale: 0.93 }}
        disabled={page >= totalPages}
        onClick={() => onPageChange?.(page + 1)}
        aria-label="Next page"
        className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-muted hover:bg-surface hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </motion.button>
    </nav>
  )
})

Pagination.displayName = 'Pagination'
export default Pagination
