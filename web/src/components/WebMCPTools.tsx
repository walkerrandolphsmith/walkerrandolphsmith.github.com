'use client'

import { useEffect } from 'react'

import type { ModelContextLike } from '@/webmcp/registerTools'

/**
 * Progressive enhancement for WebMCP: when the browser exposes a model
 * context, register the read-only site tools for in-browser AI agents.
 *
 * The current WebMCP draft puts the API on document.modelContext. Chrome's
 * origin trial also kept navigator.modelContext as a deprecated alias, so
 * both are checked. In every other browser this component renders nothing,
 * loads nothing, and changes nothing.
 */

const findModelContext = (): ModelContextLike | undefined => {
  const candidates = [
    (document as unknown as { modelContext?: ModelContextLike }).modelContext,
    (navigator as unknown as { modelContext?: ModelContextLike }).modelContext,
  ]
  return candidates.find(
    candidate => typeof candidate?.registerTool === 'function',
  )
}

const WebMCPTools = () => {
  useEffect(() => {
    const modelContext = findModelContext()
    if (!modelContext) return

    const controller = new AbortController()
    import('@/webmcp/registerTools')
      .then(({ registerSiteTools }) =>
        registerSiteTools(modelContext, controller.signal),
      )
      .catch(() => {
        // The tools are optional. A failed chunk load leaves the page as is.
      })
    return () => controller.abort()
  }, [])

  return null
}

export default WebMCPTools
