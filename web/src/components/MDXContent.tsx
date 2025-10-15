'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'

import { components } from '@/components/MDXComponents'

interface MDXContentProps {
  code: string
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
