import Progress, { ProgressDemo } from './Progress'

export default {
  name: 'Progress',
  category: 'Feedback',
  description: 'Animated progress bar. Semantic color variants, size scale, label and value display.',
  variants: [
    { label: 'Demo', props: {}, Component: ProgressDemo },
    { label: '72% primary', props: { value: 72, label: 'Loading', showValue: true, className: 'w-64' } },
    { label: 'Success', props: { value: 100, variant: 'success', label: 'Complete', showValue: true, className: 'w-64' } },
    { label: 'Slim', props: { value: 60, size: 'sm', className: 'w-64' } },
  ],
}
