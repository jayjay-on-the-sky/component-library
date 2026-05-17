export default {
  name: 'SectionBlog',
  category: 'Sections',
  description: 'Blog post cards grid section for marketing pages.',
  variants: [
    {
      label: 'Default',
      props: {
        title: 'From the blog',
        posts: [
          {
            title: 'Building accessible React components from scratch',
            excerpt: 'A comprehensive guide to ARIA patterns, focus management, and screen reader support in modern React apps.',
            category: 'Engineering',
            date: 'May 12, 2025',
            readTime: '8 min read',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14431b3?w=600&q=80',
            featured: true,
          },
          {
            title: 'Design tokens: the foundation of scalable UI',
            category: 'Design',
            date: 'Apr 30, 2025',
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&q=80',
          },
          {
            title: 'How we shipped 50 components in 6 weeks',
            category: 'Product',
            date: 'Apr 18, 2025',
            readTime: '6 min read',
          },
        ],
      },
    },
  ],
}
