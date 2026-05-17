export default {
  name: 'ParallaxCard',
  category: 'Experimental',
  description: '3D parallax tilt card that follows cursor with Framer Motion springs. Shine overlay effect.',
  variants: [
    { label: 'Default', props: { title: 'Parallax Card', subtitle: 'Hover to see the 3D tilt effect' } },
    { label: 'High Intensity', props: { title: 'Intense Tilt', subtitle: 'More dramatic angle', intensity: 30 } },
    { label: 'No Shine', props: { title: 'No Shine', subtitle: 'Just the tilt effect', shine: false } },
  ]
}
