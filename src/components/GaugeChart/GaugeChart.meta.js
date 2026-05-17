export default {
  name: 'GaugeChart',
  category: 'Charts',
  description: 'Semicircular gauge with animated needle sweep, colored zones (green/yellow/red), and value label.',
  variants: [
    { label: 'Default', props: { value: 62 } },
    { label: 'Critical', props: { value: 85, label: 'CPU Load' } },
    { label: 'Healthy', props: { value: 22, label: 'Error Rate' } },
    { label: 'Large', props: { value: 70, size: 280, thickness: 24 } },
  ]
}
