export default {
  name: 'DonutChart',
  category: 'Charts',
  description: 'SVG donut/ring chart with animated segment draw, center label, hover explode effect, and legend.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Budget', props: {
        centerLabel: 'Budget',
        data: [
          { label: 'R&D', value: 40 },
          { label: 'Sales', value: 25 },
          { label: 'Ops', value: 20 },
          { label: 'HR', value: 15 },
        ]
      }
    },
    { label: 'Large', props: { size: 240, thickness: 36 } },
  ]
}
