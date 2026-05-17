import { forwardRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * DataTable — sortable, selectable data table with pagination.
 * columns: [{ key, label, sortable?, render?(value, row)=>ReactNode, align? }]
 * rows: array of objects
 */

const DataTable = forwardRef(function DataTable(
  {
    columns = [],
    rows = [],
    selectable = false,
    pagination = false,
    pageSize = 10,
    stickyHeader = false,
    emptyMessage = 'No data',
    className,
    onRowClick,
    ...props
  },
  ref
) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [selected, setSelected] = useState(new Set())
  const [page, setPage] = useState(0)

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = useMemo(() => {
    if (!sortKey) return rows
    return [...rows].sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey]
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [rows, sortKey, sortDir])

  const paged = pagination ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted
  const totalPages = Math.ceil(sorted.length / pageSize)

  const allSelected = paged.length > 0 && paged.every(r => selected.has(r.id ?? r))
  const toggleAll = () => {
    if (allSelected) setSelected(prev => { const s = new Set(prev); paged.forEach(r => s.delete(r.id ?? r)); return s })
    else setSelected(prev => { const s = new Set(prev); paged.forEach(r => s.add(r.id ?? r)); return s })
  }
  const toggleRow = (id) => setSelected(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s
  })

  return (
    <div ref={ref} className={cn('w-full flex flex-col', className)} {...props}>
      {/* Selection status bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-primary/8 border-b border-primary/20">
              <span className="text-xs font-medium text-primary">{selected.size} selected</span>
              <button
                onClick={() => setSelected(new Set())}
                className="text-xs text-primary hover:underline"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table wrapper */}
      <div className="overflow-x-auto rounded-xl border border-hairline">
        <table className="w-full text-sm border-collapse">
          <thead className={cn(
            'bg-surface text-left',
            stickyHeader && 'sticky top-0 z-10'
          )}>
            <tr>
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all"
                    className="accent-primary w-4 h-4 rounded"
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 font-semibold text-ink-muted text-xs uppercase tracking-wide whitespace-nowrap',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.sortable && 'cursor-pointer hover:text-ink select-none transition-colors'
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="flex flex-col gap-[1px] opacity-50">
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                          <path d="M1 4l3-3 3 3" stroke={sortKey === col.key && sortDir === 'asc' ? 'currentColor' : 'currentColor'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={sortKey === col.key && sortDir === 'asc' ? 1 : 0.4}/>
                        </svg>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={sortKey === col.key && sortDir === 'desc' ? 1 : 0.4}/>
                        </svg>
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-hairline">
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-ink-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, ri) => {
                const rowId = row.id ?? ri
                const isSelected = selected.has(rowId)
                return (
                  <motion.tr
                    key={rowId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: ri * 0.03, duration: 0.15 }}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      'bg-canvas transition-colors duration-100',
                      'hover:bg-surface',
                      isSelected && 'bg-primary/5 hover:bg-primary/8',
                      onRowClick && 'cursor-pointer'
                    )}
                  >
                    {selectable && (
                      <td className="w-10 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => { e.stopPropagation(); toggleRow(rowId) }}
                          aria-label={`Select row ${ri + 1}`}
                          className="accent-primary w-4 h-4 rounded"
                          onClick={e => e.stopPropagation()}
                        />
                      </td>
                    )}
                    {columns.map(col => (
                      <td
                        key={col.key}
                        className={cn(
                          'px-4 py-3 text-ink',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center'
                        )}
                      >
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </motion.tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 text-xs text-ink-muted">
          <span>
            {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <PageBtn disabled={page === 0} onClick={() => setPage(p => p - 1)}>←</PageBtn>
            {Array.from({ length: totalPages }, (_, i) => (
              <PageBtn key={i} active={i === page} onClick={() => setPage(i)}>
                {i + 1}
              </PageBtn>
            ))}
            <PageBtn disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}>→</PageBtn>
          </div>
        </div>
      )}
    </div>
  )
})

function PageBtn({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-7 h-7 flex items-center justify-center rounded-md text-xs transition-colors',
        active ? 'bg-primary text-on-primary' : 'hover:bg-surface text-ink-muted',
        disabled && 'opacity-30 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  )
}

export default DataTable
