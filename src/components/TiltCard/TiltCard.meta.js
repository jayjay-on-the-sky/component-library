export default {
  name: 'TiltCard',
  category: 'Experimental',
  description: '3D perspective tilt card on hover with spring physics and glare overlay.',
  variants: [
    { label: 'Default', props: { title: '3D Tilt Card', subtitle: 'Hover for perspective tilt effect' } },
    { label: 'Extreme', props: { title: 'Extreme Tilt', tiltMax: 35, subtitle: 'Very dramatic angle' } },
    { label: 'No Glare', props: { title: 'No Glare', glare: false, subtitle: 'Tilt without glare overlay' } },
  ]
}
