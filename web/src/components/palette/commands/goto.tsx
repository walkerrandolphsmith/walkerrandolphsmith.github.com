import type { IconType } from 'react-icons'
import {
  LuArrowRight,
  LuBookOpen,
  LuBriefcase,
  LuFileText,
  LuHouse,
  LuLayers,
  LuQrCode,
  LuQuote,
  LuTags,
} from 'react-icons/lu'

import { filterByLabel } from '@/lib/paletteSearch'

import type {
  PaletteCommand,
  PaletteItem,
  PaletteLevel,
  PaletteSection,
} from '../types'

/** Go to: quick navigation to the pages of this site. */

type Page = {
  title: string
  href: string
  description: string
  icon: IconType
  keywords: string[]
}

export const sitePages: Page[] = [
  {
    title: 'Home',
    href: '/',
    description: 'Platform results, recommendations, and experience',
    icon: LuHouse,
    keywords: ['start', 'index'],
  },
  {
    title: 'Writing',
    href: '/blog/',
    description: 'All posts, newest first',
    icon: LuBookOpen,
    keywords: ['blog', 'articles', 'posts'],
  },
  {
    title: 'Topics',
    href: '/tags/',
    description: 'Every tag, with the number of posts',
    icon: LuTags,
    keywords: ['tags', 'categories'],
  },
  {
    title: 'Recommendations',
    href: '/recommendations/',
    description: 'What leaders and peers say about working with Walker',
    icon: LuQuote,
    keywords: ['testimonials', 'references'],
  },
  {
    title: 'Resume',
    href: '/resume/',
    description: 'Work experience, education, and skills',
    icon: LuFileText,
    keywords: ['cv', 'experience'],
  },
  {
    title: 'Platform work',
    href: '/#platform-work',
    description: 'Results from platform and developer experience work',
    icon: LuLayers,
    keywords: ['results', 'projects', 'portfolio'],
  },
  {
    title: 'Experience',
    href: '/#experience',
    description: 'Companies and roles',
    icon: LuBriefcase,
    keywords: ['jobs', 'career', 'work'],
  },
  {
    title: 'QR code',
    href: '/qr/',
    description: 'A QR code that opens this site',
    icon: LuQrCode,
    keywords: ['share', 'scan'],
  },
]

const pageItem = (page: Page): PaletteItem => ({
  id: `page-${page.href}`,
  title: page.title,
  description: page.description,
  icon: page.icon,
  meta: page.href,
  onSelect: actions => actions.navigate(page.href),
})

const matchPages = (query: string) =>
  filterByLabel(
    sitePages,
    query,
    page => page.title,
    page => page.keywords,
  )

const gotoLevel = (): PaletteLevel => ({
  key: 'goto',
  chip: 'Go to',
  placeholder: 'Search pages...',
  useContent: query => ({
    sections: [
      { id: 'pages', title: 'Pages', items: matchPages(query).map(pageItem) },
    ],
    emptyText: `No page matches "${query.trim()}".`,
  }),
})

const gotoCommand: PaletteCommand = {
  id: 'goto',
  title: 'Go to',
  description: 'Open a page of this site',
  icon: LuArrowRight,
  keywords: ['navigate', 'page', 'open', 'jump'],
  trigger: '>',
  open: gotoLevel,
  useRootSections: (query): PaletteSection[] => {
    if (!query.trim()) return []
    const pages = matchPages(query).slice(0, 3)
    return pages.length > 0
      ? [{ id: 'root-pages', title: 'Pages', items: pages.map(pageItem) }]
      : []
  },
}

export default gotoCommand
