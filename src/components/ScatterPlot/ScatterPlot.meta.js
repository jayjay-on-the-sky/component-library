export default {
  name: 'ScatterPlot',
  category: 'Charts',
  description: 'X/Y scatter plot with animated dot placement, grid, axis labels, and hover tooltips.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Correlation', props: {
        xLabel: 'Price', yLabel: 'Rating',
        data: Array.from({ length: 20 }, (_, i) => ({
          x: 10 + i * 4 + Math.random() * 8,
          y: 3 + (i / 20) * 2 + Math.random() * 0.8,
          label: `Product ${i + 1}`,
        }))
      }
    },
  ]
}
