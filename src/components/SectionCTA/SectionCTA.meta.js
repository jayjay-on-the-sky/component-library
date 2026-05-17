export default {
  name: 'SectionCTA',
  category: 'Sections',
  description: 'Full-width CTA band in gradient, solid, and outlined variants with animated entrance.',
  variants: [
    {
      label: 'Gradient',
      props: {
        headline: 'Start building your\ncomponent library today',
        subheadline: 'No credit card required. Free forever plan. Deploy in under 5 minutes.',
        primaryCta: 'Get started free',
        secondaryCta: 'Read the docs',
        variant: 'gradient',
      },
    },
    {
      label: 'Solid',
      props: {
        eyebrow: 'Limited time offer',
        headline: 'Get 3 months Pro free',
        subheadline: 'Sign up before June 30th and get Pro features at no cost for your first quarter.',
        primaryCta: 'Claim offer',
        variant: 'solid',
      },
    },
    {
      label: 'Outlined',
      props: {
        headline: 'Ready to ship faster?',
        subheadline: 'Join thousands of teams who use CompLib to build production UIs in record time.',
        primaryCta: 'Start free trial',
        secondaryCta: 'View pricing',
        variant: 'outlined',
      },
    },
  ],
}
