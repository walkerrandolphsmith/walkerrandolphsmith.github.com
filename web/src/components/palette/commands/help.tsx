import { LuCircleHelp } from 'react-icons/lu'

import { filterByLabel } from '@/lib/paletteSearch'

import { PanelTitle } from '../parts'
import type { PaletteCommand, PaletteItem, PaletteLevel } from '../types'

/** Help: every command, its shortcut, and the keys of the palette. */

const keys = [
  ['↑ ↓', 'Move the selection'],
  ['Enter', 'Open the selected result or command'],
  ['Tab', 'Choose a command, or show the details of a result'],
  ['Backspace', 'Go back one step when the search field is empty'],
  ['Esc', 'Go back one step, or close the palette'],
  ['⌘ K / Ctrl K', 'Open or close the palette from any page'],
]

const HelpPanel = ({ commands }: { commands: PaletteCommand[] }) => (
  <div className="grid gap-4">
    <PanelTitle
      title="What can the palette do?"
      subtitle="Type words to find articles. Or choose a command."
    />
    <ul className="grid gap-1 text-[15px] text-zinc-700 dark:text-zinc-300">
      {commands
        .filter(command => command.trigger)
        .map(command => (
          <li key={command.id}>
            Type{' '}
            <kbd className="rounded border border-zinc-300 px-1.5 font-mono text-sm dark:border-white/20">
              {command.trigger}
            </kbd>{' '}
            to start {command.title}.
          </li>
        ))}
    </ul>
    <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-[15px]">
      {keys.map(([key, text]) => (
        <div key={key} className="contents">
          <dt>
            <kbd className="font-semibold text-zinc-800 dark:text-zinc-100">
              {key}
            </kbd>
          </dt>
          <dd className="text-zinc-700 dark:text-zinc-300">{text}</dd>
        </div>
      ))}
    </dl>
  </div>
)

export const commandItem = (command: PaletteCommand): PaletteItem => ({
  id: `command-${command.id}`,
  title: command.title,
  description: command.description,
  icon: command.icon,
  takesInput: Boolean(command.open),
  meta: command.trigger,
  onSelect: actions =>
    command.open ? actions.push(command.open()) : command.run?.(actions),
  onChoose: command.open ? actions => actions.push(command.open()) : undefined,
})

export const helpLevel = (commands: PaletteCommand[]): PaletteLevel => ({
  key: 'help',
  chip: 'Help',
  placeholder: 'Filter commands...',
  useContent: query => ({
    sections: [
      {
        id: 'help-commands',
        title: 'Commands',
        items: filterByLabel(
          commands,
          query,
          command => command.title,
          command => command.keywords,
        ).map(commandItem),
      },
    ],
    panel: <HelpPanel commands={commands} />,
  }),
})

export const helpItem = (commands: PaletteCommand[]): PaletteItem => ({
  id: 'help',
  title: 'Help: what can the palette do?',
  description: 'Every command, its shortcut, and the keys to use',
  icon: LuCircleHelp,
  onSelect: actions => actions.push(helpLevel(commands)),
  onChoose: actions => actions.push(helpLevel(commands)),
})
