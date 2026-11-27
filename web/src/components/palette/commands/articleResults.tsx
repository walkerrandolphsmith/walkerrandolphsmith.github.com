import { LuExternalLink, LuFileText, LuHash, LuLink } from 'react-icons/lu'

import { postsWithTag, tagSlug } from '@/lib/discovery'
import { filterByLabel, searchArticles } from '@/lib/paletteSearch'

import { ArticlePanel, ArticleRow } from '../parts'
import { type IndexedPost, useSearchIndex } from '../searchIndex'
import type { PaletteItem, PaletteLevel } from '../types'

/**
 * Article rows and the levels they open. The article search, the tag
 * search, and the article details share them.
 */

const articlePath = (post: IndexedPost) => `/blog/${post.slug}/`

const shorten = (text: string, length = 32) =>
  text.length > length ? `${text.slice(0, length - 1).trimEnd()}…` : text

export const articleItem = (post: IndexedPost): PaletteItem => ({
  id: `article-${post.slug}`,
  title: post.title,
  icon: LuFileText,
  render: query => <ArticleRow post={post} query={query} />,
  onSelect: actions => actions.navigate(articlePath(post)),
  onChoose: actions => actions.push(articleDetailLevel(post)),
})

/** One article: its actions on the left, its details on the right. */
export const articleDetailLevel = (post: IndexedPost): PaletteLevel => ({
  key: `article:${post.slug}`,
  chip: `Article › ${shorten(post.title)}`,
  placeholder: 'Filter actions...',
  useContent: query => {
    const items: PaletteItem[] = [
      {
        id: 'open',
        title: 'Open article',
        description: `Read the full post. ${post.readingMinutes} min read.`,
        icon: LuExternalLink,
        onSelect: actions => actions.navigate(articlePath(post)),
      },
      {
        id: 'copy',
        title: 'Copy link',
        description: 'Copy the address of the post to share it',
        icon: LuLink,
        onSelect: actions => {
          const url = new URL(articlePath(post), window.location.origin)
          navigator.clipboard
            ?.writeText(url.toString())
            .then(() => actions.announce('Link copied'))
            .catch(() => actions.announce('Could not copy the link'))
        },
      },
      ...post.tags.map(tag => ({
        id: `tag-${tag}`,
        title: `See posts about ${tag}`,
        description: 'List the posts with this tag',
        icon: LuHash,
        onSelect: actions =>
          actions.push(tagPostsLevel({ slug: tagSlug(tag), label: tag })),
        onChoose: actions =>
          actions.push(tagPostsLevel({ slug: tagSlug(tag), label: tag })),
      })),
    ]
    return {
      sections: [
        {
          id: 'article-actions',
          title: 'Article',
          items: filterByLabel(items, query, item => item.title),
        },
      ],
      panel: <ArticlePanel post={post} />,
      emptyText: 'No action matches. Press Backspace to go back.',
    }
  },
})

/** The posts with one tag, with a link to the tag's page. */
export const tagPostsLevel = (tag: {
  slug: string
  label: string
}): PaletteLevel => ({
  key: `tag:${tag.slug}`,
  chip: `Tag › ${tag.label}`,
  placeholder: `Filter posts about ${tag.label}...`,
  useContent: query => {
    const { posts, loading, failed } = useSearchIndex()
    const tagged = posts ? postsWithTag(posts, tag.slug) : []
    const matches = searchArticles(tagged, query, tagged.length)
    return {
      loading,
      sections: [
        {
          id: 'tag-posts',
          title: `Posts about ${tag.label}`,
          items: matches.map(match => articleItem(match.post)),
        },
        {
          id: 'tag-page',
          title: 'Topic',
          items: filterByLabel(
            [
              {
                id: 'tag-page',
                title: `Open the ${tag.label} page`,
                description: `/tags/${tag.slug}/`,
                icon: LuHash,
                onSelect: actions => actions.navigate(`/tags/${tag.slug}/`),
              },
            ],
            query,
            item => item.title,
            () => ['page', 'topic'],
          ),
        },
      ],
      emptyText: failed
        ? 'The posts did not load. Close the palette and try again.'
        : `No post about ${tag.label} matches.`,
    }
  },
})
