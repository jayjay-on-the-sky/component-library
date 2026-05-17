import React from 'react'
import { Copy, Trash2, Pencil, Link, Share2 } from '../../lib/icons'

export default {
  name: 'ContextMenu',
  category: 'Overlays',
  description: 'Right-click context menu with icon support and keyboard shortcuts.',
  variants: [
    {
      label: 'File context',
      props: {
        children: (
          <div className="px-6 py-8 border border-dashed border-hairline rounded-[var(--radius-xl)] text-sm text-muted text-center select-none">
            Right-click me
          </div>
        ),
        items: [
          { icon: <Pencil size={13} />, label: 'Rename', shortcut: 'F2', onClick: () => {} },
          { icon: <Copy size={13} />, label: 'Copy', shortcut: '⌘C', onClick: () => {} },
          { icon: <Link size={13} />, label: 'Copy link', onClick: () => {} },
          { icon: <Share2 size={13} />, label: 'Share…', onClick: () => {} },
          { divider: true },
          { icon: <Trash2 size={13} />, label: 'Delete', shortcut: '⌫', danger: true, onClick: () => {} },
        ],
      },
    },
  ],
}
