import TestimonialCard from '@/components/TestimonialCard'

import HepciImage from '../../../public/hepci.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Hepci Addakula"
    level="Principal Engineering Manager"
    company="Microsoft"
    url="https://www.linkedin.com/in/hepcibha-addakula/"
    image={HepciImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker is one of the most outstanding engineers I&apos;ve come across.
        He combines deep technical expertise with{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          clear leadership
        </span>{' '}
        and a strong sense of direction in agile development environments.
      </p>
      <p className="indent-8">
        Walker builds scalable, resilient systems that are thoughtfully designed
        for long-term maintenance. He&apos;s always looking to improve developer
        efficiency—whether by optimizing build pipelines or designing modular
        architectures that enable faster, smarter collaboration.
      </p>
      <p className="indent-8">
        He&apos;s also a passionate innovator, constantly exploring emerging
        technologies and integrating cutting-edge solutions like AI to solve
        complex challenges.
      </p>
      <p className="indent-8">
        Beyond his technical skills, Walker is well-spoken, highly aspirational,
        and inspires those around him. His ability to communicate clearly and
        lead with purpose makes him a natural influencer and a valued teammate.
      </p>
      <p className="indent-8">
        I recommend him without hesitation—any company would be fortunate to
        have him on their team.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
