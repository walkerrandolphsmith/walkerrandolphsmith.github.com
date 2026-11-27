'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'
import PostListItem from '@/components/PostListItem'
import TopicStrip from '@/components/TopicStrip'
import type { PostCardData } from '@/lib/blogContent'
import type { TagSummary } from '@/lib/discovery'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex flex-col gap-2 pt-6 pb-8 md:gap-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50 cursor-not-allowed"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
            className="dark:text-white dark:hover:text-gray-400"
          >
            Previous
          </Link>
        )}
        <span className="dark:text-white">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50 cursor-not-allowed"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="dark:text-white dark:hover:text-gray-400"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function Articles({
  pagination,
  initialDisplayPosts,
  topics,
}: {
  pagination: PaginationProps
  initialDisplayPosts: PostCardData[]
  topics?: { top: TagSummary[]; total: number }
}) {
  return (
    <>
      <Nav />
      <div className="grid gap-y-8">
        <GuidedSection
          padBottom
          guideDashedColor="transparent"
          backgroundDark="oklch(21% .006 285.885)"
          guideSolidColorDark="rgba(255, 255, 255, 0.08)"
          guideDashedColorDark="transparent"
        >
          <h1 className="sr-only">
            Writing about platform engineering and developer experience
          </h1>
          {topics && (
            <div className="px-12 pb-12">
              <TopicStrip topics={topics.top} totalTopics={topics.total} />
            </div>
          )}
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="min-w-0 flex-1">
              <ul className="divide-y divide-gray-200 dark:divide-gray-600 px-12">
                {initialDisplayPosts.map(post => (
                  <PostListItem key={post.slug} post={post} />
                ))}
              </ul>
            </div>
          </div>
          <div className="px-12">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </div>
        </GuidedSection>
      </div>
      <GuidedSection
        as="footer"
        background="#f6f9fc"
        backgroundDark="oklch(27.4% .006 286.033)"
        guideSolidColorDark="rgba(255, 255, 255, 0.08)"
        guideDashedColorDark="transparent"
        noPadding
      >
        <Footer />
      </GuidedSection>
    </>
  )
}
