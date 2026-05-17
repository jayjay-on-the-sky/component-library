import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { Search } from '../lib/icons'

export default function Sidebar({ registry, selected, onSelect }) {
  const { components, categories, query, setQuery } = registry

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = components.filter(c => c.category === cat)
    return acc
  }, {})

  return (
    <aside
      className="w-56 shrink-0 flex flex-col border-r border-shell-border bg-shell-sidebar overflow-hidden"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Search */}
      <div className="p-3 border-b border-shell-border">
        <div className="relative">
          <Search
            size={12}
            strokeWidth={1.7}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-shell-text-muted pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 text-xs bg-shell-surface border border-shell-border rounded-md text-shell-text placeholder-shell-text-muted focus:outline-none focus:border-shell-accent transition-colors"
          />
        </div>
      </div>

      {/* Component list */}
      <nav className="flex-1 overflow-y-auto py-2">
        <AnimatePresence mode="wait">
          {Object.entries(grouped).map(([cat, items]) =>
            items.length > 0 && (
              <div key={cat} className="mb-1">
                <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-shell-text-muted">
                  {cat}
                </div>
                {items.map(comp => (
                  <SidebarItem
                    key={comp.id}
                    comp={comp}
                    isSelected={selected?.id === comp.id}
                    onClick={() => onSelect(comp)}
                  />
                ))}
              </div>
            )
          )}
        </AnimatePresence>

        {components.length === 0 && (
          <p className="px-4 py-6 text-xs text-shell-text-muted text-center">
            No components found
          </p>
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-shell-border">
        <p className="text-[10px] text-shell-text-muted">
          {registry.total} component{registry.total !== 1 ? 's' : ''}
        </p>
      </div>
    </aside>
  )
}

function SidebarItem({ comp, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors relative',
        isSelected
          ? 'text-shell-text bg-shell-surface'
          : 'text-shell-text-muted hover:text-shell-text hover:bg-shell-surface/50'
      )}
    >
      {isSelected && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute left-0 top-1 bottom-1 w-0.5 bg-shell-accent rounded-full"
        />
      )}
      <span className="truncate">{comp.name}</span>
    </motion.button>
  )
}
