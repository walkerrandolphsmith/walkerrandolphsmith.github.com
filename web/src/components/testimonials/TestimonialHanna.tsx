import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/hanna.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Hanna Yip"
    level="Product Manager"
    company="Microsoft"
    url="https://www.linkedin.com/in/hanna-yip/"
    image={Image}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker delivers scalable software solutions at breakneck speed. It
        seemed that at every standup, he had built 10 new features overnight. He
        has an extremely strong instinct for the customer journey and UX design,
        making even the first, proof-of-concept version of anything he built not
        only rich with functionality but also beautiful. His{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          leadership skills
        </span>{' '}
        also inspired me as PM, bringing clarity and empathy to decision making
        surrounding tradeoffs given tight resource constraints. Any team would
        be lucky to have Walker as a contributor.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
