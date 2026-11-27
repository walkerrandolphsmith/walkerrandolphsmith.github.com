'use client'

import { useEffect, useState } from 'react'

import { readingMinutes } from '@/lib/discovery'

/**
 * The palette's article data: the search index that contentlayer writes to
 * /search.json at build time. The palette fetches it once, the first time a
 * command needs it.
 */

export type IndexedPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  readingMinutes: number
}

type RawPost = Omit<IndexedPost, 'readingMinutes'> & {
  readingTime?: { minutes?: number }
}

let request: Promise<IndexedPost[]> | null = null

export const loadSearchIndex = () => {
  request ??= fetch('/search.json')
    .then(response => {
      if (!response.ok) throw new Error(`search.json: ${response.status}`)
      return response.json() as Promise<RawPost[]>
    })
    .then(posts =>
      posts.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: (post.excerpt ?? '').replace(/\s+/g, ' ').trim(),
        date: post.date,
        tags: post.tags ?? [],
        readingMinutes: readingMinutes(post.readingTime),
      })),
    )
    .catch(error => {
      request = null
      throw error
    })
  return request
}

export const useSearchIndex = () => {
  const [posts, setPosts] = useState<IndexedPost[] | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let live = true
    loadSearchIndex()
      .then(list => live && setPosts(list))
      .catch(() => live && setFailed(true))
    return () => {
      live = false
    }
  }, [])
  return { posts, loading: !posts && !failed, failed }
}
