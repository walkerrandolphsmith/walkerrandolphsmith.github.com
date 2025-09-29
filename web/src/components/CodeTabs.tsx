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
          className={`titledtab rounded-tl-md rounded-tr-md p-2 text-sm cursor-pointer ${
            selectedTab === tab.id
              ? 'bg-[var(--shiki-background)] text-white font-medium border-[var(--shiki-tab-border-selected)]'
              : 'bg-[var(--shiki-background)] text-[#adbdcc] border border-[var(--shiki-tab-border)]'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </>
  )
}

export default CodeTabs
