import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { POSTS_PER_PAGE } from '@/app/blog/pagination'
import { genPageMetadata } from '@/app/seo'
import Articles from '@/components/Articles'
import { getPostCards } from '@/lib/blogContent'

// Count the same published posts that the page renders, so every
// generated page has posts.
const totalPageCount = () =>
  Math.ceil(getPostCards().length / POSTS_PER_PAGE)

export const generateStaticParams = async () => {
  const totalPages = totalPageCount()
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))

  return paths
}

export async function generateMetadata(props: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const { page } = await props.params
  const pageNumber = parseInt(page, 10)
  const totalPages = totalPageCount()

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return {}
  }

  // Page 1 has the same posts as /blog, so it names /blog as canonical.
  return genPageMetadata({
    title: `Writing, page ${pageNumber}`,
    route: pageNumber === 1 ? 'blog' : `blog/page/${pageNumber}`,
    description: `Page ${pageNumber} of ${totalPages} of articles by Walker Smith about platform engineering, CI/CD, infrastructure, identity, and developer experience.`,
  })
}

export default async function Page(props: {
  params: Promise<{ page: string }>
}) {
  const params = await props.params
  const posts = getPostCards()
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
