import TestimonialCard from '@/components/TestimonialCard'

import Image from '../../../public/holly.webp'

const TestimonialHolly = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    image={Image}
    name="Holly Reynolds"
    level="Product Design Manager"
    company="Pendo"
    url="https://www.linkedin.com/in/hollyreynolds/"
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the pleasure of working with Walker, and he consistently impressed
        me with his drive, creativity, and deep technical skill. He brought
        innovative thinking to every challenge and was a true partner to
        UX—thoughtful, open, and always focused on building the best experience
        for users. A standout collaborator and someone I&apos;d gladly work with
        again.
      </p>
    </div>
  </TestimonialCard>
)

export default TestimonialHolly
