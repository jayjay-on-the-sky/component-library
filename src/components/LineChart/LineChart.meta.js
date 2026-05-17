export default {
  name: 'LineChart',
  category: 'Charts',
  description: 'Animated SVG line chart with path draw-on animation, hover dots, and tooltips.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Revenue', props: {
        data: [
          { label: 'W1', value: 12000 }, { label: 'W2', value: 18500 },
          { label: 'W3', value: 14000 }, { label: 'W4', value: 22000 },
          { label: 'W5', value: 19000 }, { label: 'W6', value: 28000 },
        ]
      }
    },
    { label: 'No Dots', props: { showDots: false } },
  ]
}
