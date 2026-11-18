import sitemetadata from '@/data/sitemetadata'
import {
  absoluteUrl,
  contactLinks,
  getExperience,
  getPlatformResults,
  getPosts,
  getRecommendations,
  pages,
  profile,
} from '@/lib/siteContent'
import { webMcpTools } from '@/webmcp/toolCatalog'

/**
 * Renders the text files that describe the site to AI agents and feed
 * readers. Route handlers in src/app call these during the static export.
 */

const currentRole = () => {
  const [latest] = getExperience().jobs
  return `${latest.roles[0].title} at ${latest.company}`
}

const intro = () =>
  [
    `# ${sitemetadata.title}`,
    '',
    `> ${profile.description}`,
    '',
    `This is the personal website of ${profile.name}. It has his platform results, recommendations from people who worked with him, his resume, and his articles about platform engineering and developer experience.`,
    '',
    `Current role: ${currentRole()}.`,
    '',
    `In his words: "${profile.headline}"`,
  ].join('\n')

const link = (title: string, url: string, note?: string) =>
  `- [${title}](${url})${note ? `: ${note}` : ''}`

const listInProse = (items: string[]) =>
  items.length < 2
    ? items.join('')
    : `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`

const recommendationNote = (
  group: ReturnType<typeof getRecommendations>[number],
) =>
  `${group.recommendations.length} recommendations, from ${listInProse(
    group.recommendations.map(
      ({ name, role, company }) => `${name} (${role} at ${company})`,
    ),
  )}.`

const machineReadable = () => [
  link(
    'llms-full.txt',
    absoluteUrl('/llms-full.txt'),
    'The full text of this file, the resume, every recommendation, and every article.',
  ),
  link(
    'site-data.json',
    absoluteUrl('/site-data.json'),
    'Profile, contact links, platform results, experience, recommendations, and article summaries as JSON.',
  ),
  link('RSS feed', absoluteUrl('/feed.xml'), 'Articles, newest first.'),
  link('Sitemap', absoluteUrl('/sitemap.xml'), 'Every page and article.'),
  link(
    'agents.txt',
    absoluteUrl('/agents.txt'),
    'Read-only capabilities for AI agents.',
  ),
]

export const renderLlmsTxt = () => {
  const lines = [
    intro(),
    '',
    '## Pages',
    '',
    ...pages.map(page => link(page.title, page.url, page.description)),
    '',
    '## Platform results',
    '',
    ...getPlatformResults().map(result =>
      link(
        result.headline,
        result.writeUp ?? absoluteUrl('/#platform-work'),
        `${result.company}. ${result.text}`,
      ),
    ),
    '',
    '## Recommendations',
    '',
    ...getRecommendations().map(group =>
      link(
        group.title,
        absoluteUrl(`/recommendations/#${group.id}`),
        recommendationNote(group),
      ),
    ),
    '',
    '## Articles',
    '',
    ...getPosts().map(post => link(post.title, post.url, post.summary)),
    '',
    '## Machine-readable files',
    '',
    ...machineReadable(),
    '',
    '## Optional',
    '',
    ...contactLinks.map(contact => link(contact.label, contact.url)),
  ]
  return `${lines.join('\n')}\n`
}

// Article bodies start at ##. Inside llms-full.txt each article is itself
// a ## section, so its headings move down one level. Code fences are left
// alone, because a # inside a fence is code, not a heading.
const demoteHeadings = (markdown: string) => {
  let inFence = false
  return markdown
    .split('\n')
    .map(line => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
      if (inFence || !/^#{1,5} /.test(line)) return line
      return `#${line}`
    })
    .join('\n')
}

export const renderLlmsFullTxt = () => {
  const experience = getExperience()
  const sections: string[] = [intro()]

  sections.push(
    [
      '## Contact links',
      '',
      ...contactLinks.map(contact => link(contact.label, contact.url)),
    ].join('\n'),
  )

  sections.push(
    [
      '## Platform results',
      '',
      ...getPlatformResults().flatMap(result => [
        `### ${result.headline}`,
        '',
        `${result.company}. ${result.text}`,
        ...(result.writeUp ? ['', `Write-up: ${result.writeUp}`] : []),
        '',
      ]),
    ]
      .join('\n')
      .trimEnd(),
  )

  sections.push(
    [
      '## Resume',
      '',
      `Source: ${absoluteUrl('/resume/')}`,
      '',
      experience.summary,
      '',
      '### Work experience',
      '',
      ...experience.jobs.flatMap(job =>
        job.roles.flatMap(role => [
          `#### ${role.title}, ${job.company} (${role.dates})`,
          '',
          ...role.highlights.map(highlight => `- ${highlight}`),
          '',
        ]),
      ),
      '### Education',
      '',
      ...experience.education.map(
        degree =>
          `- ${degree.degree}, ${degree.school}, ${degree.year}${'note' in degree && degree.note ? `. ${degree.note}` : ''}.`,
      ),
      '',
      '### Publication',
      '',
      `- "${experience.publication.title}", ${experience.publication.venue}, ${experience.publication.date}. ${experience.publication.href}`,
      '',
      '### Open source and community',
      '',
      ...experience.community.map(item => `- ${item}`),
      '',
      '### Skills',
      '',
      ...experience.skills.map(
        ({ category, list }) => `- ${category}: ${list}`,
      ),
    ].join('\n'),
  )

  sections.push(
    [
      '## Recommendations',
      '',
      `Source: ${absoluteUrl('/recommendations/')}`,
      '',
      ...getRecommendations().flatMap(group => [
        `### ${group.title}`,
        '',
        ...group.recommendations.flatMap(recommendation => [
          `#### ${recommendation.name}, ${recommendation.role}, ${recommendation.company}`,
          '',
          `LinkedIn: ${recommendation.linkedin}`,
          '',
          recommendation.quote.map(paragraph => `> ${paragraph}`).join('\n>\n'),
          '',
        ]),
      ]),
    ]
      .join('\n')
      .trimEnd(),
  )

  getPosts().forEach(post => {
    sections.push(
      [
        `## Article: ${post.title}`,
        '',
        `URL: ${post.url}`,
        `Published: ${post.datePublished}`,
        ...(post.dateModified !== post.datePublished
          ? [`Updated: ${post.dateModified}`]
          : []),
        ...(post.tags.length ? [`Tags: ${post.tags.join(', ')}`] : []),
        `Summary: ${post.summary}`,
        '',
        demoteHeadings(post.markdown),
      ].join('\n'),
    )
  })

  return `${sections.join('\n\n')}\n`
}

// Paths that robots.production.txt disallows. agents.txt repeats them so
// that both files give agents the same answer.
const disallowedPaths = ['/api', '/contactus', '/contactuserror', '/notfound']

const capability = (id: string, endpoint: string, description: string) =>
  [
    `Capability: ${id}`,
    `  Endpoint: ${endpoint}`,
    '  Protocol: REST',
    '  Method: GET',
    '  Auth: none',
    `  Description: ${description}`,
  ].join('\n')

export const renderAgentsTxt = (generatedAt = new Date()) => {
  const lines = [
    `# agents.txt for ${sitemetadata.siteUrl.replace(/^https?:\/\//, '')}`,
    '#',
    '# Format: draft-car-agents-txt-wellknown-00. This is an individual IETF',
    '# Internet-Draft, not a standard.',
    '# https://datatracker.ietf.org/doc/draft-car-agents-txt-wellknown/',
    '#',
    '# This is a static, read-only website. Every capability below is a public',
    '# file that any client can fetch with GET. No capability writes data,',
    '# submits a form, or needs authentication.',
    '#',
    '# WebMCP: in browsers that expose document.modelContext, each page also',
    '# registers these read-only tools for in-browser agents:',
    ...webMcpTools.map(tool => `#   ${tool.name}: ${tool.description}`),
    '',
    'Spec-Version: 1.0',
    `Generated-At: ${generatedAt.toISOString()}`,
    `Site-Name: ${sitemetadata.title}`,
    `Site-URL: ${sitemetadata.siteUrl}`,
    `Site-Description: ${profile.description}`,
    `Site-Contact: ${sitemetadata.linkedin}`,
    '',
    capability(
      'site-data',
      absoluteUrl('/site-data.json'),
      'Profile, contact links, platform results, experience, recommendations, and article summaries as one JSON document.',
    ),
    '',
    capability(
      'llms-txt',
      absoluteUrl('/llms.txt'),
      'A short Markdown guide to the site, in the llms.txt format.',
    ),
    '',
    capability(
      'llms-full-txt',
      absoluteUrl('/llms-full.txt'),
      'The full text of the resume, every recommendation, and every article, as Markdown.',
    ),
    '',
    capability(
      'articles-feed',
      absoluteUrl('/feed.xml'),
      'RSS 2.0 feed of articles, newest first.',
    ),
    '',
    capability(
      'sitemap',
      absoluteUrl('/sitemap.xml'),
      'XML sitemap of every page and article.',
    ),
    '',
    'Allow: /',
    ...disallowedPaths.map(path => `Disallow: ${path}`),
    '',
    'Agent: *',
    '',
  ]
  return lines.join('\n')
}

const escapeXml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export const renderRss = () => {
  const posts = getPosts()
  const feedUrl = absoluteUrl('/feed.xml')
  const items = posts.map(post =>
    [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${post.url}</link>`,
      `      <guid isPermaLink="true">${post.url}</guid>`,
      `      <description>${escapeXml(post.summary)}</description>`,
      `      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>`,
      `      <dc:creator>${escapeXml(profile.name)}</dc:creator>`,
      ...post.tags.map(tag => `      <category>${escapeXml(tag)}</category>`),
      '    </item>',
    ].join('\n'),
  )
  const lastBuildDate = posts.length
    ? new Date(
        posts
          .map(post => post.dateModified)
          .sort()
          .at(-1) as string,
      ).toUTCString()
    : new Date().toUTCString()
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${escapeXml(`${sitemetadata.title}: Writing`)}</title>`,
    `    <link>${absoluteUrl('/blog/')}</link>`,
    `    <description>${escapeXml(pages.find(page => page.title === 'Writing')?.description ?? profile.description)}</description>`,
    `    <language>${sitemetadata.language}</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
