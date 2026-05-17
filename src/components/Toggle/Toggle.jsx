import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const Toggle = forwardRef(function Toggle(
  { defaultChecked = false, disabled = false, label, labelPosition = 'right', onChange, className },
  ref
) {
  const [checked, setChecked] = useState(defaultChecked)

  const handleToggle = () => {
    if (disabled) return
    const next = !checked
    setChecked(next)
    onChange?.(next)
  }

  const track = (
    <button
      ref={ref}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-ring',
        checked ? 'bg-primary' : 'bg-surface-strong',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'inline-block h-4 w-4 rounded-full bg-white shadow-sm',
          checked ? 'translate-x-5' : 'translate-x-1'
        )}
      />
    </button>
  )

  if (!label) return <div className={className}>{track}</div>

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2.5 select-none',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        labelPosition === 'left' && 'flex-row-reverse',
        className
      )}
    >
      {track}
      <span className="text-sm text-ink">{label}</span>
    </label>
  )
})

export default Toggle
