import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from '../../lib/icons'
import { cn } from '../../lib/utils'

const Stepper = React.forwardRef(({
  steps = [],
  current = 0,
  orientation = 'horizontal',
  className,
  ...props
}, ref) => {
  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      ref={ref}
      role="list"
      aria-label="Steps"
      className={cn(
        'flex',
        isHorizontal ? 'flex-row items-start' : 'flex-col gap-0',
        className
      )}
      {...props}
    >
      {steps.map((step, i) => {
        const isDone = i < current
        const isActive = i === current

        return (
          <React.Fragment key={i}>
            <div
              role="listitem"
              aria-current={isActive ? 'step' : undefined}
              className={cn('flex', isHorizontal ? 'flex-col items-center flex-1' : 'flex-row items-start gap-4')}
            >
              {/* Circle */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isDone
                      ? 'var(--color-primary)'
                      : isActive
                        ? 'var(--color-primary)'
                        : 'var(--color-surface)',
                    borderColor: isDone || isActive ? 'var(--color-primary)' : 'var(--color-hairline)',
                  }}
                  transition={{ duration: 0.25 }}
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold"
                >
                  <AnimatePresence mode="wait">
                    {isDone ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="text-on-primary"
                      >
                        <Check size={16} strokeWidth={2.5} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="num"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className={isActive ? 'text-on-primary' : 'text-muted'}
                      >
                        {i + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Label */}
              <div className={cn('flex flex-col', isHorizontal ? 'items-center mt-2 text-center' : 'pt-1 pb-6')}>
                <span className={cn('text-sm font-medium', isActive || isDone ? 'text-ink' : 'text-muted')}>
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-muted mt-0.5 max-w-[120px]">{step.description}</span>
                )}
              </div>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              isHorizontal ? (
                <div className="flex-1 h-0.5 mt-[18px] bg-hairline overflow-hidden rounded-full">
                  <motion.div
                    initial={false}
                    animate={{ width: isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="h-full bg-primary"
                  />
                </div>
              ) : (
                <div className="ml-[17px] w-0.5 h-6 bg-hairline overflow-hidden rounded-full">
                  <motion.div
                    initial={false}
                    animate={{ height: isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="w-full bg-primary"
                  />
                </div>
              )
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
})

Stepper.displayName = 'Stepper'
export default Stepper
