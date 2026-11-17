import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import { POSTS_PER_PAGE } from '@/app/blog/pagination'
import { genPageMetadata } from '@/app/seo'
import Articles from '@/components/Articles'

import { allBlogs } from '../../../.contentlayer/generated'

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
