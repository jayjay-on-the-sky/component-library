import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export default function TopBar({ onToggleTheme, onOpenCreate, onOpenScan, themeName, showTheme }) {
  return (
    <header className="flex items-center justify-between h-12 px-4 border-b border-shell-border bg-shell-bg shrink-0 z-10">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-md bg-shell-accent flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.3"/>
          </svg>
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
          <ScanIcon />
          <span className="hidden sm:block">Scan</span>
        </TopBarButton>

        <TopBarButton
          onClick={onToggleTheme}
          active={showTheme}
          title="Load design.md theme"
        >
          <ThemeIcon />
          <span className="hidden sm:block">Theme</span>
        </TopBarButton>

        <motion.button
          onClick={onOpenCreate}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-shell-accent text-white rounded-md hover:bg-shell-accent-hover transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
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

function ThemeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4"/>
    </svg>
  )
}

function ScanIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 10.5h4M10 8.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}
