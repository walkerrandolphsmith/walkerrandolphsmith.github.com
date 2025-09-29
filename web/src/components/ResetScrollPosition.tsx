'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const ResetScrollPosition = () => {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

export default ResetScrollPosition
