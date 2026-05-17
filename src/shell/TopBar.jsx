import { motion } from 'framer-motion'
import { cn } from '../lib/utils'
import { Plus, Palette, ScanLine, LayoutGrid } from '../lib/icons'

export default function TopBar({ onToggleTheme, onOpenCreate, onOpenScan, themeName, showTheme }) {
  return (
    <header className="flex items-center justify-between h-12 px-4 border-b border-shell-border bg-shell-bg shrink-0 z-10">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-md bg-shell-accent flex items-center justify-center">
          <LayoutGrid size={13} className="text-white" strokeWidth={1.8} />
        </div>
        <span className="text-sm font-semibold text-shell-text tracking-tight">CompLib</span>
        <span className="text-xs text-shell-text-muted font-mono hidden sm:block">v0.1</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {themeName && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-shell-surface text-shell-text-muted border border-shell-border hidden md:block">
            {themeName}
          </span>
        )}

        <TopBarButton onClick={onOpenScan} title="Scan URL or image">
          <ScanLine size={13} strokeWidth={1.7} />
          <span className="hidden sm:block">Scan</span>
        </TopBarButton>

        <TopBarButton
          onClick={onToggleTheme}
          active={showTheme}
          title="Load design.md theme"
        >
          <Palette size={13} strokeWidth={1.7} />
          <span className="hidden sm:block">Theme</span>
        </TopBarButton>

        <motion.button
          onClick={onOpenCreate}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-shell-accent text-white rounded-md hover:bg-shell-accent-hover transition-colors"
        >
          <Plus size={12} strokeWidth={2} />
          Create
        </motion.button>
      </div>
    </header>
  )
}

function TopBarButton({ children, onClick, active, title }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      title={title}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
        active
          ? 'bg-shell-surface text-shell-text border border-shell-border'
          : 'text-shell-text-muted hover:text-shell-text hover:bg-shell-surface'
      )}
    >
      {children}
    </motion.button>
  )
}

