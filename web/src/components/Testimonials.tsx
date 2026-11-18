import type { ReactNode } from 'react'

import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'
import TestimonialGrid from './TestimonialGrid'

export { TestimonialGrid }

export const TestimonialGroup = ({
  title,
  id,
  children,
}: {
  title: string
  id?: string
  children: ReactNode
}) => (
  <section id={id} data-group={id} className="grid gap-y-8 scroll-mt-24">
    <h2 className="px-4 md:px-2 text-[28px] leading-[36px] font-medium text-zinc-950 dark:text-white tracking-[-0.05em]">
      {title}
    </h2>
    <TestimonialGrid>{children}</TestimonialGrid>
  </section>
)

// On the recommendations page the section heading is the page heading.
const Testimonials = ({
  includeCallToAction = false,
  isPageHeading = false,
  children,
}) => (
  <div id="recommendations" className="grid gap-y-8 scroll-mt-24">
    <header className="px-8 grid gap-y-4">
      <SectionHeader
        title="Recommended by engineering leaders"
        isLight
        as={isPageHeading ? 'h1' : 'h2'}
      />
      {includeCallToAction && (
        <CallToAction
          href="/recommendations"
          title="Read all recommendations"
          dataTestId="browse-recommendations"
          includeArrow
          excludeLeftPadding
          justify="justify-start"
          color="text-zinc-950"
          darkColor="text-white"
        />
      )}
    </header>
    <div className="mx-4 md:mx-6 max-w-screen-xl grid gap-y-8">{children}</div>
  </div>
)

export default Testimonials
