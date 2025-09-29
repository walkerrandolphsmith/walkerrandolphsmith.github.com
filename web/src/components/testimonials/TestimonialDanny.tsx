import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/danny.webp'

const TestimonialDaniel = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Daniel Perez"
    level="Senior Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/daniel-perez-42594139/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the pleasure of working with Walker and can confidently say
        he&apos;s one of the most technically skilled software engineers
        I&apos;ve ever worked with. He has a deep understanding of web
        development, particularly with React and Typescript, and consistently
        delivered high-quality, maintainable code that set a standard for the
        team.
      </p>
      <p className="indent-8">
        Walker&apos;s dedication to usability, code quality, and developer
        experience truly stood out. He proactively improved internal tooling and
        workflows, making life easier for everyone around him. His efforts often
        went beyond his immediate responsibilities, showing a strong sense of
        ownership and commitment to excellence.
      </p>
      <p className="indent-8">
        I especially appreciated his thoughtful pull request comments — always
        constructive, insightful, and grounded in best practices. I can honestly
        say I learned a thing or two from Walker, and his feedback helped make
        me a better engineer.
      </p>
      <p className="indent-8">
        He combines technical depth with a collaborative mindset, and any team
        would be lucky to have him on board.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialDaniel
