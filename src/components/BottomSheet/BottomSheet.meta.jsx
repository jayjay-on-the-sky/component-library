import { useState } from 'react'
import BottomSheet from './BottomSheet'

const Demo = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex items-center justify-center w-full">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-sm font-medium bg-primary text-on-primary rounded-lg"
      >
        Open Bottom Sheet
      </button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Share component" snapPoint="50vh">
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">Choose how to share this component with your team.</p>
          <div className="space-y-2">
            {['Copy link', 'Export as PNG', 'Export as code', 'Share to Figma'].map(opt => (
              <button key={opt} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-surface text-sm text-ink text-left hover:bg-surface-strong transition-colors">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}

export default {
  name: 'BottomSheet',
  category: 'Feedback',
  description: 'Drag-to-dismiss modal drawer anchored to the bottom with spring animation.',
  variants: [
    { label: 'Default', Component: Demo, props: {} },
  ],
}
