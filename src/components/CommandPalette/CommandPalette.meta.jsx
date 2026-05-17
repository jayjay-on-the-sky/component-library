import React, { useState } from 'react'
import { Settings, User, Search, FileText, Plus } from '../../lib/icons'

const sampleItems = [
  {
    group: 'Actions',
    commands: [
      { label: 'Create new project', icon: <Plus size={14} />, shortcut: '⌘N', onSelect: () => {} },
      { label: 'Search files', icon: <Search size={14} />, shortcut: '⌘F', onSelect: () => {} },
    ],
  },
  {
    group: 'Navigation',
    commands: [
      { label: 'Go to settings', icon: <Settings size={14} />, shortcut: '⌘,', onSelect: () => {} },
      { label: 'View profile', icon: <User size={14} />, onSelect: () => {} },
      { label: 'Open docs', icon: <FileText size={14} />, onSelect: () => {} },
    ],
  },
]

const Demo = ({ open: _open }) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-[var(--radius-md)] bg-surface border border-hairline text-sm text-ink-muted flex items-center gap-2 hover:bg-surface-strong transition-colors"
      >
        <Search size={14} />
        Search commands…
        <kbd className="ml-2 text-xs bg-canvas border border-hairline rounded px-1.5 py-0.5">⌘K</kbd>
      </button>
      <CommandPaletteComponent open={open} onClose={() => setOpen(false)} items={sampleItems} />
    </div>
  )
}

import CommandPaletteComponent from './CommandPalette.jsx'

export default {
  name: 'CommandPalette',
  category: 'Navigation',
  description: '⌘K command palette for quick navigation and actions.',
  variants: [
    { label: 'Interactive Demo', props: {}, renderDemo: Demo },
  ],
}
