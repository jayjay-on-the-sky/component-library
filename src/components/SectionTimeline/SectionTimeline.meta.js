export default {
  name: 'SectionTimeline',
  category: 'Sections',
  description: 'Alternating company history / milestone timeline section.',
  variants: [
    {
      label: 'Default',
      props: {
        eyebrow: 'Our Journey',
        title: 'Built for the long run',
        subtitle: 'From a small side project to the platform thousands of teams rely on.',
        events: [
          { year: '2019', title: 'Founded', description: 'Started as a weekend side project to solve our own design workflow problems.', tag: 'Founding' },
          { year: '2020', title: 'First 100 customers', description: 'Reached our first milestone with customers across 12 countries.', tag: 'Growth' },
          { year: '2021', title: 'Series A — $8M', description: 'Raised our first major round to build the team and product.', tag: 'Funding' },
          { year: '2022', title: 'Component library launch', description: 'Launched our open-source component library with 50+ components.', tag: 'Product' },
          { year: '2024', title: '10,000 teams', description: 'Crossed 10k teams and expanded our enterprise offering.', tag: 'Milestone' },
        ],
      },
    },
  ],
}
