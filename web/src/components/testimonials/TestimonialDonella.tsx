import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/donella.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Donella Cohen"
    level="Senior Product Manager"
    company="Microsoft"
    url="https://www.linkedin.com/in/donellacohen/"
    image={Image}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker is so much more than an extremely talented engineer. I have had
        the privilege of seeing Walker display curiosity for and deep
        understanding of the customer journey, all while guiding and mentoring
        his colleagues on engineering best practices. I&apos;ve worked with
        hundreds of engineers in my career and Walker is one of the very best.
      </p>
      <p className="indent-8">
        I would jump at the chance to work with him again and I look forward to
        seeing the creative ways in which he&apos;ll solve future problems.
        Anyone who wants to hear more about Walker can message me directly, too.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
