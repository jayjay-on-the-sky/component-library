export default {
  name: 'SlideStatement',
  category: 'Slides',
  description: 'Full-bleed statement/quote slide. Massive centered text, three color themes.',
  variants: [
    { label: 'Dark', props: { bg: 'dark', attribution: 'Alan Kay' } },
    { label: 'Light', props: { bg: 'light', quote: 'Design is not just\nwhat it looks like.\nDesign is how it works.', attribution: 'Steve Jobs' } },
    { label: 'Primary', props: { bg: 'primary', quote: 'Move fast and\nbuild things that last.' } },
  ]
}
