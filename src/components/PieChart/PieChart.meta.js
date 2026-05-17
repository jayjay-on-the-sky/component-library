export default {
  name: 'PieChart',
  category: 'Charts',
  description: 'SVG pie chart with animated sector draw, hover explode effect, and legend.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Traffic Sources', props: {
        data: [
          { label: 'Search', value: 55 }, { label: 'Direct', value: 22 },
          { label: 'Social', value: 14 }, { label: 'Email', value: 9 },
        ]
      }
    },
  ]
}
