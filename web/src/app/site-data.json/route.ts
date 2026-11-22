import { getSiteData } from '@/lib/siteContent'

export const dynamic = 'force-static'

// The data file that the WebMCP tools read. See src/webmcp.
export const GET = () => Response.json(getSiteData())
