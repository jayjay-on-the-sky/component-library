import React from 'react'
import { Inbox, Search, FileText } from '../../lib/icons'

export default {
  name: 'EmptyState',
  category: 'Feedback',
  description: 'Empty state placeholder with icon, message and optional CTA.',
  variants: [
    {
      label: 'Inbox',
      props: {
        icon: <Inbox size={24} />,
        title: 'No messages',
        description: 'When you receive messages they will appear here.',
      },
    },
    {
      label: 'Search',
      props: {
        icon: <Search size={24} />,
        title: 'No results found',
        description: 'Try adjusting your search or filters to find what you\'re looking for.',
        size: 'md',
      },
    },
    {
      label: 'With Action',
      props: {
        icon: <FileText size={24} />,
        title: 'No documents yet',
        description: 'Get started by creating your first document.',
        action: (
          <button className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-primary text-on-primary hover:bg-primary-hover transition-colors">
            Create document
          </button>
        ),
      },
    },
  ],
}
