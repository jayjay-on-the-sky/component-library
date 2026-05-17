import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Folder, FolderOpen, File } from '../../lib/icons'
import { cn } from '../../lib/utils'

const TreeNode = ({ node, depth = 0, selected, onSelect }) => {
  const [open, setOpen] = useState(node.defaultOpen ?? false)
  const hasChildren = node.children?.length > 0
  const isSelected = selected === node.id

  const toggle = () => {
    if (hasChildren) setOpen(o => !o)
    onSelect?.(node.id)
  }

  const Icon = node.icon
    ? node.icon
    : hasChildren
      ? (open ? <FolderOpen size={14} /> : <Folder size={14} />)
      : <File size={14} />

  return (
    <div>
      <button
        onClick={toggle}
        aria-expanded={hasChildren ? open : undefined}
        aria-selected={isSelected}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        className={cn(
          'w-full flex items-center gap-2 py-1.5 pr-3 text-sm rounded-[var(--radius-sm)] text-left transition-colors',
          isSelected ? 'bg-primary/10 text-primary font-medium' : 'text-ink-muted hover:bg-surface hover:text-ink'
        )}
      >
        {hasChildren ? (
          <ChevronRight
            size={13}
            className={cn('shrink-0 transition-transform text-muted', open && 'rotate-90')}
          />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span className={cn('shrink-0', isSelected ? 'text-primary' : 'text-muted')}>
          {typeof Icon === 'object' ? Icon : <Icon size={14} />}
        </span>
        <span className="truncate">{node.label}</span>
        {node.badge && (
          <span className="ml-auto text-xs text-muted bg-surface rounded-full px-1.5">{node.badge}</span>
        )}
      </button>

      <AnimatePresence>
        {hasChildren && open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TreeView = React.forwardRef(({ nodes = [], onSelect, className, ...props }, ref) => {
  const [selected, setSelected] = useState(null)

  const handleSelect = (id) => {
    setSelected(id)
    onSelect?.(id)
  }

  return (
    <div ref={ref} role="tree" className={cn('py-1', className)} {...props}>
      {nodes.map(node => (
        <TreeNode key={node.id} node={node} selected={selected} onSelect={handleSelect} />
      ))}
    </div>
  )
})

TreeView.displayName = 'TreeView'
export default TreeView
