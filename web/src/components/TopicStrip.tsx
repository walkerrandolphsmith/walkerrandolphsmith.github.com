import Link from 'next/link'

import TagChip from '@/components/TagChip'
import type { TagSummary } from '@/lib/discovery'

/**
 * The most-used topics at the top of the blog index, so that a reader sees
 * what the writing covers before the first post.
 */
const TopicStrip = ({
  topics,
  totalTopics,
}: {
  topics: TagSummary[]
  totalTopics: number
}) => (
  <nav aria-labelledby="topic-strip-heading" className="grid gap-y-4">
    <div className="flex flex-wrap items-baseline justify-between gap-4">
      <h2
        id="topic-strip-heading"
        className="text-xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white"
      >
        Topics
      </h2>
      <Link
        prefetch={false}
        href="/tags/"
        className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-950 dark:text-gray-300 dark:hover:text-white"
        data-test="all-topics"
      >
        See all {totalTopics} topics
      </Link>
    </div>
    <ul className="flex flex-wrap gap-2">
      {topics.map(topic => (
        <li key={topic.slug}>
          <TagChip
            tag={topic.slug}
            count={topic.count}
            href={`/tags/${topic.slug}/`}
          />
        </li>
      ))}
    </ul>
  </nav>
)

export default TopicStrip
