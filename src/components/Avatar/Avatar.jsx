import { cn } from '../../lib/utils'

const statusColors = {
  online:  'bg-success',
  away:    'bg-warning',
  offline: 'bg-surface-strong',
  busy:    'bg-error',
}

const sizes = {
  sm:  { wrap: 'w-7 h-7', text: 'text-[10px]', dot: 'w-2 h-2' },
  md:  { wrap: 'w-9 h-9', text: 'text-xs',     dot: 'w-2.5 h-2.5' },
  lg:  { wrap: 'w-12 h-12', text: 'text-sm',   dot: 'w-3 h-3' },
  xl:  { wrap: 'w-16 h-16', text: 'text-base',  dot: 'w-3.5 h-3.5' },
}

function Avatar({ src, alt = '', initials, status, size = 'md', className }) {
  const s = sizes[size]

  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      <div className={cn(
        'rounded-full overflow-hidden bg-primary-muted flex items-center justify-center ring-2 ring-canvas',
        s.wrap
      )}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className={cn('font-semibold text-primary select-none', s.text)}>
            {initials ?? alt.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-canvas',
            statusColors[status],
            s.dot,
            status === 'online' && 'animate-pulse'
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  )
}

// Avatar group (stacked)
function AvatarGroup({ avatars = [], max = 4 }) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((a, i) => (
        <Avatar key={i} {...a} className="ring-2 ring-canvas" />
      ))}
      {overflow > 0 && (
        <div className="w-9 h-9 rounded-full bg-surface border-2 border-canvas flex items-center justify-center">
          <span className="text-[11px] font-semibold text-muted">+{overflow}</span>
        </div>
      )}
    </div>
  )
}

Avatar.Group = AvatarGroup

export function AvatarGroupDemo() {
  return (
    <AvatarGroup
      avatars={[
        { initials: 'AK', status: 'online' },
        { initials: 'MJ', status: 'away' },
        { initials: 'TR' },
        { initials: 'SL', status: 'busy' },
        { initials: 'PD' },
        { initials: 'YK' },
      ]}
      max={4}
    />
  )
}

export default Avatar
