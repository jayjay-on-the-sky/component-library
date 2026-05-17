export default {
  name: 'SectionContact',
  category: 'Sections',
  description: 'Contact section with info column and form card.',
  variants: [
    {
      label: 'Full',
      props: {
        title: 'Let\'s talk',
        subtitle: 'Fill out the form and we\'ll get back to you within 24 hours.',
        email: 'hello@acme.com',
        phone: '+1 (555) 000-1234',
        address: '340 Pine St, San Francisco, CA',
      },
    },
    {
      label: 'Minimal',
      props: {
        title: 'Contact us',
        email: 'support@acme.com',
      },
    },
  ],
}
