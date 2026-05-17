export default {
  name: 'SlideTimeline',
  category: 'Slides',
  description: 'Horizontal timeline slide with active node highlight. Company/product history visualization.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Roadmap', props: {
        eyebrow: 'Roadmap', title: 'What\'s Next',
        events: [
          { year: 'Q1 2026', title: 'AI Assistant', desc: 'Natural language interface for all features.' },
          { year: 'Q2 2026', title: 'Mobile Apps', desc: 'iOS and Android launch.', active: true },
          { year: 'Q3 2026', title: 'Enterprise', desc: 'SSO, audit logs, compliance.' },
          { year: 'Q4 2026', title: 'Global CDN', desc: '50 edge locations worldwide.' },
        ]
      }
    },
  ]
}
