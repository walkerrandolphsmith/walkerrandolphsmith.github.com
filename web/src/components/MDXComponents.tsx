import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import TOCInline from 'pliny/ui/TOCInline'

import CodeBlock from '@/components/CodeBlock'

export const components: MDXComponents = {
  TOCInline,
  pre: CodeBlock,
  BlogNewsletterForm,
}
