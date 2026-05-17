import Stack from './Stack'

// Reusable demo block for visual demo children
const Box = ({ label }) => (
  <div className="flex items-center justify-center rounded-lg bg-surface border border-hairline text-muted text-xs font-mono w-20 h-12 shrink-0">
    {label}
  </div>
)

const boxes = ['A', 'B', 'C'].map(l => <Box key={l} label={l} />)

export default {
  name: 'Stack',
  category: 'Layout',
  description: 'Flex layout primitive for stacking children vertically or horizontally with consistent spacing.',
  variants: [
    {
      label: 'Vertical (Default)',
      demo: (
        <Stack direction="column" spacing="4">
          {boxes}
        </Stack>
      ),
    },
    {
      label: 'Horizontal',
      demo: (
        <Stack direction="row" spacing="4">
          {boxes}
        </Stack>
      ),
    },
    {
      label: 'Tight spacing',
      demo: (
        <Stack direction="column" spacing="1">
          {boxes}
        </Stack>
      ),
    },
    {
      label: 'Large spacing',
      demo: (
        <Stack direction="column" spacing="8">
          {boxes}
        </Stack>
      ),
    },
    {
      label: 'Center aligned',
      demo: (
        <Stack direction="column" spacing="4" align="center">
          <Box label="A" />
          <div className="flex items-center justify-center rounded-lg bg-surface border border-hairline text-muted text-xs font-mono w-32 h-12">Wide B</div>
          <Box label="C" />
        </Stack>
      ),
    },
    {
      label: 'Animated mount',
      demo: (
        <Stack direction="row" spacing="4" animate>
          {boxes}
        </Stack>
      ),
    },
  ],
}
