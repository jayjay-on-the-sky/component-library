export default {
  name: 'ProgressBar',
  category: 'Feedback',
  description: 'Linear and circular progress indicators.',
  variants: [
    { label: 'Default 60%', props: { value: 60, label: 'Upload progress', showValue: true } },
    { label: 'Success', props: { value: 100, color: 'success', label: 'Complete', showValue: true } },
    { label: 'Indeterminate', props: { indeterminate: true, label: 'Loading…' } },
    { label: 'Small', props: { value: 40, size: 'sm' } },
  ],
}
