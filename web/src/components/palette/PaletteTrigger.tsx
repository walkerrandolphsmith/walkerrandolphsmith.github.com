'use client'

import { LuSearch } from 'react-icons/lu'

import { openPalette } from './PaletteRoot'

export const paletteTriggerClassName =
  'flex h-12 min-w-12 items-center justify-center gap-2 rounded-sm px-3 text-zinc-700 hover:bg-gray-100 dark:text-zinc-200 dark:hover:bg-[oklch(27.4%_.006_286.033)] cursor-pointer lg:h-10 lg:rounded-full lg:border lg:border-zinc-300 lg:dark:border-white/20'

const isApple = () =>
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)

/** The header button that opens the command palette. */
const PaletteTrigger = ({
  tabIndex,
  ariaHidden,
}: {
  tabIndex?: number
  ariaHidden?: boolean
}) => {
  const shortcut = isApple() ? '⌘K' : 'Ctrl K'
  return (
    <button
      type="button"
      onClick={openPalette}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
      aria-label="Search the site"
      aria-keyshortcuts={isApple() ? 'Meta+K' : 'Control+K'}
      aria-haspopup="dialog"
      title={`Search the site (${shortcut})`}
      className={paletteTriggerClassName}
      data-test="palette-trigger"
    >
      <LuSearch aria-hidden="true" className="h-5 w-5" />
      <span className="hidden text-sm lg:inline">Search</span>
      <kbd className="hidden rounded border border-zinc-300 px-1.5 text-xs font-medium text-zinc-600 dark:border-white/20 dark:text-zinc-300 lg:inline">
        {shortcut}
      </kbd>
    </button>
  )
}

export default PaletteTrigger
