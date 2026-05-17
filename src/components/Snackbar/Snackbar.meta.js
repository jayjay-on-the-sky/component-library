export default {
  name: 'Snackbar',
  category: 'Feedback',
  description: 'Toast/snackbar notification with success, error, warning, and info variants.',
  variants: [
    { label: 'Default', props: { message: 'Changes saved', position: 'bottom-center' } },
    { label: 'Success', props: { message: 'File uploaded successfully', variant: 'success', action: 'View', position: 'bottom-center' } },
    { label: 'Error', props: { message: 'Failed to save', description: 'Check your connection and try again.', variant: 'error', action: 'Retry', position: 'bottom-center' } },
    { label: 'Warning', props: { message: 'Session expiring soon', variant: 'warning', action: 'Renew', position: 'bottom-center' } },
    { label: 'Info', props: { message: 'New version available', variant: 'info', action: 'Update', position: 'bottom-center' } },
  ],
}
