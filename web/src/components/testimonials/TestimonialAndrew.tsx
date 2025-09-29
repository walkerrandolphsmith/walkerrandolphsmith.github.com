import TestimonialCard from '@/components/TestimonialCard'

import AndrewImage from '../../../public/andrew.webp'
const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Andrew Smith"
    level="Staff Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/jamesandrewsmith/"
    image={AndrewImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I&apos;ve had the pleasure of working with Walker Smith across multiple
        chapters of our careers; first at VersionOne and more recently at
        Microsoft. In every setting, Walker has stood out as a remarkable
        software engineer and colleague.
      </p>

      <p className="indent-8">
        Walker brings a thoughtful, deliberate approach to engineering that{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          consistently leads
        </span>{' '}
        to high-impact outcomes. His work goes far beyond writing code—he
        architects resilient systems, leads cross-functional initiatives, and
        builds the infrastructure that accelerates progress for entire teams.
      </p>

      <p className="indent-8">
        At Microsoft, his leadership in reducing content latency by over 99% and
        enabling scalable, AI-driven authoring tools has reshaped key parts of
        the platform. But what truly distinguishes Walker is how he elevates
        those around him. He fosters a culture of quality and continuous
        improvement, not through pressure or perfectionism, but through
        patience, mentorship, and a genuine willingness to share his knowledge.
      </p>

      <p className="indent-8">
        Working with him feels like an invitation to grow, to learn, and to
        build better systems together. He&apos;s the kind of engineer whose
        presence raises the bar for the entire team in a quiet, consistent way.
        Walker is a principled engineer who cares deeply about his craft, his
        teammates, and the outcomes we deliver.
        <span className="font-semibold">
          {' '}
          He communicates complex ideas with clarity, takes ownership across
          boundaries, and builds trust through action
        </span>
        .
      </p>

      <p className="indent-8">
        Any team would be fortunate to work with Walker, but if you&apos;re in a
        position to hire him, don&apos;t hesitate. He&apos;s the kind of
        engineer who transforms teams and delivers lasting impact.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
