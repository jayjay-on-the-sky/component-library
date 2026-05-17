const LINKS = [
  { label: 'Product', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Blog', href: '#' },
]

export default {
  name: 'SectionNavbar',
  category: 'Sections',
  description: 'Full page-level header with logo, nav links, CTA button, scroll blur, and responsive mobile menu.',
  variants: [
    { label: 'Default', props: { logoText: 'Acme', links: LINKS, ctaLabel: 'Sign up free', sticky: false } },
  ],
}
