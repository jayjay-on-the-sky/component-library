export default {
  name: 'SlideChart',
  category: 'Slides',
  description: 'Data visualization slide with bar chart, insight callout, and key metric highlight.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'User Growth', props: {
        eyebrow: 'Adoption',
        title: 'User growth\naccelerating',
        unit: 'K Users',
        insight: '10× user growth in 18 months with zero paid acquisition.',
        data: [{ label: 'Jan', value: 5 }, { label: 'Mar', value: 12 }, { label: 'May', value: 28 }, { label: 'Jul', value: 55 }, { label: 'Sep', value: 90 }, { label: 'Nov', value: 140 }],
      }
    },
  ]
}
