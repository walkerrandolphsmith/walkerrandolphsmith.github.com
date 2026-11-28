import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  filterByLabel,
  highlight,
  scoreLabel,
  searchArticles,
  tokenize,
} from './paletteSearch.ts'

const posts = [
  {
    slug: 'nothing-holds-a-secret',
    title: 'Nothing Holds a Secret: Identity Instead of Keys',
    excerpt: 'Workload identity federation replaces keys.',
    date: '2025-03-01',
    tags: ['security', 'identity', 'azure'],
  },
  {
    slug: 'ci-is-a-framework',
    title: 'CI Is a Framework, Not a Library',
    excerpt: 'When each repository builds its own pipeline, it drifts.',
    date: '2026-01-01',
    tags: ['ci-cd', 'platform-engineering'],
  },
  {
    slug: 'smarter-retries',
    title: 'Smarter Retries',
    excerpt: 'Retry budgets keep a slow pipeline from a retry storm.',
    date: '2024-01-01',
    tags: ['distributed-systems'],
  },
  {
    slug: 'context-is-everything',
    title: 'Context Is Everything',
    excerpt: 'Good docs let a new hire ship on day one.',
    date: '2023-01-01',
    tags: ['developer-experience'],
  },
]

describe('tokenize', () => {
  it('lower-cases, strips accents, and splits on space', () => {
    assert.deepEqual(tokenize('  Café   CI '), ['cafe', 'ci'])
  })
})

describe('searchArticles', () => {
  it('returns the newest posts for an empty query', () => {
    assert.deepEqual(
      searchArticles(posts, '').map(m => m.post.slug),
      [
        'ci-is-a-framework',
        'nothing-holds-a-secret',
        'smarter-retries',
        'context-is-everything',
      ],
    )
  })

  it('ranks a title match above an excerpt match', () => {
    assert.deepEqual(
      searchArticles(posts, 'pipeline').map(m => m.post.slug),
      ['ci-is-a-framework', 'smarter-retries'],
    )
    assert.deepEqual(
      searchArticles(posts, 'retr').map(m => m.post.slug),
      ['smarter-retries'],
    )
  })

  it('matches tags', () => {
    assert.deepEqual(
      searchArticles(posts, 'azure').map(m => m.post.slug),
      ['nothing-holds-a-secret'],
    )
  })

  it('matches each word of a hyphenated tag', () => {
    assert.deepEqual(
      searchArticles(posts, 'experience').map(m => m.post.slug),
      ['context-is-everything'],
    )
    assert.deepEqual(
      searchArticles(posts, 'developer experience').map(m => m.post.slug),
      ['context-is-everything'],
    )
  })

  it('matches a slug tag by its display label', () => {
    assert.deepEqual(
      searchArticles(posts, 'CI/CD').map(m => m.post.slug),
      ['ci-is-a-framework'],
    )
  })

  it('needs every word to match', () => {
    assert.deepEqual(
      searchArticles(posts, 'identity framework').map(m => m.post.slug),
      [],
    )
  })

  it('obeys the limit', () => {
    assert.equal(searchArticles(posts, '', 2).length, 2)
  })
})

describe('scoreLabel and filterByLabel', () => {
  it('matches the start of a word in the label or keywords', () => {
    assert.ok(scoreLabel('Download resume', ['cv', 'pdf'], 'res') > 0)
    assert.ok(scoreLabel('Download resume', ['cv', 'pdf'], 'cv') > 0)
    assert.equal(scoreLabel('Download resume', ['cv', 'pdf'], 'sume'), 0)
  })

  it('ranks label matches above keyword matches', () => {
    const items = [
      { label: 'Social profiles', keywords: ['contact'] },
      { label: 'Contact', keywords: [] },
    ]
    assert.deepEqual(
      filterByLabel(
        items,
        'contact',
        i => i.label,
        i => i.keywords,
      ).map(i => i.label),
      ['Contact', 'Social profiles'],
    )
  })

  it('keeps every item for an empty query, in order', () => {
    assert.deepEqual(
      filterByLabel(['b', 'a'], '', i => i),
      ['b', 'a'],
    )
  })
})

describe('highlight', () => {
  it('marks each part of the text that matches a word', () => {
    assert.deepEqual(highlight('Smarter Retries', 'retr'), [
      { text: 'Smarter ', match: false },
      { text: 'Retr', match: true },
      { text: 'ies', match: false },
    ])
  })

  it('returns the text unmarked for an empty query', () => {
    assert.deepEqual(highlight('Smarter', ' '), [
      { text: 'Smarter', match: false },
    ])
  })
})
