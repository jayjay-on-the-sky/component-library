export default {
  name: 'SlideBeforeAfter',
  category: 'Slides',
  description: 'Side-by-side before/after comparison slide. Red X vs green checkmark lists with stagger animation.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'DX Comparison', props: {
        title: 'Developer Experience',
        eyebrow: 'The Difference',
        beforeLabel: 'Legacy Stack',
        afterLabel: 'Modern Stack',
        beforeItems: ['2-week release cycles', 'Manual testing', 'Monolithic codebase'],
        afterItems: ['Ship multiple times per day', 'Automated test suite', 'Microservices architecture'],
      }
    },
  ]
}
