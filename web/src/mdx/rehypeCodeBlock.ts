import type { Element, ElementContent, Root, RootContent } from 'hast'
import { bundledLanguages, createHighlighter, type Highlighter } from 'shiki'

import { codeTheme, languageLabel } from './codeTheme'

/** Blocks with more lines than this show line numbers. */
const LINE_NUMBER_THRESHOLD = 5

let highlighterPromise: Promise<Highlighter> | undefined

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({ themes: [codeTheme], langs: [] })
  return highlighterPromise
}

function textOf(node: RootContent | ElementContent): string {
  if (node.type === 'text') return node.value
  if ('children' in node) return node.children.map(textOf).join('')
  return ''
}

function isElement(node: RootContent | ElementContent): node is Element {
  return node.type === 'element'
}

function collectCodeBlocks(node: Root | Element, found: Element[]) {
  for (const child of node.children) {
    if (!isElement(child)) continue
    const [code] = child.children.filter(isElement)
    if (child.tagName === 'pre' && code?.tagName === 'code') {
      found.push(child)
    } else {
      collectCodeBlocks(child, found)
    }
  }
}

/**
 * Read the language and optional filename from a fence such as
 * ```ts:token-credential.ts or ```ts title="token-credential.ts".
 */
function parseFence(code: Element) {
  const classNames = (code.properties.className as string[] | undefined) ?? []
  const languageClass = classNames.find(name =>
    String(name).startsWith('language-'),
  )
  const fence = languageClass ? String(languageClass).slice(9) : ''
  const [rawLang, ...rest] = fence.split(':')
  const meta = String((code.data as { meta?: string } | undefined)?.meta ?? '')
  const titleMatch = /title="([^"]+)"/.exec(meta)
  return {
    lang: rawLang.toLowerCase() || 'text',
    filename: titleMatch?.[1] ?? (rest.join(':') || undefined),
  }
}

async function resolveLanguage(highlighter: Highlighter, lang: string) {
  if (!(lang in bundledLanguages)) return 'text'
  if (!highlighter.getLoadedLanguages().includes(lang)) {
    await highlighter.loadLanguage(lang as keyof typeof bundledLanguages)
  }
  return lang
}

/**
 * Highlight fenced code at build time with Shiki. The pre keeps only data
 * attributes, and the CodeBlock component renders the header and copy button.
 */
export default function rehypeCodeBlock() {
  return async (tree: Root) => {
    const blocks: Element[] = []
    collectCodeBlocks(tree, blocks)
    if (blocks.length === 0) return

    const highlighter = await getHighlighter()

    for (const pre of blocks) {
      const code = pre.children.find(isElement) as Element
      const { lang, filename } = parseFence(code)
      const source = textOf(code).replace(/\n$/, '')
      const resolved = await resolveLanguage(highlighter, lang)

      const highlighted = highlighter.codeToHast(source, {
        lang: resolved,
        theme: codeTheme.name,
      })
      const shikiPre = highlighted.children.find(isElement) as Element
      const shikiCode = shikiPre.children.find(isElement) as Element
      const lineCount = source.split('\n').length

      pre.properties = {
        className: ['code-block__pre'],
        dataLanguage: resolved,
        dataLabel: languageLabel(lang),
        ...(filename ? { dataFilename: filename } : {}),
        ...(lineCount > LINE_NUMBER_THRESHOLD
          ? {
              dataLineNumbers: '',
              style: `--code-gutter:${String(lineCount).length}ch`,
            }
          : {}),
      }
      shikiCode.properties = {}
      pre.children = [shikiCode]
    }
  }
}
