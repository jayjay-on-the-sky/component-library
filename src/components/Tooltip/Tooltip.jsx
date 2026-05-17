import * as RadixTooltip from '@radix-ui/react-tooltip'
import { cn } from '../../lib/utils'

export function TooltipProvider({ children }) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      {children}
    </RadixTooltip.Provider>
  )
}

export default function Tooltip({ children, content, side = 'top', align = 'center' }) {
  return (
    <TooltipProvider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              'z-50 px-2.5 py-1.5 text-xs font-medium rounded-[var(--radius-md)]',
              'bg-ink text-canvas shadow-lg',
              'animate-in fade-in-0 zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              'data-[side=bottom]:slide-in-from-top-1',
              'data-[side=top]:slide-in-from-bottom-1',
            )}
          >
            {content}
            <RadixTooltip.Arrow className="fill-ink" width={8} height={4} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </TooltipProvider>
  )
}

// Demo wrapper
import Button from '../Button/Button'
export function TooltipDemo() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="secondary" size="sm">Hover top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="secondary" size="sm">Hover bottom</Button>
      </Tooltip>
      <Tooltip content="Right side tooltip" side="right">
        <Button variant="secondary" size="sm">Hover right</Button>
      </Tooltip>
    </div>
  )
}
