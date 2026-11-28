import { Metadata } from 'next'

import sitemetadata from '@/data/sitemetadata'

/**
 * The Open Graph card for a post. The build writes it to
 * out/social/<slug>.png (see scripts/generateSocialCards.ts).
 */
export const socialCard = (slug: string, title: string) => ({
  url: `/social/${slug}.png`,
  width: 1200,
  height: 630,
  alt: title,
})

interface PageSEOProps {
  title: string
  route: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  route,
  description,
  image,
  ...rest
}: PageSEOProps): Metadata {
  // The site exports with trailing slashes, so canonical URLs end in one.
  const url = `${sitemetadata.siteUrl}/${route.replace(/^\/|\/$/g, '')}/`
  return {
    title,
    alternates: {
      canonical: url,
    },
    description: description || sitemetadata.description,
    openGraph: {
      title: `${title} | ${sitemetadata.title}`,
      description: description || sitemetadata.description,
      url,
      siteName: sitemetadata.title,
      images: image ? [image] : [sitemetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${sitemetadata.title}`,
      description: description || sitemetadata.description,
      card: 'summary_large_image',
      images: image ? [image] : [sitemetadata.socialBanner],
    },
    ...rest,
  }
}
