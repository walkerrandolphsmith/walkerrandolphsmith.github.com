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
          className={`titledtab rounded-tl-md rounded-tr-md px-3 py-2 text-sm cursor-pointer border-t-2 transition-colors ${
            selectedTab === tab.id
              ? 'bg-[var(--shiki-background)] text-white font-semibold border-[#00d4ff]'
              : 'bg-transparent text-[#8ea2b8] border-transparent hover:text-white'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </>
  )
}

export default CodeTabs
