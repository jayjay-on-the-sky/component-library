import React from 'react'
import { Settings, User, LogOut, ChevronDown } from '../../lib/icons'

export default {
  name: 'Popover',
  category: 'Overlays',
  description: 'Contextual floating panel triggered by a click.',
  variants: [
    {
      label: 'Menu',
      props: {
        placement: 'bottom-start',
        trigger: (
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-md)] border border-hairline text-sm text-ink hover:bg-surface transition-colors">
            Options <ChevronDown size={14} className="text-muted" />
          </button>
        ),
        children: (
          <div className="py-1">
            {[
              { icon: <User size={14} />, label: 'Profile' },
              { icon: <Settings size={14} />, label: 'Settings' },
              { icon: <LogOut size={14} />, label: 'Sign out' },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-ink hover:bg-surface transition-colors">
                <span className="text-muted">{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        ),
      },
    },
    {
      label: 'Info panel',
      props: {
        placement: 'bottom',
        trigger: (
          <button className="px-3 py-2 rounded-[var(--radius-md)] bg-primary text-on-primary text-sm">
            Click me
          </button>
        ),
        children: (
          <div className="p-4">
            <h4 className="font-semibold text-ink text-sm mb-1">Quick stats</h4>
            <p className="text-xs text-muted">28 components · 7 categories · 100% accessible</p>
          </div>
        ),
      },
    },
  ],
}
