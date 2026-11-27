'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

import type { SocialInfo } from './types'

export const OPEN_PALETTE_EVENT = 'palette:open'

/** Ask the palette to open, for example from the header button. */
export const openPalette = () =>
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))

// The palette code loads the first time a reader opens it, so it adds
// nothing to the first page load.
const CommandPalette = dynamic(() => import('./CommandPalette'), {
  ssr: false,
})

/**
 * Listens for Cmd+K or Ctrl+K and for the header button, and mounts the
 * palette on first use.
 */
const PaletteRoot = ({ social }: { social: SocialInfo }) => {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  const show = useCallback(() => {
    setMounted(true)
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()
        setMounted(true)
        setOpen(value => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener(OPEN_PALETTE_EVENT, show)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(OPEN_PALETTE_EVENT, show)
    }
  }, [show])

  return mounted ? (
    <CommandPalette open={open} onClose={close} social={social} />
  ) : null
}

export default PaletteRoot
