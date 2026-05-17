import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import TopBar from './shell/TopBar'
import Sidebar from './shell/Sidebar'
import PreviewCanvas from './shell/PreviewCanvas'
import ThemePanel from './shell/ThemePanel'
import CreateModal from './shell/CreateModal'
import ScanModal from './shell/ScanModal'
import { useRegistry } from './hooks/useRegistry'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const registry = useRegistry()
  const theme = useTheme()
  const [selected, setSelected] = useState(null)
  const [showTheme, setShowTheme] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showScan, setShowScan] = useState(false)

  // Auto-select first component on load
  const selectedComp = selected ?? registry.components[0] ?? null

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-shell-bg text-shell-text font-sans">
      <TopBar
        onToggleTheme={() => setShowTheme(v => !v)}
        onOpenCreate={() => setShowCreate(true)}
        onOpenScan={() => setShowScan(true)}
        themeName={theme.themeState.base?.name}
        showTheme={showTheme}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          registry={registry}
          selected={selectedComp}
          onSelect={setSelected}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <PreviewCanvas component={selectedComp} theme={theme} />
        </main>

        <AnimatePresence>
          {showTheme && (
            <ThemePanel theme={theme} onClose={() => setShowTheme(false)} />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showCreate && (
          <CreateModal onClose={() => setShowCreate(false)} />
        )}
        {showScan && (
          <ScanModal onClose={() => setShowScan(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
