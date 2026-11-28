import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import tagData from '@/app/tag-data.json'
import {
  buildTagCatalog,
  postsWithTag,
  readingMinutes,
  relatedPosts,
} from '@/lib/discovery'

import { allBlogs } from '../../.contentlayer/generated'

/**
 * Server-side post data for the blog list, the tag pages, and related
 * posts. The tag catalog reads the counts that contentlayer writes to
 * tag-data.json at build time.
 */

export type PostCardData = {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  readingMinutes: number
}

type BlogDocument = (typeof allBlogs)[number]

export const toPostCard = (
  post: Pick<
    BlogDocument,
    'slug' | 'title' | 'excerpt' | 'date' | 'tags' | 'readingTime'
  >,
): PostCardData => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  tags: post.tags ?? [],
  readingMinutes: readingMinutes(post.readingTime),
})

/** Published posts, newest first. Drafts show only in development. */
export const getPostCards = (): PostCardData[] =>
  allCoreContent(sortPosts(allBlogs)).map(toPostCard)

export const getTagCatalog = () => buildTagCatalog(tagData)

export const getTag = (slug: string) =>
  getTagCatalog().find(tag => tag.slug === slug)

export const getPostCardsForTag = (slug: string) =>
  postsWithTag(getPostCards(), slug)

export const getRelatedPostCards = (slug: string) => {
  const posts = getPostCards()
  const current = posts.find(post => post.slug === slug)
  return current ? relatedPosts(current, posts) : []
}
