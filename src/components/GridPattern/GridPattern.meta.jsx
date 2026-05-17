export default {
  name: 'GridPattern',
  category: 'Experimental',
  description: 'SVG decorative background pattern. Grid, dots, or cross variants with radial fade.',
  variants: [
    {
      label: 'Grid',
      props: {
        variant: 'grid',
        className: 'relative h-40 w-full bg-canvas rounded-xl overflow-hidden border border-hairline',
        children: null,
      }
    },
    {
      label: 'Dots',
      props: {
        variant: 'dots',
        className: 'relative h-40 w-full bg-canvas rounded-xl overflow-hidden border border-hairline',
      }
    },
    {
      label: 'Cross',
      props: {
        variant: 'cross',
        className: 'relative h-40 w-full bg-canvas rounded-xl overflow-hidden border border-hairline',
      }
    },
  ]
}
