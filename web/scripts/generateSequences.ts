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

// Each tab types at most 12 lines, the height of the editor. Lines stay
// short enough to fit the editor width. Typing is fast enough that a reader
// sees the full snippet within a few seconds.
const tabs = {
  library: {
    lang: 'ts',
    id: 'library',
    name: 'token-credential.ts',
    sequence: [
      { lines: ['export interface TokenCredentialFactory {'], speed: 88 },
      { lines: [120, '  readonly name: string'], speed: 88 },
      { lines: [120, '  build(): TokenCredential'], speed: 88 },
      { lines: ['}'], speed: 88 },
      {
        lines: ['export function chooseStrategy(info: ServiceInfo) {'],
        speed: 88,
      },
      { lines: [120, '  if (info.usePersonalIdentity) {'], speed: 88 },
      {
        lines: [120, "    // Local development uses the developer's own login"],
        speed: 88,
      },
      {
        lines: [120, '    return localDevelopmentTokenCredentialFactory()'],
        speed: 88,
      },
      { lines: [120, '  }'], speed: 88 },
      {
        lines: [300, '  // AKS pods use a managed identity, no static secret'],
        speed: 88,
      },
      {
        lines: [
          300,
          '  return userManagedIdentityTokenCredentialFactory(info)',
        ],
        speed: 88,
      },
      { lines: ['}'], speed: 88 },
    ],
  },
  terraform: {
    lang: 'hcl',
    id: 'terraform',
    name: 'cluster.tf',
    sequence: [
      { lines: ['resource "azurerm_kubernetes_cluster" "this" {'], speed: 88 },
      {
        lines: [120, '  # Pods get Entra tokens through workload identity'],
        speed: 88,
      },
      { lines: [120, '  oidc_issuer_enabled       = true'], speed: 88 },
      { lines: [120, '  workload_identity_enabled = true'], speed: 88 },
      {
        lines: [120, '  # Entra RBAC decides who can reach the cluster'],
        speed: 88,
      },
      {
        lines: [120, '  azure_active_directory_role_based_access_control {'],
        speed: 88,
      },
      { lines: [120, '    azure_rbac_enabled = true'], speed: 88 },
      { lines: [120, '  }'], speed: 88 },
      { lines: [120, '  api_server_access_profile {'], speed: 88 },
      {
        lines: [120, '    virtual_network_integration_enabled = true'],
        speed: 88,
      },
      { lines: [120, '  }'], speed: 88 },
      { lines: ['}'], speed: 88 },
    ],
  },
  gitops: {
    lang: 'yaml',
    id: 'gitops',
    name: 'production.yaml',
    sequence: [
      {
        lines: ['# Production runs the exact image that passed staging.'],
        speed: 88,
      },
      { lines: ['# Promotion changes values, never the build.'], speed: 88 },
      { lines: ['image:'], speed: 88 },
      { lines: [120, '  registry: example.azurecr.io'], speed: 88 },
      { lines: [120, '  repository: api'], speed: 88 },
      { lines: [120, '  digest: "sha256:0000...0000"'], speed: 88 },
      { lines: [120, '  pullPolicy: IfNotPresent'], speed: 88 },
      { lines: ['serviceAccount:'], speed: 88 },
      {
        lines: [120, '  # Workload identity, so the pod keeps no secret'],
        speed: 88,
      },
      { lines: [120, '  workloadIdentityClientId: "<client-id>"'], speed: 88 },
      { lines: ['appConfig:'], speed: 88 },
      { lines: [120, '  environment: Production'], speed: 88 },
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
