'use client'

import { useRouter } from 'next/navigation'
import {
  type KeyboardEvent,
  type MutableRefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { LuSearch, LuX } from 'react-icons/lu'

import { commandForTrigger, createCommands, rootLevel } from './registry'
import type {
  PaletteActions,
  PaletteItem,
  PaletteLevel,
  SocialInfo,
} from './types'

type StackEntry = { level: PaletteLevel; query: string }

type KeyHandler = (event: KeyboardEvent<HTMLInputElement>) => boolean

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * The palette shell. It owns the dialog, the search field, the chip of the
 * open level, and the key hints. Each level (the root view, a command, or a
 * result's details) supplies its own sections and panel.
 */
const CommandPalette = ({
  open,
  onClose,
  social,
}: {
  open: boolean
  onClose: () => void
  social: SocialInfo
}) => {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const keyHandler = useRef<KeyHandler | null>(null)
  const listboxId = useId()
  const [activeId, setActiveId] = useState<string | undefined>()
  const [message, setMessage] = useState('')
  const [wide, setWide] = useState(false)

  const commands = useMemo(() => createCommands(social), [social])
  const root = useMemo(() => rootLevel(commands), [commands])
  const [stack, setStack] = useState<StackEntry[]>([{ level: root, query: '' }])
  const current = stack[stack.length - 1]
  const depth = stack.length - 1

  const setQuery = (query: string) =>
    setStack(entries => [
      ...entries.slice(0, -1),
      { ...entries[entries.length - 1], query },
    ])

  const actions = useMemo<PaletteActions>(
    () => ({
      push: (level, query = '') =>
        setStack(entries => [...entries, { level, query }]),
      pop: () =>
        setStack(entries =>
          entries.length > 1 ? entries.slice(0, -1) : entries,
        ),
      close: onClose,
      navigate: href => {
        onClose()
        router.push(href)
      },
      openExternal: href => {
        onClose()
        window.open(href, '_blank', 'noopener,noreferrer')
      },
      announce: text => setMessage(text),
    }),
    [onClose, router],
  )

  // Open and close the native modal dialog. A modal dialog makes the rest of
  // the page inert, so focus stays in the palette.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setStack([{ level: root, query: '' }])
      setMessage('')
      dialog.showModal()
      inputRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open, root])

  // The page under the palette does not scroll while it is open.
  useEffect(() => {
    if (!open) return
    const { style } = document.documentElement
    const previous = style.overflow
    style.overflow = 'hidden'
    return () => {
      style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(() => setMessage(''), 2500)
    return () => window.clearTimeout(timer)
  }, [message])

  // Keep the cursor in the search field when the level changes.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [current.level.key, open])

  const back = useCallback(() => {
    if (depth > 0) actions.pop()
    else onClose()
  }, [actions, depth, onClose])

  const onInputChange = (value: string) => {
    if (depth === 0) {
      const match = commandForTrigger(commands, value)
      if (match?.command.open) {
        actions.push(match.command.open(), match.rest)
        return
      }
    }
    setQuery(value)
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      back()
      return
    }
    if (event.key === 'Backspace' && current.query === '' && depth > 0) {
      event.preventDefault()
      actions.pop()
      return
    }
    if (keyHandler.current?.(event)) event.preventDefault()
  }

  // Tab and Shift+Tab wrap inside the palette.
  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab' || event.defaultPrevented) return
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the site"
      data-test="command-palette"
      onCancel={event => {
        // Esc goes back one level before it closes the palette.
        event.preventDefault()
        back()
      }}
      onClose={onClose}
      onKeyDown={onDialogKeyDown}
      onClick={event => {
        if (event.target === dialogRef.current) onClose()
      }}
      className={`m-auto mt-[8vh] h-fit max-h-[84vh] w-[calc(100%-1.5rem)] overflow-hidden rounded-xl bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-zinc-950/50 dark:bg-zinc-900 dark:text-zinc-100 ${
        wide ? 'max-w-4xl' : 'max-w-2xl'
      }`}
    >
      {open && (
        <div className="flex max-h-[84vh] flex-col">
          <div className="flex min-h-16 items-center gap-3 border-b border-zinc-200 px-4 dark:border-white/10 sm:px-5">
            <LuSearch
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400"
            />
            {depth > 0 && (
              <span
                className="inline-flex max-w-[55%] shrink-0 items-center gap-1 rounded-full bg-violet-600 py-1 pl-3 pr-1 text-sm font-medium text-white"
                data-test="palette-chip"
              >
                <span className="truncate">{current.level.chip}</span>
                <button
                  type="button"
                  aria-label={`Clear ${current.level.chip}`}
                  onClick={() => setStack(entries => entries.slice(0, 1))}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/20 cursor-pointer"
                >
                  <LuX aria-hidden="true" className="h-4 w-4" />
                </button>
              </span>
            )}
            <input
              ref={inputRef}
              id={`${listboxId}-input`}
              name="palette-search"
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listboxId}
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              aria-label={
                depth > 0
                  ? `${current.level.chip}: ${current.level.placeholder}`
                  : 'Search the site'
              }
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              placeholder={current.level.placeholder}
              value={current.query}
              onChange={event => onInputChange(event.target.value)}
              onKeyDown={onInputKeyDown}
              data-test="palette-input"
              className="min-w-0 flex-1 bg-transparent py-4 text-base outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 sm:text-lg"
            />
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10 cursor-pointer sm:hidden"
            >
              Close
            </button>
          </div>
          <ActiveLevel
            key={current.level.key}
            level={current.level}
            query={current.query}
            actions={actions}
            listboxId={listboxId}
            keyHandler={keyHandler}
            setActiveId={setActiveId}
            setWide={setWide}
          />
          <footer className="hidden items-center gap-5 border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 sm:flex">
            <KeyHint keys="↑↓" text="move" />
            <KeyHint keys="Enter" text="open" />
            <KeyHint
              keys="Tab"
              text={depth === 0 && !current.query ? 'choose command' : 'choose'}
            />
            {depth > 0 && <KeyHint keys="⌫" text="back" />}
            <KeyHint keys="Esc" text={depth > 0 ? 'back' : 'close'} />
            <span className="ml-auto font-medium text-violet-700 dark:text-violet-300">
              {message}
            </span>
          </footer>
          <p role="status" className="sr-only">
            {message}
          </p>
        </div>
      )}
    </dialog>
  )
}

const KeyHint = ({ keys, text }: { keys: string; text: string }) => (
  <span>
    <kbd className="font-semibold text-zinc-800 dark:text-zinc-200">{keys}</kbd>{' '}
    {text}
  </span>
)

/**
 * One level: it runs the level's content hook, keeps the selected row, and
 * answers the arrow, Enter, and Tab keys from the search field.
 */
const ActiveLevel = ({
  level,
  query,
  actions,
  listboxId,
  keyHandler,
  setActiveId,
  setWide,
}: {
  level: PaletteLevel
  query: string
  actions: PaletteActions
  listboxId: string
  keyHandler: MutableRefObject<KeyHandler | null>
  setActiveId: (id: string | undefined) => void
  setWide: (wide: boolean) => void
}) => {
  const content = level.useContent(query, actions)
  const hasPanel = Boolean(content.panel)
  useEffect(() => setWide(hasPanel), [hasPanel, setWide])
  const sections = content.sections.filter(section => section.items.length > 0)
  const items = sections.flatMap(section => section.items)
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => setActive(0), [query])

  const index = Math.min(active, Math.max(items.length - 1, 0))
  const optionId = (item: PaletteItem) => `${listboxId}-${item.id}`
  const activeItem = items[index]
  const activeOptionId = activeItem ? optionId(activeItem) : undefined

  useEffect(() => {
    setActiveId(activeOptionId)
    if (activeOptionId) {
      document
        .getElementById(activeOptionId)
        ?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeOptionId, setActiveId])

  useEffect(() => () => setActiveId(undefined), [setActiveId])

  keyHandler.current = event => {
    if (items.length === 0) return false
    switch (event.key) {
      case 'ArrowDown':
        setActive((index + 1) % items.length)
        return true
      case 'ArrowUp':
        setActive((index - 1 + items.length) % items.length)
        return true
      case 'Enter':
        activeItem?.onSelect(actions)
        return true
      case 'Tab':
        if (event.shiftKey || !activeItem?.onChoose) return false
        activeItem.onChoose(actions)
        return true
      default:
        return false
    }
  }

  const list = (
    <div
      ref={listRef}
      id={listboxId}
      role="listbox"
      aria-label={level.chip || 'Results'}
      className="min-h-0 flex-1 overflow-y-auto py-2"
      data-test="palette-results"
    >
      {sections.map(section => (
        <div
          key={section.id}
          role="group"
          aria-labelledby={`${listboxId}-${section.id}`}
        >
          <div
            id={`${listboxId}-${section.id}`}
            role="presentation"
            className="px-4 pt-3 pb-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:px-5"
          >
            {section.title}
          </div>
          {section.items.map(item => {
            const selected = item === activeItem
            const Icon = item.icon
            return (
              <div
                key={item.id}
                id={optionId(item)}
                role="option"
                aria-selected={selected}
                data-test="palette-option"
                onMouseMove={() => !selected && setActive(items.indexOf(item))}
                onClick={() => item.onSelect(actions)}
                className={`flex cursor-pointer items-center gap-4 px-4 py-3 sm:px-5 ${
                  selected ? 'bg-violet-50 dark:bg-white/10' : ''
                }`}
              >
                {Icon && (
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-zinc-600 dark:text-zinc-400"
                  />
                )}
                <span className="min-w-0 flex-1">
                  {item.render ? (
                    item.render(query)
                  ) : (
                    <span className="grid gap-0.5">
                      <span className="text-[15px] text-zinc-900 dark:text-zinc-100">
                        {item.title}
                        {item.takesInput && '...'}
                      </span>
                      {item.description && (
                        <span className="truncate text-sm text-zinc-600 dark:text-zinc-400">
                          {item.description}
                        </span>
                      )}
                    </span>
                  )}
                </span>
                {item.meta && (
                  <span className="hidden shrink-0 font-mono text-xs text-zinc-600 dark:text-zinc-400 sm:inline">
                    {item.meta}
                  </span>
                )}
                {item.onChoose && (
                  <span
                    aria-hidden="true"
                    onClick={event => {
                      event.stopPropagation()
                      item.onChoose?.(actions)
                    }}
                    className="shrink-0 rounded px-1.5 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="hidden sm:inline">Tab</span>
                    <span className="sm:hidden text-base">›</span>
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ))}
      {items.length === 0 && (
        <p
          className="px-5 py-6 text-[15px] text-zinc-600 dark:text-zinc-400"
          data-test="palette-empty"
        >
          {content.loading ? 'Loading...' : content.emptyText || 'No results.'}
        </p>
      )}
    </div>
  )

  if (!content.panel) return list

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] overflow-y-auto md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:grid-rows-1 md:overflow-hidden">
      <div className="flex min-h-0 flex-col border-zinc-200 dark:border-white/10 md:border-r">
        {list}
      </div>
      <section
        aria-label="Details"
        className="order-first border-b border-zinc-200 p-5 dark:border-white/10 md:order-none md:overflow-y-auto md:border-b-0"
        data-test="palette-panel"
      >
        {content.panel}
      </section>
    </div>
  )
}

export default CommandPalette
