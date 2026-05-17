export default {
  name: 'SlideTeam',
  category: 'Slides',
  description: 'Team grid slide with avatar initials, name, role, and previous employer. Staggered animation.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Small Team', props: { members: [{ name: 'Alex Kim', role: 'CEO', prev: 'ex-Google', avatar: 'AK' }, { name: 'Mia Chen', role: 'CTO', prev: 'ex-Stripe', avatar: 'MC' }, { name: 'Tom Reed', role: 'Design', prev: 'ex-Figma', avatar: 'TR' }] } },
  ]
}
