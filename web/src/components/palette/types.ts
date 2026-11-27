import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'

/**
 * The command palette is a registry of commands. Each command owns three
 * things: how it matches what the reader types, how it fetches its results,
 * and how it renders them. The palette shell only moves the selection,
 * shows the chips, and calls the item handlers. To add a command, write a
 * module in ./commands and add it to ./registry.ts.
 */

export type PaletteActions = {
  /** Open a level on top of the current one (a command, or a result). */
  push: (level: PaletteLevel, query?: string) => void
  /** Go back one level. */
  pop: () => void
  close: () => void
  /** Go to a page of this site and close the palette. */
  navigate: (href: string) => void
  /** Open a link to another site in a new tab and close the palette. */
  openExternal: (href: string) => void
  /** Tell screen reader users what happened, for example "Link copied". */
  announce: (message: string) => void
}

export type PaletteItem = {
  id: string
  title: string
  description?: string
  icon?: IconType
  /** A short value at the right side of the row, for example a count. */
  meta?: string
  /** The command takes input, so its title ends in "...". */
  takesInput?: boolean
  /** Custom row content, in place of the title and description. */
  render?: (query: string) => ReactNode
  /** Enter, or a click: the main action. */
  onSelect: (actions: PaletteActions) => void
  /** Tab: choose the item and open its level (its command or details). */
  onChoose?: (actions: PaletteActions) => void
}

export type PaletteSection = {
  id: string
  title: string
  items: PaletteItem[]
}

export type LevelContent = {
  sections: PaletteSection[]
  /** A custom detail panel. With a panel, the level shows two panes. */
  panel?: ReactNode
  loading?: boolean
  /** The text to show when no section has an item. */
  emptyText?: string
}

export type PaletteLevel = {
  key: string
  /** The text of the chip in the search field. */
  chip: string
  placeholder: string
  /**
   * The level's fetch-and-match strategy. The palette calls it as a React
   * hook with the current query, so it can load data and keep state.
   */
  useContent: (query: string, actions: PaletteActions) => LevelContent
}

export type PaletteCommand = {
  id: string
  title: string
  description: string
  icon: IconType
  /** Extra words that find the command, for example "cv" for the resume. */
  keywords: string[]
  /** A prefix that opens the command from the root, for example "#". */
  trigger?: string
  /** For a command that takes input: the level to open. */
  open?: () => PaletteLevel
  /** For a command that does one thing: do it. */
  run?: (actions: PaletteActions) => void
  /** Results that the command adds to the root view for free text. */
  useRootSections?: (query: string, actions: PaletteActions) => PaletteSection[]
}

export type SocialProfile = {
  id: string
  label: string
  url: string
  handle: string
  description: string
}

export type SocialInfo = {
  name: string
  jobTitle: string
  headline: string
  currentRole: string
  avatar: string
  website: string
  profiles: SocialProfile[]
  resumePdf: string
  resumePage: string
  qrPage: string
}
