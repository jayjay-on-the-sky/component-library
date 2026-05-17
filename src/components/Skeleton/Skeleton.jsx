import { cn } from '../../lib/utils'

export default function Skeleton({ className, circle = false, ...props }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'shimmer',
        circle ? 'rounded-full' : 'rounded-[var(--radius-md)]',
        className
      )}
      {...props}
    />
  )
}

// Preset compositions
export function SkeletonCard() {
  return (
    <div className="w-72 border border-hairline rounded-[var(--radius-lg)] p-5 space-y-4 bg-canvas">
      <div className="flex items-center gap-3">
        <Skeleton circle className="w-10 h-10 shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-5/6" />
        <Skeleton className="h-2.5 w-4/6" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  )
}

export function SkeletonText({ lines = 3 }) {
  const widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/4', 'w-2/3']
  return (
    <div className="space-y-2 w-64">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={cn('h-3', widths[i % widths.length])} />
      ))}
    </div>
  )
}
