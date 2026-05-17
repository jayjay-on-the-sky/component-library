export default {
  name: 'ConfirmDialog',
  category: 'Feedback',
  description: 'Confirmation modal with danger/warning/info variants.',
  variants: [
    {
      label: 'Danger',
      props: {
        open: true,
        title: 'Delete project?',
        description: 'This action cannot be undone. All data associated with this project will be permanently removed.',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        variant: 'danger',
      },
    },
    {
      label: 'Warning',
      props: {
        open: true,
        title: 'Unsaved changes',
        description: 'You have unsaved changes. Are you sure you want to leave?',
        confirmLabel: 'Leave anyway',
        variant: 'warning',
      },
    },
    {
      label: 'Info',
      props: {
        open: true,
        title: 'Publish changes?',
        description: 'Your changes will be visible to all users immediately.',
        confirmLabel: 'Publish',
        variant: 'info',
      },
    },
  ],
}
