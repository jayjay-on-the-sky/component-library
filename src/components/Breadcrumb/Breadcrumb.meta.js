export default {
  name: 'Breadcrumb',
  category: 'Navigation',
  description: 'Breadcrumb navigation trail showing page hierarchy.',
  variants: [
    {
      label: 'Default',
      props: {
        items: [
          { label: 'Projects', href: '/projects' },
          { label: 'Design System', href: '/projects/design' },
          { label: 'Components' },
        ],
      },
    },
    {
      label: 'With Home',
      props: {
        showHome: true,
        items: [
          { label: 'Docs', href: '/docs' },
          { label: 'Components' },
        ],
      },
    },
  ],
}
