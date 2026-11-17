import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'

export const TestimonialGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-12">
    {children}
  </div>
)

export const TestimonialGroup = ({ title, children }) => (
  <section className="grid gap-y-8">
    <h3 className="px-4 md:px-2 text-[28px] leading-[36px] font-medium text-zinc-950 dark:text-white tracking-[-0.05em]">
      {title}
    </h3>
    <TestimonialGrid>{children}</TestimonialGrid>
  </section>
)

const Testimonials = ({ includeCallToAction = false, children }) => (
  <div id="recommendations" className="grid gap-y-8 scroll-mt-24">
    <header className="px-8 grid gap-y-4">
      <SectionHeader title="Recommended by engineering leaders" isLight />
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
