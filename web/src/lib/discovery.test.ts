import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  buildTagCatalog,
  postsWithTag,
  readingMinutes,
  readingTimeLabel,
  relatedPosts,
  tagHref,
  tagSlug,
} from './discovery.ts'

const post = (slug: string, date: string, tags: string[]) => ({
  slug,
  title: slug,
  date,
  tags,
})

describe('tagSlug', () => {
  it('matches the slugs in tag-data.json', () => {
    assert.equal(tagSlug('CI/CD'), 'cicd')
    assert.equal(tagSlug('platform engineering'), 'platform-engineering')
    assert.equal(tagSlug('Azure Front Door'), 'azure-front-door')
  })

  it('builds the tag page URL', () => {
    assert.equal(tagHref('CI/CD'), '/tags/cicd/')
  })
})

describe('buildTagCatalog', () => {
  const posts = [
    { tags: ['CI/CD', 'security'] },
    { tags: ['CI/CD', 'Security'] },
    { tags: ['ci/cd', 'security'] },
  ]

  it('takes the tags and counts from tag-data.json', () => {
    const catalog = buildTagCatalog({ cicd: 3, security: 3, dns: 1 }, posts)
    assert.deepEqual(
      catalog.map(tag => [tag.slug, tag.count]),
      [
        ['cicd', 3],
        ['security', 3],
        ['dns', 1],
      ],
    )
  })

  it('labels each tag with the spelling most posts use', () => {
    const catalog = buildTagCatalog({ cicd: 3, security: 3 }, posts)
    assert.equal(catalog.find(tag => tag.slug === 'cicd')?.label, 'CI/CD')
    assert.equal(
      catalog.find(tag => tag.slug === 'security')?.label,
      'security',
    )
  })

  it('falls back to the slug when no post has the tag', () => {
    const catalog = buildTagCatalog({ dns: 1 }, [])
    assert.deepEqual(catalog, [{ slug: 'dns', label: 'dns', count: 1 }])
  })

  it('drops tags with no posts', () => {
    assert.deepEqual(buildTagCatalog({ dns: 0 }, []), [])
  })
})

describe('postsWithTag', () => {
  it('returns the posts with the tag, newest first', () => {
    const posts = [
      post('old', '2024-01-01', ['CI/CD']),
      post('new', '2026-01-01', ['ci/cd']),
      post('other', '2025-01-01', ['dns']),
    ]
    assert.deepEqual(
      postsWithTag(posts, 'cicd').map(p => p.slug),
      ['new', 'old'],
    )
  })
})

describe('relatedPosts', () => {
  const current = post('current', '2026-06-01', ['a', 'b', 'c'])

  it('ranks by shared tags, then by date, and leaves out the current post', () => {
    const posts = [
      current,
      post('one-tag-new', '2026-05-01', ['a']),
      post('two-tags', '2024-01-01', ['a', 'b']),
      post('one-tag-old', '2023-01-01', ['c']),
      post('three-tags', '2022-01-01', ['a', 'b', 'c']),
      post('no-tags', '2026-05-30', ['z']),
    ]
    assert.deepEqual(
      relatedPosts(current, posts).map(p => p.slug),
      ['three-tags', 'two-tags', 'one-tag-new'],
    )
  })

  it('counts a tag once when a post repeats it in another spelling', () => {
    const posts = [
      post('repeats', '2020-01-01', ['A', 'a']),
      post('two', '2019-01-01', ['a', 'b']),
    ]
    assert.deepEqual(
      relatedPosts(current, posts).map(p => p.slug),
      ['two', 'repeats'],
    )
  })

  it('fills up to the minimum with the newest other posts', () => {
    const posts = [
      current,
      post('shared', '2020-01-01', ['a']),
      post('newest', '2026-05-30', ['z']),
      post('older', '2025-01-01', ['y']),
    ]
    assert.deepEqual(
      relatedPosts(current, posts).map(p => p.slug),
      ['shared', 'newest'],
    )
  })

  it('obeys the limit', () => {
    const posts = ['p1', 'p2', 'p3', 'p4'].map(slug =>
      post(slug, '2025-01-01', ['a']),
    )
    assert.equal(relatedPosts(current, posts, { limit: 2 }).length, 2)
  })
})

describe('reading time', () => {
  it('rounds to whole minutes and shows at least one', () => {
    assert.equal(readingMinutes({ minutes: 6.4 }), 6)
    assert.equal(readingMinutes({ minutes: 0.2 }), 1)
    assert.equal(readingMinutes(undefined), 1)
    assert.equal(readingTimeLabel({ minutes: 9.6 }), '10 min read')
  })
})
