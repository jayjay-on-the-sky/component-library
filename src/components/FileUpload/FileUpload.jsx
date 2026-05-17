import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, File, CheckCircle, AlertCircle } from '../../lib/icons'
import { cn } from '../../lib/utils'

const FileUpload = React.forwardRef(({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  onFiles,
  label = 'Drop files here or click to upload',
  sublabel,
  className,
  ...props
}, ref) => {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState([])

  const processFiles = (fileList) => {
    const arr = Array.from(fileList).map(f => ({
      file: f,
      id: Math.random().toString(36).slice(2),
      error: f.size > maxSize ? 'File too large' : null,
    }))
    setFiles(prev => multiple ? [...prev, ...arr] : arr)
    onFiles?.(arr.filter(f => !f.error).map(f => f.file))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const removeFile = (id) => setFiles(f => f.filter(x => x.id !== id))

  const fmt = (bytes) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

  return (
    <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
      <motion.div
        animate={{ borderColor: dragging ? 'var(--color-primary)' : 'var(--color-hairline)' }}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative rounded-[var(--radius-xl)] border-2 border-dashed p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors',
          dragging ? 'bg-primary/5' : 'bg-surface hover:bg-surface-strong'
        )}
      >
        <motion.div
          animate={{ scale: dragging ? 1.1 : 1 }}
          className="w-12 h-12 rounded-full bg-canvas border border-hairline flex items-center justify-center"
        >
          <Upload size={20} className="text-muted" />
        </motion.div>
        <div className="text-center">
          <p className="text-sm font-medium text-ink">{label}</p>
          {sublabel && <p className="text-xs text-muted mt-0.5">{sublabel}</p>}
          {maxSize && <p className="text-xs text-muted mt-0.5">Max size: {fmt(maxSize)}</p>}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={e => processFiles(e.target.files)}
        />
      </motion.div>

      <AnimatePresence>
        {files.map(f => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] border',
              f.error ? 'border-error/30 bg-error/5' : 'border-hairline bg-canvas'
            )}
          >
            <div className={cn('shrink-0', f.error ? 'text-error' : 'text-muted')}>
              {f.error ? <AlertCircle size={16} /> : <File size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink truncate">{f.file.name}</p>
              <p className="text-xs text-muted">{f.error ?? fmt(f.file.size)}</p>
            </div>
            {!f.error && <CheckCircle size={16} className="text-success shrink-0" />}
            <button
              onClick={() => removeFile(f.id)}
              className="text-muted hover:text-ink transition-colors shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
})

FileUpload.displayName = 'FileUpload'
export default FileUpload
