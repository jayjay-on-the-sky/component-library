export default {
  name: 'Toast',
  category: 'Feedback',
  description: 'Non-blocking notification toast with auto-dismiss and type variants.',
  variants: [
    { label: 'Success', props: { type: 'success', title: 'Changes saved', description: 'Your project has been saved successfully.' } },
    { label: 'Error', props: { type: 'error', title: 'Upload failed', description: 'Please check your connection and try again.' } },
    { label: 'Warning', props: { type: 'warning', title: 'Storage nearly full', description: 'You have used 90% of your storage quota.' } },
    { label: 'Info', props: { type: 'info', title: 'New update available', description: 'v2.4.0 includes performance improvements.' } },
  ],
}
