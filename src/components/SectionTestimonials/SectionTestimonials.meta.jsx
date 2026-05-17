export default {
  name: 'SectionTestimonials',
  category: 'Sections',
  description: 'Testimonial grid with star ratings, author avatars, and staggered entrance animation.',
  variants: [
    {
      label: 'Default',
      props: {
        eyebrow: 'Customer stories',
        title: 'Loved by design and engineering teams',
        columns: 3,
        testimonials: [
          { quote: 'The token system is a game changer. I loaded our design.md and every component instantly matched our brand. Took 10 seconds.', author: 'Priya Nair', title: 'Head of Design', company: 'Stripe', stars: 5 },
          { quote: 'Best component library DX I\'ve experienced. The GitHub Actions backend means zero API key exposure and the quality bar is genuinely high.', author: 'Marcus Reid', title: 'Senior Engineer', company: 'Vercel', stars: 5 },
          { quote: 'We use the export PNG feature in every deck. Presentation-ready components at 1280×720, one click. Our investors noticed.', author: 'Yuki Tanaka', title: 'Founder', company: 'Layers.ai', stars: 5 },
        ],
      },
    },
  ],
}
