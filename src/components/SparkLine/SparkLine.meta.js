export default {
  name: 'SparkLine',
  category: 'Charts',
  description: 'Tiny inline sparkline for KPI cards and tables. Auto-detects trend for color. Animated draw.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Negative', props: { data: [35, 28, 31, 22, 26, 18, 20, 14, 16, 10], positive: false } },
    { label: 'Wide', props: { width: 120, height: 36 } },
  ]
}
