import Link from 'next/link'

import PostMeta from '@/components/PostMeta'
import { TagList } from '@/components/TagChip'
import type { PostCardData } from '@/lib/blogContent'

/** Two or three posts that share tags with the article above them. */
const RelatedPosts = ({ posts }: { posts: PostCardData[] }) =>
  posts.length > 0 ? (
    <aside
      aria-labelledby="related-posts-heading"
      className="grid gap-y-6"
      data-test="related-posts"
    >
      <h2
        id="related-posts-heading"
        className="text-2xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white"
      >
        Related posts
      </h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map(post => (
          <li
            key={post.slug}
            className="flex flex-col gap-3 rounded-[8px] border border-zinc-200 bg-[#f6f9fc] p-6 dark:border-white/10 dark:bg-[rgba(39,39,42,0.9)]"
          >
            <PostMeta date={post.date} readingMinutes={post.readingMinutes} />
            <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
              <Link
                href={`/blog/${post.slug}`}
                className="break-words hover:opacity-70"
                data-test="related-post-link"
              >
                {post.title}
              </Link>
            </h3>
            <div className="mt-auto">
              <TagList
                tags={post.tags.slice(0, 3)}
                label={`Tags for ${post.title}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  ) : null

export default RelatedPosts
