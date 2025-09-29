import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import { genPageMetadata } from '@/app/seo'
import Articles from '@/components/Articles'

import { allBlogs } from '../../../.contentlayer/generated'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Blog',
  route: 'blog',
})

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <Articles
      pagination={pagination}
      initialDisplayPosts={initialDisplayPosts}
    />
  )
}
