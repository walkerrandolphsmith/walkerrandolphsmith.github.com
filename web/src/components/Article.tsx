import { CoreContent } from 'pliny/utils/contentlayer'
import { ReactNode } from 'react'

import type { Authors, Blog } from '../../.contentlayer/generated'
import CallToAction from './CallToAction'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, children }: LayoutProps) {
  const { title } = content

  return (
    <article>
      <div className="grid gap-y-8">
        <header className="px-8 grid gap-y-4">
          <h1 className="text-[36px] leading-[44px] font-medium font-[var(--font-roboto)] sm:text-[48px] sm:leading-[56px] relative text-zinc-950 dark:text-white tracking-[-0.05em] bg-[linear-gradient(to_bottom,_var(--sectionBackgroundColor)_75%,_transparent_100%)] pointer-events-none">
            {title}
          </h1>
        </header>
        <section className="mx-4 md:mx-6 max-w-screen-xl overflow-hidden">
          <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
            {children}
          </div>
        </section>
        <div className="mx-4 md:mx-6">
          <CallToAction
            href="/blog"
            title="Browse articles"
            dataTestId="browse-articles"
            includeArrow
            excludeLeftPadding
            justify="justify-start"
            color="text-zinc-950"
            darkColor="text-white"
          />
        </div>
      </div>
    </article>
  )
}
