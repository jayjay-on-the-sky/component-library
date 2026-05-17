export default {
  name: 'SectionStats',
  category: 'Sections',
  description: 'Animated count-up metrics bar with eyebrow label and dividers.',
  variants: [
    {
      label: 'Default',
      props: {
        eyebrow: 'Trusted by builders worldwide',
        stats: [
          { value: 12000, label: 'Components generated', suffix: '+' },
          { value: 98, label: 'WCAG AA compliant', suffix: '%' },
          { value: 4200, label: 'GitHub stars', suffix: '+' },
          { value: 3, label: 'Lines to re-theme everything', suffix: '' },
        ],
      },
    },
  ],
}
