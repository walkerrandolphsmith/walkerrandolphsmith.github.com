import { renderAgentsTxt } from '@/lib/agentFiles'

export const dynamic = 'force-static'

// Same file as /agents.txt. The agents.txt draft names this path first.
export const GET = () =>
  new Response(renderAgentsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
