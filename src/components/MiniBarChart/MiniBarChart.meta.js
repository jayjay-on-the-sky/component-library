export default {
  name: 'MiniBarChart',
  category: 'Charts',
  description: 'Tiny inline sparkbar for KPI cards and tables. Animated height fill.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Success', props: { color: 'var(--color-success)', data: [2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9] } },
    { label: 'Wide', props: { width: 120, height: 40 } },
  ]
}
