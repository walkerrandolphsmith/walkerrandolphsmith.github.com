import CallToAction from './CallToAction'
import SectionHeader from './SectionHeader'

const Testimonials = ({ includeCallToAction = false, children }) => (
  <div className="grid gap-y-8">
    <header className="px-8 grid gap-y-4">
      <SectionHeader
        title="What colleagues, leaders, and partners are saying"
        byline="Hear directly from those who've worked alongside me — from
        cross-functional peers to executive stakeholders. These testimonials
        reflect a track record of technical leadership, mentorship, and driving
        scalable solutions across complex systems. Each speaks to the impact,
        collaboration, and trust built throughout my engineering career."
        isLight
      />
      {includeCallToAction && (
        <CallToAction
          href="/recommendations"
          title="Browse all"
          dataTestId="browse-recommendations"
          includeArrow
          excludeLeftPadding
          justify="justify-start"
          color="text-zinc-950"
          darkColor="text-white"
        />
      )}
    </header>
    <section className="mx-4 md:mx-6 max-w-screen-xl">
      <div className={`columns-1 md:columns-2 gap-8 mb-12`}>{children}</div>
    </section>
  </div>
)

export default Testimonials
