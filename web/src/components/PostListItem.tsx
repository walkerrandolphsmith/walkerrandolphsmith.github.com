import Link from 'next/link'

import CallToAction from '@/components/CallToAction'
import PostMeta from '@/components/PostMeta'
import { TagList } from '@/components/TagChip'
import type { PostCardData } from '@/lib/blogContent'

/** One post in a list of posts: the blog index and the tag pages. */
const PostListItem = ({
  post,
  headingLevel = 'h2',
}: {
  post: PostCardData
  headingLevel?: 'h2' | 'h3'
}) => {
  const href = `/blog/${post.slug}`
  const Heading = headingLevel
  return (
    <li className="py-12 first:pt-0">
      <article>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <PostMeta date={post.date} readingMinutes={post.readingMinutes} />
              <Heading className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                <Link className="break-words" href={href}>
                  {post.title}
                </Link>
              </Heading>
              <TagList tags={post.tags} label={`Tags for ${post.title}`} />
            </div>
            <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
          </div>
          <CallToAction
            href={href}
            title="Read article"
            dataTestId="read-article"
            includeArrow
            excludeLeftPadding
            justify="justify-start"
            color="text-zinc-950"
            darkColor="text-white"
          />
        </div>
      </article>
    </li>
  )
}

export default PostListItem
