import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const OTPInput = React.forwardRef(({
  length = 6,
  value = '',
  onChange,
  disabled = false,
  error = false,
  className,
  ...props
}, ref) => {
  const inputs = useRef([])
  const chars = value.split('').slice(0, length)
  while (chars.length < length) chars.push('')

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...chars]
    next[i] = val
    onChange?.(next.join(''))
    if (val && i < length - 1) inputs.current[i + 1]?.focus()
  }

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace') {
      if (!chars[i] && i > 0) {
        const next = [...chars]
        next[i - 1] = ''
        onChange?.(next.join(''))
        inputs.current[i - 1]?.focus()
      }
    }
    if (e.key === 'ArrowLeft' && i > 0) inputs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < length - 1) inputs.current[i + 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange?.(pasted.padEnd(length, '').slice(0, length))
    const focusIdx = Math.min(pasted.length, length - 1)
    inputs.current[focusIdx]?.focus()
  }

  return (
    <div ref={ref} className={cn('flex items-center gap-2', className)} role="group" aria-label="OTP input" {...props}>
      {chars.map((char, i) => (
        <React.Fragment key={i}>
          <motion.input
            ref={el => (inputs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={char}
            disabled={disabled}
            onChange={e => handleChange(e, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            onPaste={handlePaste}
            aria-label={`Digit ${i + 1}`}
            whileFocus={{ scale: 1.04 }}
            className={cn(
              'w-11 h-12 text-center text-lg font-semibold rounded-[var(--radius-md)] border bg-canvas text-ink outline-none transition-all',
              error
                ? 'border-error focus:ring-2 focus:ring-error/30'
                : 'border-hairline focus:border-primary focus:ring-2 focus:ring-primary/20',
              disabled && 'opacity-50 cursor-not-allowed',
              char && 'border-primary'
            )}
          />
          {i === Math.floor(length / 2) - 1 && length % 2 === 0 && (
            <span className="text-muted font-bold">—</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
})

OTPInput.displayName = 'OTPInput'
export default OTPInput
