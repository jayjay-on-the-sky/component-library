import { useState } from 'react'
import Drawer from './Drawer'

function DrawerDemo({ side, title, width }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 transition-opacity"
      >
        Open {side} drawer
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side={side}
        title={title}
        width={width}
      >
        <div className="space-y-3 p-1">
          <p className="text-sm text-muted">Drawer content goes here.</p>
          <div className="h-px bg-hairline" />
          <p className="text-sm text-muted">Add any React content as children.</p>
        </div>
      </Drawer>
    </div>
  )
}

export default {
  name: 'Drawer',
  category: 'Overlays',
  description: 'Slide-in side panel from any edge. Click the button to open.',
  variants: [
    {
      label: 'Right',
      demo: <DrawerDemo side="right" title="Settings" />,
    },
    {
      label: 'Left',
      demo: <DrawerDemo side="left" title="Navigation" width={280} />,
    },
    {
      label: 'Bottom',
      demo: <DrawerDemo side="bottom" title="Share" />,
    },
  ],
}
