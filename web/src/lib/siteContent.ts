import { sortPosts } from 'pliny/utils/contentlayer'

import { platformResults } from '@/data/platformWork'
import {
  community,
  education,
  jobs,
  resumeSummary,
  skills,
} from '@/data/resume'
import sitemetadata from '@/data/sitemetadata'
import { readingMinutes } from '@/lib/discovery'
import { getRecommendationGroups } from '@/lib/recommendations'

import { allBlogs } from '../../.contentlayer/generated'

/**
 * One server-side view of the public site content, for the files that
 * describe the site to search engines and AI agents: llms.txt,
 * llms-full.txt, agents.txt, the RSS feed, the WebMCP data file, and the
 * JSON-LD on each page. Every value comes from the data that the pages
 * render, so these files change when the pages change.
 *
 * It holds only what the pages already show. It has no phone number and no
 * email address.
 */

const { siteUrl } = sitemetadata

export const absoluteUrl = (route = '') =>
  `${siteUrl}/${route.replace(/^\//, '')}`

export const profile = {
  name: sitemetadata.author,
  jobTitle: sitemetadata.jobTitle,
  description: sitemetadata.description,
  headline:
    'I make large platforms fast and safe for teams to change. They serve 2B+ Microsoft users, 53% of the Fortune 100, and nationwide public safety programs.',
  url: absoluteUrl('/'),
  sameAs: [sitemetadata.linkedin, sitemetadata.github],
  knowsAbout: [
    'Platform engineering',
    'Developer experience',
    'CI/CD',
    'Ephemeral environments',
    'GitOps',
    'Kubernetes',
    'Azure',
    'Terraform',
    'Workload identity',
    'Observability',
    'Event-driven architecture',
    'Monorepos',
    'Compliance (CJIS)',
    'Machine learning',
  ],
  worksFor: jobs[0].company,
  alumniOf: education.degrees[0].school,
}

export const contactLinks = [
  { label: 'LinkedIn', url: sitemetadata.linkedin },
  { label: 'GitHub', url: sitemetadata.github },
  { label: 'Resume', url: absoluteUrl('/resume/') },
  { label: 'Resume (PDF)', url: absoluteUrl('/Walker_Smith_Resume.pdf') },
  { label: 'Website', url: absoluteUrl('/') },
]

const handle = (url: string) =>
  new URL(url).pathname.split('/').filter(Boolean).pop() ?? url

/**
 * The palette's Social info view. It uses only the profiles in the site
 * metadata, and the current role from the resume data.
 */
export const getSocialInfo = () => {
  const job = jobs[0]
  const role = job.roles?.[0]?.title ?? job.title
  return {
    name: profile.name,
    jobTitle: profile.jobTitle,
    headline: profile.headline,
    currentRole: role ? `${role}, ${job.company}` : job.company,
    avatar: '/headshot.webp',
    website: absoluteUrl('/'),
    profiles: [
      {
        id: 'linkedin',
        label: 'LinkedIn',
        url: sitemetadata.linkedin,
        handle: handle(sitemetadata.linkedin),
        description: 'Work history and recommendations',
      },
      {
        id: 'github',
        label: 'GitHub',
        url: sitemetadata.github,
        handle: handle(sitemetadata.github),
        description: 'Open source code and contributions',
      },
    ],
    resumePdf: '/Walker_Smith_Resume.pdf',
    resumePage: '/resume/',
    qrPage: '/qr/',
  }
}

export const pages = [
  {
    title: 'Home',
    url: absoluteUrl('/'),
    description:
      'Platform results, recommendations, featured writing, and experience.',
  },
  {
    title: 'Resume',
    url: absoluteUrl('/resume/'),
    description:
      'Work experience, education, publications, open source, and skills.',
  },
  {
    title: 'Recommendations',
    url: absoluteUrl('/recommendations/'),
    description:
      'Recommendations from engineering leaders, Staff Engineers, software engineers, and product, design, and sales partners.',
  },
  {
    title: 'Writing',
    url: absoluteUrl('/blog/'),
    description:
      'Articles about platform engineering, CI/CD, infrastructure, and developer experience.',
  },
  {
    title: 'Topics',
    url: absoluteUrl('/tags/'),
    description:
      'Topics of the writing: platforms, developer experience, delivery, security, and the systems underneath.',
  },
]

const collapse = (text?: string | null) =>
  (text ?? '').replace(/\s+/g, ' ').trim()

export type PostSummary = {
  slug: string
  title: string
  url: string
  summary: string
  datePublished: string
  dateModified: string
  tags: string[]
  readingMinutes: number
  headings: string[]
}

export type PostWithBody = PostSummary & { markdown: string }

const isoDate = (date: string) => new Date(date).toISOString().split('T')[0]

type BlogDocument = (typeof allBlogs)[number]

export const toPostSummary = (post: BlogDocument): PostSummary => ({
  slug: post.slug,
  title: post.title,
  url: absoluteUrl(`/blog/${post.slug}/`),
  summary: collapse(post.excerpt),
  datePublished: isoDate(post.date),
  dateModified: isoDate(post.lastmod || post.date),
  tags: post.tags ?? [],
  readingMinutes: readingMinutes(post.readingTime),
  headings: (post.toc ?? []).map(({ value }) => value),
})

const publishedPosts = () =>
  sortPosts(allBlogs.filter(post => post.draft !== true))

export const getPosts = (): PostWithBody[] =>
  publishedPosts().map(post => ({
    ...toPostSummary(post),
    markdown: post.body.raw.trim(),
  }))

export const getPostSummaries = (): PostSummary[] =>
  publishedPosts().map(toPostSummary)

export const getExperience = () => ({
  summary: resumeSummary,
  jobs: jobs.map(job => ({
    company: job.company,
    dates: job.dates,
    roles: job.roles ?? [
      { title: job.title, dates: job.dates, highlights: job.highlights ?? [] },
    ],
  })),
  education: education.degrees,
  publication: education.publication,
  community,
  skills: skills.map(([category, list]) => ({ category, list })),
})

export const getPlatformResults = () =>
  platformResults.map(({ headline, text, company, writeUp }) => ({
    headline,
    text,
    company,
    writeUp: writeUp ? absoluteUrl(`${writeUp.href}/`) : undefined,
  }))

export const getRecommendations = getRecommendationGroups

/** The data file that the WebMCP tools read. */
export const getSiteData = () => ({
  site: {
    name: sitemetadata.title,
    url: absoluteUrl('/'),
    description: sitemetadata.description,
    pages,
  },
  profile,
  contactLinks,
  platformResults: getPlatformResults(),
  experience: getExperience(),
  recommendations: getRecommendations(),
  posts: getPostSummaries(),
})
