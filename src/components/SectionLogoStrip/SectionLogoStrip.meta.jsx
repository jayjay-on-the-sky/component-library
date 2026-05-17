const LOGOS = [
  { name: 'Vercel' },
  { name: 'Stripe' },
  { name: 'Linear' },
  { name: 'Notion' },
  { name: 'Figma' },
  { name: 'Supabase' },
  { name: 'Resend' },
  { name: 'Planetscale' },
]

export default {
  name: 'SectionLogoStrip',
  category: 'Sections',
  description: 'Infinite scrolling or static trusted-by logo strip with grayscale/hover reveal effect.',
  variants: [
    { label: 'Scrolling marquee', props: { label: 'Trusted by teams at', logos: LOGOS, mode: 'scroll' } },
    { label: 'Static grid', props: { label: 'Used in production at', logos: LOGOS.slice(0, 6), mode: 'static' } },
  ],
}
