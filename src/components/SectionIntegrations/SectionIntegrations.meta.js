export default {
  name: 'SectionIntegrations',
  category: 'Sections',
  description: 'Orbital logo grid showing integrations around a center product logo.',
  variants: [
    {
      label: 'Default',
      props: {
        eyebrow: 'Integrations',
        title: 'Works with your stack',
        subtitle: 'Connect to the tools your team already uses.',
        centerLabel: 'Acme',
        integrations: [
          { name: 'Stripe', logo: 'https://cdn.brandfetch.io/idxAg10C0L/theme/dark/symbol.svg' },
          { name: 'GitHub', logo: 'https://cdn.brandfetch.io/idZAyF9ycX/theme/dark/symbol.svg' },
          { name: 'Figma', logo: 'https://cdn.brandfetch.io/idKeFvMfD8/theme/dark/symbol.svg' },
          { name: 'Slack', logo: 'https://cdn.brandfetch.io/idB5r5IHHO/theme/dark/symbol.svg' },
          { name: 'Linear', logo: '' },
          { name: 'Vercel', logo: '' },
          { name: 'Notion', logo: '' },
          { name: 'Jira', logo: '' },
        ],
      },
    },
  ],
}
