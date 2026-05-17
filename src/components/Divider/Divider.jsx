import React from 'react'
import { cn } from '../../lib/utils'

const Divider = React.forwardRef(({
  label,
  orientation = 'horizontal',
  className,
  ...props
}, ref) => {
  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="vertical"
        className={cn('w-px self-stretch bg-hairline', className)}
        {...props}
      />
    )
  }

  if (label) {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn('flex items-center gap-3', className)}
        {...props}
      >
        <div className="flex-1 h-px bg-hairline" />
        <span className="text-xs text-muted shrink-0">{label}</span>
        <div className="flex-1 h-px bg-hairline" />
      </div>
    )
  }

  return (
    <hr
      ref={ref}
      role="separator"
      className={cn('border-0 h-px bg-hairline', className)}
      {...props}
    />
  )
})

Divider.displayName = 'Divider'
export default Divider
