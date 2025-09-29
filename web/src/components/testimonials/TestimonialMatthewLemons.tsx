import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/matthewlemons.webp'

const TestimonialTom = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Matthew Lemons"
    level="Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/matthew-lemons/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I&apos;ve had the privilege of working alongside Walker for over 4
        years, and I can confidently say they are one of the most forward
        thinking and technically adept engineers I&apos;ve encountered. Their
        ability to drive innovation while maintaining engineering excellence is
        truly exceptional. Whether tackling complex architectural challenges or
        mentoring others, they consistently elevate the entire team.
      </p>
      <p className="indent-8">
        Walker isn&apos;t just an expert in software engineering — they&apos;re
        a{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          thought leader
        </span>{' '}
        who pushes boundaries and inspires those around them. Their deep
        knowledge of system design, scalability, and emerging AI technologies
        has shaped critical technical decisions and propelled projects to
        success. Beyond their technical acumen, they foster a culture of
        continuous learning and excellence, ensuring teams work cohesively
        toward impactful solutions.
      </p>
      <p className="indent-8">
        If you&apos;re looking for someone who combines strategic vision, deep
        technical mastery, and a relentless drive for innovation, I
        wholeheartedly recommend Walker. They are a game changer in every sense
        of the word.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialTom
