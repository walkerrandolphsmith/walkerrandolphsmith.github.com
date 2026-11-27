import Link from 'next/link'

import { genPageMetadata } from '@/app/seo'
import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'
import { getTagCatalog } from '@/lib/blogContent'
import {
  breadcrumbNode,
  collectionPageNode,
  JsonLd,
  personNode,
  websiteNode,
} from '@/lib/structuredData'

const description =
  'All topics that Walker Smith writes about, with the number of posts for each topic.'

export const metadata = genPageMetadata({
  title: 'Topics',
  route: 'tags',
  description,
})

const postCount = (count: number) =>
  `${count} ${count === 1 ? 'post' : 'posts'}`

export default function TagsPage() {
  const tags = getTagCatalog()
  return (
    <>
      <JsonLd
        graph={[
          websiteNode(),
          personNode(),
          collectionPageNode('/tags/', 'Topics', description),
          breadcrumbNode([{ name: 'Topics', route: '/tags/' }]),
        ]}
      />
      <Nav />
      <GuidedSection
        padBottom
        guideDashedColor="transparent"
        backgroundDark="oklch(21% .006 285.885)"
        guideSolidColorDark="rgba(255, 255, 255, 0.08)"
        guideDashedColorDark="transparent"
      >
        <div className="grid gap-y-8 px-8 md:px-12">
          <header className="grid gap-y-4">
            <h1 className="text-[36px] leading-[44px] font-medium sm:text-[48px] sm:leading-[56px] text-zinc-950 dark:text-white tracking-[-0.05em]">
              Topics
            </h1>
            <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              I write about {tags.length} topics. The topics with the most posts
              are first. Select a topic to see its posts.
            </p>
          </header>
          <ul
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            data-test="tag-catalog"
          >
            {tags.map(tag => (
              <li key={tag.slug}>
                <Link
                  href={`/tags/${tag.slug}/`}
                  data-test="tag-catalog-link"
                  className="flex min-h-14 items-center justify-between gap-4 rounded-[8px] border border-zinc-200 bg-[#f6f9fc] px-4 py-3 transition-colors hover:border-zinc-400 dark:border-white/10 dark:bg-[rgba(39,39,42,0.9)] dark:hover:border-white/30"
                >
                  <span className="font-medium text-zinc-950 dark:text-white">
                    {tag.label}
                  </span>
                  <span className="shrink-0 text-sm text-gray-600 dark:text-gray-300">
                    {postCount(tag.count)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/blog/"
            className="w-fit text-lg font-medium text-zinc-950 underline underline-offset-4 hover:opacity-70 dark:text-white"
          >
            See all posts
          </Link>
        </div>
      </GuidedSection>
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
