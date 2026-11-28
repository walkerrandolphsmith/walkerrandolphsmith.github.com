import { LuHash } from 'react-icons/lu'

import tagData from '@/app/tag-data.json'
import { buildTagCatalog } from '@/lib/discovery'
import { filterByLabel } from '@/lib/paletteSearch'

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
    const matches = filterByLabel(
      buildTagCatalog(tagData),
      query,
      tag => tag.label,
    )
    return {
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
      emptyText: `No tag matches "${query.trim()}".`,
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
