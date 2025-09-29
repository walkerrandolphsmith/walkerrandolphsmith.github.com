import { MetadataRoute } from 'next'

import siteMetadata from '@/data/sitemetadata'

import { allBlogs } from '../../.contentlayer/generated'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter(post => !post.draft)
    .map(post => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'recommendations', 'qr', 'resume'].map(route => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
