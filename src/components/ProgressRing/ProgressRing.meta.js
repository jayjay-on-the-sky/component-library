export default {
  name: 'ProgressRing',
  category: 'Charts',
  description: 'Circular progress ring with animated sweep, percentage label, and customizable color.',
  variants: [
    { label: 'Default', props: { value: 72 } },
    { label: 'Success', props: { value: 93, color: 'var(--color-success)', label: 'Uptime' } },
    { label: 'Warning', props: { value: 45, color: 'var(--color-warning)', label: 'Quota' } },
    { label: 'Large', props: { value: 68, size: 160, thickness: 14 } },
  ]
}
