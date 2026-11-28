import { slug } from 'github-slugger'

/**
 * Pure helpers for the reader-facing discovery features: the tag catalog,
 * tag filters, related posts, and reading time. They take plain post data,
 * so the build, the pages, and the unit tests share one implementation.
 *
 * This module has no local imports, so `node --test` loads it directly.
 */

export type DiscoveryPost = {
  slug: string
  title: string
  date: string
  tags?: string[]
}

export type TagSummary = {
  /** The URL-safe tag, as tag-data.json and the /tags/<slug>/ route use it. */
  slug: string
  /** The tag as readers see it, for example "CI/CD". */
  label: string
  count: number
}

/** The same slug that contentlayer writes to tag-data.json. */
export const tagSlug = (tag: string) => slug(tag)

export const tagHref = (tag: string) => `/tags/${tagSlug(tag)}/`

/**
 * The reader-facing label for each tag slug. These nine brand areas are the
 * only tags a post may use.
 */
export const TAG_LABELS: Record<string, string> = {
  'platform-engineering': 'Platform engineering',
  'developer-experience': 'Developer experience',
  'ci-cd': 'CI/CD',
  'security-compliance': 'Security and compliance',
  'distributed-systems': 'Distributed systems',
  'system-design': 'System design',
  'performance-reliability': 'Performance and reliability',
  'ai-engineering': 'AI engineering',
  'engineering-leadership': 'Engineering leadership',
}

/**
 * The tag as readers see it. Slugs are for keys and URLs only. A slug that
 * is not in TAG_LABELS shows in sentence case; any other tag shows as written.
 */
export const tagLabel = (tag: string) => {
  const key = tagSlug(tag)
  if (TAG_LABELS[key]) return TAG_LABELS[key]
  if (tag !== key) return tag
  const words = key.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

const uniqueSlugs = (tags: string[] = []) =>
  Array.from(new Set(tags.map(tagSlug)))

const time = (date: string) => new Date(date).getTime()

const newestFirst = (a: DiscoveryPost, b: DiscoveryPost) =>
  time(b.date) - time(a.date)

/**
 * The tag catalog. The counts and the set of tags come from tag-data.json,
 * and each label comes from tagLabel. Most-used tags come first; tags with
 * the same count sort by label.
 */
export const buildTagCatalog = (counts: Record<string, number>): TagSummary[] =>
  Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([key, count]) => ({ slug: key, label: tagLabel(key), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))

/** Posts that carry the tag, newest first. */
export const postsWithTag = <T extends DiscoveryPost>(
  posts: T[],
  tag: string,
): T[] =>
  posts
    .filter(post => uniqueSlugs(post.tags).includes(tagSlug(tag)))
    .sort(newestFirst)

/**
 * Related posts for the end of an article. Posts that share more tags with
 * the current post come first, and the newer post wins a tie. When fewer
 * than `min` posts share a tag, the newest other posts fill the list.
 */
export const relatedPosts = <T extends DiscoveryPost>(
  current: DiscoveryPost,
  posts: T[],
  { limit = 3, min = 2 }: { limit?: number; min?: number } = {},
): T[] => {
  const currentTags = new Set(uniqueSlugs(current.tags))
  const others = posts.filter(post => post.slug !== current.slug)

  const shared = (post: DiscoveryPost) =>
    uniqueSlugs(post.tags).filter(tag => currentTags.has(tag)).length

  const ranked = others
    .map(post => ({ post, shared: shared(post) }))
    .filter(entry => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || newestFirst(a.post, b.post))
    .map(entry => entry.post)
    .slice(0, limit)

  if (ranked.length >= min) return ranked

  const fill = others
    .filter(post => !ranked.includes(post))
    .sort(newestFirst)
    .slice(0, min - ranked.length)
  return [...ranked, ...fill]
}

/** Whole minutes to read a post, at least one. */
export const readingMinutes = (readingTime?: { minutes?: number } | null) =>
  Math.max(1, Math.round(readingTime?.minutes ?? 0))
