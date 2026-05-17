export default {
  name: 'AreaChart',
  category: 'Charts',
  description: 'Animated area chart with gradient fill, path draw animation, and hover tooltips.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Traffic', props: {
        data: [
          { label: 'Mon', value: 1200 }, { label: 'Tue', value: 1900 },
          { label: 'Wed', value: 1600 }, { label: 'Thu', value: 2400 },
          { label: 'Fri', value: 2100 }, { label: 'Sat', value: 800 },
          { label: 'Sun', value: 600 },
        ]
      }
    },
  ]
}
