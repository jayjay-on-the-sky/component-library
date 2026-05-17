export default {
  name: 'GlassCard',
  category: 'Experimental',
  description: 'Frosted glass card with backdrop-blur, gradient border, and depth glow. Works over any background.',
  variants: [
    {
      label: 'Default',
      props: {
        title: 'Frosted Glass',
        subtitle: 'Works beautifully over any background',
        children: <div className="text-sm text-muted">Place any content inside this glass container.</div>,
        className: 'bg-gradient-to-br from-primary/20 to-surface p-0.5',
      }
    },
    {
      label: 'Gradient Border',
      props: {
        border: 'gradient',
        title: 'Gradient Border',
        className: 'bg-canvas',
        children: <div className="text-sm text-muted">Beautiful gradient border effect.</div>,
      }
    },
    {
      label: 'Heavy Blur',
      props: {
        blur: 'lg',
        title: 'Heavy Blur',
        className: 'bg-primary/10',
        children: <div className="text-sm text-muted">Maximum frosted glass effect.</div>,
      }
    },
  ]
}
