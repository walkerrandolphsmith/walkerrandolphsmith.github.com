import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/tom.webp'

const TestimonialTom = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Tom Kreamer"
    level="Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/thomas-kreamer/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Calling Walker a standout engineer only begins to capture the depth of
        his impact. During our time working together at Microsoft, I was
        consistently impressed by his ability to balance long-term engineering
        strategy with near-term execution. His strong technical vision enabled
        him to drive system-level improvements that raised the bar on our
        group&apos;s architecture as a whole, while simultaneously keeping
        feature delivery on track, sprint after sprint.
      </p>
      <p className="indent-8">
        But Walker&apos;s strengths go well beyond the technical.{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          He leads
        </span>{' '}
        with an intuitive grasp of team dynamics, fostering an environment where
        others can do their best work. Collaborating with him wasn&apos;t just
        productive – it was genuinely inspiring, and a highlight of my time at
        Microsoft.
      </p>
      <p className="indent-8">
        Walker is the kind of developer whose presence consistently elevates any
        team he&apos;s a part of. It was a privilege to work with him, and I
        wouldn&apos;t hesitate to do so again if given the opportunity.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialTom
