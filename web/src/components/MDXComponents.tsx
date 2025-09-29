import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'

export const components: MDXComponents = {
  TOCInline,
  pre: Pre,
  BlogNewsletterForm,
}
