const PaletteIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><circle cx="7" cy="8" r="1.5" fill="currentColor"/><circle cx="13" cy="8" r="1.5" fill="currentColor"/><circle cx="10" cy="13" r="1.5" fill="currentColor"/></svg>
const BoltIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11 2L4 11h7l-2 7 9-9h-7l2-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
const CodeIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 7l-4 3 4 3M14 7l4 3-4 3M11 4l-2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
const ShieldIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
const GlobeIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M2 10h16M10 2c-2 2-3 5-3 8s1 6 3 8M10 2c2 2 3 5 3 8s-1 6-3 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
const StarIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 5.1 5.6.5-4 3.8 1.2 5.6L10 14.2l-5.2 2.8 1.2-5.6-4-3.8 5.6-.5L10 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>

export default {
  name: 'SectionFeatureGrid',
  category: 'Sections',
  description: 'Responsive feature grid with animated cards, icon, title, description, and highlighted variant.',
  variants: [
    {
      label: '3-col grid',
      props: {
        eyebrow: 'Why teams love it',
        title: 'Everything you need,\nnothing you don\'t',
        subtitle: 'A complete component system built for the speed of modern product teams.',
        columns: 3,
        features: [
          { icon: <PaletteIcon />, title: 'Token-based theming', description: 'Swap any design.md and the entire library re-skins instantly. Zero component changes.', highlight: true },
          { icon: <BoltIcon />, title: 'AI-generated components', description: 'Describe what you want. Claude builds it server-side via GitHub Actions.', highlight: false },
          { icon: <CodeIcon />, title: 'Production-ready code', description: 'Every component ships with forwardRef, ARIA, Framer Motion, and compound sub-components.', highlight: false },
          { icon: <ShieldIcon />, title: 'Accessible by default', description: 'Radix UI primitives under the hood. Keyboard nav, focus management, screen readers — all handled.', highlight: false },
          { icon: <GlobeIcon />, title: 'Export for anywhere', description: 'PNG at 1280×720 for presentations. Raw JSX for any React project. Figma-compatible tokens.', highlight: false },
          { icon: <StarIcon />, title: 'Open source', description: 'Fork it, modify it, make it yours. The token contract means your changes stay compatible.', highlight: false },
        ],
      },
    },
  ],
}
