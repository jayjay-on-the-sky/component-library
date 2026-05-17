export default {
  name: 'WaveBackground',
  category: 'Experimental',
  description: 'SVG animated wave background section. Multiple layered waves with CSS path animation.',
  variants: [
    {
      label: 'Default',
      props: {
        className: 'h-48 bg-canvas rounded-xl border border-hairline',
        waves: 3,
      }
    },
    {
      label: 'Two Waves',
      props: {
        className: 'h-40 bg-surface rounded-xl',
        waves: 2,
        speed: 5,
      }
    },
  ]
}
