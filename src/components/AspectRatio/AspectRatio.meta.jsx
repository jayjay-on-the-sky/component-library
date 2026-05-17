import React from 'react'

export default {
  name: 'AspectRatio',
  category: 'Layout',
  description: 'Enforces a fixed aspect ratio for any content — great for images, videos, maps.',
  variants: [
    {
      label: '16/9',
      props: {
        ratio: '16/9',
        className: 'w-64 rounded-[var(--radius-xl)] overflow-hidden',
        children: (
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
            alt="Mountains"
            className="w-full h-full object-cover"
          />
        ),
      },
    },
    {
      label: '1/1',
      props: {
        ratio: '1/1',
        className: 'w-48 rounded-full overflow-hidden',
        children: (
          <img
            src="https://i.pravatar.cc/200?img=12"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ),
      },
    },
    {
      label: '4/3',
      props: {
        ratio: '4/3',
        className: 'w-64 rounded-[var(--radius-xl)] bg-surface flex items-center justify-center',
        children: <span className="text-muted text-sm">4:3 container</span>,
      },
    },
  ],
}
