export default {
  name: 'SlideThreeUp',
  category: 'Slides',
  description: 'Three-column feature slide with icons or big numbers. Staggered card animation.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Stats', props: {
        eyebrow: 'By the numbers',
        title: 'Results that speak\nfor themselves',
        columns: [
          { number: '10×', title: 'Faster deploys', body: 'Compared to traditional CI/CD pipelines.' },
          { number: '99.99%', title: 'Uptime', body: 'Guaranteed by our enterprise SLA.' },
          { number: '$2.4M', title: 'Saved per year', body: 'Average customer infrastructure savings.' },
        ]
      }
    },
  ]
}
