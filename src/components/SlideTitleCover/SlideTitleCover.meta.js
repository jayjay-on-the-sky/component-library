export default {
  name: 'SlideTitleCover',
  category: 'Slides',
  description: '16:9 presentation title cover slide. Bold headline, speaker info, decorative background elements.',
  variants: [
    { label: 'Dark', props: { theme: 'dark' } },
    { label: 'Light', props: { theme: 'light', title: 'Building for\nthe Next Billion', subtitle: 'Inclusive design at global scale' } },
    { label: 'Gradient', props: { theme: 'gradient', title: 'AI x Design', subtitle: 'The tools that change everything' } },
  ]
}
