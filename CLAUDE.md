# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`  
  Runs Vite dev server at http://localhost:5173
- **Build for production**: `npm run build`  
  Runs `tsc && vite build` to produce optimized assets in `/dist`
- **Preview production build**: `npm run preview`  
  Serves the built app from `/dist` at http://localhost:5173
- **Install dependencies**: `npm install`  
  Installs packages from package.json

*Note: There are no test scripts configured. Testing is typically done manually via the dev server or by adding unit tests as needed.*

## Project Structure

```
/src
  /components          # All UI components, each in its own folder
    /ComponentName/
      ComponentName.jsx    # Component implementation (React.forwardRef, uses token classes)
      ComponentName.meta.js # Metadata for library browser (name, category, description, variants)
  /lib                 # Utility modules
    utils.js           # Helper functions (e.g., cn() for class composition)
    claudeClient.js    # Wrapper for Anthropic API calls
    githubClient.js    # GitHub API client for Actions integration
    componentAgent.js  # Logic for generating components via Claude
    variantAgent.js    # Logic for generating theme variants
    designMdParser.js  # Parses design.md files into token maps
    themeApplier.js    # Applies theme tokens to :root
    themeStore.js      # Zustand store for theme state
    htmlExporter.js    # Exports component to HTML
    pngExporter.js     # Exports component to PNG
  /hooks               # Custom React hooks
  /assets              # Static assets (images, icons)
  /shell               # Layout components (e.g., page shells)
  /index.css           # Global CSS (includes Tailwind directives and base styles)
  main.jsx             # React entry point
  App.jsx              # Main application component

/themes                # Theme definitions (design.md files) - empty by default
/public                # Static assets served at root (index.html, etc.)
.dist                  # Production build output (generated)
.node_modules          # Dependencies

## Key Configuration Files
- package.json         # Dependencies and scripts
- tsconfig.json        # TypeScript configuration
- vite.config.js       # Vite plugin configuration (includes React plugin)
- tailwind.config.js   # Not used - Tailwind v4 uses @theme in index.css
- .env.example         # Template for environment variables
- .env                 # Local environment variables (not committed)
- COMPONENT_CONTRACT.md # Rules all components must follow
- README.md            # Project overview and usage instructions

## Component Contract

Every component must adhere to the contract defined in [COMPONENT_CONTRACT.md](COMPONENT_CONTRACT.md) to ensure theme compatibility and consistency.

### Core Rules
1. **No hardcoded colors**: Components must **never** use hex values (e.g., `#ff385c`) or named Tailwind colors (e.g., `blue-500`). Only use the token classes listed below.
2. **Use `cn()` for class composition**: Import `cn` from `../../lib/utils` and use it to conditionally apply classes.
3. **Forward refs on interactive elements**: Use `React.forwardRef` for buttons, inputs, etc.
4. **Add Framer Motion micro-interactions**: Apply `whileTap`, `initial`/`animate` props for interactive and appearing elements.
5. **Include ARIA attributes**: Ensure accessibility with proper roles, labels, and states.
6. **Use Radix UI for complex components**: Dialog, Tooltip, Select, Tabs, Switch from `@radix-ui`.
7. **File structure**: Each component lives in `src/components/ComponentName/` with `ComponentName.jsx` and `ComponentName.meta.js`.

### Token Classes (from COMPONENT_CONTRACT.md)
| Tailwind class | CSS variable | Role |
|---|---|---|
| `bg-primary` | `--color-primary` | Primary CTA background |
| `bg-primary-hover` | `--color-primary-hover` | Primary CTA hover |
| `bg-primary-active` | `--color-primary-active` | Primary CTA press |
| `bg-primary-muted` | `--color-primary-muted` | Tinted primary fill |
| `text-primary` | `--color-primary` | Primary text/link |
| `text-on-primary` | `--color-on-primary` | Text on primary bg |
| `bg-canvas` | `--color-canvas` | Page/card background |
| `bg-surface` | `--color-surface` | Subtle fill |
| `bg-surface-strong` | `--color-surface-strong` | Stronger fill |
| `text-ink` | `--color-ink` | Primary text |
| `text-ink-muted` | `--color-ink-muted` | Secondary text |
| `text-body` | `--color-body` | Body text |
| `text-muted` | `--color-muted` | Tertiary / helper text |
| `border-hairline` | `--color-hairline` | Default border |
| `text-success` / `bg-success` | `--color-success` | Success semantic |
| `text-warning` / `bg-warning` | `--color-warning` | Warning semantic |
| `text-error` / `bg-error` | `--color-error` | Error semantic |

## Adding a New Component

1. Create the component folder: `src/components/MyComponent/`
2. Implement the component in `src/components/MyComponent/MyComponent.jsx`:
   - Export as default via `React.forwardRef` (if interactive)
   - Use only token classes for styling, composed with `cn()`
   - Add Framer Motion interactions where appropriate
   - Include necessary ARIA attributes
3. Create metadata in `src/components/MyComponent/MyComponent.meta.js`:
   ```js
   export default {
     name: 'MyComponent',
     category: 'Category', // Actions | Display | Forms | Layout | Overlays | Feedback
     description: 'One sentence.',
     variants: [
       { label: 'Default', props: {} },
       { label: 'Variant Name', props: { propName: value } },
       // For demo wrappers:
       { label: 'Demo', props: {}, Component: DemoWrapperComponent },
     ],
   }
   ```
4. The registry (`src/lib/componentAgent.js` or similar) auto-discovers new components.
5. Restart the dev server (`npm run dev`) to see the component appear in the sidebar.

## Theme System

The library uses a token-based theming system powered by CSS custom properties.
- Themes are defined in `design.md` files placed in `/themes/`.
- A `design.md` contains token definitions like `{colors.primary}` — `#ff385c`.
- When a theme is loaded:
  1. `designMdParser.js` parses the file into a token map.
  2. `themeApplier.js` writes the tokens as CSS custom properties to `:root`.
  3. Components using token classes (e.g., `bg-primary`) automatically reflect the new theme.
- No component code changes are required when switching themes.

## AI Integration

This component library leverages GitHub Actions and the Claude AI API for automated workflows:
- **Component Generation**: Describe a component via the UI → triggers a GitHub Actions workflow that calls Claude with a strict prompt → writes the component files to the repo → pushes commit → Vercel redeploys.
- **URL/UI Scanning**: Reverse-engineer a UI from a URL or description using the same workflow.
- **Variant Generation**: Generate theme variants from a `design.md` file.
All AI processing runs server-side in GitHub Actions; the frontend only serves the static UI.

## Environment Variables

Copy `.env.example` to `.env` and set:
- `VITE_GITHUB_TOKEN` (required): GitHub PAT with `repo` and `workflow` scopes.
- `VITE_GITHUB_OWNER` (required): Your GitHub username or organization.
- `VITE_GITHUB_REPO` (required): The repository name (e.g., `component-library`).
- `VITE_ANTHROPIC_API_KEY` (optional): For local in-browser fallback to Claude API.

In GitHub Actions workflows, the secret `ANTHROPIC_API_KEY` must be set for the Claude API calls.

## Database and External Services

This project does not use a traditional database. It interacts with:
- GitHub API (for Actions workflows, file operations)
- Anthropic API (via GitHub Actions for AI features)
- Vercel (for static hosting and deployments)

## Common Development Tasks

- **Creating a component**: Follow the steps in "Adding a New Component" above.
- **Testing a component**: Start the dev server (`npm run dev`) and use the library browser to preview and interact with the component.
- **Updating the theme**: Add a `design.md` file to `/themes/` and load it via the UI's Theme panel.
- **Debugging AI features**: Check GitHub Actions workflow runs for logs; ensure `ANTHROPIC_API_KEY` secret is set.
- **Updating dependencies**: Run `npm install` after modifying package.json.

## Guidelines

- Always follow the Component Contract to maintain theme compatibility.
- Use the provided utility functions (e.g., `cn()`) for consistency.
- Keep components focused and reusable; avoid hardcoding layout or positioning that may break in different contexts.
- When adding new utility functions, place them in `src/lib/` and export them for use in components.
- The library is designed to be exported and used in other projects; ensure dependencies (`framer-motion`, relevant Radix UI packages) are installed in the consuming project.