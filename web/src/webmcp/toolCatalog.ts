import { recommendationGroups } from '@/data/recommendationGroups'

/**
 * The read-only WebMCP tools that every page registers when the browser
 * supports WebMCP. The catalog is plain data, so agents.txt can list the
 * same tools that the browser registers.
 *
 * Tool names follow the WebMCP rule: 1 to 128 characters from A-Z, a-z,
 * 0-9, underscore, hyphen, and period.
 */

export type ToolName =
  | 'search_articles'
  | 'get_article_summary'
  | 'get_experience'
  | 'get_platform_results'
  | 'list_recommendations'
  | 'get_contact_links'

export type ToolDefinition = {
  name: ToolName
  title: string
  description: string
  inputSchema: Record<string, unknown>
}

const noInput = { type: 'object', properties: {}, additionalProperties: false }

export const webMcpTools: ToolDefinition[] = [
  {
    name: 'search_articles',
    title: 'Search articles',
    description:
      'Search the articles by keyword or tag. Returns title, URL, publication date, tags, and summary for each match, best match first. With no query, returns the newest articles.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description:
            'Words to find in the title, summary, tags, or headings.',
        },
        tag: {
          type: 'string',
          description: 'Return only articles with this tag, for example CI/CD.',
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 50,
          default: 5,
          description: 'Maximum number of articles to return.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_article_summary',
    title: 'Get article summary',
    description:
      'Get the summary, dates, tags, reading time, and section headings of one article.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description:
            'The article slug, such as smarter-retries, or the full article URL.',
        },
      },
      required: ['slug'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_experience',
    title: 'Get resume and experience',
    description:
      'Get the resume: summary, roles with dates and highlights, education, publication, open source and community work, and skills.',
    inputSchema: noInput,
  },
  {
    name: 'get_platform_results',
    title: 'Get platform results',
    description:
      'Get the measured platform results, with the company and a link to the write-up where one exists.',
    inputSchema: noInput,
  },
  {
    name: 'list_recommendations',
    title: 'List recommendations',
    description:
      'List the recommendations from people who worked with Walker Smith, by group. Each has the name, role, company, LinkedIn profile, and a link to the quote on the recommendations page.',
    inputSchema: {
      type: 'object',
      properties: {
        group: {
          type: 'string',
          enum: recommendationGroups.map(group => group.id),
          description: `Return only one group: ${recommendationGroups
            .map(group => `${group.id} (${group.title})`)
            .join(', ')}. Omit to return all groups.`,
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_contact_links',
    title: 'Get contact links',
    description:
      'Get the public profile links: LinkedIn, GitHub, the resume page, and the resume PDF.',
    inputSchema: noInput,
  },
]
