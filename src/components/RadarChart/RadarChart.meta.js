export default {
  name: 'RadarChart',
  category: 'Charts',
  description: 'Spider/radar chart with animated polygon draw, grid rings, and multi-dataset support.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Multi Dataset', props: {
        data: [
          { label: 'Speed', value: 80 }, { label: 'Features', value: 90 },
          { label: 'Reliability', value: 85 }, { label: 'Cost', value: 60 },
          { label: 'Support', value: 75 },
        ],
        datasets: [
          { label: 'Product A', data: [{ value: 80 }, { value: 90 }, { value: 85 }, { value: 60 }, { value: 75 }], color: 'var(--color-primary)' },
          { label: 'Product B', data: [{ value: 65 }, { value: 70 }, { value: 92 }, { value: 85 }, { value: 60 }], color: 'var(--color-success)' },
        ]
      }
    },
  ]
}
