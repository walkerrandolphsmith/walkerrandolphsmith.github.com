'use client'

import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'

export interface RecommendationGroupOption {
  id: string
  title: string
}

const ALL = 'all'

const groupFromUrl = (groups: RecommendationGroupOption[]) => {
  const requested = new URLSearchParams(window.location.search).get('group')
  return groups.some(group => group.id === requested) ? requested : ALL
}

/**
 * Filter pills for the recommendations page. The server render shows every
 * group, and the pills are hidden without JavaScript. The selected group is
 * kept in the URL as ?group=<id>, so a shared link opens pre-filtered.
 */
const RecommendationFilter = ({
  groups,
  children,
}: {
  groups: RecommendationGroupOption[]
  children: ReactNode
}) => {
  const [selected, setSelected] = useState(ALL)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    setSelected(groupFromUrl(groups))
  }, [groups])

  useLayoutEffect(() => {
    containerRef.current
      ?.querySelectorAll<HTMLElement>('[data-group]')
      .forEach(section => {
        section.hidden = selected !== ALL && section.dataset.group !== selected
      })
  }, [selected])

  const select = (id: string) => {
    setSelected(id)
    const url = new URL(window.location.href)
    if (id === ALL) url.searchParams.delete('group')
    else url.searchParams.set('group', id)
    window.history.replaceState(null, '', url.toString())
  }

  const options = [{ id: ALL, title: 'All' }, ...groups]
  const selectedTitle = options.find(option => option.id === selected)?.title

  return (
    <div ref={containerRef} className="grid gap-y-8">
      <noscript>
        <style>{'.recommendation-filter{display:none}'}</style>
      </noscript>
      <div
        role="group"
        aria-label="Filter recommendations by group"
        className="recommendation-filter flex flex-wrap gap-2 px-4 md:px-2"
      >
        {options.map(option => {
          const pressed = option.id === selected
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={pressed}
              data-test={`filter-${option.id}`}
              onClick={() => select(option.id)}
              className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                pressed
                  ? 'border-[#0a2540] bg-[#0a2540] text-white dark:border-white dark:bg-white dark:text-zinc-950'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 hover:text-zinc-950 dark:border-white/20 dark:bg-transparent dark:text-zinc-200 dark:hover:border-white/50 dark:hover:text-white'
              }`}
            >
              {option.title}
            </button>
          )
        })}
      </div>
      <p role="status" className="sr-only">
        {selected === ALL
          ? 'Showing all recommendations'
          : `Showing ${selectedTitle}`}
      </p>
      {children}
    </div>
  )
}

export default RecommendationFilter
