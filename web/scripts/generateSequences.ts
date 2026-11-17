import { writeFileSync } from 'fs'
import path from 'path'

const customTheme = {
  name: 'custom-theme',
  type: 'light',
  colors: {
    'editor.foreground': 'var(--shiki-foreground)',
    'editor.background': 'var(--shiki-background)',
  },
  tokenColors: [
    {
      scope: ['keyword'],
      settings: { foreground: 'var(--shiki-keyword)' },
    },
    {
      scope: ['entity.name.tag', 'support.class.component'],
      settings: { foreground: 'var(--shiki-tag)' },
    },
    {
      scope: ['string', 'string.quoted', 'constant.other.symbol'],
      settings: { foreground: 'var(--shiki-string)' },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: 'var(--shiki-function)' },
    },
    {
      scope: ['constant.numeric'],
      settings: { foreground: 'var(--shiki-number)' },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: 'var(--shiki-comment)' },
    },
    {
      scope: ['variable.other.property', 'support.variable.property'],
      settings: { foreground: 'var(--shiki-property)' },
    },
    {
      scope: ['entity.name.class', 'support.class'],
      settings: { foreground: 'var(--shiki-class)' },
    },
    {
      scope: ['meta.attribute-name.html', 'entity.other.attribute-name'],
      settings: { foreground: 'var(--shiki-attribute)' },
    },
    {
      scope: [
        'meta.attribute-value.html',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: 'var(--shiki-attr-value)' },
    },
    {
      scope: ['punctuation'],
      settings: { foreground: 'var(--shiki-punctuation)' },
    },
    {
      scope: ['source.js.embedded.html', 'source.ts.embedded.html'],
      settings: { foreground: 'var(--shiki-embedded)' },
    },
    {
      scope: ['variable'],
      settings: { foreground: 'var(--shiki-variable)' },
    },
  ],
}

// const theme = 'light-plus'

export const getHighlightedTokens = (
  line: string | number,
  lang: string,
  highlighter: any,
) => {
  if (typeof line === 'number') {
    return line
  }

  const tokenizationResult = highlighter.codeToTokens(line, {
    lang,
    theme: customTheme.name,
  })

  const tokens = tokenizationResult.tokens[0]

  return tokens.map((token: any) => ({
    c: token.content,
    s: { color: token.color },
  }))
}

// Each tab types at most 12 lines, the height of the editor.
const tabs = {
  gitops: {
    lang: 'yaml',
    id: 'gitops',
    name: 'release.yaml',
    sequence: [
      { lines: ['apiVersion: kustomize.toolkit.fluxcd.io/v1'], speed: 60 },
      { lines: ['kind: Kustomization'], speed: 60 },
      { lines: ['metadata:'], speed: 60 },
      { lines: [300, '  name: platform-production'], speed: 80 },
      { lines: [300, '  namespace: flux-system'], speed: 80 },
      { lines: ['spec:'], speed: 60 },
      { lines: [300, '  interval: 5m'], speed: 80 },
      { lines: [300, '  sourceRef:'], speed: 80 },
      { lines: [300, '    kind: OCIRepository'], speed: 80 },
      { lines: [300, '    name: platform-releases'], speed: 80 },
      { lines: [300, '  path: ./production'], speed: 80 },
      { lines: [300, '  prune: true'], speed: 80 },
    ],
  },
  ephemeral: {
    lang: 'yaml',
    id: 'ephemeral',
    name: 'pull-request.yml',
    sequence: [
      { lines: ['pr:'], speed: 60 },
      { lines: [300, '  branches:'], speed: 80 },
      { lines: [300, '    include: [main]'], speed: 80 },
      { lines: ['stages:'], speed: 60 },
      { lines: [300, '  - stage: EphemeralEnvironment'], speed: 80 },
      { lines: [300, '    jobs:'], speed: 80 },
      { lines: [300, '      - job: Verify'], speed: 80 },
      { lines: [300, '        steps:'], speed: 80 },
      {
        lines: [300, '          - script: nx affected -t build test'],
        speed: 70,
      },
      {
        lines: [300, '          - script: ./deploy-env.sh $(PullRequestId)'],
        speed: 70,
      },
      { lines: [300, '          - script: npx playwright test'], speed: 70 },
    ],
  },
  mesh: {
    lang: 'yaml',
    id: 'mesh',
    name: 'mtls.yaml',
    sequence: [
      { lines: ['apiVersion: security.istio.io/v1'], speed: 60 },
      { lines: ['kind: PeerAuthentication'], speed: 60 },
      { lines: ['metadata:'], speed: 60 },
      { lines: [300, '  name: default'], speed: 80 },
      { lines: [300, '  namespace: istio-system'], speed: 80 },
      { lines: ['spec:'], speed: 60 },
      { lines: [300, '  mtls:'], speed: 80 },
      { lines: [300, '    mode: STRICT'], speed: 80 },
    ],
  },
}

async function run() {
  const { createHighlighter } = await import('shiki')
  const createHighlighers = Object.values(tabs)
    .map(tab => tab.lang)
    .map(lang => {
      return createHighlighter({
        themes: [],
        langs: [lang],
      })
    })

  const highlighters = await Promise.all(Object.values(createHighlighers))

  const tokenizersByLang = Object.values(tabs)
    .map(tab => tab.lang)
    .reduce(
      (acc, lang) => ({
        ...acc,
        [lang]: highlighters.find(highlighter =>
          highlighter.getLoadedLanguages().includes(lang),
        ),
      }),
      {},
    ) as Record<string, any>

  const promises = Object.values(tokenizersByLang).map(tokenizer =>
    tokenizer.loadTheme(customTheme),
  )
  await Promise.all(promises)

  const entries = Object.values(tabs).reduce((acc, c) => {
    const tokenizer = tokenizersByLang[c.lang] as any

    if (tokenizer) {
      const newSeq = c.sequence.map(step => {
        const tokenizedLines = step.lines.map(line => {
          return getHighlightedTokens(line, c.lang, tokenizer)
        })
        return {
          s: step.speed,
          l: tokenizedLines,
        }
      })
      return {
        ...acc,
        [c.id]: {
          ...c,
          seq: newSeq,
        },
      }
    }
    return acc
  }, {})

  writeFileSync(
    path.join(process.cwd(), 'src', 'tokenized-tabs.ts'),
    `const entries = ${JSON.stringify(entries)};
export default entries`,
  )
}

run()
  .then(() =>
    console.log(`✓ Generated typing animation sequences successfully`),
  )
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error)
    process.exit(1)
  })
