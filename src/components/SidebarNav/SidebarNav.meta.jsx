import React from 'react'
import { Home, Settings, Users, BarChart2, FileText, Inbox, Bell } from '../../lib/icons'

const groups = [
  {
    label: 'Main',
    items: [
      { id: 'home', label: 'Dashboard', icon: <Home size={15} /> },
      { id: 'inbox', label: 'Inbox', icon: <Inbox size={15} />, badge: '4' },
      { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={15} /> },
    ],
  },
  {
    label: 'Manage',
    items: [
      { id: 'users', label: 'Users', icon: <Users size={15} /> },
      {
        id: 'docs', label: 'Documents', icon: <FileText size={15} />,
        children: [
          { id: 'docs-all', label: 'All documents' },
          { id: 'docs-shared', label: 'Shared with me' },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
      { id: 'settings', label: 'Settings', icon: <Settings size={15} /> },
    ],
  },
]

export default {
  name: 'SidebarNav',
  category: 'Dashboard',
  description: 'Full application sidebar with groups, icons, badges, and nested items.',
  variants: [
    {
      label: 'Default',
      props: { groups, activeItem: 'home', style: { height: 420 } },
    },
    {
      label: 'Collapsed',
      props: { groups, activeItem: 'analytics', collapsed: true, style: { height: 420 } },
    },
  ],
}
