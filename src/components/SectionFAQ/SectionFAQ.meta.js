export default {
  name: 'SectionFAQ',
  category: 'Sections',
  description: 'Expandable FAQ accordion section with single and two-column layouts.',
  variants: [
    {
      label: 'Single column',
      props: {
        eyebrow: 'Got questions?',
        title: 'Frequently asked questions',
        faqs: [
          { question: 'Do I need a backend to use this?', answer: 'No. The app is a static Vite site. All AI processing runs in GitHub Actions (server-side). You only need a GitHub token and an Anthropic API key stored as a GitHub Secret.' },
          { question: 'How do design tokens work?', answer: 'Every component uses Tailwind token classes (bg-primary, text-ink, etc.) that map to CSS custom properties. Loading a design.md rewrites those properties at :root — instant full re-skin, zero component changes.' },
          { question: 'Can I use components in Figma or PowerPoint?', answer: 'Yes. The Export PNG button renders any component at 1280×720 (presentation-ready). Token maps are also Figma-variable compatible for design handoff.' },
          { question: 'What AI model generates the components?', answer: 'Claude claude-sonnet-4-5 via the Anthropic API. The prompt enforces market-quality standards: forwardRef, Framer Motion, Radix UI, ARIA, token-only Tailwind classes, and the compound component pattern.' },
          { question: 'Can I add my own components without using AI?', answer: 'Absolutely. Drop a ComponentName.jsx and ComponentName.meta.js into src/components/ComponentName/ and the registry auto-discovers it via Vite\'s import.meta.glob. No manual registration.' },
        ],
      },
    },
    {
      label: 'Two columns',
      props: {
        title: 'Common questions',
        columns: 2,
        faqs: [
          { question: 'Is it free?', answer: 'Yes, there is a free tier with 10 components and 10 GitHub Actions runs per month.' },
          { question: 'What frameworks does it support?', answer: 'React 18 + Vite. Components are plain JSX with no framework-specific logic, so they port easily to Next.js, Remix, etc.' },
          { question: 'Can I deploy to Vercel?', answer: 'Yes. The README covers Vercel setup in under 5 minutes. Add your env vars and import the repo.' },
          { question: 'How do variants work?', answer: 'Describe a color variant in the Theme panel. GitHub Actions generates a new token map and saves it to themes/. Reload themes to apply it.' },
        ],
      },
    },
  ],
}
