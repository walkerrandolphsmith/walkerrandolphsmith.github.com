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

const tabs = {
  k8s: {
    lang: 'yaml',
    id: 'k8s',
    name: 'deployment.yml',
    sequence: [
      { lines: ['apiVersion: apps/v1'], speed: 60 },
      { lines: ['kind: Deployment'], speed: 60 },
      { lines: ['metadata:'], speed: 60 },
      { lines: [400, '  name: {{ .Release.Name }}'], speed: 90 },
      { lines: [400, '  labels:'], speed: 90 },
      { lines: [400, '    app: {{ .Release.Name }}'], speed: 90 },
      { lines: ['spec:'], speed: 60 },
      { lines: [200, '  replicas: {{ .Values.replicaCount }}'], speed: 60 },
      { lines: [400, '  selector:'], speed: 90 },
      { lines: [400, '    matchLabels:'], speed: 90 },
      { lines: [400, '      app: {{ .Release.Name }}'], speed: 90 },
    ],
  },
  js: {
    lang: 'js',
    id: 'js',
    name: 'retry.js',
    sequence: [
      { lines: ['const { result: posts, error } = await retry('], speed: 60 },
      { lines: ['  fetchPosts,'], speed: 40 },
      { lines: ['  untilFirst('], speed: 60 },
      { lines: ['    untilHttpStatusOk(),'], speed: 60 },
      { lines: ['    untilMaxIterations(5)'], speed: 60 },
      { lines: ['  ),'], speed: 100 },
      { lines: ['  exponentialDecay(withJitter())'], speed: 60 },
      { lines: [')'], speed: 60 },
      { lines: [1000], speed: 60 },
      { lines: ['if (error) {'], speed: 10 },
      { lines: [20, '  logger.logEvent(error)'], speed: 60 },
    ],
  },
  ml: {
    lang: 'python',
    id: 'ml',
    name: 'kmeans.py',
    sequence: [
      { lines: [400, 'silhouette_score_by_k = {}'], speed: 65 },
      { lines: [450, 'minimum_required_number_of_clusters = 2'], speed: 75 },
      { lines: ['for k in range(1, 10):'], speed: 55 },
      {
        lines: [400, '    # perform k-means clustering with k clusters'],
        speed: 80,
      },
      { lines: [430, '    kmeans = KMeans('], speed: 90 },
      { lines: [420, '        n_clusters=k,'], speed: 70 },
      {
        lines: [430, '        n_init="auto",'],
        speed: 80,
      },
      {
        lines: [400, '        # force determinism'],
        speed: 75,
      },
      {
        lines: [400, '        random_state=0,'],
        speed: 75,
      },
      { lines: [450, '        max_iter=1000'], speed: 85 },
      { lines: [400, '    ).fit(X)'], speed: 70 },
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
    console.log(`✅ Generated typing animation sequences successfully`),
  )
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error)
    process.exit(1)
  })
