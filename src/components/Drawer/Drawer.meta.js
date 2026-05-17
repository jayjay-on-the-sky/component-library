export default {
  name: 'Drawer',
  category: 'Overlays',
  description: 'Slide-in side panel drawer from any edge of the screen.',
  variants: [
    {
      label: 'Right',
      props: {
        open: true,
        side: 'right',
        title: 'Settings',
        children: null,
      },
    },
    {
      label: 'Left',
      props: {
        open: true,
        side: 'left',
        title: 'Navigation',
        width: 280,
        children: null,
      },
    },
    {
      label: 'Bottom',
      props: {
        open: true,
        side: 'bottom',
        title: 'Share',
        children: null,
      },
    },
  ],
}
