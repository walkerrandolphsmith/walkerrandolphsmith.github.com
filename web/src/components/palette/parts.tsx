import type { ReactNode } from 'react'

import { tagLabel } from '@/lib/discovery'
import { formatPostDate } from '@/lib/formatPostDate'
import { highlight } from '@/lib/paletteSearch'

import type { IndexedPost } from './searchIndex'

/** Shared pieces that commands use to render their rows and panels. */

export const Highlighted = ({
  text,
  query,
}: {
  text: string
  query: string
}) => (
  <>
    {highlight(text, query).map((segment, index) =>
      segment.match ? (
        <mark
          key={index}
          className="bg-transparent font-semibold text-violet-700 dark:text-violet-300"
        >
          {segment.text}
        </mark>
      ) : (
        <span key={index}>{segment.text}</span>
      ),
    )}
  </>
)

export const Badge = ({
  children,
  tone = 'plain',
}: {
  children: ReactNode
  tone?: 'plain' | 'outline' | 'accent'
}) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
      tone === 'accent'
        ? 'bg-violet-600 text-white'
        : tone === 'outline'
          ? 'border border-zinc-300 text-zinc-700 dark:border-white/20 dark:text-zinc-200'
          : 'bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200'
    }`}
  >
    {children}
  </span>
)

/** A label and value grid, for the details of one result. */
export const DetailGrid = ({
  rows,
}: {
  rows: { label: string; value: ReactNode }[]
}) => (
  <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2 text-[15px]">
    {rows.map(row => (
      <div key={row.label} className="contents">
        <dt className="text-zinc-600 dark:text-zinc-400">{row.label}</dt>
        <dd className="text-zinc-900 dark:text-zinc-100">{row.value}</dd>
      </div>
    ))}
  </dl>
)

export const PanelTitle = ({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) => (
  <div className="grid gap-1">
    <h2 className="text-lg font-semibold leading-snug text-zinc-950 dark:text-white">
      {title}
    </h2>
    {subtitle && (
      <p className="text-[15px] text-zinc-600 dark:text-zinc-400">{subtitle}</p>
    )}
  </div>
)

export const ArticleRow = ({
  post,
  query,
}: {
  post: IndexedPost
  query: string
}) => (
  <span className="grid min-w-0 gap-0.5">
    <span className="text-[15px] text-zinc-900 dark:text-zinc-100">
      <Highlighted text={post.title} query={query} />
    </span>
    <span className="truncate text-sm text-zinc-600 dark:text-zinc-400">
      {formatPostDate(post.date)} · {post.readingMinutes} min read
      {post.tags.length > 0 &&
        ` · ${post.tags.slice(0, 3).map(tagLabel).join(', ')}`}
    </span>
  </span>
)

export const ArticlePanel = ({ post }: { post: IndexedPost }) => (
  <div className="grid gap-4">
    <PanelTitle
      title={post.title}
      subtitle={`${formatPostDate(post.date)} · ${post.readingMinutes} min read`}
    />
    {post.tags.length > 0 && (
      <ul className="flex flex-wrap gap-2" aria-label="Tags">
        {post.tags.map(tag => (
          <li key={tag}>
            <Badge tone="outline">{tagLabel(tag)}</Badge>
          </li>
        ))}
      </ul>
    )}
    <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {post.excerpt}
    </p>
  </div>
)
