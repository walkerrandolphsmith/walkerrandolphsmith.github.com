'use client'
import tabs from '@/tokenized-tabs'

import { useTab } from './CodeTabContext'

const CodeTabs = () => {
  const { selectedTab, setSelectedTab } = useTab()

  return (
    <>
      {Object.values(tabs).map(tab => (
        <button
          key={tab.id}
          onClick={() => setSelectedTab(tab.id)}
          aria-pressed={selectedTab === tab.id}
          className={`titledtab grid rounded-tl-md rounded-tr-md px-3 py-2 text-sm cursor-pointer border-t-2 transition-colors ${
            selectedTab === tab.id
              ? 'bg-[var(--shiki-background)] text-white border-[#00d4ff]'
              : 'bg-transparent text-[#8ea2b8] border-transparent hover:text-white'
          }`}
        >
          {/* Hidden bold copy reserves the semibold width so the tab never resizes. */}
          <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">
            {tab.name}
          </span>
          <span
            className={`col-start-1 row-start-1 text-center ${
              selectedTab === tab.id ? 'font-semibold' : ''
            }`}
          >
            {tab.name}
          </span>
        </button>
      ))}
    </>
  )
}

export default CodeTabs
