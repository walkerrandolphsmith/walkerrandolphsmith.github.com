'use client'
import { createContext, ReactNode,useContext, useState } from 'react'

type TabContextType = {
  selectedTab: string
  setSelectedTab: (id: string) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export const useTab = () => {
  const context = useContext(TabContext)
  if (!context) throw new Error('useTab must be used inside <TabProvider>')
  return context
}

export const TabProvider = ({
  initialTab,
  children,
}: {
  initialTab: string
  children: ReactNode
}) => {
  const [selectedTab, setSelectedTab] = useState(initialTab)

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  )
}
