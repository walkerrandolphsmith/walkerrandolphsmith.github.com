import Link from 'next/link'

import { tagHref } from '@/lib/discovery'

export const tagChipClassName =
  'inline-flex min-h-8 items-center gap-x-2 rounded-sm border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-semibold leading-[1.25] text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-gray-600 dark:bg-[rgba(39,39,42,1)] dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-white'

/** A tag that links to the tag's page. A count shows when one is given. */
const TagChip = ({
  tag,
  label,
  count,
  href,
}: {
  tag: string
  label?: string
  count?: number
  href?: string
}) => (
  <Link
    href={href ?? tagHref(tag)}
    className={tagChipClassName}
    data-test="tag-link"
    aria-label={
      count === undefined
        ? undefined
        : `${label ?? tag}, ${count} ${count === 1 ? 'post' : 'posts'}`
    }
  >
    <span>{label ?? tag}</span>
    {count !== undefined && (
      <span
        aria-hidden="true"
        className="rounded-sm bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-600 dark:bg-white/10 dark:text-gray-300"
      >
        {count}
      </span>
    )}
  </Link>
)

export const TagList = ({
  tags,
  label = 'Tags',
}: {
  tags: string[]
  label?: string
}) =>
  tags.length > 0 ? (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {tags.map(tag => (
        <li key={tag}>
          <TagChip tag={tag} />
        </li>
      ))}
    </ul>
  ) : null

export default TagChip
