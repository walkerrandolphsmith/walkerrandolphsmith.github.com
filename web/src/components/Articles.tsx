'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'

const ArticleHook = ({ date, timestamp, title, tags = [], intro, href }) => (
  <li className="py-12 first:pt-0">
    <article>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-300">
            <time dateTime={timestamp}>{date}</time>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              <Link className="break-words" href={href}>
                {title}
              </Link>
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <a
                  key={index}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                  href="/tags/deepfakes"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{intro}</p>
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

export default function Articles({ pagination, initialDisplayPosts }) {
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
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="min-w-0 flex-1">
              <ul className="divide-y divide-gray-200 dark:divide-gray-600 px-12">
                {initialDisplayPosts.map(post => (
                  <ArticleHook
                    key={post.slug}
                    title={post.title}
                    date={new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    intro={post.excerpt}
                    timestamp={new Date(post.date).toISOString()}
                    href={`/blog/${post.slug}`}
                  />
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
