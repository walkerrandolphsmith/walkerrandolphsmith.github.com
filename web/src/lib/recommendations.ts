import { readFileSync } from 'fs'
import path from 'path'

import { recommendationGroups } from '@/data/recommendationGroups'
import sitemetadata from '@/data/sitemetadata'

/**
 * Reads the recommendations at build time from the same source files that
 * the recommendations page renders.
 *
 * Each recommendation is a component in src/components/testimonials that
 * passes literal props (name, level, company, url) to TestimonialCard and
 * holds the quote as paragraphs of JSX text. The recommendations page lists
 * the components of each group in order. This module reads both, so llms.txt,
 * llms-full.txt, and the WebMCP data file always match the page. The build
 * fails if a file does not have the expected shape, instead of publishing an
 * incomplete list.
 *
 * Server only: it reads source files with fs during the static export.
 */

export type Recommendation = {
  name: string
  role: string
  company: string
  linkedin: string
  url: string
  quote: string[]
}

export type RecommendationGroup = {
  id: string
  title: string
  recommendations: Recommendation[]
}

const sourceRoot = path.join(process.cwd(), 'src')

const readSource = (...segments: string[]) =>
  readFileSync(path.join(sourceRoot, ...segments), 'utf8')

const entities: Record<string, string> = {
  '&apos;': "'",
  '&quot;': '"',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
}

const toPlainText = (jsx: string) =>
  jsx
    .replace(/\{\s*(['"`])(.*?)\1\s*\}/g, '$2')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, entity => entities[entity] ?? entity)
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?)])/g, '$1')
    .trim()

// The anchor id that TestimonialCard gives each card.
const anchorFor = (name: string) =>
  `recommendation-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`

const prop = (source: string, name: string, file: string) => {
  const match = source.match(new RegExp(`\\b${name}="([^"]+)"`))
  if (!match) {
    throw new Error(`recommendations: ${file} has no literal ${name} prop`)
  }
  return match[1]
}

const parseRecommendation = (componentName: string): Recommendation => {
  const file = `${componentName}.tsx`
  const source = readSource('components', 'testimonials', file)
  const body = source.match(
    /<TestimonialCard[\s\S]*?>([\s\S]*)<\/TestimonialCard>/,
  )
  if (!body) {
    throw new Error(
      `recommendations: ${file} does not render a TestimonialCard`,
    )
  }
  const quote = Array.from(body[1].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g))
    .map(([, paragraph]) => toPlainText(paragraph))
    .filter(Boolean)
  if (quote.length === 0) {
    throw new Error(`recommendations: ${file} has no quote paragraphs`)
  }
  const name = prop(source, 'name', file)
  return {
    name,
    role: prop(source, 'level', file),
    company: prop(source, 'company', file),
    linkedin: prop(source, 'url', file),
    url: `${sitemetadata.siteUrl}/recommendations/#${anchorFor(name)}`,
    quote,
  }
}

let cache: RecommendationGroup[] | undefined

export const getRecommendationGroups = (): RecommendationGroup[] => {
  if (cache) return cache
  const page = readSource('app', 'recommendations', 'page.tsx')
  const blocks = Array.from(
    page.matchAll(
      /<TestimonialGroup[^>]*groups\[(\d+)\][^>]*>([\s\S]*?)<\/TestimonialGroup>/g,
    ),
  )
  if (blocks.length !== recommendationGroups.length) {
    throw new Error(
      `recommendations: page renders ${blocks.length} groups, data defines ${recommendationGroups.length}`,
    )
  }
  cache = blocks.map(([, index, members]) => {
    const group = recommendationGroups[Number(index)]
    const recommendations = Array.from(
      members.matchAll(/<(Testimonial\w+)\s*\/>/g),
    ).map(([, componentName]) => parseRecommendation(componentName))
    if (recommendations.length === 0) {
      throw new Error(`recommendations: group ${group.id} has no members`)
    }
    return { id: group.id, title: group.title, recommendations }
  })
  return cache
}
