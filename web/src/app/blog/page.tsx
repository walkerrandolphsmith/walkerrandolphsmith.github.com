import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import { POSTS_PER_PAGE } from '@/app/blog/pagination'
import { genPageMetadata } from '@/app/seo'
import Articles from '@/components/Articles'
import {
  breadcrumbNode,
  collectionPageNode,
  JsonLd,
  personNode,
  websiteNode,
} from '@/lib/structuredData'

import { allBlogs } from '../../../.contentlayer/generated'

const description =
  'Articles by Walker Smith about platform engineering, CI/CD, infrastructure, identity, and developer experience.'

export const metadata = genPageMetadata({
  title: 'Writing',
  route: 'blog',
  description,
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
    <>
      <JsonLd
        graph={[
          websiteNode(),
          personNode(),
          collectionPageNode('/blog/', 'Writing', description),
          breadcrumbNode([{ name: 'Writing', route: '/blog/' }]),
        ]}
      />
      <Articles
        pagination={pagination}
        initialDisplayPosts={initialDisplayPosts}
      />
    </>
  )
}
