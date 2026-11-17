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
// short enough to fit the editor width.
const tabs = {
  terraform: {
    lang: 'hcl',
    id: 'terraform',
    name: 'cluster.tf',
    sequence: [
      { lines: ['resource "azurerm_kubernetes_cluster" "this" {'], speed: 60 },
      {
        lines: [300, '  # Pods get Entra tokens through workload identity'],
        speed: 70,
      },
      { lines: [300, '  oidc_issuer_enabled       = true'], speed: 70 },
      { lines: [300, '  workload_identity_enabled = true'], speed: 70 },
      {
        lines: [300, '  # Entra RBAC decides who can reach the cluster'],
        speed: 70,
      },
      {
        lines: [300, '  azure_active_directory_role_based_access_control {'],
        speed: 70,
      },
      { lines: [300, '    azure_rbac_enabled = true'], speed: 70 },
      { lines: [300, '  }'], speed: 70 },
      { lines: [300, '  api_server_access_profile {'], speed: 70 },
      {
        lines: [300, '    virtual_network_integration_enabled = true'],
        speed: 70,
      },
      { lines: [300, '  }'], speed: 70 },
      { lines: ['}'], speed: 70 },
    ],
  },
  gitops: {
    lang: 'yaml',
    id: 'gitops',
    name: 'production.yaml',
    sequence: [
      {
        lines: ['# Production runs the exact image that passed staging.'],
        speed: 60,
      },
      { lines: ['# Promotion changes values, never the build.'], speed: 70 },
      { lines: ['image:'], speed: 70 },
      { lines: [300, '  registry: example.azurecr.io'], speed: 70 },
      { lines: [300, '  repository: api'], speed: 70 },
      { lines: [300, '  digest: "sha256:0000...0000"'], speed: 70 },
      { lines: [300, '  pullPolicy: IfNotPresent'], speed: 70 },
      { lines: ['serviceAccount:'], speed: 70 },
      {
        lines: [300, '  # Workload identity, so the pod keeps no secret'],
        speed: 70,
      },
      { lines: [300, '  workloadIdentityClientId: "<client-id>"'], speed: 70 },
      { lines: ['appConfig:'], speed: 70 },
      { lines: [300, '  environment: Production'], speed: 70 },
    ],
  },
  library: {
    lang: 'ts',
    id: 'library',
    name: 'token-credential.ts',
    sequence: [
      { lines: ['export interface TokenCredentialFactory {'], speed: 60 },
      { lines: [300, '  readonly name: string'], speed: 70 },
      { lines: [300, '  build(): TokenCredential'], speed: 70 },
      { lines: ['}'], speed: 70 },
      {
        lines: ['export function chooseStrategy(info: ServiceInfo) {'],
        speed: 70,
      },
      { lines: [300, '  if (info.usePersonalIdentity) {'], speed: 70 },
      {
        lines: [300, "    // Local development uses the developer's own login"],
        speed: 70,
      },
      {
        lines: [300, '    return localDevelopmentTokenCredentialFactory()'],
        speed: 70,
      },
      { lines: [300, '  }'], speed: 70 },
      {
        lines: [
          300,
          '  // AKS pods use a managed identity, not a static secret',
        ],
        speed: 70,
      },
      {
        lines: [
          300,
          '  return userManagedIdentityTokenCredentialFactory(info)',
        ],
        speed: 70,
      },
      { lines: ['}'], speed: 70 },
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
