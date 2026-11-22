import { MetadataRoute } from 'next'

import siteMetadata from '@/data/sitemetadata'

import { allBlogs } from '../../.contentlayer/generated'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter(post => !post.draft)
    .map(post => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
    }))

  // Trailing slashes match the exported URLs and the canonical links.
  const routes = ['', 'blog', 'recommendations', 'qr', 'resume'].map(route => ({
    url: route ? `${siteUrl}/${route}/` : `${siteUrl}/`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
