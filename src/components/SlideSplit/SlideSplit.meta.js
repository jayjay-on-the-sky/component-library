export default {
  name: 'SlideSplit',
  category: 'Slides',
  description: '50/50 split slide: text left, visual right (or flipped). Chapter label, title, body, bullet list.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'With Bullets', props: { label: 'Key Insights', title: 'What We Found', body: 'After 6 months of research:', bullets: ['Teams waste 40% of time on repetitive tasks', 'Context-switching costs 3h/day', 'Most tools add friction, not remove it'] } },
    { label: 'Image Left', props: { imagePosition: 'left', label: 'The Solution', title: 'A New\nParadigm' } },
  ]
}
