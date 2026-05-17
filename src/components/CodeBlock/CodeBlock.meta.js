export default {
  name: 'CodeBlock',
  category: 'Data Display',
  description: 'Syntax-highlighted code block with copy button and line numbers.',
  variants: [
    {
      label: 'JavaScript',
      props: {
        language: 'js',
        filename: 'index.js',
        code: `import { createProvider } from './providers'\n\nconst ai = createProvider('claude')\n\nconst response = await ai.chat({\n  messages: [{ role: 'user', content: 'Hello!' }],\n})\n\nconsole.log(response.text)`,
      },
    },
    {
      label: 'With line numbers',
      props: {
        language: 'tsx',
        showLineNumbers: true,
        code: `export function Button({ children, onClick }) {\n  return (\n    <button\n      onClick={onClick}\n      className="px-4 py-2 bg-primary text-on-primary rounded-md"\n    >\n      {children}\n    </button>\n  )\n}`,
      },
    },
    {
      label: 'Shell',
      props: {
        language: 'bash',
        code: `npm install @component-library/core\nnpx init-components\nnpm run dev`,
      },
    },
  ],
}
