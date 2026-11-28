import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm.js'
import TOCInline from 'pliny/ui/TOCInline.js'

import CodeBlock from '@/components/CodeBlock'

export const components: MDXComponents = {
  TOCInline,
  pre: CodeBlock,
  BlogNewsletterForm,
}
