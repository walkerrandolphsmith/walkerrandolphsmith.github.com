import { renderLlmsTxt } from '@/lib/agentFiles'

export const dynamic = 'force-static'

export const GET = () =>
  new Response(renderLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
