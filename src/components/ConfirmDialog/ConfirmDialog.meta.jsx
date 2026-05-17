import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'

function ConfirmDialogDemo({ variant, title, description, confirmLabel, cancelLabel = 'Cancel' }) {
  const [open, setOpen] = useState(false)

  const variantColors = {
    danger: 'bg-error text-white',
    warning: 'bg-warning text-white',
    info: 'bg-primary text-white',
    success: 'bg-success text-white',
  }

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => setOpen(true)}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-90 ${variantColors[variant] || variantColors.warning}`}
      >
        Open Dialog
      </button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title={title}
        description={description}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        variant={variant}
      />
    </div>
  )
}

export default {
  name: 'ConfirmDialog',
  category: 'Feedback',
  description: 'Confirmation modal with danger/warning/info variants. Click the button to open.',
  variants: [
    {
      label: 'Danger',
      demo: (
        <ConfirmDialogDemo
          variant="danger"
          title="Delete project?"
          description="This action cannot be undone. All data associated with this project will be permanently removed."
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      ),
    },
    {
      label: 'Warning',
      demo: (
        <ConfirmDialogDemo
          variant="warning"
          title="Unsaved changes"
          description="You have unsaved changes. Are you sure you want to leave?"
          confirmLabel="Leave anyway"
          cancelLabel="Stay"
        />
      ),
    },
    {
      label: 'Info',
      demo: (
        <ConfirmDialogDemo
          variant="info"
          title="Publish changes?"
          description="Your changes will be visible to all users immediately."
          confirmLabel="Publish"
          cancelLabel="Cancel"
        />
      ),
    },
  ],
}
