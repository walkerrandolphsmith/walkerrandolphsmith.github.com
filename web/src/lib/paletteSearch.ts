/**
 * Pure text matching for the command palette. Each palette command picks
 * the matcher that suits its results. This module has no local imports, so
 * `node --test` loads it directly.
 */

export type SearchablePost = {
  slug: string
  title: string
  excerpt?: string
  date: string
  tags?: string[]
}

export type ArticleMatch<T extends SearchablePost> = {
  post: T
  score: number
}

/**
 * Lower case, no accents, hyphens and slashes read as spaces, and runs of
 * space collapsed to one. So the tag "ci-cd" and the label "CI/CD" match.
 */
export const normalize = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[-/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const tokenize = (query: string) =>
  normalize(query).split(' ').filter(Boolean)

const startsAWord = (text: string, token: string) =>
  text.startsWith(token) || text.includes(` ${token}`)

const time = (date: string) => new Date(date).getTime()

/**
 * Score one post against the query tokens. Every token must occur in the
 * title, a tag, or the excerpt, or the post does not match (score 0). A
 * token at the start of a title word counts the most.
 */
export const scoreArticle = (post: SearchablePost, tokens: string[]) => {
  if (tokens.length === 0) return 0
  const title = normalize(post.title)
  const tags = (post.tags ?? []).map(normalize)
  const excerpt = normalize(post.excerpt ?? '')

  let score = 0
  for (const token of tokens) {
    let best = 0
    if (startsAWord(title, token)) best = 10
    else if (title.includes(token)) best = 6
    if (tags.some(tag => tag === token)) best = Math.max(best, 8)
    else if (tags.some(tag => startsAWord(tag, token))) best = Math.max(best, 5)
    if (best === 0 && excerpt.includes(token)) best = 1
    if (best === 0) return 0
    score += best
  }
  if (tokens.length > 1 && title.includes(tokens.join(' '))) score += 15
  return score
}

/**
 * Free-text article search. An empty query returns the newest posts. Ties
 * go to the newer post.
 */
export const searchArticles = <T extends SearchablePost>(
  posts: T[],
  query: string,
  limit = 8,
): ArticleMatch<T>[] => {
  const tokens = tokenize(query)
  const byDate = (a: ArticleMatch<T>, b: ArticleMatch<T>) =>
    time(b.post.date) - time(a.post.date)

  if (tokens.length === 0) {
    return posts
      .map(post => ({ post, score: 0 }))
      .sort(byDate)
      .slice(0, limit)
  }
  return posts
    .map(post => ({ post, score: scoreArticle(post, tokens) }))
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score || byDate(a, b))
    .slice(0, limit)
}

/**
 * Score a short label and its keywords, for commands, tags, and pages. Every
 * token must start a word in the label or a keyword. Matches on the label
 * score higher than matches on keywords.
 */
export const scoreLabel = (
  label: string,
  keywords: string[],
  query: string,
) => {
  const tokens = tokenize(query)
  if (tokens.length === 0) return 1
  const name = normalize(label)
  const words = keywords.map(normalize)
  let score = 0
  for (const token of tokens) {
    if (name.startsWith(token)) score += 4
    else if (startsAWord(name, token)) score += 3
    else if (words.some(word => startsAWord(word, token))) score += 1
    else return 0
  }
  return score
}

/** Filter and rank items by `scoreLabel`, keeping the order for ties. */
export const filterByLabel = <T>(
  items: T[],
  query: string,
  label: (item: T) => string,
  keywords: (item: T) => string[] = () => [],
): T[] =>
  items
    .map((item, index) => ({
      item,
      index,
      score: scoreLabel(label(item), keywords(item), query),
    }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(entry => entry.item)

export type TextSegment = { text: string; match: boolean }

/**
 * Split text into matched and unmatched parts, so a result can mark the
 * words that matched the query.
 */
export const highlight = (text: string, query: string): TextSegment[] => {
  const tokens = tokenize(query)
  if (tokens.length === 0) return [{ text, match: false }]
  const lower = text.toLowerCase()
  const marks = new Array<boolean>(text.length).fill(false)
  for (const token of tokens) {
    let from = lower.indexOf(token)
    while (from !== -1) {
      for (let i = from; i < from + token.length; i += 1) marks[i] = true
      from = lower.indexOf(token, from + token.length)
    }
  }
  const segments: TextSegment[] = []
  for (let i = 0; i < text.length; i += 1) {
    const last = segments[segments.length - 1]
    if (last && last.match === marks[i]) last.text += text[i]
    else segments.push({ text: text[i], match: marks[i] })
  }
  return segments
}
