import { renderAgentsTxt } from '@/lib/agentFiles'

export const dynamic = 'force-static'

// The agents.txt draft asks agents to read /.well-known/agents.txt first and
// fall back to /agents.txt. Both routes serve the same file.
export const GET = () =>
  new Response(renderAgentsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
