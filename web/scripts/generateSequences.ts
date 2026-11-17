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
  terraform: {
    lang: 'hcl',
    id: 'terraform',
    name: 'environment.tf',
    sequence: [
      { lines: ['module "environment" {'], speed: 60 },
      {
        lines: [300, '  source = "./modules/isolated-environment"'],
        speed: 70,
      },
      {
        lines: [300, '  # A separate tenant isolates the identity plane'],
        speed: 80,
      },
      { lines: [300, '  tenant_id = var.environment_tenant_id'], speed: 70 },
      {
        lines: [300, '  # Private endpoints isolate the network plane'],
        speed: 80,
      },
      { lines: [300, '  vnet_address_space = ["10.20.0.0/16"]'], speed: 70 },
      {
        lines: [300, '  private_endpoints  = ["acr", "key_vault", "sql"]'],
        speed: 70,
      },
      { lines: [300, '  public_network_access_enabled = false'], speed: 70 },
      {
        lines: [300, '  # ACR serves image pulls only inside the VNet'],
        speed: 80,
      },
      { lines: [300, '  acr_exclusive_pull = true'], speed: 70 },
      { lines: ['}'], speed: 60 },
    ],
  },
  gitops: {
    lang: 'yaml',
    id: 'gitops',
    name: 'production.yaml',
    sequence: [
      { lines: ['apiVersion: kustomize.toolkit.fluxcd.io/v1'], speed: 60 },
      { lines: ['kind: Kustomization'], speed: 60 },
      { lines: ['metadata:'], speed: 60 },
      { lines: [300, '  name: api-production'], speed: 80 },
      { lines: ['spec:'], speed: 60 },
      { lines: [300, '  dependsOn:'], speed: 80 },
      { lines: [300, '    - name: api-staging'], speed: 80 },
      {
        lines: [300, '  sourceRef: { kind: OCIRepository, name: releases }'],
        speed: 70,
      },
      { lines: [300, '  path: ./production'], speed: 80 },
      { lines: [300, '  images:'], speed: 80 },
      { lines: [300, '    - name: example.azurecr.io/api'], speed: 80 },
      {
        lines: [300, '      newTag: 1.42.0 # the image that passed staging'],
        speed: 80,
      },
    ],
  },
  library: {
    lang: 'ts',
    id: 'library',
    name: 'auth-client.ts',
    sequence: [
      {
        lines: ["import { DefaultAzureCredential } from '@azure/identity'"],
        speed: 60,
      },
      {
        lines: [300, '// Each service gets tokens from its managed identity.'],
        speed: 80,
      },
      { lines: [300, '// No service keeps a static secret.'], speed: 80 },
      {
        lines: [300, 'const credential = new DefaultAzureCredential()'],
        speed: 70,
      },
      { lines: [300, 'const scope = process.env.API_SCOPE'], speed: 70 },
      {
        lines: [300, 'export const callApi = async (url: string) => {'],
        speed: 70,
      },
      {
        lines: [300, '  const { token } = await credential.getToken(scope)'],
        speed: 70,
      },
      { lines: [300, '  return fetch(url, {'], speed: 70 },
      {
        lines: [300, '    headers: { Authorization: `Bearer ${token}` },'],
        speed: 70,
      },
      { lines: [300, '  })'], speed: 70 },
      { lines: ['}'], speed: 60 },
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
