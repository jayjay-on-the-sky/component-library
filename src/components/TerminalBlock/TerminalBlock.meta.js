export default {
  name: 'TerminalBlock',
  category: 'Experimental',
  description: 'Realistic terminal window with typewriter animation, blinking cursor, and syntax-colored output.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Git Deploy', props: {
        title: 'bash',
        lines: [
          '$ git push origin main',
          'Enumerating objects: 23, done.',
          'Writing objects: 100% (23/23)',
          'remote: Resolving deltas: done.',
          'remote: ✓ Deployment triggered',
          '',
          '$ vercel --prod',
          '  ✓ Deployed to production',
          '  ▲ https://myapp.vercel.app',
        ]
      }
    },
    { label: 'Loop', props: { loop: true, speed: 30 } },
  ]
}
