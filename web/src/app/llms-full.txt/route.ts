import { renderLlmsFullTxt } from '@/lib/agentFiles'

export const dynamic = 'force-static'

export const GET = () =>
  new Response(renderLlmsFullTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
