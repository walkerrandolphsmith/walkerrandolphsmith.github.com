import type { ThemeRegistration } from 'shiki'

/**
 * Shiki theme for blog code blocks. Each token color is a CSS variable, so
 * one highlighted build serves both light and dark mode. The values live in
 * globals.css under .code-block and .dark .code-block.
 */
export const codeTheme: ThemeRegistration = {
  name: 'site-code',
  type: 'light',
  colors: {
    'editor.foreground': 'var(--code-fg)',
    'editor.background': 'var(--code-bg)',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: 'var(--code-comment)', fontStyle: 'italic' },
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator'],
      settings: { foreground: 'var(--code-punctuation)' },
    },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
      ],
      settings: { foreground: 'var(--code-keyword)' },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'string.unquoted',
        'string.template',
        'constant.other.symbol',
        'markup.inline.raw',
      ],
      settings: { foreground: 'var(--code-string)' },
    },
    {
      scope: [
        'punctuation.definition.string',
        'punctuation.definition.template-expression',
      ],
      settings: { foreground: 'var(--code-string)' },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.character',
        'constant.other.option',
        'support.constant',
      ],
      settings: { foreground: 'var(--code-number)' },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call entity.name.function',
        'entity.name.command',
      ],
      settings: { foreground: 'var(--code-function)' },
    },
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'entity.other.inherited-class',
        'support.type',
        'support.class',
        'storage.type.primitive',
      ],
      settings: { foreground: 'var(--code-type)' },
    },
    {
      scope: [
        'variable.other.property',
        'variable.other.object.property',
        'support.variable.property',
        'meta.object-literal.key',
        'support.type.property-name',
        'entity.name.tag.yaml',
        'entity.other.attribute-name',
        'variable.other.member',
      ],
      settings: { foreground: 'var(--code-property)' },
    },
    {
      scope: ['entity.name.tag', 'support.class.component'],
      settings: { foreground: 'var(--code-tag)' },
    },
    {
      scope: ['variable', 'variable.parameter', 'meta.definition.variable'],
      settings: { foreground: 'var(--code-fg)' },
    },
    {
      scope: ['markup.inserted'],
      settings: { foreground: 'var(--code-string)' },
    },
    {
      scope: ['markup.deleted', 'invalid'],
      settings: { foreground: 'var(--code-number)' },
    },
  ],
}

/** Display names for the language label in the code block header. */
const languageLabels: Record<string, string> = {
  bash: 'Bash',
  console: 'Shell',
  css: 'CSS',
  csharp: 'C#',
  diff: 'Diff',
  docker: 'Dockerfile',
  dockerfile: 'Dockerfile',
  go: 'Go',
  graphql: 'GraphQL',
  hcl: 'HCL',
  html: 'HTML',
  js: 'JavaScript',
  javascript: 'JavaScript',
  json: 'JSON',
  jsx: 'JSX',
  md: 'Markdown',
  mdx: 'MDX',
  powershell: 'PowerShell',
  py: 'Python',
  python: 'Python',
  sh: 'Shell',
  shell: 'Shell',
  sql: 'SQL',
  terraform: 'Terraform',
  text: 'Text',
  ts: 'TypeScript',
  tsx: 'TSX',
  typescript: 'TypeScript',
  yaml: 'YAML',
  yml: 'YAML',
  zsh: 'Shell',
}

export function languageLabel(lang: string): string {
  return languageLabels[lang] ?? lang.toUpperCase()
}
