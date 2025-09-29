import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import Articles from '@/components/Articles'
import sitedata from '@/data/sitemetadata'

import { allBlogs } from '../../../../../.contentlayer/generated'

const POSTS_PER_PAGE = 3

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))

  return paths
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const pageNumber = parseInt(params.page, 10)
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return {}
  }

  const canonical =
    pageNumber === 1
      ? `${sitedata.siteUrl}/blog`
      : `${sitedata.siteUrl}/blog/page/${pageNumber}`

  const prev =
    pageNumber > 1
      ? pageNumber === 2
        ? `${sitedata.siteUrl}/blog`
        : `${sitedata.siteUrl}/blog/page/${pageNumber - 1}`
      : null

  const next =
    pageNumber < totalPages
      ? `${sitedata.siteUrl}/blog/page/${pageNumber + 1}`
      : null

  return {
    title: `Blog - Page ${pageNumber}`,
    alternates: {
      canonical,
    },
    other: {
      prev,
      next,
    },
  }
}

export default async function Page(props: {
  params: Promise<{ page: string }>
}) {
  const params = await props.params
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <Articles
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
    />
  )
}
