import TestimonialCard from '@/components/TestimonialCard'

import KeithImage from '../../../public/keith.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Keith Gargano"
    level="Engineering Manager"
    company="Amazon Studios"
    url="https://www.linkedin.com/in/keith-gargano/"
    image={KeithImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker is one of the most driven, talented, and curious developers that
        I had the opportunity to work alongside. He was continually engaged in
        solving the problem and hungry to make the application better. He always
        followed the boy scout rule “make the place better than you found it.”
        What really thrilled me about working with Walker is how he challenged
        me to grow, to explore new technologies, and persuasively argued for
        those technologies from a place of reason.
      </p>
      <p className="indent-8">
        Walker is a great software engineer and would be an asset to any team,
        to any organization, and to any leader who wants to grow.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
