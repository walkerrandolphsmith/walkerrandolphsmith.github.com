import { LuHash } from 'react-icons/lu'

import tagData from '@/app/tag-data.json'
import { buildTagCatalog } from '@/lib/discovery'
import { filterByLabel } from '@/lib/paletteSearch'

import { useSearchIndex } from '../searchIndex'
import type { PaletteCommand, PaletteLevel } from '../types'
import { tagPostsLevel } from './articleResults'

/**
 * Search by tag. The first level lists the tags with their post counts from
 * tag-data.json. Choosing a tag opens a level with that tag's posts.
 */

const tagsLevel = (): PaletteLevel => ({
  key: 'tags',
  chip: 'Tag',
  placeholder: 'Search tags...',
  useContent: query => {
    const { posts, loading, failed } = useSearchIndex()
    const tags = posts ? buildTagCatalog(tagData, posts) : []
    const matches = filterByLabel(tags, query, tag => tag.label)
    return {
      loading,
      sections: [
        {
          id: 'tags',
          title: 'Tags',
          items: matches.map(tag => ({
            id: `tag-${tag.slug}`,
            title: tag.label,
            description: `${tag.count} ${tag.count === 1 ? 'post' : 'posts'}`,
            icon: LuHash,
            onSelect: actions => actions.push(tagPostsLevel(tag)),
            onChoose: actions => actions.push(tagPostsLevel(tag)),
          })),
        },
      ],
      emptyText: failed
        ? 'The tags did not load. Close the palette and try again.'
        : `No tag matches "${query.trim()}".`,
    }
  },
})

const tagsCommand: PaletteCommand = {
  id: 'tags',
  title: 'Search by tag',
  description: 'List the topics, then the posts for one topic',
  icon: LuHash,
  keywords: ['tags', 'topics', 'category', 'filter'],
  trigger: '#',
  open: tagsLevel,
}

export default tagsCommand
