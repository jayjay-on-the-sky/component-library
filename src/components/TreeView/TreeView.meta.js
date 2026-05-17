export default {
  name: 'TreeView',
  category: 'Data Display',
  description: 'Collapsible tree view for hierarchical data like file systems.',
  variants: [
    {
      label: 'File tree',
      props: {
        nodes: [
          {
            id: 'src', label: 'src', defaultOpen: true,
            children: [
              {
                id: 'components', label: 'components', defaultOpen: true,
                children: [
                  { id: 'button', label: 'Button.jsx' },
                  { id: 'card', label: 'Card.jsx' },
                  { id: 'modal', label: 'Modal.jsx' },
                ],
              },
              {
                id: 'lib', label: 'lib',
                children: [
                  { id: 'utils', label: 'utils.js' },
                  { id: 'icons', label: 'icons.js' },
                ],
              },
              { id: 'main', label: 'main.jsx' },
            ],
          },
          { id: 'package', label: 'package.json' },
          { id: 'readme', label: 'README.md' },
        ],
      },
    },
  ],
}
