export default {
  name: 'BrutalistCard',
  category: 'Experimental',
  description: 'Brutalist design card with thick black border, offset color shadow, and bold typography.',
  variants: [
    { label: 'Default', props: { title: 'Brutalist Design', tag: 'New', children: 'Raw. Unfiltered. Design stripped to its bones.', cta: 'Read more' } },
    { label: 'Warning', props: { title: 'Warning Card', accent: 'warning', tag: 'Alert', children: 'Something needs your attention right now.' } },
    { label: 'Error', props: { title: 'Error State', accent: 'error', tag: 'Critical', children: 'This is a critical issue that requires action.' } },
    { label: 'No Shadow', props: { title: 'Flat Brutalist', offsetShadow: false, children: 'No offset shadow variant.' } },
  ]
}
