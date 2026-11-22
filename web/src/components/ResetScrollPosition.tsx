'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const ResetScrollPosition = () => {
  const pathname = usePathname()

  useEffect(() => {
    // A link such as /#recommendations must land on its section, not the top.
    let id = window.location.hash.slice(1)
    try {
      id = decodeURIComponent(id)
    } catch {
      id = window.location.hash.slice(1)
    }
    const target = id ? document.getElementById(id) : null
    if (target) {
      target.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

export default ResetScrollPosition
