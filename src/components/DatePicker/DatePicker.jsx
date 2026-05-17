import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

const DatePicker = React.forwardRef(({
  value,
  onChange,
  placeholder = 'Select date',
  minDate,
  maxDate,
  className,
  ...props
}, ref) => {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const selected = value ? new Date(value) : null

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const selectDay = (day) => {
    const date = new Date(viewYear, viewMonth, day)
    onChange?.(date.toISOString().slice(0, 10))
    setOpen(false)
  }

  const isSelected = (day) => {
    if (!selected) return false
    return selected.getFullYear() === viewYear && selected.getMonth() === viewMonth && selected.getDate() === day
  }

  const isToday = (day) => {
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day
  }

  const displayValue = selected
    ? selected.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <div ref={ref} className={cn('relative inline-block', className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={cn(
          'flex items-center gap-2 h-10 px-3 min-w-[180px] rounded-[var(--radius-md)] border text-sm text-left transition-all',
          open ? 'border-primary ring-2 ring-primary/20' : 'border-hairline hover:border-ink-muted',
          !displayValue && 'text-muted'
        )}
      >
        <Calendar size={14} className="text-muted shrink-0" />
        <span className={cn('flex-1', displayValue ? 'text-ink' : 'text-muted')}>{displayValue || placeholder}</span>
        {displayValue && (
          <span onClick={e => { e.stopPropagation(); onChange?.('') }} className="text-muted hover:text-ink transition-colors">
            <X size={13} />
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.13 }}
            className="absolute top-full left-0 mt-1.5 w-72 bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-xl z-50 p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={prevMonth} className="p-1 rounded hover:bg-surface text-muted hover:text-ink transition-colors">
                <ChevronLeft size={15} />
              </button>
              <span className="text-sm font-semibold text-ink">{MONTHS[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} className="p-1 rounded hover:bg-surface text-muted hover:text-ink transition-colors">
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs text-muted py-1">{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                const sel = isSelected(day)
                const tod = isToday(day)
                return (
                  <button
                    key={day}
                    onClick={() => selectDay(day)}
                    className={cn(
                      'w-9 h-9 rounded-full text-sm flex items-center justify-center transition-colors',
                      sel ? 'bg-primary text-on-primary font-semibold' :
                      tod ? 'text-primary font-semibold hover:bg-primary/10' :
                      'text-ink hover:bg-surface'
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

DatePicker.displayName = 'DatePicker'
export default DatePicker
