import TestimonialCard from '@/components/TestimonialCard'

import EyoelImage from '../../../public/eyoel.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Eyoel Betre"
    level="Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/eyoelbetre/"
    image={EyoelImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        I had the privilege of working alongside Walker during my time at
        Microsoft, and I’m incredibly grateful for the opportunity. His
        combination of technical depth, strong leadership, and genuine
        compassion made him someone I constantly looked up to and learned from.
      </p>

      <p className="indent-8">
        Walker{' '}
        <span className="font-semibold text-[#0a2540] dark:text-white">
          leads with integrity and empathy
        </span>
        . Whether it was through thoughtful code reviews, architectural
        guidance, or just being a supportive leader, he created and fostered an
        environment where people felt heard and empowered. He consistently
        brought clarity to complex problems and put in the hard work needed to
        see things through, always with a calm, solution-oriented mindset.
      </p>

      <p className="indent-8">
        Many of the lessons I carry with me today concerning engineering,
        collaboration, and leadership are thanks to my time working with Walker.
        Any team would be fortunate to have him.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
