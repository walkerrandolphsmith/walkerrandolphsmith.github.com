import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import matter from 'gray-matter'

import { TAG_LABELS } from './discovery.ts'

// The nine brand areas that the site's posts may be tagged with. This list
// is the agreed tag set, written out here so that a new tag anywhere (a
// post's frontmatter or the label map) fails the test until the set changes
// on purpose.
const BRAND_TAGS = [
  'platform-engineering',
  'developer-experience',
  'ci-cd',
  'security-compliance',
  'distributed-systems',
  'system-design',
  'performance-reliability',
  'ai-engineering',
  'engineering-leadership',
]

const blogDir = fileURLToPath(new URL('../data/blog', import.meta.url))

const posts = readdirSync(blogDir)
  .filter(file => file.endsWith('.mdx'))
  .map(file => {
    const { data } = matter(readFileSync(join(blogDir, file), 'utf8'))
    return { file, tags: (data.tags ?? []) as string[] }
  })

describe('blog tags', () => {
  it('finds the posts', () => {
    assert.ok(posts.length > 0)
  })

  it('labels exactly the brand tags', () => {
    assert.deepEqual(Object.keys(TAG_LABELS).sort(), [...BRAND_TAGS].sort())
  })

  it('tags every post with two or three brand tags only', () => {
    for (const post of posts) {
      const outside = post.tags.filter(tag => !BRAND_TAGS.includes(tag))
      assert.deepEqual(outside, [], `${post.file} uses tags outside the set`)
      assert.ok(
        post.tags.length >= 2 && post.tags.length <= 3,
        `${post.file} has ${post.tags.length} tags`,
      )
    }
  })
})
