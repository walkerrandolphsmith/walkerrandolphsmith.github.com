import sitemetadata from '@/data/sitemetadata'
import { absoluteUrl, profile } from '@/lib/siteContent'

/**
 * Schema.org JSON-LD for search engines and AI assistants. Each page renders
 * one <JsonLd> with an @graph. The Person and WebSite nodes have stable @id
 * values, so other nodes refer to them instead of repeating them.
 */

type Node = Record<string, unknown>

const personId = absoluteUrl('/#person')
const websiteId = absoluteUrl('/#website')
const personRef = { '@id': personId }

export const personNode = (): Node => ({
  '@type': 'Person',
  '@id': personId,
  name: profile.name,
  url: profile.url,
  jobTitle: profile.jobTitle,
  description: profile.description,
  sameAs: profile.sameAs,
  knowsAbout: profile.knowsAbout,
  worksFor: { '@type': 'Organization', name: profile.worksFor },
  alumniOf: { '@type': 'CollegeOrUniversity', name: profile.alumniOf },
})

export const websiteNode = (): Node => ({
  '@type': 'WebSite',
  '@id': websiteId,
  url: absoluteUrl('/'),
  name: sitemetadata.title,
  description: sitemetadata.description,
  inLanguage: sitemetadata.locale,
  publisher: personRef,
})

export const breadcrumbNode = (
  trail: { name: string; route: string }[],
): Node => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', route: '/' }, ...trail].map(
    (crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.route),
    }),
  ),
})

export const profilePageNode = (route: string, name: string): Node => ({
  '@type': 'ProfilePage',
  '@id': absoluteUrl(route),
  url: absoluteUrl(route),
  name,
  isPartOf: { '@id': websiteId },
  mainEntity: personRef,
})

export const collectionPageNode = (
  route: string,
  name: string,
  description: string,
): Node => ({
  '@type': 'CollectionPage',
  '@id': absoluteUrl(route),
  url: absoluteUrl(route),
  name,
  description,
  isPartOf: { '@id': websiteId },
  about: personRef,
})

export const blogPostingNode = (post: {
  title: string
  summary: string
  url: string
  datePublished: string
  dateModified: string
  tags: string[]
  image?: string | null
}): Node => ({
  '@type': 'BlogPosting',
  '@id': post.url,
  url: post.url,
  mainEntityOfPage: post.url,
  headline: post.title,
  description: post.summary,
  datePublished: post.datePublished,
  dateModified: post.dateModified,
  author: {
    '@type': 'Person',
    ...personRef,
    name: profile.name,
    url: profile.url,
  },
  publisher: personRef,
  image: post.image
    ? post.image.startsWith('http')
      ? post.image
      : absoluteUrl(post.image)
    : absoluteUrl('/twitter-card.png'),
  keywords: post.tags,
  inLanguage: sitemetadata.locale,
  isPartOf: { '@id': websiteId },
})

// "<" is escaped so that text inside the JSON can never close the script
// element early.
export const JsonLd = ({ graph }: { graph: Node[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': graph,
      }).replace(/</g, '\\u003c'),
    }}
  />
)
