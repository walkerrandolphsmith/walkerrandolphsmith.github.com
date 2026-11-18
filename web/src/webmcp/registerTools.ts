import type { getSiteData } from '@/lib/siteContent'

import { type ToolName, webMcpTools } from './toolCatalog'

/**
 * Registers the read-only site tools with a WebMCP model context.
 *
 * Loaded with a dynamic import only after feature detection finds a model
 * context, so browsers without WebMCP never download this module.
 *
 * Every tool reads /site-data.json, which the build generates from the same
 * data the pages render. No tool writes data, submits a form, or reads
 * anything that the pages do not already show.
 */

type SiteData = ReturnType<typeof getSiteData>

export type ModelContextLike = {
  registerTool: (
    tool: Record<string, unknown>,
    options?: { signal?: AbortSignal },
  ) => unknown
}

let siteData: Promise<SiteData> | undefined

const loadSiteData = () => {
  siteData ??= fetch('/site-data.json', { credentials: 'omit' }).then(
    response => {
      if (!response.ok) {
        siteData = undefined
        throw new Error(`site-data.json returned HTTP ${response.status}`)
      }
      return response.json() as Promise<SiteData>
    },
  )
  return siteData
}

// The result shape that the WebMCP explainer uses, borrowed from MCP.
const result = (value: unknown) => ({
  content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
})

const words = (text: string) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .filter(Boolean)

type Input = Record<string, unknown>

const searchArticles = async ({ query, tag, limit }: Input) => {
  const { posts } = await loadSiteData()
  const max = Math.min(Math.max(Number(limit) || 5, 1), 50)
  const wantedTag = typeof tag === 'string' ? tag.trim().toLowerCase() : ''
  const terms = typeof query === 'string' ? words(query) : []

  const scored = posts
    .filter(
      post => !wantedTag || post.tags.some(t => t.toLowerCase() === wantedTag),
    )
    .map(post => {
      const fields = [
        { text: words(post.title), weight: 3 },
        { text: words(post.tags.join(' ')), weight: 2 },
        { text: words(post.headings.join(' ')), weight: 1 },
        { text: words(post.summary), weight: 1 },
      ]
      const score = terms.reduce(
        (total, term) =>
          total +
          fields.reduce(
            (sum, field) =>
              sum +
              (field.text.some(w => w.startsWith(term)) ? field.weight : 0),
            0,
          ),
        0,
      )
      return { post, score }
    })
    .filter(({ score }) => terms.length === 0 || score > 0)
    .sort((a, b) => b.score - a.score)

  return result({
    total: scored.length,
    articles: scored.slice(0, max).map(({ post }) => ({
      title: post.title,
      url: post.url,
      datePublished: post.datePublished,
      tags: post.tags,
      summary: post.summary,
    })),
  })
}

const getArticleSummary = async ({ slug }: Input) => {
  const { posts } = await loadSiteData()
  const wanted = String(slug ?? '')
    .trim()
    .replace(/^https?:\/\/[^/]+/, '')
    .replace(/^\/?blog\//, '')
    .replace(/^\/|\/$/g, '')
  const post = posts.find(p => p.slug === wanted)
  if (!post) {
    return result({
      error: `No article with slug "${wanted}".`,
      hint: 'Call search_articles to find a slug.',
    })
  }
  return result(post)
}

const handlers: Record<ToolName, (input: Input) => Promise<unknown>> = {
  search_articles: searchArticles,
  get_article_summary: getArticleSummary,
  get_experience: async () => result((await loadSiteData()).experience),
  get_platform_results: async () =>
    result((await loadSiteData()).platformResults),
  list_recommendations: async ({ group }: Input) => {
    const { recommendations } = await loadSiteData()
    return result(
      group ? recommendations.filter(g => g.id === group) : recommendations,
    )
  },
  get_contact_links: async () => result((await loadSiteData()).contactLinks),
}

export const registerSiteTools = async (
  modelContext: ModelContextLike,
  signal: AbortSignal,
) => {
  await Promise.all(
    webMcpTools.map(async tool => {
      try {
        const registration = await modelContext.registerTool(
          {
            ...tool,
            annotations: { readOnlyHint: true },
            execute: (input: Input = {}) => handlers[tool.name](input ?? {}),
          },
          { signal },
        )
        // Early Chrome builds returned an object with unregister() instead
        // of honoring the abort signal.
        const unregister = (registration as { unregister?: () => void })
          ?.unregister
        if (typeof unregister === 'function') {
          signal.addEventListener('abort', () => unregister.call(registration))
        }
      } catch {
        // A disabled "tools" permission rejects with NotAllowedError. The
        // page works the same without the tools, so the error is dropped.
      }
    }),
  )
}
