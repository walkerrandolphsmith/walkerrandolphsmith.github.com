import { renderRss } from '@/lib/agentFiles'

export const dynamic = 'force-static'

export const GET = () =>
  new Response(renderRss(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
