export default {
  name: 'SectionPricing',
  category: 'Sections',
  description: 'Pricing tier cards with monthly/annual toggle, popular highlight, and feature checklist.',
  variants: [
    {
      label: 'Default',
      props: {
        eyebrow: 'Pricing',
        title: 'Simple, transparent pricing',
        subtitle: 'Start free. Scale as you grow.',
        plans: [
          {
            name: 'Starter',
            price: 0,
            description: 'Everything you need to get started with the component library.',
            cta: 'Get started free',
            features: ['Up to 10 components', 'GitHub Actions (10 runs/month)', 'Community themes', 'PNG export'],
          },
          {
            name: 'Pro',
            price: 19,
            annualPrice: 15,
            description: 'For professional teams building at scale.',
            cta: 'Start free trial',
            popular: true,
            features: ['Unlimited components', 'Unlimited GitHub Actions', 'Custom design.md themes', 'PNG + Figma export', 'Variant generator', 'Priority support'],
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            description: 'Dedicated infrastructure, SSO, and SLA for large organizations.',
            cta: 'Contact us',
            features: ['Everything in Pro', 'Dedicated GitHub org', 'SSO / SAML', 'Custom contracts', 'Onboarding call', '99.9% uptime SLA'],
          },
        ],
      },
    },
  ],
}
