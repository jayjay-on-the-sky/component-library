export default {
  name: 'SlideCallToAction',
  category: 'Slides',
  description: 'Closing CTA slide with big text, CTA button, QR code placeholder, and contact info.',
  variants: [
    { label: 'Dark', props: { dark: true } },
    { label: 'Light', props: { dark: false, title: 'Ready to\nget started?', cta: 'Book a demo' } },
  ]
}
