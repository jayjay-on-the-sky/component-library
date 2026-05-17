import React from 'react'
import { Layers, Code2, BarChart2, FileText, Users, Settings } from '../../lib/icons'

export default {
  name: 'NavMenu',
  category: 'Navigation',
  description: 'Mega menu navigation bar with hoverable dropdown columns.',
  variants: [
    {
      label: 'Default',
      props: {
        items: [
          {
            id: 'product', label: 'Product',
            columns: [
              {
                label: 'Features',
                links: [
                  { label: 'Components', description: '50+ production-ready UI components', icon: <Layers size={14} />, href: '#' },
                  { label: 'Analytics', description: 'Real-time usage insights', icon: <BarChart2 size={14} />, href: '#' },
                  { label: 'API', description: 'Full REST and GraphQL API', icon: <Code2 size={14} />, href: '#' },
                ],
              },
              {
                label: 'Resources',
                links: [
                  { label: 'Documentation', description: 'Guides and references', icon: <FileText size={14} />, href: '#' },
                  { label: 'Community', description: 'Join our Discord', icon: <Users size={14} />, href: '#' },
                ],
              },
            ],
          },
          { id: 'pricing', label: 'Pricing' },
          { id: 'blog', label: 'Blog' },
          {
            id: 'company', label: 'Company',
            columns: [
              {
                links: [
                  { label: 'About', description: 'Our story and mission', href: '#' },
                  { label: 'Careers', description: 'Join our team', href: '#' },
                  { label: 'Contact', description: 'Get in touch', href: '#' },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
}
