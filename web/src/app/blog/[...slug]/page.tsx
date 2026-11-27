import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  allCoreContent,
  coreContent,
  sortPosts,
} from 'pliny/utils/contentlayer'

import { socialCard } from '@/app/seo'
import Article from '@/components/Article'
import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import MDXContent from '@/components/MDXContent'
import Nav from '@/components/Nav'
import siteMetadata from '@/data/sitemetadata'
import { getRelatedPostCards } from '@/lib/blogContent'
import { toPostSummary } from '@/lib/siteContent'
import {
  blogPostingNode,
  breadcrumbNode,
  JsonLd,
  personNode,
  websiteNode,
} from '@/lib/structuredData'

import type { Authors, Blog } from '../../../../.contentlayer/generated'
import { allAuthors, allBlogs } from '../../../../.contentlayer/generated'

const postImages = (post: Blog) => {
  const images = typeof post.images === 'string' ? [post.images] : post.images
  const list: string[] = Array.isArray(images) ? images.filter(Boolean) : []
  return list.length > 0
    ? list.map(url => ({ url }))
    : [socialCard(post.slug, post.title)]
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find(p => p.slug === slug)
  if (!post) {
    return
  }

  const url = `${siteMetadata.siteUrl}/blog/${slug}/`
  const description = post.excerpt.replace(/\s+/g, ' ').trim()
  const images = postImages(post)

  return {
    title: post.title,
    description,
    keywords: post.tags,
    authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
    openGraph: {
      title: post.title,
      description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.lastmod || post.date).toISOString(),
      url,
      images,
      authors: [siteMetadata.author],
      tags: post.tags,
    },
    alternates: {
      canonical: url,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images,
    },
  }
}

export const generateStaticParams = async () =>
  allBlogs.map(p => ({
    slug: p.slug.split('/').map(name => decodeURI(name)),
  }))

export default async function Page(props: {
  params: Promise<{ slug: string[] }>
}) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex(p => p.slug === slug)

  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find(p => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map(author => {
    const authorResults = allAuthors.find(p => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  return (
    <>
      <JsonLd
        graph={[
          websiteNode(),
          personNode(),
          blogPostingNode({
            ...toPostSummary(post),
            image: postImages(post)[0].url,
          }),
          breadcrumbNode([
            { name: 'Writing', route: '/blog/' },
            { name: post.title, route: `/blog/${slug}/` },
          ]),
        ]}
      />
      <Nav />
      <div className="grid gap-y-8">
        <GuidedSection
          padBottom
          guideDashedColor="transparent"
          backgroundDark="oklch(21% .006 285.885)"
          guideSolidColorDark="transparent"
          guideDashedColorDark="transparent"
        >
          <Article
            content={mainContent}
            prev={prev}
            next={next}
            authorDetails={authorDetails}
            related={getRelatedPostCards(post.slug)}
          >
            <MDXContent code={post.body.code} />
          </Article>
        </GuidedSection>
      </div>
      <GuidedSection
        as="footer"
        background="#f6f9fc"
        backgroundDark="oklch(27.4% .006 286.033)"
        guideSolidColorDark="transparent"
        guideDashedColorDark="transparent"
        noPadding
      >
        <Footer />
      </GuidedSection>
    </>
  )
}
