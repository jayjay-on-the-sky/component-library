export default {
  name: 'HorizontalBar',
  category: 'Charts',
  description: 'Horizontal bar chart ideal for rankings and comparisons. Animated fill, hover highlight.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Rankings', props: {
        data: [
          { label: 'React', value: 94 }, { label: 'Vue', value: 72 },
          { label: 'Angular', value: 58 }, { label: 'Svelte', value: 45 },
          { label: 'Solid', value: 31 },
        ]
      }
    },
    { label: 'No Values', props: { showValues: false } },
  ]
}
