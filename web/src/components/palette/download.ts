import type { PaletteActions } from './types'

/** Save a file from this site, then close the palette. */
export const downloadFile = (href: string, actions: PaletteActions) => {
  const link = document.createElement('a')
  link.href = href
  link.download = href.split('/').pop() ?? ''
  document.body.appendChild(link)
  link.click()
  link.remove()
  actions.close()
}
