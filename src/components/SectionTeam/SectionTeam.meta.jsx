const GHIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M8 0a8 8 0 000 16c.55 0 1-.45 1-1V13.5c-3.4.74-4.12-1.64-4.12-1.64-.56-1.41-1.36-1.79-1.36-1.79-1.11-.76.08-.74.08-.74 1.23.09 1.87 1.26 1.87 1.26 1.09 1.87 2.87 1.33 3.57 1.01.11-.79.43-1.33.78-1.64-2.72-.31-5.58-1.36-5.58-6.04 0-1.33.48-2.42 1.26-3.27-.13-.31-.55-1.55.12-3.23 0 0 1.02-.33 3.35 1.25a11.64 11.64 0 016.1 0c2.32-1.58 3.34-1.25 3.34-1.25.67 1.68.25 2.92.12 3.23.79.85 1.26 1.94 1.26 3.27 0 4.69-2.86 5.72-5.59 6.03.44.38.83 1.13.83 2.28v3.37c0 .55.45 1 1 1A8 8 0 008 0z" fill="currentColor"/></svg>
const TWIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 2.5a6.5 6.5 0 01-1.89.52 3.3 3.3 0 001.45-1.82 6.6 6.6 0 01-2.09.8 3.28 3.28 0 00-5.6 3 9.32 9.32 0 01-6.77-3.43 3.28 3.28 0 001.02 4.38 3.26 3.26 0 01-1.49-.41v.04a3.29 3.29 0 002.63 3.22 3.3 3.3 0 01-1.48.06 3.28 3.28 0 003.06 2.28A6.6 6.6 0 011 13.19a9.3 9.3 0 005.03 1.47c6.04 0 9.35-5 9.35-9.34 0-.14 0-.28-.01-.42A6.7 6.7 0 0015 2.5z" fill="currentColor"/></svg>
const LIIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 5H1v10h2.5V5zM2.25 4a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM5.5 5v10H8V9.5c0-1.1.9-2 2-2s2 .9 2 2V15h2.5V9c0-2.2-1.8-4-4-4a4 4 0 00-3 1.37V5H5.5z" fill="currentColor"/></svg>

export default {
  name: 'SectionTeam',
  category: 'Sections',
  description: 'Team member grid with avatar, role, bio, and social links.',
  variants: [
    {
      label: 'Default',
      props: {
        eyebrow: 'Our team',
        title: 'Built by people who care',
        subtitle: 'A small team obsessed with developer experience and beautiful, accessible components.',
        columns: 4,
        members: [
          { name: 'Alice Chen', role: 'Co-founder & Design', bio: 'Previously at Figma and Linear. Obsessed with pixel perfection.', links: [{ icon: <TWIcon />, href: '#', label: 'Twitter' }, { icon: <GHIcon />, href: '#', label: 'GitHub' }] },
          { name: 'Marcus Reid', role: 'Co-founder & Engineering', bio: 'Ex-Vercel. Built three component libraries before this one.', links: [{ icon: <GHIcon />, href: '#', label: 'GitHub' }, { icon: <LIIcon />, href: '#', label: 'LinkedIn' }] },
          { name: 'Yuki Tanaka', role: 'Product', bio: 'Former PM at Stripe. Turns user feedback into shipping velocity.', links: [{ icon: <TWIcon />, href: '#', label: 'Twitter' }] },
          { name: 'Priya Nair', role: 'Developer Relations', bio: 'Open source advocate and conference speaker. Writes the docs.', links: [{ icon: <TWIcon />, href: '#', label: 'Twitter' }, { icon: <GHIcon />, href: '#', label: 'GitHub' }] },
        ],
      },
    },
  ],
}
