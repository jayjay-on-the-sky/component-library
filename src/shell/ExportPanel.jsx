import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { exportAsPng } from '../lib/pngExporter'
import { downloadHtml, copyHtml, copySnippet } from '../lib/htmlExporter'
import { Download, Check } from '../lib/icons'

export default function ExportPanel({ previewRef, componentName, variantLabel = 'default' }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | exporting | copied
  const menuRef = useRef(null)

  const flash = (duration = 1600) => {
    setStatus('copied')
    setTimeout(() => setStatus('idle'), duration)
  }

  const handlePng = async (size) => {
    setStatus('exporting')
    setOpen(false)
    try {
      await exportAsPng(previewRef.current, { size, filename: componentName })
    } catch (e) {
      console.error('PNG export failed:', e)
    } finally {
      setStatus('idle')
    }
  }

  const handleHtmlDownload = () => {
    setOpen(false)
    downloadHtml(previewRef.current, componentName, variantLabel, {
      width: 1280,
      height: 720,
      centerContent: true,
    })
  }

  const handleHtmlCopy = async () => {
    setOpen(false)
    await copyHtml(previewRef.current, componentName, variantLabel, {
      width: 1280,
      height: 720,
    })
    flash()
  }

  const handleSnippetCopy = async () => {
    setOpen(false)
    await copySnippet(previewRef.current, componentName, variantLabel)
    flash()
  }

  // Close menu on outside click
  const handleBackdrop = (e) => {
    if (!menuRef.current?.contains(e.target)) setOpen(false)
  }

  const busy = status === 'exporting'
  const didCopy = status === 'copied'

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={handleBackdrop} aria-hidden />
      )}

      <div className="relative z-50" ref={menuRef}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => !busy && setOpen(v => !v)}
          disabled={busy}
          aria-label="Export component"
          aria-expanded={open}
          aria-haspopup="menu"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md transition-colors
            text-shell-text-muted hover:text-shell-text hover:bg-shell-surface disabled:opacity-50"
        >
          {busy ? (
            <span className="animate-pulse text-shell-text-muted">Exporting…</span>
          ) : didCopy ? (
            <>
              <Check size={12} strokeWidth={2.2} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Download size={12} strokeWidth={1.7} />
              Export
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: 4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              className="absolute right-0 top-full mt-1 w-52 bg-shell-surface border border-shell-border rounded-xl shadow-2xl overflow-hidden"
            >
              {/* PNG section */}
              <div className="px-3 pt-2.5 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-shell-text-muted">PNG</p>
              </div>
              <ExportOption
                label="Component (2×)"
                desc="Natural size, transparent bg"
                onClick={() => handlePng('component')}
              />
              <ExportOption
                label="Presentation (1280×720)"
                desc="16:9 · drop into any slide"
                onClick={() => handlePng('presentation')}
              />

              {/* HTML section */}
              <div className="border-t border-shell-border px-3 pt-2.5 pb-1 mt-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-shell-text-muted">HTML · Reveal.js / iframe</p>
              </div>
              <ExportOption
                label="Download .html file"
                desc="1280×720 · self-contained"
                onClick={handleHtmlDownload}
              />
              <ExportOption
                label="Copy full HTML"
                desc="Paste into any .html file"
                onClick={handleHtmlCopy}
              />
              <ExportOption
                label="Copy inner snippet"
                desc="Just the component markup"
                onClick={handleSnippetCopy}
              />

              {/* Usage hint */}
              <div className="border-t border-shell-border px-3 py-2.5">
                <p className="text-[10px] text-shell-text-muted leading-relaxed">
                  Reveal.js: <code className="font-mono opacity-70">&lt;iframe src="Component.html"/&gt;</code>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

function ExportOption({ label, desc, onClick }) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className="w-full flex flex-col px-3 py-2 text-left hover:bg-shell-bg transition-colors"
    >
      <span className="text-xs font-medium text-shell-text">{label}</span>
      <span className="text-[10px] text-shell-text-muted mt-0.5">{desc}</span>
    </button>
  )
}
