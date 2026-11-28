import { filterByLabel, scoreLabel } from '@/lib/paletteSearch'

import articlesCommand from './commands/articles'
import gotoCommand from './commands/goto'
import { commandItem, helpItem } from './commands/help'
import resumeCommand from './commands/resume'
import { createSocialCommand } from './commands/social'
import tagsCommand from './commands/tags'
import type {
  PaletteCommand,
  PaletteLevel,
  PaletteSection,
  SocialInfo,
} from './types'

/**
 * The palette's commands, in the order the root view lists them. To add a
 * command, write a module in ./commands and add it here. No other command
 * changes.
 */
export const createCommands = (social: SocialInfo): PaletteCommand[] => [
  gotoCommand,
  articlesCommand,
  tagsCommand,
  resumeCommand,
  createSocialCommand(social),
]

/**
 * The root view. Free text goes to every command that adds root results
 * (articles first, then pages), and the commands whose names match follow.
 * An empty field lists the commands and the suggestions.
 */
export const rootLevel = (commands: PaletteCommand[]): PaletteLevel => ({
  key: 'root',
  chip: '',
  placeholder:
    'Search articles, or type a command: go to, tag, resume, social...',
  useContent: (query, actions) => {
    // Each command's root strategy is a hook. The command list never
    // changes while the palette is open, so the hooks run in the same order.
    const resultSections: PaletteSection[] = commands.flatMap(
      command => command.useRootSections?.(query, actions) ?? [],
    )
    const matchingCommands = filterByLabel(
      commands,
      query,
      command => command.title,
      command => command.keywords,
    )
    const help = helpItem(commands)
    const showHelp =
      !query.trim() || scoreLabel(help.title, ['help', 'keys'], query) > 0

    const sections: PaletteSection[] = [
      ...resultSections,
      {
        id: 'commands',
        title: 'Commands',
        items: matchingCommands.map(commandItem),
      },
      {
        id: 'suggestions',
        title: 'Suggestions',
        items: showHelp ? [help] : [],
      },
    ]
    return {
      sections,
      emptyText: `No result for "${query.trim()}". Try fewer words.`,
    }
  },
})

/** The command that a prefix such as "#" opens, and the rest of the text. */
export const commandForTrigger = (
  commands: PaletteCommand[],
  query: string,
) => {
  for (const command of commands) {
    if (command.open && command.trigger && query.startsWith(command.trigger)) {
      return { command, rest: query.slice(command.trigger.length).trimStart() }
    }
  }
  return null
}
