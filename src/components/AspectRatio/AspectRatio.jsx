import React from 'react'
import { cn } from '../../lib/utils'

const ratios = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-video',
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
  '9/16': 'aspect-[9/16]',
  '21/9': 'aspect-[21/9]',
}

const AspectRatio = React.forwardRef(({
  ratio = '16/9',
  children,
  className,
  ...props
}, ref) => {
  const cls = ratios[ratio] || `aspect-[${ratio}]`
  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', cls, className)}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  )
})

AspectRatio.displayName = 'AspectRatio'
export default AspectRatio
