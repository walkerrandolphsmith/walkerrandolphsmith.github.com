import TestimonialCard from '@/components/TestimonialCard'

import AldoImage from '../../../public/aldo.webp'

const Testimonial = ({ offset = false }) => (
  <TestimonialCard
    offset={offset}
    name="Aldo Torres"
    level="Software Engineer"
    company="Microsoft"
    url="https://www.linkedin.com/in/aldo-torres/"
    image={AldoImage}
  >
    <div className="flex flex-col gap-2">
      <p className="indent-8">
        Walker is a great teammate to work with. I had the pleasure of working
        with Walker on multiple projects during our time together at Microsoft.
      </p>

      <p className="indent-8">
        Walker came to our team already with a lot of knowledge and experience.
        I have learned a lot from both his work as well as his mentorship.
      </p>

      <p className="indent-8">
        I&apos;ve always valued Walker&apos;s knowledge and would often refer to
        him to create solutions that work at scale.
      </p>

      <p className="indent-8">
        Walker would make a great addition to any Software Engineering team.
      </p>
    </div>
  </TestimonialCard>
)

export default Testimonial
