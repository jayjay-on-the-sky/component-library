import React from 'react'
import { Zap, Shield, Globe, BarChart2, Code2, Users } from '../../lib/icons'

export default {
  name: 'SectionBento',
  category: 'Sections',
  description: 'Bento grid marketing section with feature cards of varying sizes.',
  variants: [
    {
      label: 'Default',
      props: {
        eyebrow: 'Features',
        title: 'Everything you need to ship faster',
        subtitle: 'A complete toolkit for modern product teams.',
        columns: 3,
        cards: [
          { title: 'Lightning fast', description: 'Sub-100ms response times with edge caching.', icon: <Zap size={18} />, colSpan: 2 },
          { title: 'Secure by default', description: 'SOC2 compliant, end-to-end encrypted.', icon: <Shield size={18} />, accent: true },
          { title: 'Global CDN', description: 'Deploy to 35+ regions worldwide.', icon: <Globe size={18} /> },
          { title: 'Analytics', description: 'Real-time dashboards and custom events.', icon: <BarChart2 size={18} /> },
          { title: 'Open API', description: 'REST & GraphQL with auto-generated SDKs.', icon: <Code2 size={18} /> },
          { title: 'Team collaboration', description: 'Invite teammates and manage permissions.', icon: <Users size={18} />, colSpan: 2 },
        ],
      },
    },
  ],
}
