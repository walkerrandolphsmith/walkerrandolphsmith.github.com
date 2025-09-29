import TestimonialCard from '@/components/TestimonialCard'

const TestimonialAnn = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Ann Williams"
    level="Group Engineering Manager"
    company="Microsoft"
    url="https://www.linkedin.com/in/ann-nichols-williams-6a22a03/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the pleasure of working with Walker Smith on two critical
        initiatives for my team, and his contributions were exceptional in both.
      </p>
      <p className="indent-8">
        First, Walker joined my team part-time over three months to help upskill
        the team in UI development and support a rearchitecture project already
        in motion. He not only brought deep technical expertise but also a
        thoughtful, collaborative approach to{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          mentoring
        </span>
        . His guidance accelerated our progress and left the team more confident
        and capable in front-end development.
      </p>
      <p className="indent-8">
        Second, when I inherited a website without any UI developers on staff,
        Walker generously offered his time to investigate the codebase. He
        delivered a clear, thorough, and actionable report outlining the current
        state, investment recommendations, and prioritization guidance. His
        insights gave me the clarity I needed to make informed decisions and
        plan next steps effectively.
      </p>
      <p className="indent-8">
        Walker is a rare blend of technical depth, communication clarity, and
        team-first mindset. Any team would be lucky to have him.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialAnn
