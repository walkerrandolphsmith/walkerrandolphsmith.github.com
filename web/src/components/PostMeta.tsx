import { formatPostDate } from '@/lib/formatPostDate'

/** The publish date and reading time of a post, on one line. */
const PostMeta = ({
  date,
  readingMinutes,
  className = '',
}: {
  date: string
  readingMinutes: number
  className?: string
}) => (
  <p
    className={`flex flex-wrap items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300 ${className}`}
  >
    <time dateTime={new Date(date).toISOString()}>{formatPostDate(date)}</time>
    <span aria-hidden="true">·</span>
    <span data-test="reading-time">{readingMinutes} min read</span>
  </p>
)

export default PostMeta
