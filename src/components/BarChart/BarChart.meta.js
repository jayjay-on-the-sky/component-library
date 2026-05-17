export default {
  name: 'BarChart',
  category: 'Charts',
  description: 'Animated vertical bar chart built from scratch with SVG. Hover tooltips, grid lines, fully responsive.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Growth Data', props: {
        data: [
          { label: 'Q1', value: 120 }, { label: 'Q2', value: 180 },
          { label: 'Q3', value: 160 }, { label: 'Q4', value: 240 },
        ]
      }
    },
    {
      label: 'No Grid', props: { showGrid: false }
    },
  ]
}
