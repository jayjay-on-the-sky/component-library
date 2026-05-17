export default {
  name: 'SlideAgenda',
  category: 'Slides',
  description: '16:9 agenda slide. Split layout with numbered items, staggered animation.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Compact', props: { items: [{ title: 'Intro', desc: 'Who we are' }, { title: 'Problem', desc: 'The gap' }, { title: 'Solution', desc: 'Our fix' }] } },
  ]
}
