/**
 * Exports a component preview as a PNG.
 * Uses html2canvas to screenshot the preview container.
 *
 * Supports two sizes:
 *   'presentation' — 1280×720 (16:9, standard slide size)
 *   'component'    — natural size of the component + 48px padding
 */

import html2canvas from 'html2canvas'

export async function exportAsPng(element, { size = 'component', filename = 'component' } = {}) {
  if (!element) throw new Error('No element provided for export')

  const options = {
    backgroundColor: getComputedStyle(document.documentElement)
      .getPropertyValue('--color-canvas').trim() || '#ffffff',
    scale: 2, // 2x for crisp renders on retina / presentation screens
    useCORS: true,
    logging: false,
  }

  if (size === 'presentation') {
    options.width = 1280
    options.height = 720
    options.windowWidth = 1280
    options.windowHeight = 720
  }

  const canvas = await html2canvas(element, options)

  // Download
  const link = document.createElement('a')
  link.download = `${filename}-${size}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()

  return canvas.toDataURL('image/png')
}
