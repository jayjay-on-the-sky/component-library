const MockDashboard = () => (
  <div className="h-64 bg-surface flex items-center justify-center">
    <div className="flex gap-4 px-8 w-full">
      {['bg-primary/20', 'bg-success/20', 'bg-warning/20'].map((c, i) => (
        <div key={i} className={`flex-1 h-32 rounded-xl ${c}`}/>
      ))}
    </div>
  </div>
)

export default {
  name: 'SectionHero',
  category: 'Sections',
  description: 'Full-width hero section with animated headline, badge, dual CTA, and media slot.',
  variants: [
    {
      label: 'Center with media',
      props: {
        badge: 'Now in public beta',
        headline: 'Build faster than\never before',
        subheadline: 'Production-quality React components with design token theming, AI generation, and one-click export.',
        primaryCta: 'Get started free',
        secondaryCta: 'View components',
        media: <MockDashboard />,
        align: 'center',
      },
    },
    {
      label: 'Left aligned',
      props: {
        headline: 'The design system\nyour team will love',
        subheadline: 'Token-based theming means every component adapts to your brand without code changes.',
        primaryCta: 'Start building',
        align: 'left',
      },
    },
  ],
}
