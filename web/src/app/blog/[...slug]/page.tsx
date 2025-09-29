import '@/app/prism.css'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import {
  allCoreContent,
  coreContent,
  sortPosts,
} from 'pliny/utils/contentlayer'

import Article from '@/components/Article'
import Footer from '@/components/Footer'
import GuidedSection from '@/components/GuidedSection'
import { components } from '@/components/MDXComponents'
import Nav from '@/components/Nav'
import siteMetadata from '@/data/sitemetadata'
import sitedata from '@/data/sitemetadata'

import type { Authors, Blog } from '../../../../.contentlayer/generated'
import { allAuthors, allBlogs } from '../../../../.contentlayer/generated'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find(p => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map(author => {
    const authorResults = allAuthors.find(p => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map(author => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map(img => ({
    url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
  }))

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    alternates: {
      canonical: `${sitedata.siteUrl}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageList,
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
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map(author => ({
    '@type': 'Person',
    name: author.name,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          >
            <MDXLayoutRenderer
              code={post.body.code}
              components={components}
              toc={post.toc}
            />
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
