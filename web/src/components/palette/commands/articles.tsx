import { LuSearch } from 'react-icons/lu'

import { searchArticles } from '@/lib/paletteSearch'

import { useSearchIndex } from '../searchIndex'
import type { PaletteCommand, PaletteLevel } from '../types'
import { articleItem } from './articleResults'

/**
 * Search articles: the default command. Free text in the root view goes to
 * it. It matches the title, the tags, and the summary in search.json.
 */

const articlesLevel = (): PaletteLevel => ({
  key: 'articles',
  chip: 'Search articles',
  placeholder: 'Search by title, topic, or words in the summary...',
  useContent: query => {
    const { posts, loading, failed } = useSearchIndex()
    const matches = posts ? searchArticles(posts, query, 20) : []
    return {
      loading,
      sections: [
        {
          id: 'articles',
          title: query.trim() ? 'Articles' : 'Newest articles',
          items: matches.map(match => articleItem(match.post)),
        },
      ],
      emptyText: failed
        ? 'The articles did not load. Close the palette and try again.'
        : `No article matches "${query.trim()}".`,
    }
  },
})

const articlesCommand: PaletteCommand = {
  id: 'articles',
  title: 'Search articles',
  description: 'Find a post by its title, its topics, or words in its summary',
  icon: LuSearch,
  keywords: ['blog', 'posts', 'writing', 'find'],
  open: articlesLevel,
  useRootSections: query => {
    const { posts } = useSearchIndex()
    if (!posts || !query.trim()) return []
    const matches = searchArticles(posts, query, 6)
    return matches.length > 0
      ? [
          {
            id: 'root-articles',
            title: 'Articles',
            items: matches.map(match => articleItem(match.post)),
          },
        ]
      : []
  },
}

export default articlesCommand
