import TestimonialCard from '@/components/TestimonialCard'

import DeniseImage from '../../../public/denise.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Denise Architetto"
    level="Group Engineering Manager"
    company="Microsoft"
    url="https://www.linkedin.com/in/denise-architetto-8254952/"
    image={DeniseImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker is a one-of-a-kind engineer who brings together deep technical
        expertise, strong leadership, and the rare ability to guide a team
        through agile development with clarity and purpose.
      </p>

      <p className="indent-8">
        From a technical standpoint, Walker consistently delivers resilient,
        extensible solutions that are thoughtfully designed for monitoring,
        maintenance, and long-term scalability. He has a sharp eye for
        optimizing developer efficiency—whether by streamlining build processes
        or architecting modular, component-based systems that empower teams to
        work smarter and faster.
      </p>

      <p className="indent-8">
        What truly sets Walker apart is his passion for innovation. He
        constantly explores modern technologies and cutting-edge practices,
        including the thoughtful integration of AI architecture into our
        solutions. His forward-thinking mindset has introduced creative and
        impactful ways to solve complex problems.
      </p>

      <p className="indent-8">
        Walker has been on a fast track throughout his career, and for good
        reason—{' '}
        <span className="font-semibold">
          he&apos;s a high performer, a{' '}
          <span className="text-[#0a2540] dark:text-white">natural leader</span>
          , and a team-first collaborator.
        </span>{' '}
        Any company would be lucky to have him on board, and I recommend him
        without hesitation.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
