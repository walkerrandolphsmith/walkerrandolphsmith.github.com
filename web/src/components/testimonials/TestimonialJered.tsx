import TestimonialCard from '@/components/TestimonialCard'

import JeredImage from '../../../public/jered.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Jered Aasheim"
    level="Partner"
    company="Microsoft"
    url="https://www.linkedin.com/in/jered-aasheim-3807b66/"
    image={JeredImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker is an outstanding engineer, team player, and{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          leader
        </span>
        . His natural curiosity for technology is just contagious.
      </p>

      <p className="indent-8">
        I’ll miss working with you, Walker, but have no doubt some lucky team
        will bring you on to help make a dent in their part of the universe.
      </p>

      <p className="indent-8">
        If anyone asks for a reference, send them my way!
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
