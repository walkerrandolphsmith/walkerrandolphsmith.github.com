import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/sarah.webp'

const TestimonialSarah = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Sarah Priest"
    level="Senior UX Designer"
    company="VesrionOne"
    url="https://www.linkedin.com/in/sarahmichellepriest/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        As a UX designer I worked with several teams at VersionOne, including
        one that Walker was part of. In additional to being a genuinely kind
        human, he is curious and strives for quality in his work. Both gifted at
        technical problem solving and interested in consistency and better user
        experience for end users as well as peers, he&apos;s the kind of team
        member I would want to work with anywhere.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialSarah
