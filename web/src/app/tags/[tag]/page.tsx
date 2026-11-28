import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { genPageMetadata } from '@/app/seo'
import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import Nav from '@/components/Nav'
import PostListItem from '@/components/PostListItem'
import { getPostCardsForTag, getTag, getTagCatalog } from '@/lib/blogContent'
import {
  breadcrumbNode,
  collectionPageNode,
  JsonLd,
  personNode,
  websiteNode,
} from '@/lib/structuredData'

export const dynamicParams = false

export const generateStaticParams = async () =>
  getTagCatalog().map(tag => ({ tag: tag.slug }))

const describe = (label: string) => `Posts by Walker Smith about ${label}.`

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag: slug } = await props.params
  const tag = getTag(decodeURI(slug))
  if (!tag) return {}
  return genPageMetadata({
    title: `Posts about ${tag.label}`,
    route: `tags/${tag.slug}`,
    description: describe(tag.label),
  })
}

export default async function TagPage(props: {
  params: Promise<{ tag: string }>
}) {
  const { tag: slug } = await props.params
  const tag = getTag(decodeURI(slug))
  if (!tag) return notFound()

  const posts = getPostCardsForTag(tag.slug)
  const route = `/tags/${tag.slug}/`

  return (
    <>
      <JsonLd
        graph={[
          websiteNode(),
          personNode(),
          collectionPageNode(
            route,
            `Posts about ${tag.label}`,
            describe(tag.label),
          ),
          breadcrumbNode([
            { name: 'Topics', route: '/tags/' },
            { name: tag.label, route },
          ]),
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
        <div className="grid gap-y-12">
          <header className="grid gap-y-4 px-12">
            <nav aria-label="Breadcrumb">
              <Link
                prefetch={false}
                href="/tags/"
                className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-950 dark:text-gray-300 dark:hover:text-white"
                data-test="all-topics"
              >
                All topics
              </Link>
            </nav>
            <h1 className="text-[36px] leading-[44px] font-medium sm:text-[48px] sm:leading-[56px] text-zinc-950 dark:text-white tracking-[-0.05em]">
              Posts about {tag.label}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {describe(tag.label)}
            </p>
          </header>
          <ul
            className="divide-y divide-gray-200 dark:divide-gray-600 px-12"
            data-test="tag-posts"
          >
            {posts.map(post => (
              <PostListItem key={post.slug} post={post} />
            ))}
          </ul>
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
