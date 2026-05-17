export default {
  name: 'BubbleChart',
  category: 'Charts',
  description: 'Scatter chart with bubble size as a third dimension. Animated, hover tooltips.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Market Share', props: {
        xLabel: 'Growth Rate', yLabel: 'Market Share',
        data: [
          { label: 'Alpha', x: 80, y: 65, size: 50 },
          { label: 'Beta', x: 45, y: 80, size: 35 },
          { label: 'Gamma', x: 60, y: 40, size: 25 },
          { label: 'Delta', x: 30, y: 55, size: 45 },
        ]
      }
    },
  ]
}
