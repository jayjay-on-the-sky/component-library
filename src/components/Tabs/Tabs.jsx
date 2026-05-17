import * as RadixTabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Tabs — Radix UI base, animated underline indicator, keyboard navigation.
 * Variants: underline | pill
 */

function Tabs({ defaultValue, value, onValueChange, children, className, ...props }) {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn('flex flex-col', className)}
      {...props}
    >
      {children}
    </RadixTabs.Root>
  )
}

function TabsList({ children, variant = 'underline', className }) {
  const listStyles = {
    underline: 'border-b border-hairline gap-0',
    pill: 'bg-surface-strong p-1 rounded-xl gap-1',
  }

  return (
    <RadixTabs.List
      className={cn('flex items-center', listStyles[variant], className)}
      data-variant={variant}
    >
      {children}
    </RadixTabs.List>
  )
}

function TabsTrigger({ value, children, variant = 'underline', className }) {
  const triggerStyles = {
    underline: cn(
      'relative px-4 py-2.5 text-sm font-medium text-ink-muted',
      'hover:text-ink transition-colors duration-150',
      'data-[state=active]:text-ink',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:rounded'
    ),
    pill: cn(
      'relative px-4 py-2 text-sm font-medium text-ink-muted rounded-lg',
      'hover:text-ink transition-colors duration-150',
      'data-[state=active]:text-ink data-[state=active]:bg-canvas data-[state=active]:shadow-sm',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
    ),
  }

  return (
    <RadixTabs.Trigger
      value={value}
      className={cn(triggerStyles[variant], 'group', className)}
    >
      {children}

      {/* Animated underline indicator (underline variant only) */}
      {variant === 'underline' && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
          <motion.span
            // We animate via CSS data-state instead since layoutId works per-list
            className="block h-full bg-primary transition-transform origin-left duration-200
              scale-x-0 group-data-[state=active]:scale-x-100"
          />
        </span>
      )}
    </RadixTabs.Trigger>
  )
}

function TabsContent({ value, children, className }) {
  return (
    <RadixTabs.Content
      value={value}
      className={cn(
        'mt-4 text-sm text-ink-muted leading-relaxed',
        'focus:outline-none',
        'data-[state=inactive]:hidden',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        {children}
      </motion.div>
    </RadixTabs.Content>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
