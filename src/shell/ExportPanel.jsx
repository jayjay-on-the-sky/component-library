import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { exportAsPng } from '../lib/pngExporter'

export default function ExportPanel({ previewRef, componentName }) {
  const [open, setOpen] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExport = async (size) => {
    setExporting(true)
    setOpen(false)
    try {
      await exportAsPng(previewRef.current, { size, filename: componentName })
    } catch (e) {
      console.error('Export failed:', e)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(v => !v)}
        disabled={exporting}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-shell-text-muted hover:text-shell-text hover:bg-shell-surface rounded-md transition-colors"
      >
        {exporting ? (
          <span className="animate-pulse">Exporting…</span>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1 w-44 bg-shell-surface border border-shell-border rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <ExportOption
              label="Component PNG"
              desc="Natural size, 2×"
              onClick={() => handleExport('component')}
            />
            <ExportOption
              label="Presentation PNG"
              desc="1280×720, 16:9"
              onClick={() => handleExport('presentation')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ExportOption({ label, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex flex-col px-3 py-2.5 text-left hover:bg-shell-bg transition-colors"
    >
      <span className="text-xs font-medium text-shell-text">{label}</span>
      <span className="text-[10px] text-shell-text-muted mt-0.5">{desc}</span>
    </button>
  )
}
