import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/josh.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Josh Banasiak"
    level="Regional Sales Manager"
    company="Splunk"
    url="https://www.linkedin.com/in/banasiakjosh/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the pleasure of working with Walker Smith at VersionOne (now
        Digital.ai). While I was in sales and he was a software engineer, we
        collaborated regularly to bring customer feedback into the product
        development process. Walker was always open to listening and was quick
        to turn real-world input into real improvements.
      </p>
      <p className="indent-8">
        From what I saw and heard from others on the team, Walker made a huge
        impact on the engineering side. He helped modernize our tech stack,
        improved developer efficiency, and built features that truly mattered to
        our customers—like webhooks for enterprise integrations and automated
        testing that saved hundreds of hours per release.
      </p>
      <p className="indent-8">
        He also stood out as a strong mentor and{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          technical leader
        </span>
        , helping teammates grow their skills and pushing for best practices
        across teams. Any organization would benefit from having Walker on their
        team.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
